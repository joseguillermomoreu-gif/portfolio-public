<?php

declare(strict_types=1);

namespace App\Domain\ExpertiseArea;

final class ExpertiseAreas
{
    /**
     * @param ExpertiseArea[] $areas
     */
    public function __construct(
        private readonly array $areas
    ) {
    }

    public function count(): int
    {
        return count($this->areas);
    }

    /**
     * Returns the collection as a plain array compatible with the Twig template.
     *
     * @return array<int, array<string, string>>
     */
    public function toArray(): array
    {
        return array_values(array_map(
            static fn (ExpertiseArea $area): array => [
                'id' => $area->id(),
                'label' => $area->label(),
                'full_title' => $area->fullTitle(),
                'icon_type' => $area->iconType()->value,
                'icon_value' => $area->iconValue(),
                'category' => $area->category()->value,
                'description' => $area->description(),
            ],
            $this->areas
        ));
    }
}
