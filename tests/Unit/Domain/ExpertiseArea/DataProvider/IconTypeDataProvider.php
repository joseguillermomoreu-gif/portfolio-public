<?php

declare(strict_types=1);

namespace App\Tests\Unit\Domain\ExpertiseArea\DataProvider;

use App\Domain\ExpertiseArea\IconType;

final class IconTypeDataProvider
{
    /**
     * @return array<string, array{IconType, string}>
     */
    public static function getEnumValueData(): array
    {
        return [
            'monogram' => [IconType::Monogram,    'monogram'],
            'simpleicons' => [IconType::SimpleIcons, 'simpleicons'],
            'url' => [IconType::Url,         'url'],
        ];
    }

    /**
     * @return array<string, array{string, IconType}>
     */
    public static function getValidFromStringData(): array
    {
        return [
            'monogram' => ['monogram',    IconType::Monogram],
            'simpleicons' => ['simpleicons', IconType::SimpleIcons],
            'url' => ['url',         IconType::Url],
        ];
    }
}
