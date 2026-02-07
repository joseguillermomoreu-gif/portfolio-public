<?php

declare(strict_types=1);

namespace App\Domain\Model\VibeCoding\Entity;

use DateTimeImmutable;

final class Article
{
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

    public function tags(): array
    {
        return $this->tags;
    }

    public static function fromArray(array $data): self
    {
        return new self(
            $data['id'],
            $data['title'],
            $data['slug'],
            $data['excerpt'],
            $data['content'],
            new DateTimeImmutable($data['published_at']),
            new DateTimeImmutable($data['updated_at']),
            $data['tags'] ?? []
        );
    }

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
