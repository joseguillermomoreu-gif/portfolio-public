<?php

declare(strict_types=1);

namespace App\Domain\Model\VibeCoding\Entity;

final class Tag
{
    public function __construct(
        private readonly string $name,
        private readonly string $slug
    ) {}

    public function name(): string
    {
        return $this->name;
    }

    public function slug(): string
    {
        return $this->slug;
    }

    public static function fromString(string $tagName): self
    {
        return new self(
            $tagName,
            self::slugify($tagName)
        );
    }

    public function equals(Tag $other): bool
    {
        return $this->slug === $other->slug;
    }

    private static function slugify(string $text): string
    {
        return strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $text)));
    }

    public function __toString(): string
    {
        return $this->name;
    }
}
