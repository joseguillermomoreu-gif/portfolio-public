<?php

declare(strict_types=1);

namespace App\AuSoleil\Application\Public;

use App\AuSoleil\Domain\Flat\Flat;
use App\AuSoleil\Domain\Shared\DateRange;
use App\AuSoleil\Domain\Shared\Money;

final class BuildWhatsAppLinkUseCase
{
    public function __construct(
        private readonly string $whatsappNumber,
    ) {
    }

    public function execute(Flat $flat, ?DateRange $range = null, ?Money $total = null): string
    {
        $normalized = $this->normalizeNumber($this->whatsappNumber);

        if (null !== $range && null !== $total) {
            $message = sprintf(
                'Hola, me interesa el piso "%s" del %s al %s (%d noches · %s). ¿Está disponible?',
                $flat->title,
                $range->start->format('d/m/Y'),
                $range->end->format('d/m/Y'),
                $range->nightsCount(),
                $total->format(),
            );
        } else {
            $message = sprintf('Hola, me interesa el piso "%s". ¿Podrías darme más información?', $flat->title);
        }

        return sprintf('https://wa.me/%s?text=%s', $normalized, rawurlencode($message));
    }

    private function normalizeNumber(string $number): string
    {
        return (string) preg_replace('/\D+/', '', $number);
    }
}
