<?php

declare(strict_types=1);

namespace App\AuSoleil\Application\Dto;

use App\AuSoleil\Domain\Flat\Flat;
use App\AuSoleil\Domain\Flat\Photo;
use App\AuSoleil\Domain\Shared\Money;

final class FlatSummaryDto
{
    public function __construct(
        public readonly string $id,
        public readonly string $slug,
        public readonly string $title,
        public readonly string $shortDescription,
        public readonly string $city,
        public readonly string $region,
        public readonly int $capacity,
        public readonly int $bedrooms,
        public readonly int $bathrooms,
        public readonly Money $basePrice,
        public readonly ?Photo $mainPhoto,
    ) {
    }

    public static function fromFlat(Flat $flat): self
    {
        return new self(
            $flat->id,
            $flat->slug,
            $flat->title,
            $flat->shortDescription,
            $flat->city,
            $flat->region,
            $flat->capacity,
            $flat->bedrooms,
            $flat->bathrooms,
            $flat->basePrice,
            $flat->mainPhoto(),
        );
    }
}
