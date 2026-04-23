<?php

declare(strict_types=1);

namespace App\AuSoleil\Infrastructure\Http\Public;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class AuSoleilAboutController extends AbstractController
{
    #[Route('/au-soleil/quienes-somos', name: 'ausoleil_about', methods: ['GET'])]
    public function __invoke(): Response
    {
        return $this->render('ausoleil/public/about.html.twig');
    }
}
