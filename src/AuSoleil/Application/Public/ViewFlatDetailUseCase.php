<?php

declare(strict_types=1);

namespace App\AuSoleil\Application\Public;

use App\AuSoleil\Domain\Flat\Flat;
use App\AuSoleil\Domain\Flat\FlatRepository;

final class ViewFlatDetailUseCase
{
    public function __construct(
        private readonly FlatRepository $flatRepository,
    ) {
    }

    public function execute(string $slug): ?Flat
    {
        return $this->flatRepository->findPublishedBySlug($slug);
    }
}
