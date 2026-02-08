<?php

declare(strict_types=1);

namespace App\Tests\Unit\Domain\Portfolio\Entity;

use App\Domain\Model\Portfolio\Entity\PersonalInfo;
use PHPUnit\Framework\TestCase;

/**
 * PersonalInfo Value Object Tests
 *
 * Tests immutable value object for personal information
 */
final class PersonalInfoTest extends TestCase
{
    public function test_it_should_create_personal_info_with_all_required_fields(): void
    {
        // Arrange
        $name = 'José Moreu Peso';
        $title = 'Senior Backend Developer';
        $tagline = 'Building scalable systems with PHP & Symfony';
        $bio = 'Passionate about clean code and DDD';
        $location = 'Madrid, España';
        $photo = '/images/profile.jpg';
        $website = 'https://josemoreupeso.es';

        // Act
        $personalInfo = new PersonalInfo(
            $name,
            $title,
            $tagline,
            $bio,
            $location,
            $photo,
            $website
        );

        // Assert
        $this->assertSame($name, $personalInfo->name());
        $this->assertSame($title, $personalInfo->title());
        $this->assertSame($tagline, $personalInfo->tagline());
        $this->assertSame($bio, $personalInfo->bio());
        $this->assertSame($location, $personalInfo->location());
        $this->assertSame($photo, $personalInfo->photo());
        $this->assertSame($website, $personalInfo->website());
    }

    public function test_it_should_accept_null_for_optional_photo(): void
    {
        // Arrange & Act
        $personalInfo = new PersonalInfo(
            'John Doe',
            'Developer',
            'Coding stuff',
            'Bio here',
            'Somewhere',
            null, // photo is optional
            'https://example.com'
        );

        // Assert
        $this->assertNull($personalInfo->photo());
    }

    public function test_it_should_accept_null_for_optional_website(): void
    {
        // Arrange & Act
        $personalInfo = new PersonalInfo(
            'Jane Doe',
            'Designer',
            'Designing things',
            'Creative bio',
            'Anywhere',
            '/photo.jpg',
            null // website is optional
        );

        // Assert
        $this->assertNull($personalInfo->website());
    }

    public function test_it_should_accept_null_for_both_optional_fields(): void
    {
        // Arrange & Act
        $personalInfo = new PersonalInfo(
            'Test User',
            'Tester',
            'Testing things',
            'Test bio',
            'Test location',
            null,
            null
        );

        // Assert
        $this->assertNull($personalInfo->photo());
        $this->assertNull($personalInfo->website());
    }

    public function test_it_should_be_immutable_with_readonly_properties(): void
    {
        // Arrange
        $personalInfo = new PersonalInfo(
            'Test',
            'Title',
            'Tagline',
            'Bio',
            'Location',
            null,
            null
        );

        // Act & Assert - Properties are readonly, this test verifies the design
        $reflection = new \ReflectionClass($personalInfo);
        $nameProperty = $reflection->getProperty('name');

        $this->assertTrue($nameProperty->isReadOnly(), 'Properties should be readonly for immutability');
    }

    public function test_getters_should_return_exact_constructor_values(): void
    {
        // Arrange
        $expectedData = [
            'name' => 'José Moreu Peso',
            'title' => 'Senior Backend Developer',
            'tagline' => 'Expert in Hexagonal Architecture & DDD',
            'bio' => 'With 8+ years building scalable systems',
            'location' => 'Madrid, España',
            'photo' => '/assets/jose-moreu.jpg',
            'website' => 'https://josemoreupeso.es'
        ];

        // Act
        $personalInfo = new PersonalInfo(
            $expectedData['name'],
            $expectedData['title'],
            $expectedData['tagline'],
            $expectedData['bio'],
            $expectedData['location'],
            $expectedData['photo'],
            $expectedData['website']
        );

        // Assert - No transformation should occur
        $this->assertSame($expectedData['name'], $personalInfo->name());
        $this->assertSame($expectedData['title'], $personalInfo->title());
        $this->assertSame($expectedData['tagline'], $personalInfo->tagline());
        $this->assertSame($expectedData['bio'], $personalInfo->bio());
        $this->assertSame($expectedData['location'], $personalInfo->location());
        $this->assertSame($expectedData['photo'], $personalInfo->photo());
        $this->assertSame($expectedData['website'], $personalInfo->website());
    }

    /**
     * @dataProvider emptyStringProvider
     */
    public function test_it_should_reject_empty_name(string $emptyValue): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('Name cannot be empty');

        new PersonalInfo(
            $emptyValue,
            'Title',
            'Tagline',
            'Bio',
            'Location',
            null,
            null
        );
    }

    /**
     * @dataProvider emptyStringProvider
     */
    public function test_it_should_reject_empty_title(string $emptyValue): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('Title cannot be empty');

        new PersonalInfo(
            'Name',
            $emptyValue,
            'Tagline',
            'Bio',
            'Location',
            null,
            null
        );
    }

    /**
     * @dataProvider emptyStringProvider
     */
    public function test_it_should_reject_empty_tagline(string $emptyValue): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('Tagline cannot be empty');

        new PersonalInfo(
            'Name',
            'Title',
            $emptyValue,
            'Bio',
            'Location',
            null,
            null
        );
    }

    /**
     * @dataProvider emptyStringProvider
     */
    public function test_it_should_reject_empty_bio(string $emptyValue): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('Bio cannot be empty');

        new PersonalInfo(
            'Name',
            'Title',
            'Tagline',
            $emptyValue,
            'Location',
            null,
            null
        );
    }

    /**
     * @dataProvider emptyStringProvider
     */
    public function test_it_should_reject_empty_location(string $emptyValue): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('Location cannot be empty');

        new PersonalInfo(
            'Name',
            'Title',
            'Tagline',
            'Bio',
            $emptyValue,
            null,
            null
        );
    }

    public function test_it_should_reject_empty_photo_string(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('Photo must be null or non-empty string');

        new PersonalInfo(
            'Name',
            'Title',
            'Tagline',
            'Bio',
            'Location',
            '',
            null
        );
    }

    public function test_it_should_reject_empty_website_string(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('Website must be null or non-empty string');

        new PersonalInfo(
            'Name',
            'Title',
            'Tagline',
            'Bio',
            'Location',
            null,
            ''
        );
    }

    public function test_it_should_accept_valid_website_url(): void
    {
        $validUrls = [
            'https://josemoreupeso.es',
            'http://example.com',
            'https://subdomain.example.com',
            'https://example.com/path/to/page'
        ];

        foreach ($validUrls as $url) {
            $personalInfo = new PersonalInfo(
                'Name',
                'Title',
                'Tagline',
                'Bio',
                'Location',
                null,
                $url
            );

            $this->assertSame($url, $personalInfo->website());
        }
    }

    public function test_it_should_trim_whitespace_from_required_fields(): void
    {
        $personalInfo = new PersonalInfo(
            '  José Moreu Peso  ',
            '  Senior Developer  ',
            '  Tagline  ',
            '  Bio text  ',
            '  Madrid  ',
            null,
            null
        );

        $this->assertSame('José Moreu Peso', $personalInfo->name());
        $this->assertSame('Senior Developer', $personalInfo->title());
        $this->assertSame('Tagline', $personalInfo->tagline());
        $this->assertSame('Bio text', $personalInfo->bio());
        $this->assertSame('Madrid', $personalInfo->location());
    }

    public function test_it_should_handle_special_characters_in_strings(): void
    {
        $personalInfo = new PersonalInfo(
            'José Moréu-Péso',
            'Senior Developer & Tech Lead',
            'Building @scalable systems 🚀',
            'Passionate about <coding> & "innovation"',
            'Madrid, España',
            '/images/josé-profile.jpg',
            'https://josemoreupeso.es?ref=portfolio&id=123'
        );

        $this->assertStringContainsString('José', $personalInfo->name());
        $this->assertStringContainsString('&', $personalInfo->title());
        $this->assertStringContainsString('🚀', $personalInfo->tagline());
        $this->assertStringContainsString('<coding>', $personalInfo->bio());
    }

    /**
     * Data provider for empty string values
     *
     * @return array<string, array<string>>
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
}
