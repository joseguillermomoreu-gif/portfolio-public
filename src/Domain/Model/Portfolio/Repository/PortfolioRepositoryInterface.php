<?php

declare(strict_types=1);

namespace App\Domain\Model\Portfolio\Repository;

use App\Domain\Model\Portfolio\Entity\Portfolio;

/**
 * Portfolio Repository Interface
 *
 * Defines the contract for retrieving Portfolio aggregate.
 * Implementations are located in Infrastructure layer.
 *
 * @package App\Domain\Model\Portfolio\Repository
 */
interface PortfolioRepositoryInterface
{
    /**
     * Retrieves the portfolio data
     *
     * @return Portfolio The portfolio aggregate with all associated data
     * @throws \RuntimeException If portfolio data cannot be retrieved
     */
    public function find(): Portfolio;
}
