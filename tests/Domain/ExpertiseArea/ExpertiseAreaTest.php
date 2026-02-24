<?php

declare(strict_types=1);

namespace App\Tests\Domain\ExpertiseArea;

use App\Domain\ExpertiseArea\ExpertiseArea;
use App\Domain\ExpertiseArea\ExpertiseCategory;
use App\Domain\ExpertiseArea\IconType;
use PHPUnit\Framework\TestCase;

/**
 * ExpertiseArea Aggregate Root Tests.
 *
 * Tests the ExpertiseArea entity with its invariants and factory method.
 *
 * @covers \App\Domain\ExpertiseArea\ExpertiseArea
 */
final class ExpertiseAreaTest extends TestCase
{
    /** @phpstan-ignore-next-line - Initialized in setUp() */
    private ExpertiseArea $area;

    protected function setUp(): void
    {
        $this->area = new ExpertiseArea(
            id: 'ddd',
            label: 'DDD',
            fullTitle: 'Domain-Driven Design',
            iconType: IconType::Monogram,
            iconValue: 'D',
            category: ExpertiseCategory::Arquitectura,
            description: 'DDD description text'
        );
    }

    /**
     * @test
     */
    public function constructorShouldSetAllFields(): void
    {
        static::assertSame('ddd', $this->area->id());
        static::assertSame('DDD', $this->area->label());
        static::assertSame('Domain-Driven Design', $this->area->fullTitle());
        static::assertSame(IconType::Monogram, $this->area->iconType());
        static::assertSame('D', $this->area->iconValue());
        static::assertSame(ExpertiseCategory::Arquitectura, $this->area->category());
        static::assertSame('DDD description text', $this->area->description());
    }

    /**
     * @test
     */
    public function fromArrayShouldCreateValidArea(): void
    {
        $data = [
            'id' => 'playwright',
            'label' => 'Playwright',
            'full_title' => 'Playwright',
            'icon_type' => 'simpleicons',
            'icon_value' => 'playwright',
            'category' => 'testing',
            'description' => 'Playwright description',
        ];

        $area = ExpertiseArea::fromArray($data);

        static::assertSame('playwright', $area->id());
        static::assertSame('Playwright', $area->label());
        static::assertSame('Playwright', $area->fullTitle());
        static::assertSame(IconType::SimpleIcons, $area->iconType());
        static::assertSame('playwright', $area->iconValue());
        static::assertSame(ExpertiseCategory::Testing, $area->category());
        static::assertSame('Playwright description', $area->description());
    }

    /**
     * @test
     *
     * @dataProvider \App\Tests\Domain\ExpertiseArea\DataProvider\ExpertiseAreaDataProvider::getEmptyStringValues()
     */
    public function constructorShouldThrowWhenIdIsEmpty(string $emptyValue): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('ExpertiseArea id cannot be empty');

        new ExpertiseArea(
            id: $emptyValue,
            label: 'Label',
            fullTitle: 'Full Title',
            iconType: IconType::Monogram,
            iconValue: 'X',
            category: ExpertiseCategory::Backend,
            description: 'Description'
        );
    }

    /**
     * @test
     *
     * @dataProvider \App\Tests\Domain\ExpertiseArea\DataProvider\ExpertiseAreaDataProvider::getEmptyStringValues()
     */
    public function constructorShouldThrowWhenLabelIsEmpty(string $emptyValue): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('ExpertiseArea label cannot be empty');

        new ExpertiseArea(
            id: 'php',
            label: $emptyValue,
            fullTitle: 'Full Title',
            iconType: IconType::SimpleIcons,
            iconValue: 'php',
            category: ExpertiseCategory::Backend,
            description: 'Description'
        );
    }

    /**
     * @test
     *
     * @dataProvider \App\Tests\Domain\ExpertiseArea\DataProvider\ExpertiseAreaDataProvider::getEmptyStringValues()
     */
    public function constructorShouldThrowWhenFullTitleIsEmpty(string $emptyValue): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('ExpertiseArea fullTitle cannot be empty');

        new ExpertiseArea(
            id: 'php',
            label: 'PHP',
            fullTitle: $emptyValue,
            iconType: IconType::SimpleIcons,
            iconValue: 'php',
            category: ExpertiseCategory::Backend,
            description: 'Description'
        );
    }

    /**
     * @test
     *
     * @dataProvider \App\Tests\Domain\ExpertiseArea\DataProvider\ExpertiseAreaDataProvider::getEmptyStringValues()
     */
    public function constructorShouldThrowWhenIconValueIsEmpty(string $emptyValue): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('ExpertiseArea iconValue cannot be empty');

        new ExpertiseArea(
            id: 'php',
            label: 'PHP',
            fullTitle: 'PHP 8.1+',
            iconType: IconType::SimpleIcons,
            iconValue: $emptyValue,
            category: ExpertiseCategory::Backend,
            description: 'Description'
        );
    }

    /**
     * @test
     *
     * @dataProvider \App\Tests\Domain\ExpertiseArea\DataProvider\ExpertiseAreaDataProvider::getEmptyStringValues()
     */
    public function constructorShouldThrowWhenDescriptionIsEmpty(string $emptyValue): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('ExpertiseArea description cannot be empty');

        new ExpertiseArea(
            id: 'php',
            label: 'PHP',
            fullTitle: 'PHP 8.1+',
            iconType: IconType::SimpleIcons,
            iconValue: 'php',
            category: ExpertiseCategory::Backend,
            description: $emptyValue
        );
    }

    /**
     * @test
     */
    public function fromArrayShouldThrowWhenIdIsMissing(): void
    {
        $this->expectException(\InvalidArgumentException::class);

        ExpertiseArea::fromArray([
            'label' => 'PHP',
            'full_title' => 'PHP 8.1+',
            'icon_type' => 'simpleicons',
            'icon_value' => 'php',
            'category' => 'backend',
            'description' => 'Description',
        ]);
    }

    /**
     * @test
     */
    public function fromArrayShouldThrowWhenCategoryIsInvalid(): void
    {
        $this->expectException(\InvalidArgumentException::class);

        ExpertiseArea::fromArray([
            'id' => 'php',
            'label' => 'PHP',
            'full_title' => 'PHP 8.1+',
            'icon_type' => 'simpleicons',
            'icon_value' => 'php',
            'category' => 'invalid-category',
            'description' => 'Description',
        ]);
    }

    /**
     * @test
     */
    public function fromArrayShouldThrowWhenIconTypeIsInvalid(): void
    {
        $this->expectException(\InvalidArgumentException::class);

        ExpertiseArea::fromArray([
            'id' => 'php',
            'label' => 'PHP',
            'full_title' => 'PHP 8.1+',
            'icon_type' => 'svg',
            'icon_value' => 'php',
            'category' => 'backend',
            'description' => 'Description',
        ]);
    }

    /**
     * @test
     */
    public function propertiesShouldBeReadOnly(): void
    {
        $reflection = new \ReflectionClass($this->area);
        foreach ($reflection->getProperties() as $property) {
            static::assertTrue($property->isReadOnly(), "Property {$property->getName()} should be readonly");
        }
    }
}
