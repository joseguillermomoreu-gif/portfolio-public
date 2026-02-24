<?php

declare(strict_types=1);

namespace App\Tests\Infrastructure;

use PHPUnit\Framework\TestCase;

/**
 * Verifica que todo el código TypeScript/Playwright pasa el análisis de ESLint.
 *
 * TDD: Este test documenta el requisito de calidad de código.
 * Flujo: test RED → corregir código TS → test GREEN
 */
class EsLintComplianceTest extends TestCase
{
    private string $projectRoot = '';

    protected function setUp(): void
    {
        $this->projectRoot = dirname(__DIR__, 2);
    }

    public function testEsLintBinaryExists(): void
    {
        $binary = $this->projectRoot . '/node_modules/.bin/eslint';

        $this->assertFileExists(
            $binary,
            'ESLint no está instalado. Ejecuta: npm install'
        );
    }

    public function testEsLintConfigExists(): void
    {
        $config = $this->projectRoot . '/eslint.config.mjs';

        $this->assertFileExists(
            $config,
            'eslint.config.mjs no existe. Es necesario para definir las reglas de estilo TypeScript.'
        );
    }

    public function testAllCodePassesEsLint(): void
    {
        $binary = $this->projectRoot . '/node_modules/.bin/eslint';

        if (!file_exists($binary)) {
            $this->markTestSkipped('ESLint no instalado todavía.');
        }

        $output = [];
        $exitCode = 0;

        exec(
            sprintf(
                'cd %s && %s playwright/ --ext .ts 2>&1',
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
                "El código TypeScript no pasa ESLint.\n\nEjecuta 'make lint-fix' para corregir automáticamente.\n\nOutput:\n%s",
                implode("\n", $output)
            )
        );
    }
}
