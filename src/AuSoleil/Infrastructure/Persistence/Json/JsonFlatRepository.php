<?php

declare(strict_types=1);

namespace App\AuSoleil\Infrastructure\Persistence\Json;

use App\AuSoleil\Domain\Flat\Flat;
use App\AuSoleil\Domain\Flat\FlatRepository;
use Symfony\Component\DependencyInjection\Attribute\Autowire;

final class JsonFlatRepository implements FlatRepository
{
    public function __construct(
        #[Autowire('%kernel.project_dir%/data/au_soleil/flats.json')]
        private readonly string $filePath,
    ) {
    }

    /**
     * @return list<Flat>
     */
    public function findAllPublished(): array
    {
        return array_values(array_filter(
            $this->findAll(),
            static fn (Flat $f): bool => $f->published,
        ));
    }

    /**
     * @return list<Flat>
     */
    public function findAll(): array
    {
        $raw = $this->readFile();
        /** @var list<array<string, mixed>> $items */
        $items = $raw['flats'] ?? [];

        return array_map(static fn (array $data): Flat => Flat::fromArray($data), $items);
    }

    public function findPublishedBySlug(string $slug): ?Flat
    {
        foreach ($this->findAllPublished() as $flat) {
            if ($flat->slug === $slug) {
                return $flat;
            }
        }

        return null;
    }

    public function findBySlug(string $slug): ?Flat
    {
        foreach ($this->findAll() as $flat) {
            if ($flat->slug === $slug) {
                return $flat;
            }
        }

        return null;
    }

    public function findById(string $id): ?Flat
    {
        foreach ($this->findAll() as $flat) {
            if ($flat->id === $id) {
                return $flat;
            }
        }

        return null;
    }

    public function save(Flat $flat): void
    {
        $raw = $this->readFile();
        /** @var list<array<string, mixed>> $items */
        $items = $raw['flats'] ?? [];

        $replaced = false;
        $items = array_map(function (array $item) use ($flat, &$replaced): array {
            if (($item['id'] ?? null) === $flat->id) {
                $replaced = true;

                return $flat->toArray();
            }

            return $item;
        }, $items);

        if (!$replaced) {
            $items[] = $flat->toArray();
        }

        $this->writeFile(['flats' => array_values($items)]);
    }

    public function delete(string $id): void
    {
        $raw = $this->readFile();
        /** @var list<array<string, mixed>> $items */
        $items = $raw['flats'] ?? [];

        $items = array_values(array_filter(
            $items,
            static fn (array $item): bool => ($item['id'] ?? null) !== $id,
        ));

        $this->writeFile(['flats' => $items]);
    }

    /**
     * @return array<string, mixed>
     */
    private function readFile(): array
    {
        if (!is_file($this->filePath)) {
            return ['flats' => []];
        }

        $content = file_get_contents($this->filePath);
        if (false === $content || '' === trim($content)) {
            return ['flats' => []];
        }

        /** @var array<string, mixed> $decoded */
        $decoded = json_decode($content, true, 512, \JSON_THROW_ON_ERROR);

        return $decoded;
    }

    /**
     * @param array<string, mixed> $data
     */
    private function writeFile(array $data): void
    {
        $dir = \dirname($this->filePath);
        if (!is_dir($dir)) {
            @mkdir($dir, 0o775, true);
        }

        $result = file_put_contents(
            $this->filePath,
            json_encode($data, \JSON_PRETTY_PRINT | \JSON_UNESCAPED_UNICODE | \JSON_UNESCAPED_SLASHES) . "\n",
            \LOCK_EX,
        );

        if (false === $result) {
            throw new \RuntimeException(sprintf('No se pudo escribir en %s', $this->filePath));
        }
    }
}
