<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\Json;

use App\Domain\Model\Portfolio\Entity\Portfolio;
use App\Domain\Model\Portfolio\Repository\PortfolioRepositoryInterface;

/**
 * JSON Portfolio Repository (Adapter).
 *
 * Infrastructure implementation that loads portfolio from JSON file.
 * This is an adapter in hexagonal architecture that implements the port
 * defined in the domain layer.
 *
 * Responsibilities:
 * - Load portfolio data from JSON file
 * - Validate file existence and JSON format
 * - Map JSON data to Portfolio entity using fromArray()
 * - Throw exceptions for invalid data
 */
final class JsonPortfolioRepository implements PortfolioRepositoryInterface
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
