<?php

declare(strict_types=1);

namespace App\Tests\Infrastructure;

use PHPUnit\Framework\TestCase;

/**
 * Verifica que todo el código PHP pasa el análisis estático de PHPStan (level 9).
 *
 * TDD: Este test documenta el requisito de calidad de código.
 * Flujo: test RED → corregir tipos → test GREEN
 */
class PhpStanComplianceTest extends TestCase
{
    private string $projectRoot = '';

    protected function setUp(): void
    {
        $this->projectRoot = dirname(__DIR__, 2);
    }

    public function testPhpStanBinaryExists(): void
    {
        $binary = $this->projectRoot . '/vendor/bin/phpstan';

        $this->assertFileExists(
            $binary,
            'PHPStan no está instalado. Ejecuta: composer require --dev phpstan/phpstan'
        );
    }

    public function testPhpStanConfigExists(): void
    {
        $config = $this->projectRoot . '/phpstan.neon';

        $this->assertFileExists(
            $config,
            'phpstan.neon no existe. Es necesario para definir el nivel de análisis.'
        );
    }

    public function testAllCodePassesPhpStanAnalysis(): void
    {
        $binary = $this->projectRoot . '/vendor/bin/phpstan';

        if (!file_exists($binary)) {
            $this->markTestSkipped('PHPStan no instalado todavía.');
        }

        $output = [];
        $exitCode = 0;

        exec(
            sprintf(
                'cd %s && %s analyse --no-progress 2>&1',
                escapeshellarg($this->projectRoot),
                escapeshellarg($binary)
            ),
            $output,
            $exitCode
        );

        $this->assertSame(
            0,
            $exitCode,
            sprintf(
                "El código no pasa PHPStan level 9.\n\nEjecuta 'make stan' para ver los errores.\n\nOutput:\n%s",
                implode("\n", $output)
            )
        );
    }
}
