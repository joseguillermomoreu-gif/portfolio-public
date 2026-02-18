<?php

declare(strict_types=1);

namespace App\Tests\Unit\Domain\Portfolio;

use App\Domain\Portfolio\Skill;
use App\Domain\Portfolio\SkillLevel;
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
}
