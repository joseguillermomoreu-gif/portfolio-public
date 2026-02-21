<?php

declare(strict_types=1);

namespace App\Infrastructure\Twig;

use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

/**
 * Twig Extension to expose app version.
 *
 * Provides app_version() function in Twig templates.
 * Version is injected from APP_VERSION env var (defined in .env).
 */
final class VersionExtension extends AbstractExtension
{
    public function __construct(
        private readonly string $version
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
        return $this->version;
    }
}
