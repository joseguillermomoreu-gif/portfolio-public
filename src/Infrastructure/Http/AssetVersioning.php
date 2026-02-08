<?php

declare(strict_types=1);

namespace App\Infrastructure\Http;

/**
 * Asset Versioning Helper
 *
 * Adds version hash to static assets for cache busting.
 */
final class AssetVersioning
{
    private const VERSION_FILE = __DIR__ . '/../../../var/asset-version.txt';

    public static function version(string $assetPath): string
    {
        $version = self::getVersion();

        return $assetPath . '?v=' . $version;
    }

    private static function getVersion(): string
    {
        if (file_exists(self::VERSION_FILE)) {
            return trim((string) @file_get_contents(self::VERSION_FILE));
        }

        // Fallback to git commit hash
        if (file_exists(__DIR__ . '/../../../.git/HEAD')) {
            $head = (string) @file_get_contents(__DIR__ . '/../../../.git/HEAD');
            return substr(md5($head), 0, 8);
        }

        return 'v1';
    }

    public static function generateVersion(): void
    {
        $version = substr(md5(uniqid('', true)), 0, 8);
        $dir = dirname(self::VERSION_FILE);

        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }

        file_put_contents(self::VERSION_FILE, $version);
    }
}
