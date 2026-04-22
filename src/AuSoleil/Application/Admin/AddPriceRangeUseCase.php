<?php

declare(strict_types=1);

namespace App\AuSoleil\Application\Admin;

use App\AuSoleil\Domain\Flat\Flat;
use App\AuSoleil\Domain\Flat\FlatRepository;
use App\AuSoleil\Domain\Pricing\PriceRange;
use App\AuSoleil\Domain\Shared\DateRange;
use App\AuSoleil\Domain\Shared\IdGenerator;
use App\AuSoleil\Domain\Shared\Money;

final class AddPriceRangeUseCase
{
    public function __construct(
        private readonly FlatRepository $flatRepository,
    ) {
    }

    /**
     * @param array{start: string, end: string, price_euros: float|string, label?: string} $input
     */
    public function execute(string $flatId, array $input): Flat
    {
        $flat = $this->flatRepository->findById($flatId);
        if (null === $flat) {
            throw new \RuntimeException(sprintf('Flat %s not found', $flatId));
        }

        $range = $this->buildRange($input);

        $this->assertNoOverlap($flat->priceRanges, $range, excludeId: null);

        $updated = $flat->withAddedPriceRange($range);
        $this->flatRepository->save($updated);

        return $updated;
    }

    /**
     * @param array{start: string, end: string, price_euros: float|string, label?: string} $input
     */
    private function buildRange(array $input): PriceRange
    {
        $start = trim((string) $input['start']);
        $end = trim((string) $input['end']);
        $priceEuros = (float) $input['price_euros'];
        $label = trim((string) ($input['label'] ?? ''));

        if ('' === $start || '' === $end) {
            throw new \InvalidArgumentException('Las fechas de inicio y fin son obligatorias.');
        }

        $dateRange = DateRange::fromIsoStrings($start, $end);
        if ($dateRange->end <= $dateRange->start) {
            throw new \InvalidArgumentException('La fecha de fin debe ser posterior a la de inicio.');
        }

        if ($priceEuros <= 0) {
            throw new \InvalidArgumentException('El precio por noche debe ser mayor que 0.');
        }

        return new PriceRange(
            'pr-' . substr(IdGenerator::uuid(), 0, 8),
            $dateRange,
            Money::euros($priceEuros),
            $label,
        );
    }

    /**
     * @param list<PriceRange> $existing
     */
    private function assertNoOverlap(array $existing, PriceRange $candidate, ?string $excludeId): void
    {
        foreach ($existing as $range) {
            if (null !== $excludeId && $range->id === $excludeId) {
                continue;
            }
            if ($range->range->overlaps($candidate->range)) {
                throw new \InvalidArgumentException(sprintf('La franja solapa con otra existente (%s → %s).', $range->range->startIso(), $range->range->endIso()));
            }
        }
    }
}
