<?php

declare(strict_types=1);

namespace App\Tests\Unit\Domain\Portfolio;

use App\Domain\Portfolio\ContactInfo;
use App\Domain\Portfolio\PersonalInfo;
use App\Domain\Portfolio\Portfolio;
use App\Domain\Portfolio\Skill;
use App\Domain\Portfolio\SkillLevel;
use PHPUnit\Framework\TestCase;

/**
 * Portfolio Aggregate Root Tests.
 */
final class PortfolioTest extends TestCase
{
    /** @phpstan-ignore-next-line Initialized in setUp() */
    private PersonalInfo $personalInfo;

    /** @phpstan-ignore-next-line Initialized in setUp() */
    private ContactInfo $contactInfo;

    protected function setUp(): void
    {
        $this->personalInfo = new PersonalInfo(
            name: 'Jose Test',
            title: 'Test Developer',
            tagline: 'Test tagline',
            bio: 'Test bio',
            location: 'Test City',
            photo: null,
            website: null
        );

        $this->contactInfo = new ContactInfo(
            email: 'test@example.com',
            phone: '+34 600 000 000',
            github: 'testuser',
            linkedin: 'testuser',
            instagram: null,
            website: 'https://example.com'
        );
    }

    public function testSkillsReturnsSkillObjects(): void
    {
        $skill = new Skill('PHP', SkillLevel::Expert, 9);
        $portfolio = new Portfolio(
            personalInfo: $this->personalInfo,
            contactInfo: $this->contactInfo,
            socialNetworks: [],
            skills: [$skill]
        );

        $skills = $portfolio->skills();

        $this->assertCount(1, $skills);
        $this->assertInstanceOf(Skill::class, $skills[0]);
        $this->assertSame('PHP', $skills[0]->name());
        $this->assertSame(SkillLevel::Expert, $skills[0]->level());
    }

    public function testFromArrayConvertsSkillArraysToSkillObjects(): void
    {
        $data = [
            'personal_info' => [
                'name' => 'Jose Test',
                'title' => 'Test Developer',
                'tagline' => 'Test tagline',
                'bio' => 'Test bio',
                'location' => 'Test City',
            ],
            'contact' => [
                'email' => 'test@example.com',
                'phone' => '+34 600 000 000',
                'github' => 'testuser',
                'linkedin' => 'testuser',
                'website' => 'https://example.com',
            ],
            'social_networks' => [],
            'skills' => [
                ['name' => 'PHP', 'level' => 'expert', 'years' => 9],
                ['name' => 'Symfony', 'level' => 'advanced', 'years' => 4],
            ],
        ];

        $portfolio = Portfolio::fromArray($data);
        $skills = $portfolio->skills();

        $this->assertCount(2, $skills);
        $this->assertContainsOnlyInstancesOf(Skill::class, $skills);
        $this->assertSame('PHP', $skills[0]->name());
        $this->assertSame(SkillLevel::Expert, $skills[0]->level());
        $this->assertSame('Symfony', $skills[1]->name());
        $this->assertSame(SkillLevel::Advanced, $skills[1]->level());
    }

    public function testPersonalInfoIsAccessible(): void
    {
        $portfolio = new Portfolio(
            personalInfo: $this->personalInfo,
            contactInfo: $this->contactInfo,
            socialNetworks: [],
            skills: []
        );

        $this->assertSame($this->personalInfo, $portfolio->personalInfo());
    }

    public function testContactInfoIsAccessible(): void
    {
        $portfolio = new Portfolio(
            personalInfo: $this->personalInfo,
            contactInfo: $this->contactInfo,
            socialNetworks: [],
            skills: []
        );

        $this->assertSame($this->contactInfo, $portfolio->contactInfo());
    }
}
