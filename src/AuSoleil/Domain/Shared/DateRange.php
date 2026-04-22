<?php

declare(strict_types=1);

namespace App\AuSoleil\Domain\Shared;

final class DateRange
{
    public function __construct(
        public readonly \DateTimeImmutable $start,
        public readonly \DateTimeImmutable $end,
    ) {
        if ($end < $start) {
            throw new \InvalidArgumentException('DateRange: end must be >= start');
        }
    }

    public static function fromIsoStrings(string $start, string $end): self
    {
        return new self(
            new \DateTimeImmutable($start),
            new \DateTimeImmutable($end),
        );
    }

    public function contains(\DateTimeImmutable $date): bool
    {
        $d = $date->format('Y-m-d');

        return $d >= $this->start->format('Y-m-d') && $d <= $this->end->format('Y-m-d');
    }

    public function overlaps(DateRange $other): bool
    {
        return !(
            $this->end->format('Y-m-d') <= $other->start->format('Y-m-d')
            || $this->start->format('Y-m-d') >= $other->end->format('Y-m-d')
        );
    }

    /**
     * @return iterable<\DateTimeImmutable>
     */
    public function nightsAsDays(): iterable
    {
        $cur = $this->start;
        while ($cur < $this->end) {
            yield $cur;
            $cur = $cur->modify('+1 day');
        }
    }

    public function nightsCount(): int
    {
        $diff = $this->start->diff($this->end);

        return (int) $diff->days;
    }

    public function startIso(): string
    {
        return $this->start->format('Y-m-d');
    }

    public function endIso(): string
    {
        return $this->end->format('Y-m-d');
    }
}
