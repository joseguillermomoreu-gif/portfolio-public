<?php

declare(strict_types=1);

namespace App\Domain\Model\Portfolio\Entity;

/**
 * Contact Information Value Object
 *
 * Immutable value object containing contact details.
 *
 * Properties:
 * - email: Email address
 * - phone: Phone number (international or local format)
 * - github: GitHub username (not full URL)
 * - linkedin: LinkedIn username (not full URL)
 * - instagram: Instagram handle (nullable, can be null)
 * - website: Full website URL (with https://)
 */
final class ContactInfo
{
    public function __construct(
        private readonly string $email,
        private readonly string $phone,
        private readonly string $github,
        private readonly string $linkedin,
        private readonly ?string $instagram,
        private readonly string $website
    ) {}

    public function email(): string
    {
        return $this->email;
    }

    public function phone(): string
    {
        return $this->phone;
    }

    public function github(): string
    {
        return $this->github;
    }

    public function linkedin(): string
    {
        return $this->linkedin;
    }

    public function instagram(): ?string
    {
        return $this->instagram;
    }

    public function website(): string
    {
        return $this->website;
    }
}
