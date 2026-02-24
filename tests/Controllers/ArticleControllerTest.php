<?php

declare(strict_types=1);

namespace App\Tests\Controllers;

use App\Application\Service\Article\ArticleService;
use App\Controllers\ArticleController;
use App\Domain\Article\ArticleRepository;
use PHPUnit\Framework\TestCase;

/**
 * @covers \App\Controllers\ArticleController
 */
final class ArticleControllerTest extends TestCase
{
    /**
     * @test
     */
    public function constructorAcceptsArticleService(): void
    {
        $service = new ArticleService($this->createMock(ArticleRepository::class));
        $controller = new ArticleController($service);
        static::assertInstanceOf(ArticleController::class, $controller);
    }
}
