<?php

declare(strict_types=1);

namespace App\Tests\Domain\ExpertiseArea;

use App\Domain\ExpertiseArea\ExpertiseCategory;
use PHPUnit\Framework\TestCase;

/**
 * ExpertiseCategory Value Object Tests.
 *
 * Tests backed enum for expertise area categories.
 *
 * @covers \App\Domain\ExpertiseArea\ExpertiseCategory
 */
final class ExpertiseCategoryTest extends TestCase
{
    /**
     * @test
     *
     * @dataProvider \App\Tests\Domain\ExpertiseArea\DataProvider\ExpertiseCategoryDataProvider::getEnumValueData()
     */
    public function enumValueShouldMatchExpectedString(ExpertiseCategory $category, string $expected): void
    {
        static::assertSame($expected, $category->value);
    }

    /**
     * @test
     *
     * @dataProvider \App\Tests\Domain\ExpertiseArea\DataProvider\ExpertiseCategoryDataProvider::getValidFromStringData()
     */
    public function fromStringShouldReturnExpectedCategory(string $value, ExpertiseCategory $expected): void
    {
        static::assertSame($expected, ExpertiseCategory::fromString($value));
    }

    /**
     * @test
     */
    public function fromStringWithUnknownValueShouldThrowInvalidArgumentException(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage("Unknown category: 'unknown'");

        ExpertiseCategory::fromString('unknown');
    }

    /**
     * @test
     */
    public function fromStringWithEmptyValueShouldThrowInvalidArgumentException(): void
    {
        $this->expectException(\InvalidArgumentException::class);

        ExpertiseCategory::fromString('');
    }

    /**
     * @test
     */
    public function allCasesShouldHaveStringValues(): void
    {
        $cases = ExpertiseCategory::cases();

        static::assertCount(4, $cases);
        foreach ($cases as $case) {
            static::assertIsString($case->value);
            static::assertNotEmpty($case->value);
        }
    }
}
