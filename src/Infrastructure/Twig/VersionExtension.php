<?php

declare(strict_types=1);

namespace App\Infrastructure\Twig;

use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

/**
 * Twig Extension to expose app version.
 *
 * Provides app_version() function in Twig templates
 * to display current version from VERSION file
 */
final class VersionExtension extends AbstractExtension
{
    public function __construct(
        private readonly string $projectDir
    ) {
    }

    /**
     * @return array<TwigFunction>
     */
    public function getFunctions(): array
    {
        return [
            new TwigFunction('app_version', $this->getVersion(...)),
        ];
    }

    public function getVersion(): string
    {
        $versionFile = $this->projectDir . '/VERSION';

        if (!file_exists($versionFile)) {
            return 'unknown';
        }

        $content = file_get_contents($versionFile);

        if (false === $content) {
            return 'unknown';
        }

        return trim($content);
    }
}
