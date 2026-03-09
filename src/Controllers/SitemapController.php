<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Application\Service\Article\ArticleService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class SitemapController extends AbstractController
{
    public function __construct(
        private readonly ArticleService $articleService
    ) {
    }

    #[Route('/sitemap.xml', name: 'sitemap', defaults: ['_format' => 'xml'])]
    public function sitemap(): Response
    {
        $articles = $this->articleService->findAll();

        $response = $this->render('sitemap.xml.twig', [
            'articles' => array_map(fn ($article) => $article->toArray(), $articles),
        ]);

        $response->headers->set('Content-Type', 'application/xml; charset=UTF-8');

        return $response;
    }
}
