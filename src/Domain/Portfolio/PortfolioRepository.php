<?php

declare(strict_types=1);

namespace App\Domain\Portfolio;

interface PortfolioRepository
{
    /**
     * @throws \RuntimeException If portfolio cannot be loaded
     */
    public function find(): Portfolio;
}
