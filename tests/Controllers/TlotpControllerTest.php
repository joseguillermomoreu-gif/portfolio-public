<?php

declare(strict_types=1);

namespace App\Tests\Controllers;

use App\Application\Service\ExpertiseArea\ExpertiseAreaService;
use App\Application\Service\Portfolio\PortfolioService;
use App\Controllers\PortfolioController;
use App\Domain\ExpertiseArea\ExpertiseAreaRepository;
use App\Domain\Portfolio\PortfolioRepository;
use PHPUnit\Framework\TestCase;

/**
 * @covers \App\Controllers\PortfolioController
 */
final class TlotpControllerTest extends TestCase
{
    /**
     * @test
     */
    public function tlotpMethodExistsOnPortfolioController(): void
    {
        $reflection = new \ReflectionClass(PortfolioController::class);

        static::assertTrue(
            $reflection->hasMethod('tlotp'),
            'PortfolioController debe tener un método tlotp()'
        );
    }

    /**
     * @test
     */
    public function tlotpMethodReturnsResponseType(): void
    {
        $reflection = new \ReflectionMethod(PortfolioController::class, 'tlotp');
        $returnType = $reflection->getReturnType();

        static::assertNotNull($returnType);
        static::assertStringContainsString('Response', (string) $returnType);
    }

    /**
     * @test
     */
    public function portfolioControllerCanBeInstantiatedWithServices(): void
    {
        $portfolioService = new PortfolioService($this->createMock(PortfolioRepository::class));
        $expertiseAreaService = new ExpertiseAreaService($this->createMock(ExpertiseAreaRepository::class));

        $controller = new PortfolioController($portfolioService, $expertiseAreaService, '/tmp');

        static::assertInstanceOf(PortfolioController::class, $controller);
    }
}
