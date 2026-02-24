<?php

declare(strict_types=1);

namespace App\Application\Service\ExpertiseArea;

use App\Domain\ExpertiseArea\ExpertiseAreaRepository;

final class ExpertiseAreaService
{
    public function __construct(
        private readonly ExpertiseAreaRepository $expertiseAreaRepository
    ) {
    }

    /**
     * @return array<int, array<string, string>>
     */
    public function getAllAsArray(): array
    {
        return $this->expertiseAreaRepository->findAll()->toArray();
    }
}
