<?php

declare(strict_types=1);

namespace App\Domain\Portfolio;

final class ContactInfo
{
    public function __construct(
        private readonly string $email,
        private readonly string $phone,
        private readonly string $github,
        private readonly string $linkedin,
        private readonly ?string $instagram,
        private readonly string $website
    ) {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new \InvalidArgumentException("Invalid email: '{$email}'");
        }

        if (!filter_var($website, FILTER_VALIDATE_URL)) {
            throw new \InvalidArgumentException("Invalid website URL: '{$website}'");
        }
    }

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
