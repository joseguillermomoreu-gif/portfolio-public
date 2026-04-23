<?php

declare(strict_types=1);

namespace App\AuSoleil\Infrastructure\Http\Admin;

use App\AuSoleil\Application\Admin\CreateBookingUseCase;
use App\AuSoleil\Application\Admin\ListAllFlatsUseCase;
use App\AuSoleil\Application\Admin\ReorderFlatPhotosUseCase;
use App\AuSoleil\Application\Admin\UpdateFlatUseCase;
use App\AuSoleil\Domain\Booking\BookingRepository;
use App\AuSoleil\Domain\Flat\FlatRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class AdminController extends AbstractController
{
    public function __construct(
        private readonly ListAllFlatsUseCase $listAllFlats,
        private readonly UpdateFlatUseCase $updateFlat,
        private readonly CreateBookingUseCase $createBooking,
        private readonly ReorderFlatPhotosUseCase $reorderFlatPhotos,
        private readonly FlatRepository $flatRepository,
        private readonly BookingRepository $bookingRepository,
    ) {
    }

    #[Route('/au-soleil/admin', name: 'ausoleil_admin_dashboard', methods: ['GET'])]
    public function dashboard(): Response
    {
        $flats = $this->listAllFlats->execute();
        $bookings = $this->bookingRepository->findAll();
        $activeBookings = array_values(array_filter($bookings, static fn ($b): bool => $b->isActive()));

        return $this->render('ausoleil/admin/dashboard.html.twig', [
            'flats_count' => \count($flats),
            'published_count' => \count(array_filter($flats, static fn ($f): bool => $f->published)),
            'bookings_count' => \count($activeBookings),
            'recent_bookings' => \array_slice($activeBookings, 0, 5),
            'flats_by_id' => $this->indexFlatsById($flats),
        ]);
    }

    #[Route('/au-soleil/admin/pisos', name: 'ausoleil_admin_flats', methods: ['GET'])]
    public function flats(): Response
    {
        $flats = $this->listAllFlats->execute();
        $bookings = $this->bookingRepository->findAll();

        $bookingsByFlat = [];
        foreach ($bookings as $b) {
            if (!$b->isActive()) {
                continue;
            }
            $bookingsByFlat[$b->flatId] = ($bookingsByFlat[$b->flatId] ?? 0) + 1;
        }

        return $this->render('ausoleil/admin/flats.html.twig', [
            'flats' => $flats,
            'bookings_by_flat' => $bookingsByFlat,
        ]);
    }

    #[Route('/au-soleil/admin/pisos/{id}/toggle', name: 'ausoleil_admin_flat_toggle', methods: ['POST'])]
    public function toggle(string $id): RedirectResponse
    {
        $flat = $this->flatRepository->findById($id);
        if (null === $flat) {
            $this->addFlash('error', 'Piso no encontrado');

            return $this->redirectToRoute('ausoleil_admin_flats');
        }

        $this->updateFlat->execute($id, ['published' => !$flat->published]);
        $this->addFlash('success', sprintf('Piso "%s" %s', $flat->title, !$flat->published ? 'publicado' : 'despublicado'));

        return $this->redirectToRoute('ausoleil_admin_flats');
    }

    #[Route('/au-soleil/admin/pisos/{id}', name: 'ausoleil_admin_flat_edit', methods: ['GET', 'POST'])]
    public function editFlat(string $id, Request $request): Response
    {
        $flat = $this->flatRepository->findById($id);
        if (null === $flat) {
            $this->addFlash('error', 'Piso no encontrado');

            return $this->redirectToRoute('ausoleil_admin_flats');
        }

        if ($request->isMethod('POST')) {
            $input = [
                'title' => (string) $request->request->get('title', $flat->title),
                'short_description' => (string) $request->request->get('short_description', $flat->shortDescription),
                'description' => (string) $request->request->get('description', $flat->description),
                'city' => (string) $request->request->get('city', $flat->city),
                'capacity' => (int) $request->request->get('capacity', (string) $flat->capacity),
                'bedrooms' => (int) $request->request->get('bedrooms', (string) $flat->bedrooms),
                'bathrooms' => (int) $request->request->get('bathrooms', (string) $flat->bathrooms),
                'base_price_euros' => (float) $request->request->get('base_price_euros', (string) $flat->basePrice->amount()),
                'min_stay_nights' => (int) $request->request->get('min_stay_nights', (string) $flat->minStayNights),
                'published' => (bool) $request->request->get('published'),
            ];
            $this->updateFlat->execute($id, $input);
            $this->addFlash('success', 'Piso actualizado');

            return $this->redirectToRoute('ausoleil_admin_flat_edit', ['id' => $id]);
        }

        return $this->render('ausoleil/admin/flat_edit.html.twig', [
            'flat' => $flat,
        ]);
    }

    #[Route('/au-soleil/admin/pisos/{id}/fotos/reorder', name: 'ausoleil_admin_flat_photos_reorder', methods: ['POST'])]
    public function reorderPhotos(string $id, Request $request): RedirectResponse
    {
        $flat = $this->flatRepository->findById($id);
        if (null === $flat) {
            $this->addFlash('error', 'Piso no encontrado');

            return $this->redirectToRoute('ausoleil_admin_flats');
        }

        /** @var array<int|string, mixed> $rawIds */
        $rawIds = $request->request->all('photo_ids');

        $photoIds = [];
        foreach ($rawIds as $rawId) {
            if (!is_string($rawId) || '' === $rawId) {
                continue;
            }
            $photoIds[] = $rawId;
        }

        try {
            $this->reorderFlatPhotos->execute($id, array_values($photoIds));
            $this->addFlash('success', 'Orden de fotos actualizado');
        } catch (\InvalidArgumentException $e) {
            $this->addFlash('error', 'No se pudo actualizar el orden: ' . $e->getMessage());
        }

        return $this->redirectToRoute('ausoleil_admin_flat_edit', ['id' => $id]);
    }

    #[Route('/au-soleil/admin/reservas', name: 'ausoleil_admin_bookings', methods: ['GET', 'POST'])]
    public function bookings(Request $request): Response
    {
        if ($request->isMethod('POST')) {
            try {
                $this->createBooking->execute([
                    'flat_id' => (string) $request->request->get('flat_id', ''),
                    'check_in' => (string) $request->request->get('check_in', ''),
                    'check_out' => (string) $request->request->get('check_out', ''),
                    'guest_name' => (string) $request->request->get('guest_name', ''),
                    'guest_phone' => (string) $request->request->get('guest_phone', ''),
                    'guest_email' => (string) $request->request->get('guest_email', ''),
                    'notes' => (string) $request->request->get('notes', ''),
                ]);
                $this->addFlash('success', 'Reserva creada');
            } catch (\Throwable $e) {
                $this->addFlash('error', $e->getMessage());
            }

            return $this->redirectToRoute('ausoleil_admin_bookings');
        }

        $flats = $this->listAllFlats->execute();
        $bookings = $this->bookingRepository->findAll();

        return $this->render('ausoleil/admin/bookings.html.twig', [
            'flats' => $flats,
            'bookings' => $bookings,
            'flats_by_id' => $this->indexFlatsById($flats),
        ]);
    }

    #[Route('/au-soleil/admin/reservas/{id}/cancel', name: 'ausoleil_admin_booking_cancel', methods: ['POST'])]
    public function cancelBooking(string $id): RedirectResponse
    {
        $this->bookingRepository->cancel($id);
        $this->addFlash('success', 'Reserva cancelada');

        return $this->redirectToRoute('ausoleil_admin_bookings');
    }

    /**
     * @param list<\App\AuSoleil\Domain\Flat\Flat> $flats
     *
     * @return array<string, \App\AuSoleil\Domain\Flat\Flat>
     */
    private function indexFlatsById(array $flats): array
    {
        $out = [];
        foreach ($flats as $f) {
            $out[$f->id] = $f;
        }

        return $out;
    }
}
