<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\Json;

use App\Domain\Portfolio\Portfolio;
use App\Domain\Portfolio\PortfolioRepository;

final class JsonPortfolioRepository implements PortfolioRepository
{
    public function __construct(
        private readonly string $dataPath = __DIR__ . '/../../../../data/portfolio.json'
    ) {
    }

    public function find(): Portfolio
    {
        if (!file_exists($this->dataPath)) {
            throw new \RuntimeException("Failed to read portfolio data from {$this->dataPath}");
        }

        $content = file_get_contents($this->dataPath);

        if (false === $content) {
            throw new \RuntimeException("Failed to read portfolio data from {$this->dataPath}");
        }

        $data = json_decode($content, true);

        if (!is_array($data)) {
            throw new \RuntimeException('Invalid JSON format in portfolio data');
        }

        return Portfolio::fromArray($data);
    }
}
