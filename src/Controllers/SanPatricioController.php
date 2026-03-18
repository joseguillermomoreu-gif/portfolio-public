<?php

declare(strict_types=1);

namespace App\Controllers;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class SanPatricioController extends AbstractController
{
    private const TIMEZONE = 'Europe/Madrid';
    private const SAN_PATRICIO_DAY = '17-03';
    private const REDIRECT_URL = '/articulos/tlotp-sdd-ia-san-patricio';

    public function __construct(
        private readonly ?\DateTimeImmutable $now = null,
    ) {
    }

    #[Route('/san_patricio', name: 'san_patricio')]
    public function index(): Response
    {
        $now = $this->getNow();

        if (self::SAN_PATRICIO_DAY === $now->format('d-m')) {
            return $this->render('pages/san_patricio/index.html.twig');
        }

        return $this->redirect(self::REDIRECT_URL, Response::HTTP_MOVED_PERMANENTLY);
    }

    private function getNow(): \DateTimeImmutable
    {
        return $this->now ?? new \DateTimeImmutable('now', new \DateTimeZone(self::TIMEZONE));
    }
}
