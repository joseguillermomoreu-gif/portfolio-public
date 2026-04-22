<?php

declare(strict_types=1);

namespace App\AuSoleil\Domain\Booking;

use App\AuSoleil\Domain\Shared\DateRange;

interface BookingRepository
{
    /**
     * @return list<Booking>
     */
    public function findActiveByFlat(string $flatId): array;

    /**
     * @return list<Booking>
     */
    public function findAllByFlat(string $flatId): array;

    /**
     * @return list<Booking>
     */
    public function findAll(): array;

    public function findById(string $id): ?Booking;

    public function hasOverlap(string $flatId, DateRange $range, ?string $excludingBookingId = null): bool;

    public function save(Booking $booking): void;

    public function cancel(string $bookingId): void;
}
