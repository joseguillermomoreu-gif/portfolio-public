<?php

declare(strict_types=1);

namespace App\AuSoleil\Infrastructure\Persistence\Json;

use App\AuSoleil\Domain\Booking\Booking;
use App\AuSoleil\Domain\Booking\BookingRepository;
use App\AuSoleil\Domain\Shared\DateRange;
use Symfony\Component\DependencyInjection\Attribute\Autowire;

final class JsonBookingRepository implements BookingRepository
{
    public function __construct(
        #[Autowire('%kernel.project_dir%/data/au_soleil/bookings.json')]
        private readonly string $filePath,
    ) {
    }

    /**
     * @return list<Booking>
     */
    public function findActiveByFlat(string $flatId): array
    {
        return array_values(array_filter(
            $this->findAllByFlat($flatId),
            static fn (Booking $b): bool => $b->isActive(),
        ));
    }

    /**
     * @return list<Booking>
     */
    public function findAllByFlat(string $flatId): array
    {
        return array_values(array_filter(
            $this->findAll(),
            static fn (Booking $b): bool => $b->flatId === $flatId,
        ));
    }

    /**
     * @return list<Booking>
     */
    public function findAll(): array
    {
        $raw = $this->readFile();
        /** @var list<array<string, mixed>> $items */
        $items = $raw['bookings'] ?? [];

        return array_map(static fn (array $d): Booking => Booking::fromArray($d), $items);
    }

    public function findById(string $id): ?Booking
    {
        foreach ($this->findAll() as $booking) {
            if ($booking->id === $id) {
                return $booking;
            }
        }

        return null;
    }

    public function hasOverlap(string $flatId, DateRange $range, ?string $excludingBookingId = null): bool
    {
        foreach ($this->findActiveByFlat($flatId) as $booking) {
            if (null !== $excludingBookingId && $booking->id === $excludingBookingId) {
                continue;
            }
            if ($booking->range->overlaps($range)) {
                return true;
            }
        }

        return false;
    }

    public function save(Booking $booking): void
    {
        $raw = $this->readFile();
        /** @var list<array<string, mixed>> $items */
        $items = $raw['bookings'] ?? [];

        $replaced = false;
        $items = array_map(function (array $item) use ($booking, &$replaced): array {
            if (($item['id'] ?? null) === $booking->id) {
                $replaced = true;

                return $booking->toArray();
            }

            return $item;
        }, $items);

        if (!$replaced) {
            $items[] = $booking->toArray();
        }

        $this->writeFile(['bookings' => array_values($items)]);
    }

    public function cancel(string $bookingId): void
    {
        $booking = $this->findById($bookingId);
        if (null === $booking) {
            return;
        }
        $cancelled = new Booking(
            $booking->id,
            $booking->flatId,
            $booking->range,
            $booking->guestName,
            $booking->guestPhone,
            $booking->guestEmail,
            $booking->notes,
            $booking->totalPrice,
            Booking::STATUS_CANCELLED,
        );
        $this->save($cancelled);
    }

    /**
     * @return array<string, mixed>
     */
    private function readFile(): array
    {
        if (!is_file($this->filePath)) {
            return ['bookings' => []];
        }

        $content = file_get_contents($this->filePath);
        if (false === $content || '' === trim($content)) {
            return ['bookings' => []];
        }

        /** @var array<string, mixed> $decoded */
        $decoded = json_decode($content, true, 512, \JSON_THROW_ON_ERROR);

        return $decoded;
    }

    /**
     * @param array<string, mixed> $data
     */
    private function writeFile(array $data): void
    {
        $dir = \dirname($this->filePath);
        if (!is_dir($dir)) {
            @mkdir($dir, 0o775, true);
        }

        $result = file_put_contents(
            $this->filePath,
            json_encode($data, \JSON_PRETTY_PRINT | \JSON_UNESCAPED_UNICODE | \JSON_UNESCAPED_SLASHES) . "\n",
            \LOCK_EX,
        );

        if (false === $result) {
            throw new \RuntimeException(sprintf('No se pudo escribir en %s', $this->filePath));
        }
    }
}
