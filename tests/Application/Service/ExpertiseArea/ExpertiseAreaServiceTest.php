<?php

declare(strict_types=1);

namespace App\Tests\Application\Service\ExpertiseArea;

use App\Application\Service\ExpertiseArea\ExpertiseAreaService;
use App\Domain\ExpertiseArea\ExpertiseAreaRepository;
use App\Domain\ExpertiseArea\ExpertiseAreas;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

/**
 * @covers \App\Application\Service\ExpertiseArea\ExpertiseAreaService
 */
final class ExpertiseAreaServiceTest extends TestCase
{
    /**
     * @var MockObject&ExpertiseAreaRepository
     *
     * @phpstan-ignore-next-line - Initialized in setUp()
     */
    private ExpertiseAreaRepository $repositoryMock;

    /** @phpstan-ignore-next-line - Initialized in setUp() */
    private ExpertiseAreaService $service;

    protected function setUp(): void
    {
        $this->repositoryMock = $this->createMock(ExpertiseAreaRepository::class);
        $this->service = new ExpertiseAreaService($this->repositoryMock);
    }

    /**
     * @test
     */
    public function getAllAsArrayDelegatesToRepository(): void
    {
        $collection = new ExpertiseAreas([]);

        $this->repositoryMock
            ->expects($this->once())
            ->method('findAll')
            ->willReturn($collection);

        $result = $this->service->getAllAsArray();

        static::assertIsArray($result);
    }

    /**
     * @test
     */
    public function getAllAsArrayReturnsEmptyArrayForEmptyCollection(): void
    {
        $this->repositoryMock
            ->method('findAll')
            ->willReturn(new ExpertiseAreas([]));

        $result = $this->service->getAllAsArray();

        static::assertSame([], $result);
    }
}
