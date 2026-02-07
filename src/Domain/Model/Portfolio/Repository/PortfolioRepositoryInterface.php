<?php

declare(strict_types=1);

namespace App\Domain\Model\Portfolio\Repository;

use App\Domain\Model\Portfolio\Entity\Portfolio;

interface PortfolioRepositoryInterface
{
    public function find(): Portfolio;
}
