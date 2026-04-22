<?php

declare(strict_types=1);

namespace App\AuSoleil\Infrastructure\Http\Admin;

use App\AuSoleil\Application\Admin\AddPriceRangeUseCase;
use App\AuSoleil\Application\Admin\DeletePriceRangeUseCase;
use App\AuSoleil\Application\Admin\UpdatePriceRangeUseCase;
use App\AuSoleil\Domain\Flat\FlatRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class PriceRangeController extends AbstractController
{
    public function __construct(
        private readonly FlatRepository $flatRepository,
        private readonly AddPriceRangeUseCase $addPriceRange,
        private readonly UpdatePriceRangeUseCase $updatePriceRange,
        private readonly DeletePriceRangeUseCase $deletePriceRange,
    ) {
    }

    #[Route('/au-soleil/admin/pisos/{slug}/precios', name: 'ausoleil_admin_pricing_list', methods: ['GET'])]
    public function list(string $slug): Response
    {
        $flat = $this->flatRepository->findBySlug($slug);
        if (null === $flat) {
            $this->addFlash('error', 'Piso no encontrado');

            return $this->redirectToRoute('ausoleil_admin_flats');
        }

        $ranges = $flat->priceRanges;
        usort(
            $ranges,
            static fn ($a, $b): int => strcmp($a->range->startIso(), $b->range->startIso()),
        );

        return $this->render('ausoleil/admin/pricing/list.html.twig', [
            'flat' => $flat,
            'ranges' => $ranges,
        ]);
    }

    #[Route('/au-soleil/admin/pisos/{slug}/precios/nueva', name: 'ausoleil_admin_pricing_new', methods: ['GET', 'POST'])]
    public function create(string $slug, Request $request): Response
    {
        $flat = $this->flatRepository->findBySlug($slug);
        if (null === $flat) {
            $this->addFlash('error', 'Piso no encontrado');

            return $this->redirectToRoute('ausoleil_admin_flats');
        }

        $formData = [
            'start' => '',
            'end' => '',
            'price_euros' => '',
            'label' => '',
        ];

        if ($request->isMethod('POST')) {
            $formData = [
                'start' => (string) $request->request->get('start', ''),
                'end' => (string) $request->request->get('end', ''),
                'price_euros' => (string) $request->request->get('price_euros', ''),
                'label' => (string) $request->request->get('label', ''),
            ];

            try {
                $this->addPriceRange->execute($flat->id, [
                    'start' => $formData['start'],
                    'end' => $formData['end'],
                    'price_euros' => $formData['price_euros'],
                    'label' => $formData['label'],
                ]);
                $this->addFlash('success', 'Franja creada correctamente.');

                return $this->redirectToRoute('ausoleil_admin_pricing_list', ['slug' => $flat->slug]);
            } catch (\InvalidArgumentException $e) {
                $this->addFlash('error', $e->getMessage());
            } catch (\Throwable $e) {
                $this->addFlash('error', 'No se ha podido crear la franja: ' . $e->getMessage());
            }
        }

        return $this->render('ausoleil/admin/pricing/form.html.twig', [
            'flat' => $flat,
            'mode' => 'new',
            'form' => $formData,
            'range_id' => null,
        ]);
    }

    #[Route('/au-soleil/admin/pisos/{slug}/precios/{id}/editar', name: 'ausoleil_admin_pricing_edit', methods: ['GET', 'POST'])]
    public function edit(string $slug, string $id, Request $request): Response
    {
        $flat = $this->flatRepository->findBySlug($slug);
        if (null === $flat) {
            $this->addFlash('error', 'Piso no encontrado');

            return $this->redirectToRoute('ausoleil_admin_flats');
        }

        $range = $flat->findPriceRange($id);
        if (null === $range) {
            $this->addFlash('error', 'Franja no encontrada');

            return $this->redirectToRoute('ausoleil_admin_pricing_list', ['slug' => $flat->slug]);
        }

        $formData = [
            'start' => $range->range->startIso(),
            'end' => $range->range->endIso(),
            'price_euros' => (string) $range->pricePerNight->amount(),
            'label' => $range->label,
        ];

        if ($request->isMethod('POST')) {
            $formData = [
                'start' => (string) $request->request->get('start', $formData['start']),
                'end' => (string) $request->request->get('end', $formData['end']),
                'price_euros' => (string) $request->request->get('price_euros', $formData['price_euros']),
                'label' => (string) $request->request->get('label', $formData['label']),
            ];

            try {
                $this->updatePriceRange->execute($flat->id, $id, [
                    'start' => $formData['start'],
                    'end' => $formData['end'],
                    'price_euros' => $formData['price_euros'],
                    'label' => $formData['label'],
                ]);
                $this->addFlash('success', 'Franja actualizada.');

                return $this->redirectToRoute('ausoleil_admin_pricing_list', ['slug' => $flat->slug]);
            } catch (\InvalidArgumentException $e) {
                $this->addFlash('error', $e->getMessage());
            } catch (\Throwable $e) {
                $this->addFlash('error', 'No se ha podido actualizar la franja: ' . $e->getMessage());
            }
        }

        return $this->render('ausoleil/admin/pricing/form.html.twig', [
            'flat' => $flat,
            'mode' => 'edit',
            'form' => $formData,
            'range_id' => $id,
        ]);
    }

    #[Route('/au-soleil/admin/pisos/{slug}/precios/{id}/eliminar', name: 'ausoleil_admin_pricing_delete', methods: ['POST'])]
    public function delete(string $slug, string $id): RedirectResponse
    {
        $flat = $this->flatRepository->findBySlug($slug);
        if (null === $flat) {
            $this->addFlash('error', 'Piso no encontrado');

            return $this->redirectToRoute('ausoleil_admin_flats');
        }

        try {
            $this->deletePriceRange->execute($flat->id, $id);
            $this->addFlash('success', 'Franja eliminada.');
        } catch (\Throwable $e) {
            $this->addFlash('error', 'No se ha podido eliminar: ' . $e->getMessage());
        }

        return $this->redirectToRoute('ausoleil_admin_pricing_list', ['slug' => $flat->slug]);
    }
}
