<?php

declare(strict_types=1);

namespace App\AuSoleil\Application\Public;

use App\AuSoleil\Application\Dto\FlatSummaryDto;
use App\AuSoleil\Domain\Flat\FlatRepository;

final class ListPublishedFlatsUseCase
{
    public function __construct(
        private readonly FlatRepository $flatRepository,
    ) {
    }

    /**
     * @return list<FlatSummaryDto>
     */
    public function execute(?int $minGuests = null): array
    {
        $flats = $this->flatRepository->findAllPublished();

        if (null !== $minGuests) {
            $flats = array_values(array_filter(
                $flats,
                static fn ($f): bool => $f->capacity >= $minGuests,
            ));
        }

        return array_map(
            static fn ($flat): FlatSummaryDto => FlatSummaryDto::fromFlat($flat),
            $flats,
        );
    }
}
