<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Infrastructure\Persistence\Json\JsonPortfolioRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class PortfolioController extends AbstractController
{
    public function __construct(
        private readonly JsonPortfolioRepository $portfolioRepository
    ) {}

    #[Route('/', name: 'home')]
    public function index(): Response
    {
        $portfolio = $this->portfolioRepository->find();

        return $this->render('pages/portfolio/index.html.twig', [
            'portfolio' => $portfolio,
        ]);
    }

    #[Route('/cv', name: 'cv')]
    public function cv(): Response
    {
        // Cargar datos CV desde JSON
        $cvData = json_decode(file_get_contents(__DIR__ . '/../../data/cv.json'), true);
        $portfolio = $this->portfolioRepository->find();

        // Enlace al CV PDF real
        $cvPdfUrl = '/cv2025.pdf';

        return $this->render('pages/portfolio/cv.html.twig', [
            'portfolio' => $portfolio,
            'cv_data' => $cvData,
            'cv_pdf_url' => $cvPdfUrl,
        ]);
    }

    #[Route('/contacto', name: 'contact')]
    public function contact(): Response
    {
        $portfolio = $this->portfolioRepository->find();

        return $this->render('pages/portfolio/contact.html.twig', [
            'portfolio' => $portfolio,
        ]);
    }

    #[Route('/ppia', name: 'ppia')]
    public function ppia(): Response
    {
        return $this->render('pages/portfolio/ppia.html.twig');
    }
}
