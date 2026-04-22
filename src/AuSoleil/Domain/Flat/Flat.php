<?php

declare(strict_types=1);

namespace App\AuSoleil\Domain\Flat;

use App\AuSoleil\Domain\Pricing\PriceRange;
use App\AuSoleil\Domain\Shared\Money;

final class Flat
{
    /**
     * @param list<Photo>      $photos
     * @param list<string>     $amenities
     * @param list<PriceRange> $priceRanges
     */
    public function __construct(
        public readonly string $id,
        public readonly string $slug,
        public readonly string $title,
        public readonly string $shortDescription,
        public readonly string $description,
        public readonly string $city,
        public readonly string $region,
        public readonly int $capacity,
        public readonly int $bedrooms,
        public readonly int $bathrooms,
        public readonly array $amenities,
        public readonly Money $basePrice,
        public readonly int $minStayNights,
        public readonly ?float $lat,
        public readonly ?float $lon,
        public readonly bool $published,
        public readonly array $photos,
        public readonly array $priceRanges,
    ) {
    }

    /**
     * @param array<string, mixed> $data
     */
    public static function fromArray(array $data): self
    {
        /** @var list<array{id: string, url: string, alt?: string, position?: int}> $photosData */
        $photosData = $data['photos'] ?? [];
        $photos = array_map(static fn (array $p): Photo => Photo::fromArray($p), $photosData);
        usort($photos, static fn (Photo $a, Photo $b): int => $a->position <=> $b->position);

        /** @var list<array{id: string, start: string, end: string, price_cents: int, label?: string}> $rangesData */
        $rangesData = $data['price_ranges'] ?? [];
        $priceRanges = array_map(static fn (array $p): PriceRange => PriceRange::fromArray($p), $rangesData);

        /** @var list<string> $amenities */
        $amenities = $data['amenities'] ?? [];

        $id = $data['id'] ?? '';
        $slug = $data['slug'] ?? '';
        $title = $data['title'] ?? '';
        $shortDesc = $data['short_description'] ?? '';
        $description = $data['description'] ?? '';
        $city = $data['city'] ?? '';
        $region = $data['region'] ?? 'Levante';
        $capacity = $data['capacity'] ?? 2;
        $bedrooms = $data['bedrooms'] ?? 1;
        $bathrooms = $data['bathrooms'] ?? 1;
        $basePriceCents = $data['base_price_cents'] ?? 0;
        $minStay = $data['min_stay_nights'] ?? 1;
        $published = $data['published'] ?? true;

        assert(is_string($id));
        assert(is_string($slug));
        assert(is_string($title));
        assert(is_string($shortDesc));
        assert(is_string($description));
        assert(is_string($city));
        assert(is_string($region));
        assert(is_int($capacity));
        assert(is_int($bedrooms));
        assert(is_int($bathrooms));
        assert(is_int($basePriceCents));
        assert(is_int($minStay));
        assert(is_bool($published));

        $latRaw = $data['lat'] ?? null;
        $lonRaw = $data['lon'] ?? null;
        $lat = is_numeric($latRaw) ? (float) $latRaw : null;
        $lon = is_numeric($lonRaw) ? (float) $lonRaw : null;

        return new self(
            $id,
            $slug,
            $title,
            $shortDesc,
            $description,
            $city,
            $region,
            $capacity,
            $bedrooms,
            $bathrooms,
            $amenities,
            new Money($basePriceCents),
            $minStay,
            $lat,
            $lon,
            $published,
            array_values($photos),
            array_values($priceRanges),
        );
    }

    /**
     * @return array<string, mixed>
     */
    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'title' => $this->title,
            'short_description' => $this->shortDescription,
            'description' => $this->description,
            'city' => $this->city,
            'region' => $this->region,
            'capacity' => $this->capacity,
            'bedrooms' => $this->bedrooms,
            'bathrooms' => $this->bathrooms,
            'amenities' => $this->amenities,
            'base_price_cents' => $this->basePrice->cents,
            'min_stay_nights' => $this->minStayNights,
            'lat' => $this->lat,
            'lon' => $this->lon,
            'published' => $this->published,
            'photos' => array_map(static fn (Photo $p): array => $p->toArray(), $this->photos),
            'price_ranges' => array_map(static fn (PriceRange $r): array => $r->toArray(), $this->priceRanges),
        ];
    }

    public function mainPhoto(): ?Photo
    {
        return $this->photos[0] ?? null;
    }

    public function priceForDate(\DateTimeImmutable $date): Money
    {
        foreach ($this->priceRanges as $range) {
            if ($range->contains($date)) {
                return $range->pricePerNight;
            }
        }

        return $this->basePrice;
    }

    public function findPriceRange(string $id): ?PriceRange
    {
        foreach ($this->priceRanges as $range) {
            if ($range->id === $id) {
                return $range;
            }
        }

        return null;
    }

    /**
     * Returns a new Flat with the given PriceRange appended.
     * Does NOT validate overlaps (the use case does).
     */
    public function withAddedPriceRange(PriceRange $newRange): self
    {
        $ranges = $this->priceRanges;
        $ranges[] = $newRange;

        return $this->cloneWithRanges(array_values($ranges));
    }

    /**
     * Returns a new Flat with the PriceRange matching the given id replaced.
     */
    public function withUpdatedPriceRange(string $id, PriceRange $updated): self
    {
        $ranges = array_map(
            static fn (PriceRange $r): PriceRange => $r->id === $id ? $updated : $r,
            $this->priceRanges,
        );

        return $this->cloneWithRanges(array_values($ranges));
    }

    /**
     * Returns a new Flat without the PriceRange matching the given id.
     */
    public function withoutPriceRange(string $id): self
    {
        $ranges = array_values(array_filter(
            $this->priceRanges,
            static fn (PriceRange $r): bool => $r->id !== $id,
        ));

        return $this->cloneWithRanges($ranges);
    }

    /**
     * @param list<PriceRange> $ranges
     */
    private function cloneWithRanges(array $ranges): self
    {
        return new self(
            $this->id,
            $this->slug,
            $this->title,
            $this->shortDescription,
            $this->description,
            $this->city,
            $this->region,
            $this->capacity,
            $this->bedrooms,
            $this->bathrooms,
            $this->amenities,
            $this->basePrice,
            $this->minStayNights,
            $this->lat,
            $this->lon,
            $this->published,
            $this->photos,
            $ranges,
        );
    }
}
