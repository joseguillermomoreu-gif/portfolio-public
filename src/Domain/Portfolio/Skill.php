<?php

declare(strict_types=1);

namespace App\Domain\Portfolio;

final class Skill
{
    public function __construct(
        private readonly string $name,
        private readonly ?SkillLevel $level = null,
        private readonly ?int $years = null,
        private readonly ?string $icon = null,
        private readonly ?string $description = null,
        private readonly SkillType $type = SkillType::Current,
        private readonly ?int $progress = null,
    ) {
        if ('' === trim($name)) {
            throw new \InvalidArgumentException('Skill name cannot be empty.');
        }

        if (null !== $description && '' === trim($description)) {
            throw new \InvalidArgumentException('Skill description cannot be empty string.');
        }

        if (SkillType::Current === $type) {
            if (null === $level) {
                throw new \InvalidArgumentException('Current skill requires a level.');
            }
            if (null === $years) {
                throw new \InvalidArgumentException('Current skill requires years.');
            }
            if ($years < 0) {
                throw new \InvalidArgumentException("Skill years must be non-negative, got: {$years}.");
            }
            if (null !== $progress) {
                throw new \InvalidArgumentException('Current skill must not have progress.');
            }
        }

        if (SkillType::Desired === $type) {
            if (null !== $level) {
                throw new \InvalidArgumentException('Desired skill must not have a level.');
            }
            if (null !== $years) {
                throw new \InvalidArgumentException('Desired skill must not have years.');
            }
            if (null === $progress) {
                throw new \InvalidArgumentException('Desired skill requires progress (0-100).');
            }
            if ($progress < 0 || $progress > 100) {
                throw new \InvalidArgumentException("Desired skill progress must be 0-100, got: {$progress}.");
            }
        }
    }

    public function name(): string
    {
        return $this->name;
    }

    public function level(): ?SkillLevel
    {
        return $this->level;
    }

    public function years(): ?int
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

    public function type(): SkillType
    {
        return $this->type;
    }

    public function progress(): ?int
    {
        return $this->progress;
    }

    /**
     * @param array<string, mixed> $data
     */
    public static function fromArray(array $data): self
    {
        $name = $data['name'] ?? '';
        $icon = isset($data['icon']) && is_string($data['icon']) ? $data['icon'] : null;
        $description = isset($data['description']) && is_string($data['description']) ? $data['description'] : null;

        if (!is_string($name) || '' === trim($name)) {
            throw new \InvalidArgumentException('Skill name is required and must be a non-empty string.');
        }

        $typeStr = $data['type'] ?? 'current';
        if (!is_string($typeStr)) {
            throw new \InvalidArgumentException('Skill type must be a string.');
        }
        $type = SkillType::fromString($typeStr);

        if (SkillType::Desired === $type) {
            $rawProgress = $data['progress'] ?? null;
            $progress = null;
            if (is_int($rawProgress)) {
                $progress = $rawProgress;
            } elseif (is_numeric($rawProgress)) {
                $progress = (int) $rawProgress;
            }

            return new self($name, null, null, $icon, $description, $type, $progress);
        }

        $levelStr = $data['level'] ?? '';
        $years = $data['years'] ?? 0;

        if (!is_string($levelStr)) {
            throw new \InvalidArgumentException('Skill level must be a string.');
        }

        if (!is_int($years) && !is_numeric($years)) {
            throw new \InvalidArgumentException('Skill years must be a numeric value.');
        }

        $yearsInt = is_int($years) ? $years : (int) $years;

        return new self($name, SkillLevel::fromString($levelStr), $yearsInt, $icon, $description, $type, null);
    }
}
