<?php

declare(strict_types=1);

namespace App\Tests\Integration\Infrastructure\Persistence\Json;

use App\Domain\Model\Portfolio\Entity\Portfolio;
use App\Infrastructure\Persistence\Json\JsonPortfolioRepository;
use PHPUnit\Framework\TestCase;

/**
 * JsonPortfolioRepository Integration Tests
 *
 * Tests repository with real JSON file operations
 */
final class JsonPortfolioRepositoryTest extends TestCase
{
    private string $fixturesPath;

    protected function setUp(): void
    {
        $this->fixturesPath = __DIR__ . '/../../../../fixtures';
    }

    public function test_it_should_load_valid_portfolio_from_json_file(): void
    {
        // Arrange
        $repository = new JsonPortfolioRepository(
            $this->fixturesPath . '/portfolio-valid.json'
        );

        // Act
        $portfolio = $repository->find();

        // Assert
        $this->assertInstanceOf(Portfolio::class, $portfolio);
    }

    public function test_it_should_map_personal_info_correctly(): void
    {
        // Arrange
        $repository = new JsonPortfolioRepository(
            $this->fixturesPath . '/portfolio-valid.json'
        );

        // Act
        $portfolio = $repository->find();

        // Assert
        $this->assertSame('Test User', $portfolio->personalInfo()->name());
        $this->assertSame('Test Developer', $portfolio->personalInfo()->title());
        $this->assertSame('Testing is my passion', $portfolio->personalInfo()->tagline());
        $this->assertSame('I love writing tests', $portfolio->personalInfo()->bio());
        $this->assertSame('Test City, Test Country', $portfolio->personalInfo()->location());
        $this->assertSame('/test/photo.jpg', $portfolio->personalInfo()->photo());
        $this->assertSame('https://test.example.com', $portfolio->personalInfo()->website());
    }

    public function test_it_should_map_contact_info_correctly(): void
    {
        // Arrange
        $repository = new JsonPortfolioRepository(
            $this->fixturesPath . '/portfolio-valid.json'
        );

        // Act
        $portfolio = $repository->find();

        // Assert
        $this->assertSame('test@example.com', $portfolio->contactInfo()->email());
        $this->assertSame('+1 555 TEST', $portfolio->contactInfo()->phone());
    }

    public function test_it_should_load_social_networks(): void
    {
        // Arrange
        $repository = new JsonPortfolioRepository(
            $this->fixturesPath . '/portfolio-valid.json'
        );

        // Act
        $portfolio = $repository->find();
        $socialNetworks = $portfolio->socialNetworks();

        // Assert
        $this->assertIsArray($socialNetworks);
        $this->assertCount(1, $socialNetworks);
        $this->assertSame('GitHub', $socialNetworks[0]['name']);
        $this->assertSame('https://github.com/testuser', $socialNetworks[0]['url']);
    }

    public function test_it_should_load_skills(): void
    {
        // Arrange
        $repository = new JsonPortfolioRepository(
            $this->fixturesPath . '/portfolio-valid.json'
        );

        // Act
        $portfolio = $repository->find();
        $skills = $portfolio->skills();

        // Assert
        $this->assertIsArray($skills);
        $this->assertCount(2, $skills);
        $this->assertSame('PHP', $skills[0]['name']);
        $this->assertSame('expert', $skills[0]['level']);
        $this->assertSame('Testing', $skills[1]['name']);
    }

    public function test_it_should_throw_exception_when_file_does_not_exist(): void
    {
        // Arrange
        $repository = new JsonPortfolioRepository(
            $this->fixturesPath . '/non-existent-file.json'
        );

        // Assert
        $this->expectException(\RuntimeException::class);
        $this->expectExceptionMessage('Portfolio data file not found');

        // Act
        $repository->find();
    }

    public function test_it_should_throw_exception_when_json_is_invalid(): void
    {
        // Arrange
        $repository = new JsonPortfolioRepository(
            $this->fixturesPath . '/portfolio-invalid.json'
        );

        // Assert
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('Missing or invalid personal_info');

        // Act
        $repository->find();
    }

    public function test_it_should_work_with_production_portfolio_json(): void
    {
        // Arrange
        $productionPath = __DIR__ . '/../../../../../data/portfolio.json';

        // Skip if production file doesn't exist
        if (!file_exists($productionPath)) {
            $this->markTestSkipped('Production portfolio.json not found');
        }

        $repository = new JsonPortfolioRepository($productionPath);

        // Act
        $portfolio = $repository->find();

        // Assert
        $this->assertInstanceOf(Portfolio::class, $portfolio);
        $this->assertSame('José Moreu Peso', $portfolio->personalInfo()->name());
        $this->assertNotEmpty($portfolio->skills());
        $this->assertNotEmpty($portfolio->socialNetworks());
    }

    public function test_find_should_return_same_data_on_multiple_calls(): void
    {
        // Arrange
        $repository = new JsonPortfolioRepository(
            $this->fixturesPath . '/portfolio-valid.json'
        );

        // Act
        $portfolio1 = $repository->find();
        $portfolio2 = $repository->find();

        // Assert - Each call should return fresh instance with same data
        $this->assertNotSame($portfolio1, $portfolio2, 'Should create new instances');
        $this->assertSame(
            $portfolio1->personalInfo()->name(),
            $portfolio2->personalInfo()->name(),
            'Data should be identical'
        );
    }

    public function test_repository_can_use_custom_data_path(): void
    {
        // Arrange
        $customPath = $this->fixturesPath . '/portfolio-valid.json';
        $repository = new JsonPortfolioRepository($customPath);

        // Act
        $portfolio = $repository->find();

        // Assert
        $this->assertInstanceOf(Portfolio::class, $portfolio);
        $this->assertSame('Test User', $portfolio->personalInfo()->name());
    }
}
