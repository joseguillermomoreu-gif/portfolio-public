<?php

declare(strict_types=1);

namespace App\AuSoleil\Infrastructure\Http\Public;

use App\AuSoleil\Application\Public\ListPublishedFlatsUseCase;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class FlatListController extends AbstractController
{
    public function __construct(
        private readonly ListPublishedFlatsUseCase $listFlats,
    ) {
    }

    #[Route('/au-soleil', name: 'ausoleil_public_list', methods: ['GET'])]
    public function index(Request $request): Response
    {
        $guestsRaw = $request->query->get('guests');
        $guests = is_numeric($guestsRaw) ? (int) $guestsRaw : null;

        $flats = $this->listFlats->execute($guests);

        return $this->render('ausoleil/public/list.html.twig', [
            'flats' => $flats,
            'filters' => [
                'check_in' => (string) $request->query->get('check_in', ''),
                'check_out' => (string) $request->query->get('check_out', ''),
                'guests' => $guests,
            ],
        ]);
    }
}
