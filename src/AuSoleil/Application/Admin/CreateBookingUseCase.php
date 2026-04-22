<?php

declare(strict_types=1);

namespace App\AuSoleil\Application\Admin;

use App\AuSoleil\Application\Public\CalculatePriceForRangeUseCase;
use App\AuSoleil\Domain\Booking\Booking;
use App\AuSoleil\Domain\Booking\BookingRepository;
use App\AuSoleil\Domain\Flat\FlatRepository;
use App\AuSoleil\Domain\Shared\DateRange;
use App\AuSoleil\Domain\Shared\IdGenerator;

final class CreateBookingUseCase
{
    public function __construct(
        private readonly FlatRepository $flatRepository,
        private readonly BookingRepository $bookingRepository,
        private readonly CalculatePriceForRangeUseCase $calculatePrice,
    ) {
    }

    /**
     * @param array<string, mixed> $input
     */
    public function execute(array $input): Booking
    {
        $flatId = $input['flat_id'] ?? '';
        $checkIn = $input['check_in'] ?? '';
        $checkOut = $input['check_out'] ?? '';
        $guestName = $input['guest_name'] ?? '';
        $guestPhone = $input['guest_phone'] ?? '';
        $guestEmail = $input['guest_email'] ?? '';
        $notes = $input['notes'] ?? '';
        $status = $input['status'] ?? Booking::STATUS_ACTIVE;

        assert(is_string($flatId));
        assert(is_string($checkIn));
        assert(is_string($checkOut));
        assert(is_string($guestName));
        assert(is_string($guestPhone));
        assert(is_string($guestEmail));
        assert(is_string($notes));
        assert(is_string($status));

        $flat = $this->flatRepository->findById($flatId);
        if (null === $flat) {
            throw new \RuntimeException('Flat not found');
        }

        $range = DateRange::fromIsoStrings($checkIn, $checkOut);

        if ($this->bookingRepository->hasOverlap($flatId, $range)) {
            throw new \DomainException('El rango de fechas solapa con otra reserva activa');
        }

        $total = $this->calculatePrice->execute($flat, $range);

        $booking = new Booking(
            IdGenerator::uuid(),
            $flatId,
            $range,
            $guestName,
            $guestPhone,
            $guestEmail,
            $notes,
            $total,
            $status,
        );

        $this->bookingRepository->save($booking);

        return $booking;
    }
}
