<?php

declare(strict_types=1);

namespace App\Tests\Domain\ExpertiseArea;

use App\Domain\ExpertiseArea\ExpertiseArea;
use App\Domain\ExpertiseArea\ExpertiseAreas;
use App\Domain\ExpertiseArea\ExpertiseCategory;
use App\Domain\ExpertiseArea\IconType;
use PHPUnit\Framework\TestCase;

/**
 * ExpertiseAreas Collection Tests.
 *
 * Tests typed collection of ExpertiseArea with toArray() compatibility.
 *
 * @covers \App\Domain\ExpertiseArea\ExpertiseAreas
 */
final class ExpertiseAreasTest extends TestCase
{
    /** @phpstan-ignore-next-line - Initialized in setUp() */
    private ExpertiseArea $ddd;

    /** @phpstan-ignore-next-line - Initialized in setUp() */
    private ExpertiseArea $playwright;

    protected function setUp(): void
    {
        $this->ddd = new ExpertiseArea(
            id: 'ddd',
            label: 'DDD',
            fullTitle: 'Domain-Driven Design',
            iconType: IconType::Monogram,
            iconValue: 'D',
            category: ExpertiseCategory::Arquitectura,
            description: 'DDD description'
        );

        $this->playwright = new ExpertiseArea(
            id: 'playwright',
            label: 'Playwright',
            fullTitle: 'Playwright',
            iconType: IconType::SimpleIcons,
            iconValue: 'playwright',
            category: ExpertiseCategory::Testing,
            description: 'Playwright description'
        );
    }

    /**
     * @test
     */
    public function countShouldReturnNumberOfAreas(): void
    {
        $areas = new ExpertiseAreas([$this->ddd, $this->playwright]);

        static::assertSame(2, $areas->count());
    }

    /**
     * @test
     */
    public function countShouldReturnZeroForEmptyCollection(): void
    {
        $areas = new ExpertiseAreas([]);

        static::assertSame(0, $areas->count());
    }

    /**
     * @test
     */
    public function toArrayShouldReturnExpectedKeys(): void
    {
        $areas = new ExpertiseAreas([$this->ddd]);

        $item = $areas->toArray()[0];

        static::assertArrayHasKey('id', $item);
        static::assertArrayHasKey('label', $item);
        static::assertArrayHasKey('full_title', $item);
        static::assertArrayHasKey('icon_type', $item);
        static::assertArrayHasKey('icon_value', $item);
        static::assertArrayHasKey('category', $item);
        static::assertArrayHasKey('description', $item);
    }

    /**
     * @test
     */
    public function toArrayShouldSerializeEnumsToStrings(): void
    {
        $areas = new ExpertiseAreas([$this->playwright]);

        $item = $areas->toArray()[0];

        static::assertIsString($item['icon_type']);
        static::assertIsString($item['category']);
        static::assertSame('simpleicons', $item['icon_type']);
        static::assertSame('testing', $item['category']);
    }

    /**
     * @test
     */
    public function toArrayShouldPreserveAllFieldValues(): void
    {
        $areas = new ExpertiseAreas([$this->ddd]);

        $item = $areas->toArray()[0];

        static::assertSame('ddd', $item['id']);
        static::assertSame('DDD', $item['label']);
        static::assertSame('Domain-Driven Design', $item['full_title']);
        static::assertSame('monogram', $item['icon_type']);
        static::assertSame('D', $item['icon_value']);
        static::assertSame('arquitectura', $item['category']);
        static::assertSame('DDD description', $item['description']);
    }

    /**
     * @test
     */
    public function toArrayShouldReturnAllItems(): void
    {
        $areas = new ExpertiseAreas([$this->ddd, $this->playwright]);

        $array = $areas->toArray();

        static::assertCount(2, $array);
        static::assertSame('ddd', $array[0]['id']);
        static::assertSame('playwright', $array[1]['id']);
    }

    /**
     * @test
     */
    public function toArrayShouldReturnEmptyArrayForEmptyCollection(): void
    {
        $areas = new ExpertiseAreas([]);

        static::assertSame([], $areas->toArray());
    }
}
