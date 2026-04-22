<?php

declare(strict_types=1);

namespace App\AuSoleil\Infrastructure\Twig;

use App\AuSoleil\Domain\Shared\Money;
use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;
use Twig\TwigFunction;

final class AuSoleilExtension extends AbstractExtension
{
    /**
     * @return array<int, TwigFilter>
     */
    public function getFilters(): array
    {
        return [
            new TwigFilter('au_money', [$this, 'money']),
            new TwigFilter('au_date_es', [$this, 'dateEs']),
        ];
    }

    /**
     * @return array<int, TwigFunction>
     */
    public function getFunctions(): array
    {
        return [
            new TwigFunction('au_month_label', [$this, 'monthLabel']),
        ];
    }

    public function money(mixed $value): string
    {
        if ($value instanceof Money) {
            return $value->format();
        }
        if (is_numeric($value)) {
            return (new Money((int) $value))->format();
        }

        return '';
    }

    public function dateEs(string $iso): string
    {
        $d = \DateTimeImmutable::createFromFormat('Y-m-d', $iso);
        if (false === $d) {
            return $iso;
        }

        return $d->format('d/m/Y');
    }

    public function monthLabel(string $yyyymm): string
    {
        $months = [
            '01' => 'enero', '02' => 'febrero', '03' => 'marzo', '04' => 'abril',
            '05' => 'mayo', '06' => 'junio', '07' => 'julio', '08' => 'agosto',
            '09' => 'septiembre', '10' => 'octubre', '11' => 'noviembre', '12' => 'diciembre',
        ];
        [$year, $month] = array_pad(explode('-', $yyyymm), 2, '');
        $name = $months[$month] ?? $month;

        return ucfirst($name) . ' ' . $year;
    }
}
