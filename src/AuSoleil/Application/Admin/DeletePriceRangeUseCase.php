<?php

declare(strict_types=1);

namespace App\AuSoleil\Application\Admin;

use App\AuSoleil\Domain\Flat\FlatRepository;

final class DeletePriceRangeUseCase
{
    public function __construct(
        private readonly FlatRepository $flatRepository,
    ) {
    }

    public function execute(string $flatId, string $priceRangeId): void
    {
        $flat = $this->flatRepository->findById($flatId);
        if (null === $flat) {
            throw new \RuntimeException(sprintf('Flat %s not found', $flatId));
        }

        if (null === $flat->findPriceRange($priceRangeId)) {
            throw new \RuntimeException(sprintf('PriceRange %s not found in flat %s', $priceRangeId, $flatId));
        }

        $updated = $flat->withoutPriceRange($priceRangeId);
        $this->flatRepository->save($updated);
    }
}
