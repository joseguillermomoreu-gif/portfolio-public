<?php

declare(strict_types=1);

namespace App\Tests\Unit\Domain\Portfolio\Entity;

use App\Domain\Model\Portfolio\Entity\ContactInfo;
use App\Domain\Model\Portfolio\Entity\PersonalInfo;
use App\Domain\Model\Portfolio\Entity\Portfolio;
use PHPUnit\Framework\TestCase;

/**
 * Portfolio Aggregate Root Tests
 *
 * Tests the Portfolio entity which composes PersonalInfo and ContactInfo
 */
final class PortfolioTest extends TestCase
{
    public function test_it_should_create_portfolio_with_personal_and_contact_info(): void
    {
        // Arrange
        $personalInfo = new PersonalInfo(
            'José Moreu Peso',
            'Senior Backend Developer',
            'Expert in Hexagonal Architecture',
            'Building scalable systems',
            'Madrid, España',
            '/photo.jpg',
            'https://josemoreupeso.es'
        );

        $contactInfo = new ContactInfo(
            'portfolio@josemoreupeso.es',
            '+34 600 123 456'
        );

        $socialNetworks = [
            'github' => 'https://github.com/joseguillermomoreu-gif',
            'linkedin' => 'https://linkedin.com/in/josemoreupeso'
        ];

        $skills = [
            ['name' => 'PHP', 'level' => 'expert'],
            ['name' => 'Symfony', 'level' => 'expert']
        ];

        // Act
        $portfolio = new Portfolio(
            $personalInfo,
            $contactInfo,
            $socialNetworks,
            $skills
        );

        // Assert
        $this->assertSame($personalInfo, $portfolio->personalInfo());
        $this->assertSame($contactInfo, $portfolio->contactInfo());
        $this->assertSame($socialNetworks, $portfolio->socialNetworks());
        $this->assertSame($skills, $portfolio->skills());
    }

    public function test_personal_info_getter_should_return_same_instance(): void
    {
        // Arrange
        $personalInfo = new PersonalInfo('Name', 'Title', 'Tag', 'Bio', 'Loc', null, null);
        $contactInfo = new ContactInfo('email@test.com', '123');
        $portfolio = new Portfolio($personalInfo, $contactInfo, [], []);

        // Act
        $retrievedPersonalInfo = $portfolio->personalInfo();

        // Assert
        $this->assertSame($personalInfo, $retrievedPersonalInfo);
    }

    public function test_contact_info_getter_should_return_same_instance(): void
    {
        // Arrange
        $personalInfo = new PersonalInfo('Name', 'Title', 'Tag', 'Bio', 'Loc', null, null);
        $contactInfo = new ContactInfo('email@test.com', '123');
        $portfolio = new Portfolio($personalInfo, $contactInfo, [], []);

        // Act
        $retrievedContactInfo = $portfolio->contactInfo();

        // Assert
        $this->assertSame($contactInfo, $retrievedContactInfo);
    }

    public function test_social_networks_should_be_array_of_strings(): void
    {
        // Arrange
        $personalInfo = new PersonalInfo('N', 'T', 'Tag', 'B', 'L', null, null);
        $contactInfo = new ContactInfo('e@t.com', '123');
        $socialNetworks = [
            'github' => 'https://github.com/user',
            'twitter' => 'https://twitter.com/user'
        ];

        // Act
        $portfolio = new Portfolio($personalInfo, $contactInfo, $socialNetworks, []);

        // Assert
        $this->assertSame($socialNetworks, $portfolio->socialNetworks());
        $this->assertIsArray($portfolio->socialNetworks());
    }

    public function test_skills_should_be_array_of_arrays(): void
    {
        // Arrange
        $personalInfo = new PersonalInfo('N', 'T', 'Tag', 'B', 'L', null, null);
        $contactInfo = new ContactInfo('e@t.com', '123');
        $skills = [
            ['name' => 'PHP', 'level' => 'expert', 'years' => 8],
            ['name' => 'Symfony', 'level' => 'expert', 'years' => 6]
        ];

        // Act
        $portfolio = new Portfolio($personalInfo, $contactInfo, [], $skills);

        // Assert
        $this->assertSame($skills, $portfolio->skills());
        $this->assertIsArray($portfolio->skills());
        $this->assertCount(2, $portfolio->skills());
    }

    public function test_from_array_should_create_portfolio_from_valid_data(): void
    {
        // Arrange
        $data = [
            'personal_info' => [
                'name' => 'José Moreu Peso',
                'title' => 'Senior Backend Developer',
                'tagline' => 'Expert in Hexagonal Architecture',
                'bio' => 'Building scalable systems with PHP & Symfony',
                'location' => 'Madrid, España',
                'photo' => '/assets/profile.jpg',
                'website' => 'https://josemoreupeso.es'
            ],
            'contact' => [
                'email' => 'portfolio@josemoreupeso.es',
                'phone' => '+34 600 123 456'
            ],
            'social_networks' => [
                'github' => 'https://github.com/joseguillermomoreu-gif',
                'linkedin' => 'https://linkedin.com/in/josemoreupeso'
            ],
            'skills' => [
                ['name' => 'PHP', 'level' => 'expert'],
                ['name' => 'Symfony', 'level' => 'expert']
            ]
        ];

        // Act
        $portfolio = Portfolio::fromArray($data);

        // Assert
        $this->assertInstanceOf(Portfolio::class, $portfolio);
        $this->assertSame('José Moreu Peso', $portfolio->personalInfo()->name());
        $this->assertSame('Senior Backend Developer', $portfolio->personalInfo()->title());
        $this->assertSame('portfolio@josemoreupeso.es', $portfolio->contactInfo()->email());
        $this->assertSame('+34 600 123 456', $portfolio->contactInfo()->phone());
        $this->assertSame($data['social_networks'], $portfolio->socialNetworks());
        $this->assertSame($data['skills'], $portfolio->skills());
    }

    public function test_from_array_should_handle_optional_personal_info_fields(): void
    {
        // Arrange
        $data = [
            'personal_info' => [
                'name' => 'Test User',
                'title' => 'Developer',
                'tagline' => 'Tagline',
                'bio' => 'Bio',
                'location' => 'Location'
                // photo and website are missing (optional)
            ],
            'contact' => [
                'email' => 'test@test.com',
                'phone' => '123'
            ],
            'social_networks' => [],
            'skills' => []
        ];

        // Act
        $portfolio = Portfolio::fromArray($data);

        // Assert
        $this->assertNull($portfolio->personalInfo()->photo());
        $this->assertNull($portfolio->personalInfo()->website());
    }

    public function test_from_array_should_throw_exception_for_invalid_personal_info(): void
    {
        // Arrange
        $data = [
            'personal_info' => 'invalid', // Should be array
            'contact' => ['email' => 'e@t.com', 'phone' => '123'],
            'social_networks' => [],
            'skills' => []
        ];

        // Assert
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('Missing or invalid personal_info');

        // Act
        Portfolio::fromArray($data);
    }

    public function test_from_array_should_throw_exception_for_missing_contact(): void
    {
        // Arrange
        $data = [
            'personal_info' => [
                'name' => 'N',
                'title' => 'T',
                'tagline' => 'Tag',
                'bio' => 'B',
                'location' => 'L'
            ],
            // contact is missing
            'social_networks' => [],
            'skills' => []
        ];

        // Assert
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('Missing or invalid contact');

        // Act
        Portfolio::fromArray($data);
    }

    public function test_from_array_should_throw_exception_for_invalid_email(): void
    {
        // Arrange
        $data = [
            'personal_info' => [
                'name' => 'N',
                'title' => 'T',
                'tagline' => 'Tag',
                'bio' => 'B',
                'location' => 'L'
            ],
            'contact' => [
                'email' => 123, // Invalid: should be string
                'phone' => '123'
            ],
            'social_networks' => [],
            'skills' => []
        ];

        // Assert
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('Invalid email');

        // Act
        Portfolio::fromArray($data);
    }
}
