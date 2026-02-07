<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Infrastructure\Persistence\Json\JsonArticleRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class ArticleController extends AbstractController
{
    public function __construct(
        private readonly JsonArticleRepository $articleRepository
    ) {}

    #[Route('/vibe-coding', name: 'vibe_coding')]
    public function index(): Response
    {
        $articles = $this->articleRepository->findAll();
        
        return $this->render('pages/vibe-coding/index.html.twig', [
            'articles' => array_map(fn($article) => $article->toArray(), $articles),
        ]);
    }

    #[Route('/vibe-coding/{slug}', name: 'vibe_coding_article')]
    public function show(string $slug): Response
    {
        $article = $this->articleRepository->findBySlug($slug);
        
        if (!$article) {
            throw $this->createNotFoundException('Artículo no encontrado');
        }
        
        return $this->render('pages/vibe-coding/show.html.twig', [
            'article' => $article->toArray(),
        ]);
    }
}
