<?php

declare(strict_types=1);

namespace App\AuSoleil\Domain\Booking;

use App\AuSoleil\Domain\Shared\DateRange;
use App\AuSoleil\Domain\Shared\Money;

final class Booking
{
    public const STATUS_ACTIVE = 'active';
    public const STATUS_CANCELLED = 'cancelled';
    public const STATUS_BLOCKED = 'blocked';

    public function __construct(
        public readonly string $id,
        public readonly string $flatId,
        public readonly DateRange $range,
        public readonly string $guestName,
        public readonly string $guestPhone,
        public readonly string $guestEmail,
        public readonly string $notes,
        public readonly Money $totalPrice,
        public readonly string $status,
    ) {
    }

    /**
     * @param array<string, mixed> $data
     */
    public static function fromArray(array $data): self
    {
        $id = $data['id'] ?? '';
        $flatId = $data['flat_id'] ?? '';
        $checkIn = $data['check_in'] ?? '';
        $checkOut = $data['check_out'] ?? '';
        $guestName = $data['guest_name'] ?? '';
        $guestPhone = $data['guest_phone'] ?? '';
        $guestEmail = $data['guest_email'] ?? '';
        $notes = $data['notes'] ?? '';
        $totalCents = $data['total_price_cents'] ?? 0;
        $status = $data['status'] ?? self::STATUS_ACTIVE;

        assert(is_string($id));
        assert(is_string($flatId));
        assert(is_string($checkIn));
        assert(is_string($checkOut));
        assert(is_string($guestName));
        assert(is_string($guestPhone));
        assert(is_string($guestEmail));
        assert(is_string($notes));
        assert(is_int($totalCents));
        assert(is_string($status));

        return new self(
            $id,
            $flatId,
            DateRange::fromIsoStrings($checkIn, $checkOut),
            $guestName,
            $guestPhone,
            $guestEmail,
            $notes,
            new Money($totalCents),
            $status,
        );
    }

    /**
     * @return array<string, mixed>
     */
    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'flat_id' => $this->flatId,
            'check_in' => $this->range->startIso(),
            'check_out' => $this->range->endIso(),
            'guest_name' => $this->guestName,
            'guest_phone' => $this->guestPhone,
            'guest_email' => $this->guestEmail,
            'notes' => $this->notes,
            'total_price_cents' => $this->totalPrice->cents,
            'status' => $this->status,
        ];
    }

    public function isActive(): bool
    {
        return self::STATUS_CANCELLED !== $this->status;
    }

    public function isBlocked(): bool
    {
        return self::STATUS_BLOCKED === $this->status;
    }
}
