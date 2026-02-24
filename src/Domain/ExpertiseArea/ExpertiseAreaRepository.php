<?php

declare(strict_types=1);

namespace App\Domain\ExpertiseArea;

interface ExpertiseAreaRepository
{
    /**
     * @throws \RuntimeException If expertise areas cannot be loaded
     */
    public function findAll(): ExpertiseAreas;
}
