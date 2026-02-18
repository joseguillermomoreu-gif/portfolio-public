<?php

declare(strict_types=1);

namespace App\Domain\Portfolio;

final class PersonalInfo
{
    private readonly string $name;
    private readonly string $title;
    private readonly string $tagline;
    private readonly string $bio;
    private readonly string $location;
    private readonly ?string $photo;
    private readonly ?string $website;

    public function __construct(
        string $name,
        string $title,
        string $tagline,
        string $bio,
        string $location,
        ?string $photo,
        ?string $website
    ) {
        $this->name = self::validateAndTrimRequired($name, 'Name');
        $this->title = self::validateAndTrimRequired($title, 'Title');
        $this->tagline = self::validateAndTrimRequired($tagline, 'Tagline');
        $this->bio = self::validateAndTrimRequired($bio, 'Bio');
        $this->location = self::validateAndTrimRequired($location, 'Location');
        $this->photo = self::validateOptional($photo, 'Photo');
        $this->website = self::validateOptional($website, 'Website');
    }

    private static function validateAndTrimRequired(string $value, string $fieldName): string
    {
        $trimmed = trim($value);

        if ('' === $trimmed) {
            throw new \InvalidArgumentException("{$fieldName} cannot be empty");
        }

        return $trimmed;
    }

    private static function validateOptional(?string $value, string $fieldName): ?string
    {
        if ('' === $value) {
            throw new \InvalidArgumentException("{$fieldName} must be null or non-empty string");
        }

        return $value;
    }

    public function name(): string
    {
        return $this->name;
    }

    public function title(): string
    {
        return $this->title;
    }

    public function tagline(): string
    {
        return $this->tagline;
    }

    public function bio(): string
    {
        return $this->bio;
    }

    public function location(): string
    {
        return $this->location;
    }

    public function photo(): ?string
    {
        return $this->photo;
    }

    public function website(): ?string
    {
        return $this->website;
    }
}
