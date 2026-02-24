<?php

declare(strict_types=1);

namespace App\Tests\Domain\Portfolio;

use App\Domain\Portfolio\ContactInfo;
use PHPUnit\Framework\TestCase;

/**
 * ContactInfo Value Object Tests.
 *
 * Tests immutable value object for contact information
 */
final class ContactInfoTest extends TestCase
{
    public function testItShouldCreateContactInfoWithAllProperties(): void
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

    public function testAllPropertiesShouldBeAccessible(): void
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

    public function testInstagramCanBeNull(): void
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

    public function testInstagramCanHaveValue(): void
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

    public function testItShouldBeImmutableWithReadonlyProperties(): void
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

    public function testEmailShouldHaveValidFormat(): void
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

    public function testPhoneCanHaveInternationalFormat(): void
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

    public function testPhoneCanHaveLocalFormat(): void
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

    public function testGithubShouldBeUsername(): void
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

    public function testLinkedinShouldBeUsername(): void
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

    public function testWebsiteShouldBeFullUrl(): void
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

    public function testWebsiteCanHaveHttps(): void
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

    public function testInvalidEmailThrowsInvalidArgumentException(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessageMatches('/email/i');

        new ContactInfo(
            email: 'not-a-valid-email',
            phone: '+34 600 000 000',
            github: 'pepeton',
            linkedin: 'jose-moreu',
            instagram: null,
            website: 'https://example.com'
        );
    }

    public function testEmptyEmailThrowsInvalidArgumentException(): void
    {
        $this->expectException(\InvalidArgumentException::class);

        new ContactInfo(
            email: '',
            phone: '+34 600 000 000',
            github: 'pepeton',
            linkedin: 'jose-moreu',
            instagram: null,
            website: 'https://example.com'
        );
    }

    public function testInvalidWebsiteUrlThrowsInvalidArgumentException(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessageMatches('/website/i');

        new ContactInfo(
            email: 'jose@example.com',
            phone: '+34 600 000 000',
            github: 'pepeton',
            linkedin: 'jose-moreu',
            instagram: null,
            website: 'not-a-url'
        );
    }
}
