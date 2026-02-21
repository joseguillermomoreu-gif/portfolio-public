<?php

declare(strict_types=1);

namespace App\Domain\Portfolio;

final class Skill
{
    public function __construct(
        private readonly string $name,
        private readonly SkillLevel $level,
        private readonly int $years,
        private readonly ?string $icon = null,
        private readonly ?string $description = null,
    ) {
        if ('' === trim($name)) {
            throw new \InvalidArgumentException('Skill name cannot be empty.');
        }

        if ($years < 0) {
            throw new \InvalidArgumentException("Skill years must be non-negative, got: {$years}.");
        }

        if (null !== $description && '' === trim($description)) {
            throw new \InvalidArgumentException('Skill description cannot be empty string.');
        }
    }

    public function name(): string
    {
        return $this->name;
    }

    public function level(): SkillLevel
    {
        return $this->level;
    }

    public function years(): int
    {
        return $this->years;
    }

    public function icon(): ?string
    {
        return $this->icon;
    }

    public function description(): ?string
    {
        return $this->description;
    }

    /**
     * @param array<string, mixed> $data
     */
    public static function fromArray(array $data): self
    {
        $name = $data['name'] ?? '';
        $levelStr = $data['level'] ?? '';
        $years = $data['years'] ?? 0;
        $icon = isset($data['icon']) && is_string($data['icon']) ? $data['icon'] : null;
        $description = isset($data['description']) && is_string($data['description']) ? $data['description'] : null;

        if (!is_string($name) || '' === trim($name)) {
            throw new \InvalidArgumentException('Skill name is required and must be a non-empty string.');
        }

        if (!is_string($levelStr)) {
            throw new \InvalidArgumentException('Skill level must be a string.');
        }

        if (!is_int($years) && !is_numeric($years)) {
            throw new \InvalidArgumentException('Skill years must be a numeric value.');
        }

        $yearsInt = is_int($years) ? $years : (int) $years;

        return new self($name, SkillLevel::fromString($levelStr), $yearsInt, $icon, $description);
    }
}
