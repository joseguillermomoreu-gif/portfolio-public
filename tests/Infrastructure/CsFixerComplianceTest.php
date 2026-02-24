<?php

declare(strict_types=1);

namespace App\Tests\Infrastructure;

use PHPUnit\Framework\TestCase;

/**
 * Verifica que todo el código PHP cumple con los estándares de estilo (PSR-12 + Symfony).
 *
 * TDD: Este test documenta el requisito de calidad de código.
 * Flujo: test RED → cs-fix → test GREEN
 */
class CsFixerComplianceTest extends TestCase
{
    private string $projectRoot = '';

    protected function setUp(): void
    {
        $this->projectRoot = dirname(__DIR__, 2);
    }

    public function testPhpCsFixerBinaryExists(): void
    {
        $binary = $this->projectRoot . '/vendor/bin/php-cs-fixer';

        $this->assertFileExists(
            $binary,
            'PHP CS Fixer no está instalado. Ejecuta: composer require --dev friendsofphp/php-cs-fixer'
        );
    }

    public function testCsFixerConfigExists(): void
    {
        $config = $this->projectRoot . '/.php-cs-fixer.php';

        $this->assertFileExists(
            $config,
            '.php-cs-fixer.php no existe. Es necesario para definir las reglas de estilo.'
        );
    }

    public function testAllCodeComipliesWithCsFixerRules(): void
    {
        $binary = $this->projectRoot . '/vendor/bin/php-cs-fixer';

        if (!file_exists($binary)) {
            $this->markTestSkipped('PHP CS Fixer no instalado todavía.');
        }

        $output = [];
        $exitCode = 0;

        exec(
            sprintf(
                'cd %s && %s fix --dry-run --diff --config=.php-cs-fixer.php 2>&1',
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
                "El código no cumple con los estándares de estilo PHP CS Fixer.\n\n" .
                "Ejecuta 'make cs-fix' para corregir automáticamente.\n\nDiff:\n%s",
                implode("\n", $output)
            )
        );
    }
}
