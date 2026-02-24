<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\Json;

use App\Domain\ExpertiseArea\ExpertiseArea;
use App\Domain\ExpertiseArea\ExpertiseAreaRepository;
use App\Domain\ExpertiseArea\ExpertiseAreas;

final class JsonExpertiseAreaRepository implements ExpertiseAreaRepository
{
    public function __construct(
        private readonly string $dataPath = __DIR__ . '/../../../../data/expertise-areas.json'
    ) {
    }

    public function findAll(): ExpertiseAreas
    {
        if (!file_exists($this->dataPath)) {
            throw new \RuntimeException("Failed to read expertise areas data from {$this->dataPath}");
        }

        $content = file_get_contents($this->dataPath);

        if (false === $content) {
            throw new \RuntimeException("Failed to read expertise areas data from {$this->dataPath}");
        }

        $data = json_decode($content, true);

        if (!is_array($data) || array_keys($data) !== range(0, count($data) - 1)) {
            throw new \RuntimeException('Invalid JSON format in expertise areas data');
        }

        $areas = array_map(
            static fn (mixed $item): ExpertiseArea => ExpertiseArea::fromArray(
                is_array($item) ? $item : []
            ),
            $data
        );

        return new ExpertiseAreas($areas);
    }
}
