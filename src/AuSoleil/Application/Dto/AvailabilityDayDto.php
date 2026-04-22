<?php

declare(strict_types=1);

namespace App\AuSoleil\Application\Dto;

use App\AuSoleil\Domain\Shared\Money;

final class AvailabilityDayDto
{
    public const STATUS_AVAILABLE = 'available';
    public const STATUS_BOOKED = 'booked';
    public const STATUS_BLOCKED = 'blocked';

    public function __construct(
        public readonly string $date,
        public readonly string $status,
        public readonly Money $price,
    ) {
    }

    /**
     * @return array{date: string, status: string, price: int, price_label: string}
     */
    public function toArray(): array
    {
        return [
            'date' => $this->date,
            'status' => $this->status,
            'price' => $this->price->cents,
            'price_label' => $this->price->format(),
        ];
    }
}
