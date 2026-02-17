<?php

declare(strict_types=1);

namespace App\Tests\Unit\Application\Service;

use App\Application\Service\Portfolio\PortfolioService;
use App\Domain\Model\Portfolio\Entity\ContactInfo;
use App\Domain\Model\Portfolio\Entity\PersonalInfo;
use App\Domain\Model\Portfolio\Entity\Portfolio;
use App\Domain\Model\Portfolio\Repository\PortfolioRepositoryInterface;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

/**
 * PortfolioService Unit Tests.
 *
 * Tests application service that orchestrates portfolio use cases
 */
final class PortfolioServiceTest extends TestCase
{
    /**
     * @var MockObject&PortfolioRepositoryInterface
     *
     * @phpstan-ignore-next-line - Initialized in setUp()
     */
    private PortfolioRepositoryInterface $repositoryMock;

    /** @phpstan-ignore-next-line - Initialized in setUp() */
    private PortfolioService $service;

    /** @phpstan-ignore-next-line - Initialized in setUp() */
    private Portfolio $portfolioStub;

    protected function setUp(): void
    {
        // Create stub entities
        $personalInfo = new PersonalInfo(
            name: 'Jose Test',
            title: 'Test Developer',
            tagline: 'Testing with TDD',
            bio: 'Test bio content',
            location: 'Test City, Spain',
            photo: '/assets/test.jpg',
            website: 'test.example.com'
        );

        $contactInfo = new ContactInfo(
            email: 'test@example.com',
            phone: '+34 600 000 000',
            github: 'test-user',
            linkedin: 'test-user',
            instagram: '@testuser',
            website: 'https://test.example.com'
        );

        /** @var array<array<string, string>> $socialNetworks */
        $socialNetworks = [
            ['name' => 'GitHub', 'url' => 'https://github.com/test'],
        ];

        /** @var array<array<string, mixed>> $skills */
        $skills = [
            ['name' => 'PHP', 'level' => 'expert'],
        ];

        $this->portfolioStub = new Portfolio(
            personalInfo: $personalInfo,
            contactInfo: $contactInfo,
            socialNetworks: $socialNetworks,
            skills: $skills
        );

        // Create mock repository
        $this->repositoryMock = $this->createMock(PortfolioRepositoryInterface::class);

        // Create service with mocked repository
        $this->service = new PortfolioService($this->repositoryMock);
    }

    public function testGetPortfolioDelegatesToRepository(): void
    {
        // Arrange: configure mock to return stub
        $this->repositoryMock
            ->expects($this->once())
            ->method('find')
            ->willReturn($this->portfolioStub);

        // Act
        $portfolio = $this->service->getPortfolio();

        // Assert
        $this->assertSame($this->portfolioStub, $portfolio);
    }

    public function testGetPortfolioReturnsPortfolioEntity(): void
    {
        // Arrange
        $this->repositoryMock
            ->method('find')
            ->willReturn($this->portfolioStub);

        // Act
        $portfolio = $this->service->getPortfolio();

        // Assert
        $this->assertInstanceOf(Portfolio::class, $portfolio);
    }

    public function testGetPortfolioCallsRepositoryExactlyOnce(): void
    {
        // Arrange
        $this->repositoryMock
            ->expects($this->once())
            ->method('find')
            ->willReturn($this->portfolioStub);

        // Act
        $this->service->getPortfolio();

        // Assert: expectation verified automatically by PHPUnit
    }

    public function testServiceDoesNotCachePortfolio(): void
    {
        // Arrange: Service should delegate every time (no caching)
        $this->repositoryMock
            ->expects($this->exactly(2))
            ->method('find')
            ->willReturn($this->portfolioStub);

        // Act: call twice
        $this->service->getPortfolio();
        $this->service->getPortfolio();

        // Assert: called twice (verified by expects)
    }

    public function testGetPersonalInfoReturnsArrayWithAllFields(): void
    {
        // Arrange
        $this->repositoryMock
            ->method('find')
            ->willReturn($this->portfolioStub);

        // Act
        $personalInfo = $this->service->getPersonalInfo();

        // Assert
        $this->assertIsArray($personalInfo);
        $this->assertArrayHasKey('name', $personalInfo);
        $this->assertArrayHasKey('title', $personalInfo);
        $this->assertArrayHasKey('tagline', $personalInfo);
        $this->assertArrayHasKey('bio', $personalInfo);
        $this->assertArrayHasKey('location', $personalInfo);
        $this->assertArrayHasKey('photo', $personalInfo);
        $this->assertArrayHasKey('website', $personalInfo);
    }

    public function testGetPersonalInfoReturnsCorrectValues(): void
    {
        // Arrange
        $this->repositoryMock
            ->method('find')
            ->willReturn($this->portfolioStub);

        // Act
        $personalInfo = $this->service->getPersonalInfo();

        // Assert
        $this->assertSame('Jose Test', $personalInfo['name']);
        $this->assertSame('Test Developer', $personalInfo['title']);
        $this->assertSame('Testing with TDD', $personalInfo['tagline']);
        $this->assertSame('Test bio content', $personalInfo['bio']);
        $this->assertSame('Test City, Spain', $personalInfo['location']);
        $this->assertSame('/assets/test.jpg', $personalInfo['photo']);
        $this->assertSame('test.example.com', $personalInfo['website']);
    }

    public function testGetContactInfoReturnsArrayWithAllFields(): void
    {
        // Arrange
        $this->repositoryMock
            ->method('find')
            ->willReturn($this->portfolioStub);

        // Act
        $contactInfo = $this->service->getContactInfo();

        // Assert
        $this->assertIsArray($contactInfo);
        $this->assertArrayHasKey('email', $contactInfo);
        $this->assertArrayHasKey('phone', $contactInfo);
        $this->assertArrayHasKey('github', $contactInfo);
        $this->assertArrayHasKey('linkedin', $contactInfo);
        $this->assertArrayHasKey('instagram', $contactInfo);
        $this->assertArrayHasKey('website', $contactInfo);
    }

    public function testGetContactInfoReturnsCorrectValues(): void
    {
        // Arrange
        $this->repositoryMock
            ->method('find')
            ->willReturn($this->portfolioStub);

        // Act
        $contactInfo = $this->service->getContactInfo();

        // Assert
        $this->assertSame('test@example.com', $contactInfo['email']);
        $this->assertSame('+34 600 000 000', $contactInfo['phone']);
        $this->assertSame('test-user', $contactInfo['github']);
        $this->assertSame('test-user', $contactInfo['linkedin']);
        $this->assertSame('@testuser', $contactInfo['instagram']);
        $this->assertSame('https://test.example.com', $contactInfo['website']);
    }
}
