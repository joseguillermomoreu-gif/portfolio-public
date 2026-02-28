<?php

declare(strict_types=1);

namespace App\Tests\Domain\Portfolio;

use App\Domain\Portfolio\Skill;
use App\Domain\Portfolio\SkillLevel;
use App\Domain\Portfolio\SkillType;
use PHPUnit\Framework\TestCase;

/**
 * Skill Value Object Tests.
 */
final class SkillTest extends TestCase
{
    public function testItCanBeCreatedWithAllProperties(): void
    {
        $skill = new Skill('PHP', SkillLevel::Expert, 9);

        $this->assertInstanceOf(Skill::class, $skill);
    }

    public function testPropertiesAreAccessible(): void
    {
        $skill = new Skill('Symfony', SkillLevel::Advanced, 4);

        $this->assertSame('Symfony', $skill->name());
        $this->assertSame(SkillLevel::Advanced, $skill->level());
        $this->assertSame(4, $skill->years());
    }

    public function testFromArrayCreatesSkillFromData(): void
    {
        $data = [
            'name' => 'PHP',
            'level' => 'expert',
            'years' => 9,
        ];

        $skill = Skill::fromArray($data);

        $this->assertSame('PHP', $skill->name());
        $this->assertSame(SkillLevel::Expert, $skill->level());
        $this->assertSame(9, $skill->years());
    }

    public function testFromArrayWithAdvancedLevel(): void
    {
        $skill = Skill::fromArray(['name' => 'Python', 'level' => 'advanced', 'years' => 2]);

        $this->assertSame(SkillLevel::Advanced, $skill->level());
    }

    public function testFromArrayWithIntermediateLevel(): void
    {
        $skill = Skill::fromArray(['name' => 'Go', 'level' => 'intermediate', 'years' => 1]);

        $this->assertSame(SkillLevel::Intermediate, $skill->level());
    }

    public function testFromArrayThrowsExceptionForUnknownLevel(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessageMatches('/level/i');

        Skill::fromArray(['name' => 'PHP', 'level' => 'god-tier', 'years' => 9]);
    }

    public function testFromArrayThrowsExceptionForEmptyName(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessageMatches('/name/i');

        Skill::fromArray(['name' => '', 'level' => 'expert', 'years' => 1]);
    }

    public function testYearsMustBePositive(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessageMatches('/years/i');

        new Skill('PHP', SkillLevel::Expert, -1);
    }

    public function testPropertiesAreReadonly(): void
    {
        $skill = new Skill('PHP', SkillLevel::Expert, 9);

        $reflection = new \ReflectionClass($skill);
        foreach ($reflection->getProperties() as $property) {
            $this->assertTrue($property->isReadOnly(), "{$property->getName()} should be readonly");
        }
    }

    public function testSkillLevelExpertLabel(): void
    {
        $this->assertSame('Expert', SkillLevel::Expert->label());
    }

    public function testSkillLevelAdvancedLabel(): void
    {
        $this->assertSame('Advanced', SkillLevel::Advanced->label());
    }

    public function testSkillLevelIntermediateLabel(): void
    {
        $this->assertSame('Intermediate', SkillLevel::Intermediate->label());
    }

    public function testSkillLevelFromString(): void
    {
        $this->assertSame(SkillLevel::Expert, SkillLevel::fromString('expert'));
        $this->assertSame(SkillLevel::Advanced, SkillLevel::fromString('advanced'));
        $this->assertSame(SkillLevel::Intermediate, SkillLevel::fromString('intermediate'));
    }

    public function testSkillLevelFromStringIsCaseInsensitive(): void
    {
        $this->assertSame(SkillLevel::Expert, SkillLevel::fromString('EXPERT'));
        $this->assertSame(SkillLevel::Expert, SkillLevel::fromString('Expert'));
    }

    public function testSkillLevelFromStringThrowsForUnknown(): void
    {
        $this->expectException(\InvalidArgumentException::class);

        SkillLevel::fromString('legendary');
    }

    public function testDescriptionIsNullByDefault(): void
    {
        $skill = new Skill('PHP', SkillLevel::Expert, 9);

        $this->assertNull($skill->description());
    }

    public function testDescriptionCanBeSet(): void
    {
        $skill = new Skill('PHP', SkillLevel::Expert, 9, null, '<p>My description</p>');

        $this->assertSame('<p>My description</p>', $skill->description());
    }

    public function testFromArrayWithDescription(): void
    {
        $skill = Skill::fromArray([
            'name' => 'PHP',
            'level' => 'expert',
            'years' => 9,
            'description' => '<p>A description</p>',
        ]);

        $this->assertSame('<p>A description</p>', $skill->description());
    }

    public function testFromArrayWithoutDescriptionReturnsNull(): void
    {
        $skill = Skill::fromArray(['name' => 'PHP', 'level' => 'expert', 'years' => 9]);

        $this->assertNull($skill->description());
    }

    public function testFromArrayWithEmptyDescriptionThrowsException(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessageMatches('/description/i');

        new Skill('PHP', SkillLevel::Expert, 9, null, '   ');
    }

    // ─── Skill type y progress ─────────────────────────────────────────────────

    public function testCurrentSkillHasExpectedDefaults(): void
    {
        $skill = new Skill('PHP', SkillLevel::Expert, 9);

        $this->assertSame(SkillType::Current, $skill->type());
        $this->assertNull($skill->progress());
    }

    public function testDesiredSkillPropertiesAreAccessible(): void
    {
        $skill = new Skill('Python', null, null, null, 'Learning AI', SkillType::Desired, 20);

        $this->assertSame(SkillType::Desired, $skill->type());
        $this->assertSame(20, $skill->progress());
        $this->assertNull($skill->level());
        $this->assertNull($skill->years());
        $this->assertSame('Python', $skill->name());
        $this->assertSame('Learning AI', $skill->description());
    }

    // ─── Ciclo 3: validación condicional ─────────────────────────────────────────

    /**
     * @dataProvider invalidSkillCombinationProvider
     */
    public function testInvalidSkillCombinationThrows(
        string $name,
        ?SkillLevel $level,
        ?int $years,
        ?string $description,
        SkillType $type,
        ?int $progress,
        string $expectedMessagePattern,
    ): void {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessageMatches($expectedMessagePattern);

        new Skill($name, $level, $years, null, $description, $type, $progress);
    }

    /**
     * @return array<string, array{string, ?SkillLevel, ?int, ?string, SkillType, ?int, string}>
     */
    public static function invalidSkillCombinationProvider(): array
    {
        return [
            'desired without progress' => ['Python', null, null, 'desc', SkillType::Desired, null, '/progress/i'],
            'desired with level' => ['Python', SkillLevel::Expert, null, 'desc', SkillType::Desired, 50, '/level/i'],
            'desired with years' => ['Python', null, 5, 'desc', SkillType::Desired, 50, '/years/i'],
            'current with progress' => ['PHP', SkillLevel::Expert, 9, null, SkillType::Current, 50, '/progress/i'],
            'current without level' => ['PHP', null, 9, null, SkillType::Current, null, '/level/i'],
            'current without years' => ['PHP', SkillLevel::Expert, null, null, SkillType::Current, null, '/years/i'],
            'progress below zero' => ['Python', null, null, 'desc', SkillType::Desired, -1, '/progress/i'],
            'progress above 100' => ['Python', null, null, 'desc', SkillType::Desired, 101, '/progress/i'],
        ];
    }

    /**
     * @dataProvider validProgressBoundaryProvider
     */
    public function testProgressBoundaryIsValid(int $progress): void
    {
        $skill = new Skill('Test', null, null, null, 'desc', SkillType::Desired, $progress);

        $this->assertSame($progress, $skill->progress());
    }

    /**
     * @return array<string, array{int}>
     */
    public static function validProgressBoundaryProvider(): array
    {
        return [
            'zero' => [0],
            'hundred' => [100],
            'mid-range' => [50],
        ];
    }

    // ─── fromArray con type ─────────────────────────────────────────────────────

    /**
     * @dataProvider fromArrayWithTypeProvider
     *
     * @param array<string, mixed> $data
     */
    public function testFromArrayResolvesTypeCorrectly(array $data, SkillType $expectedType, ?int $expectedProgress): void
    {
        $skill = Skill::fromArray($data);

        $this->assertSame($expectedType, $skill->type());
        $this->assertSame($expectedProgress, $skill->progress());
    }

    /**
     * @return array<string, array{array<string, mixed>, SkillType, ?int}>
     */
    public static function fromArrayWithTypeProvider(): array
    {
        return [
            'desired with progress' => [
                ['name' => 'Python', 'type' => 'desired', 'progress' => 20, 'description' => 'Learning AI'],
                SkillType::Desired,
                20,
            ],
            'without type defaults to current' => [
                ['name' => 'PHP', 'level' => 'expert', 'years' => 9],
                SkillType::Current,
                null,
            ],
            'explicit current type' => [
                ['name' => 'PHP', 'type' => 'current', 'level' => 'expert', 'years' => 9],
                SkillType::Current,
                null,
            ],
        ];
    }

    public function testFromArrayDesiredWithoutProgressThrows(): void
    {
        $this->expectException(\InvalidArgumentException::class);

        Skill::fromArray(['name' => 'Python', 'type' => 'desired', 'description' => 'desc']);
    }
}
