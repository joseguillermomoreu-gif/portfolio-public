<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\Json;

use App\Domain\Model\VibeCoding\Entity\Article;
use App\Domain\Model\VibeCoding\Repository\ArticleRepositoryInterface;

final class JsonArticleRepository implements ArticleRepositoryInterface
{
    public function __construct(
        private readonly string $dataPath = __DIR__ . '/../../../../data/articles.json'
    ) {}

    public function findAll(): array
    {
        $data = json_decode(file_get_contents($this->dataPath), true);
        
        return array_map(
            fn(array $articleData) => Article::fromArray($articleData),
            $data['articles']
        );
    }

    public function findBySlug(string $slug): ?Article
    {
        $articles = $this->findAll();
        
        foreach ($articles as $article) {
            if ($article->slug() === $slug) {
                return $article;
            }
        }
        
        return null;
    }

    public function findById(string $id): ?Article
    {
        $articles = $this->findAll();
        
        foreach ($articles as $article) {
            if ($article->id() === $id) {
                return $article;
            }
        }
        
        return null;
    }

    public function findByTags(array $tags): array
    {
        $articles = $this->findAll();
        
        return array_filter($articles, function (Article $article) use ($tags) {
            $articleTags = $article->tags();
            return !empty(array_intersect($tags, $articleTags));
        });
    }
}
