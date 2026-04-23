<?php

declare(strict_types=1);

namespace App\AuSoleil\Application\Admin;

use App\AuSoleil\Domain\Flat\Flat;
use App\AuSoleil\Domain\Flat\FlatRepository;

final class ReorderFlatPhotosUseCase
{
    public function __construct(
        private readonly FlatRepository $flatRepository,
    ) {
    }

    /**
     * @param list<string> $orderedPhotoIds
     *
     * @throws \RuntimeException         if the flat does not exist
     * @throws \InvalidArgumentException if the given photo IDs do not match the flat's current photos
     */
    public function execute(string $flatId, array $orderedPhotoIds): Flat
    {
        $flat = $this->flatRepository->findById($flatId);
        if (null === $flat) {
            throw new \RuntimeException(sprintf('Flat %s not found', $flatId));
        }

        $updated = $flat->withReorderedPhotos($orderedPhotoIds);
        $this->flatRepository->save($updated);

        return $updated;
    }
}
