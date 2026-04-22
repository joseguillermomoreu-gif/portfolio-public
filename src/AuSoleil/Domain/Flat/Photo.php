<?php

declare(strict_types=1);

namespace App\AuSoleil\Domain\Flat;

final class Photo
{
    public function __construct(
        public readonly string $id,
        public readonly string $url,
        public readonly string $alt,
        public readonly int $position,
    ) {
    }

    /**
     * @param array{id: string, url: string, alt?: string, position?: int} $data
     */
    public static function fromArray(array $data): self
    {
        return new self(
            $data['id'],
            $data['url'],
            $data['alt'] ?? '',
            $data['position'] ?? 0,
        );
    }

    /**
     * @return array{id: string, url: string, alt: string, position: int}
     */
    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'url' => $this->url,
            'alt' => $this->alt,
            'position' => $this->position,
        ];
    }
}
