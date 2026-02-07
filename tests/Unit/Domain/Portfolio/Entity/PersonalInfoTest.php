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
}
