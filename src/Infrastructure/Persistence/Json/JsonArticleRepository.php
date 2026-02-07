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

    /**
     * @return array<int, Article>
     */
    public function findAll(): array
    {
        $jsonContent = file_get_contents($this->dataPath);
        if ($jsonContent === false) {
            throw new \RuntimeException("Failed to read articles data from {$this->dataPath}");
        }

        $data = json_decode($jsonContent, true);
        if (!is_array($data) || !isset($data['articles']) || !is_array($data['articles'])) {
            throw new \RuntimeException("Invalid JSON data in {$this->dataPath}");
        }

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

    /**
     * @param array<int, string> $tags
     * @return array<int, Article>
     */
    public function findByTags(array $tags): array
    {
        $articles = $this->findAll();

        return array_filter($articles, function (Article $article) use ($tags) {
            $articleTags = $article->tags();
            return !empty(array_intersect($tags, $articleTags));
        });
    }
}
