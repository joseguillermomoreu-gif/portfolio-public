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
    public function test_it_should_create_contact_info_with_all_properties(): void
    {
        // Arrange & Act
        $contactInfo = new ContactInfo(
            email: 'contact@josemoreupeso.es',
            phone: '+34 600 123 456',
            github: 'pepeton',
            linkedin: 'josemoreupeso',
            instagram: '@jmoreu1992',
            website: 'https://josemoreupeso.es'
        );

        // Assert
        $this->assertInstanceOf(ContactInfo::class, $contactInfo);
    }

    public function test_all_properties_should_be_accessible(): void
    {
        // Arrange & Act
        $contactInfo = new ContactInfo(
            email: 'jose@example.com',
            phone: '+34 600 000 000',
            github: 'pepeton',
            linkedin: 'jose-moreu',
            instagram: '@jmoreu1992',
            website: 'https://example.com'
        );

        // Assert
        $this->assertSame('jose@example.com', $contactInfo->email());
        $this->assertSame('+34 600 000 000', $contactInfo->phone());
        $this->assertSame('pepeton', $contactInfo->github());
        $this->assertSame('jose-moreu', $contactInfo->linkedin());
        $this->assertSame('@jmoreu1992', $contactInfo->instagram());
        $this->assertSame('https://example.com', $contactInfo->website());
    }

    public function test_instagram_can_be_null(): void
    {
        // Arrange & Act
        $contactInfo = new ContactInfo(
            email: 'jose@example.com',
            phone: '+34 600 000 000',
            github: 'pepeton',
            linkedin: 'jose-moreu',
            instagram: null,
            website: 'https://example.com'
        );

        // Assert
        $this->assertNull($contactInfo->instagram());
    }

    public function test_instagram_can_have_value(): void
    {
        // Arrange & Act
        $contactInfo = new ContactInfo(
            email: 'jose@example.com',
            phone: '+34 600 000 000',
            github: 'pepeton',
            linkedin: 'jose-moreu',
            instagram: '@jmoreu1992',
            website: 'https://example.com'
        );

        // Assert
        $this->assertNotNull($contactInfo->instagram());
        $this->assertSame('@jmoreu1992', $contactInfo->instagram());
    }

    public function test_it_should_be_immutable_with_readonly_properties(): void
    {
        // Arrange
        $contactInfo = new ContactInfo(
            email: 'jose@example.com',
            phone: '+34 600 000 000',
            github: 'pepeton',
            linkedin: 'jose-moreu',
            instagram: null,
            website: 'https://example.com'
        );

        // Act & Assert - Properties are readonly, verify via reflection
        $reflection = new \ReflectionClass($contactInfo);
        $emailProperty = $reflection->getProperty('email');

        $this->assertTrue($emailProperty->isReadOnly(), 'Properties should be readonly for immutability');
    }

    public function test_email_should_have_valid_format(): void
    {
        // Arrange & Act
        $contactInfo = new ContactInfo(
            email: 'contact@josemoreupeso.es',
            phone: '+34 600 000 000',
            github: 'pepeton',
            linkedin: 'josemoreupeso',
            instagram: null,
            website: 'https://josemoreupeso.es'
        );

        // Assert
        $this->assertStringContainsString('@', $contactInfo->email());
        $this->assertStringContainsString('.', $contactInfo->email());
    }

    public function test_phone_can_have_international_format(): void
    {
        // Arrange & Act
        $contactInfo = new ContactInfo(
            email: 'jose@example.com',
            phone: '+34 600 123 456',
            github: 'pepeton',
            linkedin: 'jose-moreu',
            instagram: null,
            website: 'https://example.com'
        );

        // Assert
        $this->assertStringStartsWith('+', $contactInfo->phone());
    }

    public function test_phone_can_have_local_format(): void
    {
        // Arrange & Act
        $contactInfo = new ContactInfo(
            email: 'jose@example.com',
            phone: '600 123 456',
            github: 'pepeton',
            linkedin: 'jose-moreu',
            instagram: null,
            website: 'https://example.com'
        );

        // Assert
        $this->assertSame('600 123 456', $contactInfo->phone());
    }

    public function test_github_should_be_username(): void
    {
        // Arrange & Act
        $contactInfo = new ContactInfo(
            email: 'jose@example.com',
            phone: '+34 600 000 000',
            github: 'pepeton',
            linkedin: 'jose-moreu',
            instagram: null,
            website: 'https://example.com'
        );

        // Assert - GitHub username (not full URL)
        $this->assertStringNotContainsString('/', $contactInfo->github());
        $this->assertStringNotContainsString('http', $contactInfo->github());
    }

    public function test_linkedin_should_be_username(): void
    {
        // Arrange & Act
        $contactInfo = new ContactInfo(
            email: 'jose@example.com',
            phone: '+34 600 000 000',
            github: 'pepeton',
            linkedin: 'jose-guillermo-moreu',
            instagram: null,
            website: 'https://example.com'
        );

        // Assert - LinkedIn username (not full URL)
        $this->assertStringNotContainsString('/', $contactInfo->linkedin());
        $this->assertStringNotContainsString('http', $contactInfo->linkedin());
    }

    public function test_website_should_be_full_url(): void
    {
        // Arrange & Act
        $contactInfo = new ContactInfo(
            email: 'jose@example.com',
            phone: '+34 600 000 000',
            github: 'pepeton',
            linkedin: 'jose-moreu',
            instagram: null,
            website: 'https://josemoreupeso.es'
        );

        // Assert
        $this->assertStringStartsWith('http', $contactInfo->website());
    }

    public function test_website_can_have_https(): void
    {
        // Arrange & Act
        $contactInfo = new ContactInfo(
            email: 'jose@example.com',
            phone: '+34 600 000 000',
            github: 'pepeton',
            linkedin: 'jose-moreu',
            instagram: null,
            website: 'https://secure-site.com'
        );

        // Assert
        $this->assertStringStartsWith('https://', $contactInfo->website());
    }
}
