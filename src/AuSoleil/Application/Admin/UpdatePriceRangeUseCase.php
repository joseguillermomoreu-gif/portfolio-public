<?php

declare(strict_types=1);

namespace App\AuSoleil\Application\Admin;

use App\AuSoleil\Domain\Flat\Flat;
use App\AuSoleil\Domain\Flat\FlatRepository;
use App\AuSoleil\Domain\Pricing\PriceRange;
use App\AuSoleil\Domain\Shared\DateRange;
use App\AuSoleil\Domain\Shared\Money;

final class UpdatePriceRangeUseCase
{
    public function __construct(
        private readonly FlatRepository $flatRepository,
    ) {
    }

    /**
     * @param array{start: string, end: string, price_euros: float|string, label?: string} $input
     */
    public function execute(string $flatId, string $priceRangeId, array $input): Flat
    {
        $flat = $this->flatRepository->findById($flatId);
        if (null === $flat) {
            throw new \RuntimeException(sprintf('Flat %s not found', $flatId));
        }

        $existing = $flat->findPriceRange($priceRangeId);
        if (null === $existing) {
            throw new \RuntimeException(sprintf('PriceRange %s not found in flat %s', $priceRangeId, $flatId));
        }

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

        $candidate = new PriceRange(
            $priceRangeId,
            $dateRange,
            Money::euros($priceEuros),
            $label,
        );

        foreach ($flat->priceRanges as $range) {
            if ($range->id === $priceRangeId) {
                continue;
            }
            if ($range->range->overlaps($candidate->range)) {
                throw new \InvalidArgumentException(sprintf('La franja solapa con otra existente (%s → %s).', $range->range->startIso(), $range->range->endIso()));
            }
        }

        $updated = $flat->withUpdatedPriceRange($priceRangeId, $candidate);
        $this->flatRepository->save($updated);

        return $updated;
    }
}
