<?php

declare(strict_types=1);

namespace App\Tests\Unit\Domain\ExpertiseArea\DataProvider;

final class ExpertiseAreaDataProvider
{
    /**
     * @return array<string, array{string}>
     */
    public static function getEmptyStringValues(): array
    {
        return [
            'empty string' => [''],
            'whitespace only' => ['   '],
        ];
    }
}
