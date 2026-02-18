<?php

declare(strict_types=1);

namespace App\Domain\Portfolio;

enum SkillLevel: string
{
    case Expert = 'expert';
    case Advanced = 'advanced';
    case Intermediate = 'intermediate';

    public function label(): string
    {
        return match ($this) {
            self::Expert => 'Expert',
            self::Advanced => 'Advanced',
            self::Intermediate => 'Intermediate',
        };
    }

    public static function fromString(string $value): self
    {
        $normalized = strtolower($value);
        $level = self::tryFrom($normalized);

        if (null === $level) {
            throw new \InvalidArgumentException("Unknown skill level: '{$value}'. Valid values: expert, advanced, intermediate.");
        }

        return $level;
    }
}
