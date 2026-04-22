<?php

declare(strict_types=1);

namespace App\AuSoleil\Domain\Shared;

final class Money
{
    public function __construct(
        public readonly int $cents,
        public readonly string $currency = 'EUR',
    ) {
    }

    public static function euros(float $amount): self
    {
        return new self((int) round($amount * 100), 'EUR');
    }

    public static function zero(string $currency = 'EUR'): self
    {
        return new self(0, $currency);
    }

    public function add(Money $other): self
    {
        return new self($this->cents + $other->cents, $this->currency);
    }

    public function multiply(int $factor): self
    {
        return new self($this->cents * $factor, $this->currency);
    }

    public function format(): string
    {
        $euros = $this->cents / 100;
        // Spanish locale: 1.250,00 €
        $formatted = number_format($euros, 2, ',', '.');

        return $formatted . ' €';
    }

    public function amount(): float
    {
        return $this->cents / 100;
    }
}
