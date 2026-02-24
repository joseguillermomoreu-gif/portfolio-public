<?php

declare(strict_types=1);

namespace App\Domain\ExpertiseArea;

final class ExpertiseArea
{
    private readonly string $id;
    private readonly string $label;
    private readonly string $fullTitle;
    private readonly IconType $iconType;
    private readonly string $iconValue;
    private readonly ExpertiseCategory $category;
    private readonly string $description;

    public function __construct(
        string $id,
        string $label,
        string $fullTitle,
        IconType $iconType,
        string $iconValue,
        ExpertiseCategory $category,
        string $description
    ) {
        $this->id = self::requireNonEmpty($id, 'id');
        $this->label = self::requireNonEmpty($label, 'label');
        $this->fullTitle = self::requireNonEmpty($fullTitle, 'fullTitle');
        $this->iconType = $iconType;
        $this->iconValue = self::requireNonEmpty($iconValue, 'iconValue');
        $this->category = $category;
        $this->description = self::requireNonEmpty($description, 'description');
    }

    private static function requireNonEmpty(string $value, string $field): string
    {
        if ('' === trim($value)) {
            throw new \InvalidArgumentException("ExpertiseArea {$field} cannot be empty");
        }

        return $value;
    }

    public function id(): string
    {
        return $this->id;
    }

    public function label(): string
    {
        return $this->label;
    }

    public function fullTitle(): string
    {
        return $this->fullTitle;
    }

    public function iconType(): IconType
    {
        return $this->iconType;
    }

    public function iconValue(): string
    {
        return $this->iconValue;
    }

    public function category(): ExpertiseCategory
    {
        return $this->category;
    }

    public function description(): string
    {
        return $this->description;
    }

    /**
     * @param array<string, mixed> $data
     */
    public static function fromArray(array $data): self
    {
        $id = isset($data['id']) && is_string($data['id']) ? $data['id'] : '';
        $label = isset($data['label']) && is_string($data['label']) ? $data['label'] : '';
        $fullTitle = isset($data['full_title']) && is_string($data['full_title']) ? $data['full_title'] : '';
        $iconTypeStr = isset($data['icon_type']) && is_string($data['icon_type']) ? $data['icon_type'] : '';
        $iconValue = isset($data['icon_value']) && is_string($data['icon_value']) ? $data['icon_value'] : '';
        $categoryStr = isset($data['category']) && is_string($data['category']) ? $data['category'] : '';
        $description = isset($data['description']) && is_string($data['description']) ? $data['description'] : '';

        return new self(
            id: $id,
            label: $label,
            fullTitle: $fullTitle,
            iconType: IconType::fromString($iconTypeStr),
            iconValue: $iconValue,
            category: ExpertiseCategory::fromString($categoryStr),
            description: $description
        );
    }
}
