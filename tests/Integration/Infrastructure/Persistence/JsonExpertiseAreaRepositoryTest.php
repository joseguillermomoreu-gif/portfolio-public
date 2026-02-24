<?php

declare(strict_types=1);

namespace App\Tests\Integration\Infrastructure\Persistence;

use App\Domain\ExpertiseArea\ExpertiseAreaRepository;
use App\Domain\ExpertiseArea\ExpertiseAreas;
use App\Infrastructure\Persistence\Json\JsonExpertiseAreaRepository;
use PHPUnit\Framework\TestCase;

/**
 * JsonExpertiseAreaRepository Integration Tests.
 *
 * Tests the adapter that loads expertise areas from JSON file.
 *
 * @covers \App\Infrastructure\Persistence\Json\JsonExpertiseAreaRepository
 */
final class JsonExpertiseAreaRepositoryTest extends TestCase
{
    /** @phpstan-ignore-next-line - Initialized in setUp() */
    private JsonExpertiseAreaRepository $repository;

    private string $tmpPath = '';

    protected function setUp(): void
    {
        $this->tmpPath = sys_get_temp_dir() . '/expertise-areas-test-' . uniqid() . '.json';

        $data = [
            [
                'id' => 'ddd',
                'label' => 'DDD',
                'full_title' => 'Domain-Driven Design',
                'icon_type' => 'monogram',
                'icon_value' => 'D',
                'category' => 'arquitectura',
                'description' => 'DDD fixture description for testing.',
            ],
            [
                'id' => 'playwright',
                'label' => 'Playwright',
                'full_title' => 'Playwright',
                'icon_type' => 'simpleicons',
                'icon_value' => 'playwright',
                'category' => 'testing',
                'description' => 'Playwright fixture description for testing.',
            ],
            [
                'id' => 'docker',
                'label' => 'Docker',
                'full_title' => 'Docker',
                'icon_type' => 'simpleicons',
                'icon_value' => 'docker',
                'category' => 'tooling',
                'description' => 'Docker fixture description for testing.',
            ],
        ];

        file_put_contents($this->tmpPath, json_encode($data));

        $this->repository = new JsonExpertiseAreaRepository($this->tmpPath);
    }

    protected function tearDown(): void
    {
        if ('' !== $this->tmpPath && file_exists($this->tmpPath)) {
            unlink($this->tmpPath);
        }
    }

    /**
     * @test
     */
    public function repositoryShouldImplementExpertiseAreaRepositoryInterface(): void
    {
        static::assertInstanceOf(ExpertiseAreaRepository::class, $this->repository);
    }

    /**
     * @test
     */
    public function findAllShouldReturnExpertiseAreasCollection(): void
    {
        $areas = $this->repository->findAll();

        static::assertInstanceOf(ExpertiseAreas::class, $areas);
    }

    /**
     * @test
     */
    public function findAllShouldLoadAllItemsFromJson(): void
    {
        $areas = $this->repository->findAll();

        static::assertSame(3, $areas->count());
    }

    /**
     * @test
     */
    public function findAllShouldReturnExpectedStructure(): void
    {
        $items = $this->repository->findAll()->toArray();

        static::assertCount(3, $items);
        $first = $items[0];
        static::assertSame('ddd', $first['id']);
        static::assertSame('DDD', $first['label']);
        static::assertSame('Domain-Driven Design', $first['full_title']);
        static::assertSame('monogram', $first['icon_type']);
        static::assertSame('D', $first['icon_value']);
        static::assertSame('arquitectura', $first['category']);
        static::assertSame('DDD fixture description for testing.', $first['description']);
    }

    /**
     * @test
     */
    public function findAllShouldLoadAllCategories(): void
    {
        $items = $this->repository->findAll()->toArray();

        $categories = array_column($items, 'category');
        static::assertContains('arquitectura', $categories);
        static::assertContains('testing', $categories);
        static::assertContains('tooling', $categories);
    }

    /**
     * @test
     */
    public function findAllShouldThrowWhenFileDoesNotExist(): void
    {
        $this->expectException(\RuntimeException::class);
        $this->expectExceptionMessage('Failed to read expertise areas data');

        $repository = new JsonExpertiseAreaRepository('/path/does/not/exist.json');
        $repository->findAll();
    }

    /**
     * @test
     */
    public function findAllShouldThrowWhenJsonIsInvalid(): void
    {
        $invalidPath = sys_get_temp_dir() . '/invalid-expertise-' . uniqid() . '.json';
        file_put_contents($invalidPath, '{invalid json}');

        $this->expectException(\RuntimeException::class);
        $this->expectExceptionMessage('Invalid JSON format');

        try {
            $repository = new JsonExpertiseAreaRepository($invalidPath);
            $repository->findAll();
        } finally {
            unlink($invalidPath);
        }
    }

    /**
     * @test
     */
    public function findAllShouldThrowWhenJsonIsNotArray(): void
    {
        $invalidPath = sys_get_temp_dir() . '/not-array-expertise-' . uniqid() . '.json';
        file_put_contents($invalidPath, '{"key": "value"}');

        $this->expectException(\RuntimeException::class);
        $this->expectExceptionMessage('Invalid JSON format');

        try {
            $repository = new JsonExpertiseAreaRepository($invalidPath);
            $repository->findAll();
        } finally {
            unlink($invalidPath);
        }
    }

    /**
     * @test
     */
    public function repositoryShouldUseDefaultPathIfNoneProvided(): void
    {
        $repository = new JsonExpertiseAreaRepository();

        static::assertInstanceOf(JsonExpertiseAreaRepository::class, $repository);
    }
}
