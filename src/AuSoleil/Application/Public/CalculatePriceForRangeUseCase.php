<?php

declare(strict_types=1);

namespace App\AuSoleil\Application\Public;

use App\AuSoleil\Domain\Flat\Flat;
use App\AuSoleil\Domain\Shared\DateRange;
use App\AuSoleil\Domain\Shared\Money;

final class CalculatePriceForRangeUseCase
{
    public function execute(Flat $flat, DateRange $range): Money
    {
        $total = Money::zero($flat->basePrice->currency);
        foreach ($range->nightsAsDays() as $day) {
            $total = $total->add($flat->priceForDate($day));
        }

        return $total;
    }
}
