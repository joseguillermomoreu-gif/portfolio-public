<?php

declare(strict_types=1);

namespace App\Domain\Model\VibeCoding\Entity;

use DateTimeImmutable;

final class Article
{
    /**
     * @param array<int, string> $tags
     */
    public function __construct(
        private readonly string $id,
        private readonly string $title,
        private readonly string $slug,
        private readonly string $excerpt,
        private readonly string $content,
        private readonly DateTimeImmutable $publishedAt,
        private readonly DateTimeImmutable $updatedAt,
        private readonly array $tags
    ) {}

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

    public function publishedAt(): DateTimeImmutable
    {
        return $this->publishedAt;
    }

    public function updatedAt(): DateTimeImmutable
    {
        return $this->updatedAt;
    }

    /**
     * @return array<int, string>
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
        return new self(
            is_string($data['id'] ?? null) ? $data['id'] : throw new \InvalidArgumentException('Invalid id'),
            is_string($data['title'] ?? null) ? $data['title'] : throw new \InvalidArgumentException('Invalid title'),
            is_string($data['slug'] ?? null) ? $data['slug'] : throw new \InvalidArgumentException('Invalid slug'),
            is_string($data['excerpt'] ?? null) ? $data['excerpt'] : throw new \InvalidArgumentException('Invalid excerpt'),
            is_string($data['content'] ?? null) ? $data['content'] : throw new \InvalidArgumentException('Invalid content'),
            new DateTimeImmutable(is_string($data['published_at'] ?? null) ? $data['published_at'] : throw new \InvalidArgumentException('Invalid published_at')),
            new DateTimeImmutable(is_string($data['updated_at'] ?? null) ? $data['updated_at'] : throw new \InvalidArgumentException('Invalid updated_at')),
            isset($data['tags']) && is_array($data['tags']) ? $data['tags'] : []
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
