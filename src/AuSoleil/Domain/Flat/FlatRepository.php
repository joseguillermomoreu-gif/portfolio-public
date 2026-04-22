<?php

declare(strict_types=1);

namespace App\AuSoleil\Domain\Flat;

interface FlatRepository
{
    /**
     * @return list<Flat>
     */
    public function findAllPublished(): array;

    /**
     * @return list<Flat>
     */
    public function findAll(): array;

    public function findPublishedBySlug(string $slug): ?Flat;

    public function findBySlug(string $slug): ?Flat;

    public function findById(string $id): ?Flat;

    public function save(Flat $flat): void;

    public function delete(string $id): void;
}
