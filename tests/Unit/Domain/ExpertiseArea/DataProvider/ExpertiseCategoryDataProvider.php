<?php

declare(strict_types=1);

namespace App\Tests\Unit\Domain\ExpertiseArea\DataProvider;

use App\Domain\ExpertiseArea\ExpertiseCategory;

final class ExpertiseCategoryDataProvider
{
    /**
     * @return array<string, array{ExpertiseCategory, string}>
     */
    public static function getEnumValueData(): array
    {
        return [
            'arquitectura' => [ExpertiseCategory::Arquitectura, 'arquitectura'],
            'testing' => [ExpertiseCategory::Testing,      'testing'],
            'backend' => [ExpertiseCategory::Backend,      'backend'],
            'tooling' => [ExpertiseCategory::Tooling,      'tooling'],
        ];
    }

    /**
     * @return array<string, array{string, ExpertiseCategory}>
     */
    public static function getValidFromStringData(): array
    {
        return [
            'arquitectura' => ['arquitectura', ExpertiseCategory::Arquitectura],
            'testing' => ['testing',      ExpertiseCategory::Testing],
            'backend' => ['backend',      ExpertiseCategory::Backend],
            'tooling' => ['tooling',      ExpertiseCategory::Tooling],
        ];
    }
}
