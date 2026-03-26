<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Application\Service\ExpertiseArea\ExpertiseAreaService;
use App\Application\Service\Portfolio\PortfolioService;
use Dompdf\Dompdf;
use Dompdf\Options;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class PortfolioController extends AbstractController
{
    public function __construct(
        private readonly PortfolioService $portfolioService,
        private readonly ExpertiseAreaService $expertiseAreaService,
        #[Autowire('%kernel.project_dir%')]
        private readonly string $projectDir
    ) {
    }

    #[Route('/', name: 'home')]
    public function index(): Response
    {
        $portfolio = $this->portfolioService->getPortfolio();

        return $this->render('pages/portfolio/index.html.twig', [
            'portfolio' => $portfolio,
        ]);
    }

    #[Route('/cv/pdf', name: 'cv_pdf')]
    public function cvPdf(): Response
    {
        $projectDir = $this->getParameter('kernel.project_dir');

        if (!is_string($projectDir)) {
            throw new \RuntimeException('kernel.project_dir is not a string');
        }

        $htmlPath = $projectDir . '/public/cv.html';
        $content = file_get_contents($htmlPath);

        if (false === $content) {
            throw new \RuntimeException('Failed to read CV HTML file');
        }

        // Embed photo as base64 so Dompdf can render it without HTTP
        $photoPath = $projectDir . '/public/photo.png';
        $photoContent = file_get_contents($photoPath);

        if (false !== $photoContent) {
            $photoBase64 = 'data:image/png;base64,' . base64_encode($photoContent);
            $content = str_replace('src="/photo.png"', 'src="' . $photoBase64 . '"', $content);
        }

        $fontCacheDir = $this->projectDir . '/var/cache/dompdf';
        if (!is_dir($fontCacheDir)) {
            mkdir($fontCacheDir, 0777, true);
        }

        $options = new Options();
        $options->setIsHtml5ParserEnabled(true);
        $options->setDefaultFont('DejaVu Sans');
        $options->setFontDir($fontCacheDir);
        $options->setFontCache($fontCacheDir);

        $dompdf = new Dompdf($options);
        $dompdf->loadHtml($content);
        $dompdf->setPaper('A4', 'portrait');
        $dompdf->render();

        return new Response($dompdf->output(), Response::HTTP_OK, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'attachment; filename="cv-jose-moreu-peso.pdf"',
        ]);
    }

    #[Route('/cv', name: 'cv')]
    public function cv(): Response
    {
        // Cargar datos CV desde JSON
        $content = file_get_contents(__DIR__ . '/../../data/cv.json');

        if (false === $content) {
            throw new \RuntimeException('Failed to read CV data');
        }

        $cvData = json_decode($content, true);

        if (!is_array($cvData)) {
            throw new \RuntimeException('Invalid CV JSON format');
        }

        $portfolio = $this->portfolioService->getPortfolio();

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
        $portfolio = $this->portfolioService->getPortfolio();

        return $this->render('pages/portfolio/contact.html.twig', [
            'portfolio' => $portfolio,
        ]);
    }

    #[Route('/ppia', name: 'ppia')]
    public function ppia(): Response
    {
        return $this->render('pages/portfolio/ppia.html.twig');
    }

    #[Route('/tlotp', name: 'app_tlotp')]
    public function tlotp(): Response
    {
        $tlotpIndexFile = $this->projectDir . '/public/tlotp/index.html';

        if (file_exists($tlotpIndexFile)) {
            return $this->redirect('/tlotp/index.html');
        }

        return $this->render('pages/portfolio/tlotp.html.twig');
    }

    #[Route('/portfolio', name: 'portfolio')]
    public function portfolioPage(): Response
    {
        $keywords = $this->expertiseAreaService->getAllAsArray();

        return $this->render('pages/portfolio/portfolio.html.twig', [
            'keywords' => $keywords,
        ]);
    }

    #[Route('/proyectos', name: 'projects')]
    public function projects(): Response
    {
        $portfolio = $this->portfolioService->getPortfolio();
        $donationUrl = $portfolio->contactInfo()->donationUrl();

        $projects = [
            [
                'name' => 'TLOTP — The Lord of the Prompt',
                'description' => 'Prompt interactivo que guía paso a paso la configuración de Claude Code: descarga e instala skills, configura hooks, reglas de proyecto y buenas prácticas adaptadas a tu stack',
                'status' => 'production',
                'stack' => ['Markdown', 'Claude Code', 'Bash', 'Prompt Engineering'],
                'tags' => ['Claude Code', 'IA', 'Prompt Engineering', 'Developer Tools', 'Automation', 'Open Source'],
                'github' => 'https://github.com/joseguillermomoreu-gif/tlotp',
                'url' => null,
                'featured' => true,
                'highlights' => 'Auto-asistencia guiada, instalación de skills y hooks, compatible con cualquier stack',
            ],
            [
                'name' => 'Portfolio',
                'description' => 'Este mismo sitio web. Portfolio profesional construido con Symfony 6.4, Arquitectura Hexagonal, DDD y TDD desde el primer commit',
                'status' => 'production',
                'stack' => ['PHP 8.3+', 'Symfony 6.4', 'TypeScript', 'Playwright', 'CSS'],
                'tags' => ['PHP', 'Symfony', 'Hexagonal', 'DDD', 'TDD', 'Portfolio', 'Open Source'],
                'github' => 'https://github.com/joseguillermomoreu-gif/portfolio-public',
                'url' => 'https://josemoreupeso.es',
                'featured' => true,
                'highlights' => '100% cobertura tests, PHPStan level 9, CI/CD con deploy automático, regression testing con Playwright',
            ],
            [
                'name' => 'POM-PPIA',
                'description' => 'Genera Page Object Models y tests Cucumber/Playwright a partir de especificaciones declarativas, usando Python y OpenAI GPT-4',
                'status' => 'production',
                'stack' => ['Python 3.12+', 'OpenAI GPT-4', 'Poetry', 'Arquitectura Hexagonal'],
                'tags' => ['Python', 'OpenAI', 'Playwright', 'POM', 'Testing', 'E2E', 'IA'],
                'github' => 'https://github.com/joseguillermomoreu-gif/pom-ppia',
                'url' => null,
                'featured' => true,
                'highlights' => 'Arquitectura Hexagonal + SOLID, CLI interactiva con Rich UI, tipado estricto con mypy',
            ],
            [
                'name' => 'Claude Code Auto-Skills',
                'description' => 'Skills auto-cargables para Claude Code que detectan tu stack y cargan el contexto relevante sin configuración',
                'status' => 'production',
                'stack' => ['Shell scripts', 'Context7 MCP', 'Bash'],
                'tags' => ['Claude Code', 'IA', 'Automation', 'Skills', 'Developer Tools', 'Bash'],
                'github' => 'https://github.com/joseguillermomoreu-gif/claude-code-auto-skills',
                'url' => null,
                'featured' => true,
                'highlights' => 'Detección automática de stack, zero-config, actualización continua con Context7',
            ],
            [
                'name' => 'End2EndGuru99',
                'description' => 'Showcase del ecosistema PPIA: tests E2E funcionales sobre Guru99 generados automáticamente con PPIA y POM-PPIA',
                'status' => 'showcase',
                'stack' => ['TypeScript', 'Playwright', 'Gherkin', 'JavaScript', 'Docker'],
                'tags' => ['Playground', 'PPIA', 'POM-PPIA', 'Playwright', 'E2E', 'Testing', 'Showcase', 'Demo'],
                'github' => 'https://github.com/joseguillermomoreu-gif/end2endGuru99',
                'url' => null,
                'featured' => true,
                'highlights' => 'Casos de uso reales, tests generados sin intervención manual, prueba de efectividad del ecosistema PPIA',
            ],
            [
                'name' => 'PPIA',
                'description' => 'Playwright Page Inspector with AI — Traduce especificaciones Gherkin en tests Playwright ejecutables combinando MCP y GPT-4 mini',
                'status' => 'private',
                'stack' => ['Python', 'TypeScript', 'Playwright', 'OpenAI', 'Claude MCP'],
                'tags' => ['PPIA', 'Playwright', 'IA', 'Testing', 'E2E', 'OpenAI', 'Claude MCP'],
                'github' => null,
                'url' => null,
                'featured' => false,
                'highlights' => 'Funcional en producción interna',
            ],
        ];

        return $this->render('pages/portfolio/projects.html.twig', [
            'projects' => $projects,
            'donation_url' => $donationUrl,
        ]);
    }
}
