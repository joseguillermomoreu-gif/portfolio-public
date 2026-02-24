<?php

declare(strict_types=1);

namespace App\Domain\ExpertiseArea;

enum ExpertiseCategory: string
{
    case Arquitectura = 'arquitectura';
    case Testing = 'testing';
    case Backend = 'backend';
    case Tooling = 'tooling';

    public static function fromString(string $value): self
    {
        $category = self::tryFrom($value);

        if (null === $category) {
            throw new \InvalidArgumentException("Unknown category: '{$value}'");
        }

        return $category;
    }
}
