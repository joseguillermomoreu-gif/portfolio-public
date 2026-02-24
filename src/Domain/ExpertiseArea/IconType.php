<?php

declare(strict_types=1);

namespace App\Domain\ExpertiseArea;

enum IconType: string
{
    case Monogram = 'monogram';
    case SimpleIcons = 'simpleicons';
    case Url = 'url';

    public static function fromString(string $value): self
    {
        $iconType = self::tryFrom($value);

        if (null === $iconType) {
            throw new \InvalidArgumentException("Unknown icon type: '{$value}'");
        }

        return $iconType;
    }
}
