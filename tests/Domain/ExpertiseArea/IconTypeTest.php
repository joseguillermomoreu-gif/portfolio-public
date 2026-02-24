<?php

declare(strict_types=1);

namespace App\Tests\Domain\ExpertiseArea;

use App\Domain\ExpertiseArea\IconType;
use PHPUnit\Framework\TestCase;

/**
 * IconType Value Object Tests.
 *
 * Tests backed enum for expertise area icon types.
 *
 * @covers \App\Domain\ExpertiseArea\IconType
 */
final class IconTypeTest extends TestCase
{
    /**
     * @test
     *
     * @dataProvider \App\Tests\Domain\ExpertiseArea\DataProvider\IconTypeDataProvider::getEnumValueData()
     */
    public function enumValueShouldMatchExpectedString(IconType $iconType, string $expected): void
    {
        static::assertSame($expected, $iconType->value);
    }

    /**
     * @test
     *
     * @dataProvider \App\Tests\Domain\ExpertiseArea\DataProvider\IconTypeDataProvider::getValidFromStringData()
     */
    public function fromStringShouldReturnExpectedIconType(string $value, IconType $expected): void
    {
        static::assertSame($expected, IconType::fromString($value));
    }

    /**
     * @test
     */
    public function fromStringWithUnknownValueShouldThrowInvalidArgumentException(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage("Unknown icon type: 'svg'");

        IconType::fromString('svg');
    }

    /**
     * @test
     */
    public function fromStringWithEmptyValueShouldThrowInvalidArgumentException(): void
    {
        $this->expectException(\InvalidArgumentException::class);

        IconType::fromString('');
    }

    /**
     * @test
     */
    public function allCasesShouldHaveStringValues(): void
    {
        $cases = IconType::cases();

        static::assertCount(3, $cases);
        foreach ($cases as $case) {
            static::assertIsString($case->value);
            static::assertNotEmpty($case->value);
        }
    }
}
