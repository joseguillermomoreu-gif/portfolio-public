<?php

declare(strict_types=1);

namespace App\Tests\Unit\Domain\Portfolio\Entity;

use App\Domain\Model\Portfolio\Entity\ContactInfo;
use PHPUnit\Framework\TestCase;

/**
 * ContactInfo Value Object Tests
 *
 * Tests immutable value object for contact information
 */
final class ContactInfoTest extends TestCase
{
    public function test_it_should_create_contact_info_with_email_and_phone(): void
    {
        // Arrange
        $email = 'portfolio@josemoreupeso.es';
        $phone = '+34 600 123 456';

        // Act
        $contactInfo = new ContactInfo($email, $phone);

        // Assert
        $this->assertSame($email, $contactInfo->email());
        $this->assertSame($phone, $contactInfo->phone());
    }

    public function test_email_getter_should_return_exact_value(): void
    {
        // Arrange
        $expectedEmail = 'test@example.com';
        $contactInfo = new ContactInfo($expectedEmail, '123456789');

        // Act
        $actualEmail = $contactInfo->email();

        // Assert
        $this->assertSame($expectedEmail, $actualEmail);
    }

    public function test_phone_getter_should_return_exact_value(): void
    {
        // Arrange
        $expectedPhone = '+1 555 1234';
        $contactInfo = new ContactInfo('test@test.com', $expectedPhone);

        // Act
        $actualPhone = $contactInfo->phone();

        // Assert
        $this->assertSame($expectedPhone, $actualPhone);
    }

    public function test_it_should_be_immutable_with_readonly_properties(): void
    {
        // Arrange
        $contactInfo = new ContactInfo('test@example.com', '123456');

        // Act & Assert - Properties are readonly
        $reflection = new \ReflectionClass($contactInfo);
        $emailProperty = $reflection->getProperty('email');
        $phoneProperty = $reflection->getProperty('phone');

        $this->assertTrue($emailProperty->isReadOnly(), 'Email property should be readonly');
        $this->assertTrue($phoneProperty->isReadOnly(), 'Phone property should be readonly');
    }

    public function test_multiple_instances_should_be_independent(): void
    {
        // Arrange
        $contact1 = new ContactInfo('user1@example.com', '111111111');
        $contact2 = new ContactInfo('user2@example.com', '222222222');

        // Assert - Each instance maintains its own values
        $this->assertSame('user1@example.com', $contact1->email());
        $this->assertSame('111111111', $contact1->phone());
        $this->assertSame('user2@example.com', $contact2->email());
        $this->assertSame('222222222', $contact2->phone());
    }

    /**
     * @dataProvider emptyStringProvider
     */
    public function test_it_should_reject_empty_email(string $emptyValue): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('Email cannot be empty');

        new ContactInfo($emptyValue, '+34 600 123 456');
    }

    /**
     * @dataProvider emptyStringProvider
     */
    public function test_it_should_reject_empty_phone(string $emptyValue): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('Phone cannot be empty');

        new ContactInfo('test@example.com', $emptyValue);
    }

    /**
     * @dataProvider invalidEmailProvider
     */
    public function test_it_should_reject_invalid_email_format(string $invalidEmail): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('Email must be a valid email address');

        new ContactInfo($invalidEmail, '+34 600 123 456');
    }

    public function test_it_should_trim_whitespace_from_email_and_phone(): void
    {
        $contactInfo = new ContactInfo(
            '  test@example.com  ',
            '  +34 600 123 456  '
        );

        $this->assertSame('test@example.com', $contactInfo->email());
        $this->assertSame('+34 600 123 456', $contactInfo->phone());
    }

    public function test_it_should_accept_valid_email_formats(): void
    {
        $validEmails = [
            'simple@example.com',
            'user.name@example.com',
            'user+tag@example.co.uk',
            'user_name@sub.example.com',
            'joseguillermomoreu@gmail.com'
        ];

        foreach ($validEmails as $email) {
            $contactInfo = new ContactInfo($email, '123456789');
            $this->assertSame($email, $contactInfo->email());
        }
    }

    public function test_it_should_accept_various_phone_formats(): void
    {
        $validPhones = [
            '+34 600 123 456',
            '+1 555 1234',
            '600123456',
            '+44 20 7123 4567',
            '(555) 123-4567'
        ];

        foreach ($validPhones as $phone) {
            $contactInfo = new ContactInfo('test@example.com', $phone);
            $this->assertSame($phone, $contactInfo->phone());
        }
    }

    public function test_it_should_handle_international_characters_in_email(): void
    {
        // Note: Email standard technically allows some unicode,
        // but we'll test with standard ASCII emails
        $contactInfo = new ContactInfo(
            'josé.moreu@example.com',
            '+34 600 123 456'
        );

        $this->assertStringContainsString('josé', $contactInfo->email());
    }

    /**
     * Data provider for empty string values
     */
    public static function emptyStringProvider(): array
    {
        return [
            'empty string' => [''],
            'whitespace only' => ['   '],
            'tab only' => ["\t"],
            'newline only' => ["\n"],
            'mixed whitespace' => ["  \t\n  "]
        ];
    }

    /**
     * Data provider for invalid email formats
     */
    public static function invalidEmailProvider(): array
    {
        return [
            'no @ symbol' => ['notanemail'],
            'no domain' => ['user@'],
            'no local part' => ['@example.com'],
            'missing TLD' => ['user@domain'],
            'double @' => ['user@@example.com'],
            'spaces' => ['user name@example.com'],
            'missing domain part' => ['user@.com']
        ];
    }
}
