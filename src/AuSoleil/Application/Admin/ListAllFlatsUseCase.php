<?php

declare(strict_types=1);

namespace App\AuSoleil\Application\Admin;

use App\AuSoleil\Domain\Flat\Flat;
use App\AuSoleil\Domain\Flat\FlatRepository;

final class ListAllFlatsUseCase
{
    public function __construct(
        private readonly FlatRepository $flatRepository,
    ) {
    }

    /**
     * @return list<Flat>
     */
    public function execute(): array
    {
        return $this->flatRepository->findAll();
    }
}
