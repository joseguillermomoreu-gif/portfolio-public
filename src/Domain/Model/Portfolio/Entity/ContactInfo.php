<?php

declare(strict_types=1);

namespace App\Domain\Model\Portfolio\Entity;

final class ContactInfo
{
    private readonly string $email;
    private readonly string $phone;

    public function __construct(
        string $email,
        string $phone
    ) {
        $this->email = self::validateEmail($email);
        $this->phone = self::validateAndTrimRequired($phone, 'Phone');
    }

    /**
     * Validate email format and trim whitespace
     * Supports international (UTF-8) email addresses (RFC 6531)
     *
     * @throws \InvalidArgumentException if email is empty or invalid format
     */
    private static function validateEmail(string $email): string
    {
        $trimmed = trim($email);

        if ($trimmed === '') {
            throw new \InvalidArgumentException('Email cannot be empty');
        }

        // FILTER_FLAG_EMAIL_UNICODE: Allows international characters in email (PHP 7.1+)
        if (!filter_var($trimmed, FILTER_VALIDATE_EMAIL, FILTER_FLAG_EMAIL_UNICODE)) {
            throw new \InvalidArgumentException('Email must be a valid email address');
        }

        return $trimmed;
    }

    /**
     * Validate and trim required string field
     *
     * @throws \InvalidArgumentException if value is empty after trimming
     */
    private static function validateAndTrimRequired(string $value, string $fieldName): string
    {
        $trimmed = trim($value);

        if ($trimmed === '') {
            throw new \InvalidArgumentException("{$fieldName} cannot be empty");
        }

        return $trimmed;
    }

    public function email(): string
    {
        return $this->email;
    }

    public function phone(): string
    {
        return $this->phone;
    }
}
