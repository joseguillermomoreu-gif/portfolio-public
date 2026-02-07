<?php

declare(strict_types=1);

namespace App\Domain\Model\Portfolio\Entity;

final class PersonalInfo
{
    public function __construct(
        private readonly string $name,
        private readonly string $title, 
        private readonly string $tagline,
        private readonly string $bio,
        private readonly string $location,
        private readonly ?string $photo,
        private readonly ?string $website
    ) {}

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
