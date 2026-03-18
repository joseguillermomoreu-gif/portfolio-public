<?php

declare(strict_types=1);

namespace App\Tests\Controllers;

use App\Controllers\SanPatricioController;
use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Response;

/**
 * @covers \App\Controllers\SanPatricioController
 */
final class SanPatricioControllerTest extends TestCase
{
    /**
     * @test
     */
    public function testRedirectsWhenNotSanPatricioDay(): void
    {
        $controller = new SanPatricioController(new \DateTimeImmutable('2025-01-15'));
        $response = $controller->index();

        $this->assertInstanceOf(RedirectResponse::class, $response);
        $this->assertSame(Response::HTTP_MOVED_PERMANENTLY, $response->getStatusCode());
        $this->assertSame('/articulos/tlotp-sdd-ia-san-patricio', $response->getTargetUrl());
    }

    /**
     * @test
     */
    public function testRendersSanPatricioPageOnSanPatricioDay(): void
    {
        $stub = new class(new \DateTimeImmutable('2025-03-17')) extends SanPatricioController {
            /** @param array<string, mixed> $parameters */
            protected function render(string $view, array $parameters = [], ?Response $response = null): Response
            {
                return new Response('', Response::HTTP_OK);
            }
        };

        $response = $stub->index();

        $this->assertNotInstanceOf(RedirectResponse::class, $response);
        $this->assertSame(Response::HTTP_OK, $response->getStatusCode());
    }
}
