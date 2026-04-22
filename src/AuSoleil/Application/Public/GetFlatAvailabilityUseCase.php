<?php

declare(strict_types=1);

namespace App\AuSoleil\Application\Public;

use App\AuSoleil\Application\Dto\AvailabilityDayDto;
use App\AuSoleil\Domain\Booking\BookingRepository;
use App\AuSoleil\Domain\Flat\Flat;
use App\AuSoleil\Domain\Flat\FlatRepository;
use App\AuSoleil\Domain\Shared\DateRange;

final class GetFlatAvailabilityUseCase
{
    public function __construct(
        private readonly FlatRepository $flatRepository,
        private readonly BookingRepository $bookingRepository,
    ) {
    }

    /**
     * @return list<AvailabilityDayDto>
     */
    public function execute(string $slug, DateRange $range): array
    {
        $flat = $this->flatRepository->findPublishedBySlug($slug);
        if (null === $flat) {
            return [];
        }

        return $this->buildDays($flat, $range);
    }

    /**
     * @return list<AvailabilityDayDto>
     */
    public function executeForFlat(Flat $flat, DateRange $range): array
    {
        return $this->buildDays($flat, $range);
    }

    /**
     * @return list<AvailabilityDayDto>
     */
    private function buildDays(Flat $flat, DateRange $range): array
    {
        $bookings = $this->bookingRepository->findActiveByFlat($flat->id);

        $result = [];
        foreach ($range->nightsAsDays() as $day) {
            $status = AvailabilityDayDto::STATUS_AVAILABLE;
            foreach ($bookings as $b) {
                if ($b->range->contains($day) && $day->format('Y-m-d') !== $b->range->endIso()) {
                    $status = $b->isBlocked()
                        ? AvailabilityDayDto::STATUS_BLOCKED
                        : AvailabilityDayDto::STATUS_BOOKED;
                    break;
                }
            }
            $result[] = new AvailabilityDayDto(
                $day->format('Y-m-d'),
                $status,
                $flat->priceForDate($day),
            );
        }

        return $result;
    }
}
