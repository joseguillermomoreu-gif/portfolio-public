<?php

declare(strict_types=1);

namespace App\Domain\Model\Portfolio\Repository;

use App\Domain\Model\Portfolio\Entity\Portfolio;

/**
 * Portfolio Repository Interface (Port)
 *
 * This is a port in hexagonal architecture.
 * Implementation (adapter) lives in Infrastructure layer.
 *
 * Responsibilities:
 * - Retrieve portfolio data
 * - Abstract data source (JSON, DB, API, etc.)
 */
interface PortfolioRepositoryInterface
{
    /**
     * Find and return the portfolio.
     *
     * @return Portfolio
     * @throws \RuntimeException If portfolio cannot be loaded
     */
    public function find(): Portfolio;
}
