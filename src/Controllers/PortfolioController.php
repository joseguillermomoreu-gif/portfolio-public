<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Domain\ExpertiseArea\ExpertiseAreaRepository;
use App\Domain\Portfolio\PortfolioRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class PortfolioController extends AbstractController
{
    public function __construct(
        private readonly PortfolioRepository $portfolioRepository,
        private readonly ExpertiseAreaRepository $expertiseAreaRepository
    ) {
    }

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
        $content = file_get_contents(__DIR__ . '/../../data/cv.json');

        if (false === $content) {
            throw new \RuntimeException('Failed to read CV data');
        }

        $cvData = json_decode($content, true);

        if (!is_array($cvData)) {
            throw new \RuntimeException('Invalid CV JSON format');
        }

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

    #[Route('/portfolio', name: 'portfolio')]
    public function portfolioPage(): Response
    {
        $keywords = $this->expertiseAreaRepository->findAll()->toArray();

        return $this->render('pages/portfolio/portfolio.html.twig', [
            'keywords' => $keywords,
        ]);
    }

    #[Route('/proyectos', name: 'projects')]
    public function projects(): Response
    {
        $projects = [
            [
                'name' => 'TLOTP — The Lord of the Prompt',
                'description' => 'El super-prompt que auto-configura Claude Code: detecta tu proyecto, carga reglas de arquitectura, gitflow, testing y CI/CD, y convierte a Claude en un senior engineer especializado en tu stack',
                'status' => 'production',
                'stack' => ['Markdown', 'Claude Code', 'Bash', 'Prompt Engineering'],
                'tags' => ['Claude Code', 'IA', 'Prompt Engineering', 'Developer Tools', 'Automation', 'Open Source'],
                'github' => 'https://github.com/joseguillermomoreu-gif/tlotp',
                'url' => null,
                'featured' => true,
                'highlights' => 'Auto-configuración por proyecto, reglas modulares de arquitectura hexagonal, gitflow, testing E2E y CI/CD, compatible con cualquier stack',
            ],
            [
                'name' => 'POM-PPIA',
                'description' => 'Generador de POM y tests Cucumber/Playwright desde tests declarativos usando Python + OpenAI',
                'status' => 'production',
                'stack' => ['Python 3.12+', 'OpenAI GPT-4', 'Poetry', 'Arquitectura Hexagonal'],
                'tags' => ['Python', 'OpenAI', 'Playwright', 'POM', 'Testing', 'E2E', 'IA'],
                'github' => 'https://github.com/joseguillermomoreu-gif/pom-ppia',
                'url' => null,
                'featured' => true,
                'highlights' => 'Arquitectura Hexagonal + SOLID, CLI interactiva con Rich UI, Type-safe con mypy',
            ],
            [
                'name' => 'Claude Code Auto-Skills',
                'description' => 'Sistema inteligente de skills auto-cargables para Claude Code que detecta tu stack tecnológico y carga automáticamente el contexto relevante',
                'status' => 'production',
                'stack' => ['Shell scripts', 'Context7 MCP', 'Bash'],
                'tags' => ['Claude Code', 'IA', 'Automation', 'Skills', 'Developer Tools', 'Bash'],
                'github' => 'https://github.com/joseguillermomoreu-gif/claude-code-auto-skills',
                'url' => null,
                'featured' => true,
                'highlights' => 'Auto-detección de stack, Zero-config, Auto-actualizable con Context7',
            ],
            [
                'name' => 'Portfolio',
                'description' => 'Portfolio web profesional con Symfony 6.4, Arquitectura Hexagonal, DDD y TDD estricto',
                'status' => 'production',
                'stack' => ['PHP 8.1+', 'Symfony 6.4', 'TypeScript', 'Playwright', 'CSS'],
                'tags' => ['PHP', 'Symfony', 'Hexagonal', 'DDD', 'TDD', 'Portfolio', 'Open Source'],
                'github' => 'https://github.com/joseguillermomoreu-gif/portfolio-public',
                'url' => 'https://josemoreupeso.es',
                'featured' => true,
                'highlights' => '100% cobertura tests, PHPStan level 9, CI/CD automático, Markdown rendering',
            ],
            [
                'name' => 'End2EndGuru99',
                'description' => 'Proyecto showcase donde se demuestran las capacidades de PPIA y POM-PPIA. Tests E2E sobre Guru99 generados automáticamente con las herramientas del ecosistema PPIA',
                'status' => 'showcase',
                'stack' => ['TypeScript', 'Playwright', 'Gherkin', 'JavaScript', 'Docker'],
                'tags' => ['Playground', 'PPIA', 'POM-PPIA', 'Playwright', 'E2E', 'Testing', 'Showcase', 'Demo'],
                'github' => 'https://github.com/joseguillermomoreu-gif/end2endGuru99',
                'url' => null,
                'featured' => true,
                'highlights' => 'Testing ground donde se publica la efectividad real de PPIA y sus herramientas. Casos de uso reales generados automáticamente',
            ],
            [
                'name' => 'PPIA',
                'description' => 'Playwright Page Inspector with AI - Herramienta que traduce especificaciones Gherkin en tests Playwright ejecutables usando mcp-playwright y GPT-4 mini',
                'status' => 'private',
                'stack' => ['Python', 'TypeScript', 'Playwright', 'OpenAI', 'Claude MCP'],
                'tags' => ['PPIA', 'Playwright', 'IA', 'Testing', 'E2E', 'OpenAI', 'Claude MCP'],
                'github' => null,
                'url' => null,
                'featured' => false,
                'highlights' => 'Herramienta lista y funcional. Siguiente paso: integrar con los tests reales de El Confidencial. Open-source planeado para Q2 2026',
            ],
        ];

        return $this->render('pages/portfolio/projects.html.twig', [
            'projects' => $projects,
        ]);
    }
}
