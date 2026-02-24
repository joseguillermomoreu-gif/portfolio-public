<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Application\Service\Article\ArticleService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class ArticleController extends AbstractController
{
    public function __construct(
        private readonly ArticleService $articleService
    ) {
    }

    #[Route('/code-ai', name: 'code_ai')]
    public function index(): Response
    {
        $articles = $this->articleService->findAll();

        return $this->render('pages/code-ai/index.html.twig', [
            'articles' => array_map(fn ($article) => $article->toArray(), $articles),
        ]);
    }

    #[Route('/code-ai/{slug}', name: 'code_ai_article')]
    public function show(string $slug): Response
    {
        $article = $this->articleService->findBySlug($slug);

        if (!$article) {
            throw $this->createNotFoundException('Artículo no encontrado');
        }

        return $this->render('pages/code-ai/show.html.twig', [
            'article' => $article->toArray(),
        ]);
    }
}
