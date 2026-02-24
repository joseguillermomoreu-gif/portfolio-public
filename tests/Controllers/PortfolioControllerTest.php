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
final class PortfolioControllerTest extends TestCase
{
    /**
     * @test
     */
    public function constructorAcceptsApplicationServices(): void
    {
        $portfolioService = new PortfolioService($this->createMock(PortfolioRepository::class));
        $expertiseAreaService = new ExpertiseAreaService($this->createMock(ExpertiseAreaRepository::class));

        $controller = new PortfolioController($portfolioService, $expertiseAreaService);

        static::assertInstanceOf(PortfolioController::class, $controller);
    }
}
