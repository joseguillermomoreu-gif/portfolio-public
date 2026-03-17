<?php

declare(strict_types=1);

namespace App\Controllers;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class SanPatricioController extends AbstractController
{
    private const EXPIRY_DATETIME = '2026-03-17T23:59:59';
    private const TIMEZONE = 'Europe/Madrid';

    #[Route('/san_patricio', name: 'san_patricio')]
    public function index(): Response
    {
        $timezone = new \DateTimeZone(self::TIMEZONE);
        $now = new \DateTimeImmutable('now', $timezone);
        $expiry = new \DateTimeImmutable(self::EXPIRY_DATETIME, $timezone);

        if ($now < $expiry) {
            return $this->render('pages/san_patricio/index.html.twig');
        }

        return new Response('Esta página ya no está disponible.', Response::HTTP_OK);
    }
}
