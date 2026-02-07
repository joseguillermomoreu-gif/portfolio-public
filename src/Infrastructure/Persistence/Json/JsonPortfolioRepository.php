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
        $jsonContent = file_get_contents($this->dataPath);
        if ($jsonContent === false) {
            throw new \RuntimeException("Failed to read portfolio data from {$this->dataPath}");
        }

        $data = json_decode($jsonContent, true);
        if (!is_array($data)) {
            throw new \RuntimeException("Invalid JSON data in {$this->dataPath}");
        }

        return Portfolio::fromArray($data);
    }
}
