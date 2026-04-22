<?php

declare(strict_types=1);

namespace App\AuSoleil\Infrastructure\Http\Public;

use App\AuSoleil\Application\Public\BuildWhatsAppLinkUseCase;
use App\AuSoleil\Application\Public\GetFlatAvailabilityUseCase;
use App\AuSoleil\Application\Public\ViewFlatDetailUseCase;
use App\AuSoleil\Domain\Shared\DateRange;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Attribute\Route;

final class FlatDetailController extends AbstractController
{
    public function __construct(
        private readonly ViewFlatDetailUseCase $viewFlat,
        private readonly GetFlatAvailabilityUseCase $getAvailability,
        private readonly BuildWhatsAppLinkUseCase $buildWhatsApp,
    ) {
    }

    #[Route('/au-soleil/piso/{slug}', name: 'ausoleil_public_detail', methods: ['GET'])]
    public function detail(string $slug): Response
    {
        $flat = $this->viewFlat->execute($slug);
        if (null === $flat) {
            throw new NotFoundHttpException('Piso no encontrado');
        }

        // Build 6-month availability for SSR calendar
        $today = new \DateTimeImmutable('today');
        $end = $today->modify('+6 months');
        $range = new DateRange($today, $end);
        $availability = $this->getAvailability->executeForFlat($flat, $range);

        // Group by month
        $months = [];
        foreach ($availability as $day) {
            $key = substr($day->date, 0, 7);
            $months[$key][] = $day;
        }

        $whatsappUrl = $this->buildWhatsApp->execute($flat);

        return $this->render('ausoleil/public/detail.html.twig', [
            'flat' => $flat,
            'months' => $months,
            'whatsapp_url' => $whatsappUrl,
        ]);
    }

    #[Route('/au-soleil/api/piso/{slug}/availability', name: 'ausoleil_public_api_availability', methods: ['GET'])]
    public function availability(string $slug, Request $request): JsonResponse
    {
        $from = (string) $request->query->get('from', '');
        $to = (string) $request->query->get('to', '');

        try {
            $range = DateRange::fromIsoStrings($from, $to);
        } catch (\Exception) {
            return new JsonResponse(['error' => 'Invalid date range'], 400);
        }

        $days = $this->getAvailability->execute($slug, $range);
        $payload = [
            'slug' => $slug,
            'from' => $from,
            'to' => $to,
            'days' => array_map(static fn ($d): array => $d->toArray(), $days),
        ];

        return new JsonResponse($payload);
    }
}
