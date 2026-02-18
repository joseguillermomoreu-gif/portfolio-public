<?php

declare(strict_types=1);

namespace App\Domain\Article;

final class Article
{
    /**
     * @param array<string> $tags
     */
    public function __construct(
        private readonly string $id,
        private readonly string $title,
        private readonly string $slug,
        private readonly string $excerpt,
        private readonly string $content,
        private readonly \DateTimeImmutable $publishedAt,
        private readonly \DateTimeImmutable $updatedAt,
        private readonly array $tags
    ) {
    }

    public function id(): string
    {
        return $this->id;
    }

    public function title(): string
    {
        return $this->title;
    }

    public function slug(): string
    {
        return $this->slug;
    }

    public function excerpt(): string
    {
        return $this->excerpt;
    }

    public function content(): string
    {
        return $this->content;
    }

    public function publishedAt(): \DateTimeImmutable
    {
        return $this->publishedAt;
    }

    public function updatedAt(): \DateTimeImmutable
    {
        return $this->updatedAt;
    }

    /**
     * @return array<string>
     */
    public function tags(): array
    {
        return $this->tags;
    }

    /**
     * @param array<string, mixed> $data
     */
    public static function fromArray(array $data): self
    {
        $id = $data['id'] ?? '';
        $title = $data['title'] ?? '';
        $slug = $data['slug'] ?? '';
        $excerpt = $data['excerpt'] ?? '';
        $content = $data['content'] ?? '';
        $publishedAt = $data['published_at'] ?? '';
        $updatedAt = $data['updated_at'] ?? '';
        $tags = $data['tags'] ?? [];

        assert(is_string($id));
        assert(is_string($title));
        assert(is_string($slug));
        assert(is_string($excerpt));
        assert(is_string($content));
        assert(is_string($publishedAt));
        assert(is_string($updatedAt));
        assert(is_array($tags));

        try {
            $publishedAtDate = new \DateTimeImmutable($publishedAt);
        } catch (\Exception $e) {
            throw new \InvalidArgumentException("Invalid published_at date: {$publishedAt}", 0, $e);
        }

        try {
            $updatedAtDate = new \DateTimeImmutable($updatedAt);
        } catch (\Exception $e) {
            throw new \InvalidArgumentException("Invalid updated_at date: {$updatedAt}", 0, $e);
        }

        return new self(
            $id,
            $title,
            $slug,
            $excerpt,
            $content,
            $publishedAtDate,
            $updatedAtDate,
            $tags
        );
    }

    /**
     * @return array<string, mixed>
     */
    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'excerpt' => $this->excerpt,
            'content' => $this->content,
            'published_at' => $this->publishedAt->format('c'),
            'updated_at' => $this->updatedAt->format('c'),
            'tags' => $this->tags,
        ];
    }
}
