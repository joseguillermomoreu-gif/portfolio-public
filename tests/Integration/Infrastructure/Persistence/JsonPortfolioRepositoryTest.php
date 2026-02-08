<?php

declare(strict_types=1);

namespace App\Tests\Integration\Infrastructure\Persistence;

use App\Domain\Model\Portfolio\Entity\Portfolio;
use App\Domain\Model\Portfolio\Repository\PortfolioRepositoryInterface;
use App\Infrastructure\Persistence\Json\JsonPortfolioRepository;
use PHPUnit\Framework\TestCase;

/**
 * JsonPortfolioRepository Integration Tests
 *
 * Tests the adapter that loads portfolio from JSON file
 */
final class JsonPortfolioRepositoryTest extends TestCase
{
    private const FIXTURE_PATH = __DIR__ . '/../../../Fixtures/portfolio.json';

    public function test_implements_interface(): void
    {
        // Arrange
        $repository = new JsonPortfolioRepository(self::FIXTURE_PATH);

        // Assert
        $this->assertInstanceOf(PortfolioRepositoryInterface::class, $repository);
    }

    public function test_can_load_portfolio_from_json(): void
    {
        // Arrange
        $repository = new JsonPortfolioRepository(self::FIXTURE_PATH);

        // Act
        $portfolio = $repository->find();

        // Assert
        $this->assertInstanceOf(Portfolio::class, $portfolio);
    }

    public function test_loads_personal_info_correctly(): void
    {
        // Arrange
        $repository = new JsonPortfolioRepository(self::FIXTURE_PATH);

        // Act
        $portfolio = $repository->find();
        $personalInfo = $portfolio->personalInfo();

        // Assert
        $this->assertSame('Jose Test Portfolio', $personalInfo->name());
        $this->assertSame('Test Backend Developer', $personalInfo->title());
        $this->assertSame('Testing with TDD', $personalInfo->tagline());
        $this->assertStringContainsString('test portfolio', $personalInfo->bio());
        $this->assertSame('Test City, Spain', $personalInfo->location());
        $this->assertSame('/assets/images/test.jpg', $personalInfo->photo());
        $this->assertSame('test.example.com', $personalInfo->website());
    }

    public function test_loads_contact_info_correctly(): void
    {
        // Arrange
        $repository = new JsonPortfolioRepository(self::FIXTURE_PATH);

        // Act
        $portfolio = $repository->find();
        $contactInfo = $portfolio->contactInfo();

        // Assert
        $this->assertSame('test@example.com', $contactInfo->email());
        $this->assertSame('+34 600 000 000', $contactInfo->phone());
        $this->assertSame('test-user', $contactInfo->github());
        $this->assertSame('test-user', $contactInfo->linkedin());
        $this->assertSame('@testuser', $contactInfo->instagram());
        $this->assertSame('https://test.example.com', $contactInfo->website());
    }

    public function test_loads_social_networks(): void
    {
        // Arrange
        $repository = new JsonPortfolioRepository(self::FIXTURE_PATH);

        // Act
        $portfolio = $repository->find();
        $socialNetworks = $portfolio->socialNetworks();

        // Assert
        $this->assertIsArray($socialNetworks);
        $this->assertCount(1, $socialNetworks);
        $this->assertIsArray($socialNetworks[0]);
        $this->assertArrayHasKey('name', $socialNetworks[0]);
        $this->assertSame('GitHub', $socialNetworks[0]['name']);
    }

    public function test_loads_skills(): void
    {
        // Arrange
        $repository = new JsonPortfolioRepository(self::FIXTURE_PATH);

        // Act
        $portfolio = $repository->find();
        $skills = $portfolio->skills();

        // Assert
        $this->assertIsArray($skills);
        $this->assertCount(2, $skills);
        $this->assertIsArray($skills[0]);
        $this->assertIsArray($skills[1]);
        $this->assertArrayHasKey('name', $skills[0]);
        $this->assertArrayHasKey('name', $skills[1]);
        $this->assertSame('PHP', $skills[0]['name']);
        $this->assertSame('Testing', $skills[1]['name']);
    }

    public function test_throws_exception_if_file_does_not_exist(): void
    {
        // Arrange
        $this->expectException(\RuntimeException::class);
        $this->expectExceptionMessage('Failed to read portfolio data');

        // Act
        $repository = new JsonPortfolioRepository('/path/that/does/not/exist.json');
        $repository->find();
    }

    public function test_throws_exception_if_json_is_invalid(): void
    {
        // Arrange
        $invalidJsonPath = sys_get_temp_dir() . '/invalid-portfolio-' . uniqid() . '.json';
        file_put_contents($invalidJsonPath, '{invalid json}');

        $this->expectException(\RuntimeException::class);
        $this->expectExceptionMessage('Invalid JSON format');

        // Act
        try {
            $repository = new JsonPortfolioRepository($invalidJsonPath);
            $repository->find();
        } finally {
            // Cleanup
            if (file_exists($invalidJsonPath)) {
                unlink($invalidJsonPath);
            }
        }
    }

    public function test_throws_exception_if_required_fields_missing(): void
    {
        // Arrange
        $incompleteJsonPath = sys_get_temp_dir() . '/incomplete-portfolio-' . uniqid() . '.json';
        file_put_contents($incompleteJsonPath, '{"personal_info": {}}');

        $this->expectException(\InvalidArgumentException::class);

        // Act
        try {
            $repository = new JsonPortfolioRepository($incompleteJsonPath);
            $repository->find();
        } finally {
            // Cleanup
            if (file_exists($incompleteJsonPath)) {
                unlink($incompleteJsonPath);
            }
        }
    }

    public function test_repository_can_be_instantiated_with_custom_path(): void
    {
        // Arrange & Act
        $repository = new JsonPortfolioRepository('/custom/path/portfolio.json');

        // Assert
        $this->assertInstanceOf(JsonPortfolioRepository::class, $repository);
    }

    public function test_repository_uses_default_path_if_none_provided(): void
    {
        // Arrange & Act
        $repository = new JsonPortfolioRepository();

        // Assert
        $this->assertInstanceOf(JsonPortfolioRepository::class, $repository);
    }
}
