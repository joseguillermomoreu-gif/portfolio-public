<?php

declare(strict_types=1);

namespace App\AuSoleil\Application\Admin;

use App\AuSoleil\Domain\Flat\Flat;
use App\AuSoleil\Domain\Flat\FlatRepository;
use App\AuSoleil\Domain\Shared\Money;

final class UpdateFlatUseCase
{
    public function __construct(
        private readonly FlatRepository $flatRepository,
    ) {
    }

    /**
     * @param array<string, mixed> $input
     */
    public function execute(string $flatId, array $input): Flat
    {
        $existing = $this->flatRepository->findById($flatId);
        if (null === $existing) {
            throw new \RuntimeException(sprintf('Flat %s not found', $flatId));
        }

        $slug = $input['slug'] ?? $existing->slug;
        $title = $input['title'] ?? $existing->title;
        $shortDesc = $input['short_description'] ?? $existing->shortDescription;
        $description = $input['description'] ?? $existing->description;
        $city = $input['city'] ?? $existing->city;
        $region = $input['region'] ?? $existing->region;

        assert(is_string($slug));
        assert(is_string($title));
        assert(is_string($shortDesc));
        assert(is_string($description));
        assert(is_string($city));
        assert(is_string($region));

        $capacityRaw = $input['capacity'] ?? null;
        $bedroomsRaw = $input['bedrooms'] ?? null;
        $bathroomsRaw = $input['bathrooms'] ?? null;
        $basePriceRaw = $input['base_price_euros'] ?? null;
        $minStayRaw = $input['min_stay_nights'] ?? null;

        $capacity = is_numeric($capacityRaw) ? (int) $capacityRaw : $existing->capacity;
        $bedrooms = is_numeric($bedroomsRaw) ? (int) $bedroomsRaw : $existing->bedrooms;
        $bathrooms = is_numeric($bathroomsRaw) ? (int) $bathroomsRaw : $existing->bathrooms;
        $basePrice = is_numeric($basePriceRaw) ? Money::euros((float) $basePriceRaw) : $existing->basePrice;
        $minStay = is_numeric($minStayRaw) ? (int) $minStayRaw : $existing->minStayNights;

        $updated = new Flat(
            $existing->id,
            $slug,
            $title,
            $shortDesc,
            $description,
            $city,
            $region,
            $capacity,
            $bedrooms,
            $bathrooms,
            $existing->amenities,
            $basePrice,
            $minStay,
            $existing->lat,
            $existing->lon,
            isset($input['published']) ? (bool) $input['published'] : $existing->published,
            $existing->photos,
            $existing->priceRanges,
        );

        $this->flatRepository->save($updated);

        return $updated;
    }
}
