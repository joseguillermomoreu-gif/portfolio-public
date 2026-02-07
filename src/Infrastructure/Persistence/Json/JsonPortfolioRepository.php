<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\Json;

use App\Domain\Model\Portfolio\Entity\Portfolio;
use App\Domain\Model\Portfolio\Repository\PortfolioRepositoryInterface;

final class JsonPortfolioRepository implements PortfolioRepositoryInterface
{
    public function __construct(
        private readonly string $dataPath = __DIR__ . '/../../../../data/portfolio.json'
    ) {}

    public function find(): Portfolio
    {
        $data = json_decode(file_get_contents($this->dataPath), true);
        return Portfolio::fromArray($data);
    }
}
