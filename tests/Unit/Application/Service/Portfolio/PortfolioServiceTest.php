<?php

declare(strict_types=1);

namespace App\Tests\Unit\Application\Service\Portfolio;

use App\Application\Service\Portfolio\PortfolioService;
use App\Domain\Model\Portfolio\Entity\ContactInfo;
use App\Domain\Model\Portfolio\Entity\PersonalInfo;
use App\Domain\Model\Portfolio\Entity\Portfolio;
use App\Domain\Model\Portfolio\Repository\PortfolioRepositoryInterface;
use PHPUnit\Framework\TestCase;

/**
 * PortfolioService Unit Tests
 *
 * Tests application service with mocked repository (no real I/O)
 */
final class PortfolioServiceTest extends TestCase
{
    public function test_it_should_delegate_to_repository_to_get_portfolio(): void
    {
        // Arrange
        $expectedPortfolio = $this->createMockPortfolio();

        $repository = $this->createMock(PortfolioRepositoryInterface::class);
        $repository->expects($this->once())
            ->method('find')
            ->willReturn($expectedPortfolio);

        $service = new PortfolioService($repository);

        // Act
        $result = $service->getPortfolio();

        // Assert
        $this->assertSame($expectedPortfolio, $result);
    }

    public function test_it_should_return_personal_info_as_array(): void
    {
        // Arrange
        $portfolio = $this->createMockPortfolio();

        $repository = $this->createMock(PortfolioRepositoryInterface::class);
        $repository->method('find')->willReturn($portfolio);

        $service = new PortfolioService($repository);

        // Act
        $personalInfo = $service->getPersonalInfo();

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

    public function test_it_should_transform_personal_info_correctly(): void
    {
        // Arrange
        $portfolio = $this->createMockPortfolio();

        $repository = $this->createMock(PortfolioRepositoryInterface::class);
        $repository->method('find')->willReturn($portfolio);

        $service = new PortfolioService($repository);

        // Act
        $personalInfo = $service->getPersonalInfo();

        // Assert
        $this->assertSame('Test User', $personalInfo['name']);
        $this->assertSame('Test Developer', $personalInfo['title']);
        $this->assertSame('Testing Everything', $personalInfo['tagline']);
        $this->assertSame('I love TDD', $personalInfo['bio']);
        $this->assertSame('Test City', $personalInfo['location']);
        $this->assertSame('/test.jpg', $personalInfo['photo']);
        $this->assertSame('https://test.com', $personalInfo['website']);
    }

    public function test_it_should_handle_null_photo_in_personal_info(): void
    {
        // Arrange
        $personalInfo = new PersonalInfo(
            'User',
            'Developer',
            'Tagline',
            'Bio',
            'Location',
            null, // photo is null
            'https://website.com'
        );

        $portfolio = new Portfolio(
            $personalInfo,
            new ContactInfo('email@test.com', '123'),
            [],
            []
        );

        $repository = $this->createMock(PortfolioRepositoryInterface::class);
        $repository->method('find')->willReturn($portfolio);

        $service = new PortfolioService($repository);

        // Act
        $result = $service->getPersonalInfo();

        // Assert
        $this->assertNull($result['photo']);
    }

    public function test_it_should_handle_null_website_in_personal_info(): void
    {
        // Arrange
        $personalInfo = new PersonalInfo(
            'User',
            'Developer',
            'Tagline',
            'Bio',
            'Location',
            '/photo.jpg',
            null // website is null
        );

        $portfolio = new Portfolio(
            $personalInfo,
            new ContactInfo('email@test.com', '123'),
            [],
            []
        );

        $repository = $this->createMock(PortfolioRepositoryInterface::class);
        $repository->method('find')->willReturn($portfolio);

        $service = new PortfolioService($repository);

        // Act
        $result = $service->getPersonalInfo();

        // Assert
        $this->assertNull($result['website']);
    }

    public function test_it_should_return_contact_info_as_array(): void
    {
        // Arrange
        $portfolio = $this->createMockPortfolio();

        $repository = $this->createMock(PortfolioRepositoryInterface::class);
        $repository->method('find')->willReturn($portfolio);

        $service = new PortfolioService($repository);

        // Act
        $contactInfo = $service->getContactInfo();

        // Assert
        $this->assertIsArray($contactInfo);
        $this->assertArrayHasKey('email', $contactInfo);
        $this->assertArrayHasKey('phone', $contactInfo);
    }

    public function test_it_should_transform_contact_info_correctly(): void
    {
        // Arrange
        $portfolio = $this->createMockPortfolio();

        $repository = $this->createMock(PortfolioRepositoryInterface::class);
        $repository->method('find')->willReturn($portfolio);

        $service = new PortfolioService($repository);

        // Act
        $contactInfo = $service->getContactInfo();

        // Assert
        $this->assertSame('test@example.com', $contactInfo['email']);
        $this->assertSame('+1 555 TEST', $contactInfo['phone']);
    }

    public function test_it_should_call_repository_only_once_per_method(): void
    {
        // Arrange
        $portfolio = $this->createMockPortfolio();

        $repository = $this->createMock(PortfolioRepositoryInterface::class);
        $repository->expects($this->exactly(2))
            ->method('find')
            ->willReturn($portfolio);

        $service = new PortfolioService($repository);

        // Act - Call both methods
        $service->getPersonalInfo();
        $service->getContactInfo();

        // Assert - Expects assertion verified by PHPUnit
        // Repository should be called twice (once per method)
    }

    public function test_service_should_not_cache_portfolio_data(): void
    {
        // Arrange
        $portfolio1 = $this->createMockPortfolio();
        $portfolio2 = $this->createMockPortfolio();

        $repository = $this->createMock(PortfolioRepositoryInterface::class);
        $repository->expects($this->exactly(2))
            ->method('find')
            ->willReturnOnConsecutiveCalls($portfolio1, $portfolio2);

        $service = new PortfolioService($repository);

        // Act
        $result1 = $service->getPortfolio();
        $result2 = $service->getPortfolio();

        // Assert - Different instances returned (no caching)
        $this->assertSame($portfolio1, $result1);
        $this->assertSame($portfolio2, $result2);
        $this->assertNotSame($result1, $result2);
    }

    /**
     * Helper method to create a mock Portfolio for testing
     */
    private function createMockPortfolio(): Portfolio
    {
        $personalInfo = new PersonalInfo(
            'Test User',
            'Test Developer',
            'Testing Everything',
            'I love TDD',
            'Test City',
            '/test.jpg',
            'https://test.com'
        );

        $contactInfo = new ContactInfo(
            'test@example.com',
            '+1 555 TEST'
        );

        return new Portfolio(
            $personalInfo,
            $contactInfo,
            ['github' => 'https://github.com/test'],
            [['name' => 'PHP', 'level' => 'expert']]
        );
    }
}
