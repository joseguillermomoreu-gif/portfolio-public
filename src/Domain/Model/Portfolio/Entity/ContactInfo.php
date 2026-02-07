<?php

declare(strict_types=1);

namespace App\Domain\Model\Portfolio\Entity;

final class ContactInfo
{
    public function __construct(
        private readonly string $email,
        private readonly string $phone
    ) {}

    public function email(): string
    {
        return $this->email;
    }

    public function phone(): string
    {
        return $this->phone;
    }
}
