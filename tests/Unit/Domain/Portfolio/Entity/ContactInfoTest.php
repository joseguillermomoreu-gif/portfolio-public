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
}
