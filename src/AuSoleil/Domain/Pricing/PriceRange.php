<?php

declare(strict_types=1);

namespace App\AuSoleil\Domain\Pricing;

use App\AuSoleil\Domain\Shared\DateRange;
use App\AuSoleil\Domain\Shared\Money;

final class PriceRange
{
    public function __construct(
        public readonly string $id,
        public readonly DateRange $range,
        public readonly Money $pricePerNight,
        public readonly string $label = '',
    ) {
    }

    /**
     * @param array{id: string, start: string, end: string, price_cents: int, label?: string} $data
     */
    public static function fromArray(array $data): self
    {
        return new self(
            $data['id'],
            DateRange::fromIsoStrings($data['start'], $data['end']),
            new Money($data['price_cents']),
            $data['label'] ?? '',
        );
    }

    /**
     * @return array{id: string, start: string, end: string, price_cents: int, label: string}
     */
    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'start' => $this->range->startIso(),
            'end' => $this->range->endIso(),
            'price_cents' => $this->pricePerNight->cents,
            'label' => $this->label,
        ];
    }

    public function contains(\DateTimeImmutable $date): bool
    {
        return $this->range->contains($date);
    }
}
