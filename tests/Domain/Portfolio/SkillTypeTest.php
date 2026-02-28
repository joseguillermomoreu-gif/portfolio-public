<?php

declare(strict_types=1);

namespace App\Tests\Domain\Portfolio;

use App\Domain\Portfolio\SkillType;
use PHPUnit\Framework\TestCase;

/**
 * SkillType Enum Tests.
 */
final class SkillTypeTest extends TestCase
{
    /**
     * @dataProvider enumValueProvider
     */
    public function testEnumValueShouldMatchExpectedString(SkillType $type, string $expectedValue): void
    {
        $this->assertSame($expectedValue, $type->value);
    }

    /**
     * @return array<string, array{SkillType, string}>
     */
    public static function enumValueProvider(): array
    {
        return [
            'current' => [SkillType::Current, 'current'],
            'desired' => [SkillType::Desired, 'desired'],
        ];
    }

    /**
     * @dataProvider fromStringProvider
     */
    public function testFromStringShouldReturnExpectedType(string $input, SkillType $expected): void
    {
        $this->assertSame($expected, SkillType::fromString($input));
    }

    /**
     * @return array<string, array{string, SkillType}>
     */
    public static function fromStringProvider(): array
    {
        return [
            'current' => ['current', SkillType::Current],
            'desired' => ['desired', SkillType::Desired],
        ];
    }

    public function testFromStringWithUnknownValueShouldThrowInvalidArgumentException(): void
    {
        $this->expectException(\InvalidArgumentException::class);

        SkillType::fromString('unknown');
    }

    public function testFromStringWithEmptyValueShouldThrowInvalidArgumentException(): void
    {
        $this->expectException(\InvalidArgumentException::class);

        SkillType::fromString('');
    }

    public function testFromStringIsCaseInsensitive(): void
    {
        $this->assertSame(SkillType::Current, SkillType::fromString('CURRENT'));
        $this->assertSame(SkillType::Desired, SkillType::fromString('Desired'));
    }

    public function testAllCasesShouldHaveStringValues(): void
    {
        foreach (SkillType::cases() as $case) {
            $this->assertIsString($case->value);
            $this->assertNotEmpty($case->value);
        }
    }

    /**
     * @dataProvider labelProvider
     */
    public function testLabelShouldReturnExpectedString(SkillType $type, string $expectedLabel): void
    {
        $this->assertSame($expectedLabel, $type->label());
    }

    /**
     * @return array<string, array{SkillType, string}>
     */
    public static function labelProvider(): array
    {
        return [
            'current' => [SkillType::Current, 'Current'],
            'desired' => [SkillType::Desired, 'Desired'],
        ];
    }
}
