<?php

declare(strict_types=1);

namespace App\Domain\Portfolio;

enum SkillType: string
{
    case Current = 'current';
    case Desired = 'desired';

    public function label(): string
    {
        return match ($this) {
            self::Current => 'Current',
            self::Desired => 'Desired',
        };
    }

    public static function fromString(string $value): self
    {
        $normalized = strtolower($value);
        $type = self::tryFrom($normalized);

        if (null === $type) {
            throw new \InvalidArgumentException("Unknown skill type: '{$value}'. Valid values: current, desired.");
        }

        return $type;
    }
}
