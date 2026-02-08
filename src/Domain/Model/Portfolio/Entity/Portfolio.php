<?php

declare(strict_types=1);

namespace App\Domain\Model\Portfolio\Entity;

final class Portfolio
{
    /**
     * @param array<array<string, mixed>> $socialNetworks
     * @param array<array<string, mixed>> $skills
     */
    public function __construct(
        private readonly PersonalInfo $personalInfo,
        private readonly ContactInfo $contactInfo,
        private readonly array $socialNetworks,
        private readonly array $skills
    ) {}

    public function personalInfo(): PersonalInfo
    {
        return $this->personalInfo;
    }

    public function contactInfo(): ContactInfo
    {
        return $this->contactInfo;
    }

    /**
     * @return array<array<string, mixed>>
     */
    public function socialNetworks(): array
    {
        return $this->socialNetworks;
    }

    /**
     * @return array<array<string, mixed>>
     */
    public function skills(): array
    {
        return $this->skills;
    }

    /**
     * @param array<string, mixed> $data
     */
    public static function fromArray(array $data): self
    {
        if (!isset($data['personal_info']) || !is_array($data['personal_info'])) {
            throw new \InvalidArgumentException('Missing or invalid personal_info');
        }

        if (!isset($data['contact']) || !is_array($data['contact'])) {
            throw new \InvalidArgumentException('Missing or invalid contact');
        }

        if (!isset($data['social_networks']) || !is_array($data['social_networks'])) {
            throw new \InvalidArgumentException('Missing or invalid social_networks');
        }

        if (!isset($data['skills']) || !is_array($data['skills'])) {
            throw new \InvalidArgumentException('Missing or invalid skills');
        }

        /** @var array<string, mixed> $personalInfo */
        $personalInfo = $data['personal_info'];

        /** @var array<string, mixed> $contact */
        $contact = $data['contact'];

        $name = $personalInfo['name'] ?? '';
        $title = $personalInfo['title'] ?? '';
        $tagline = $personalInfo['tagline'] ?? '';
        $bio = $personalInfo['bio'] ?? '';
        $location = $personalInfo['location'] ?? '';
        $email = $contact['email'] ?? '';
        $phone = $contact['phone'] ?? '';
        $github = $contact['github'] ?? '';
        $linkedin = $contact['linkedin'] ?? '';
        $contactWebsite = $contact['website'] ?? '';

        assert(is_string($name));
        assert(is_string($title));
        assert(is_string($tagline));
        assert(is_string($bio));
        assert(is_string($location));
        assert(is_string($email));
        assert(is_string($phone));
        assert(is_string($github));
        assert(is_string($linkedin));
        assert(is_string($contactWebsite));

        $photo = isset($personalInfo['photo']) && is_string($personalInfo['photo']) ? $personalInfo['photo'] : null;
        $website = isset($personalInfo['website']) && is_string($personalInfo['website']) ? $personalInfo['website'] : null;
        $instagram = isset($contact['instagram']) && is_string($contact['instagram']) ? $contact['instagram'] : null;

        return new self(
            new PersonalInfo($name, $title, $tagline, $bio, $location, $photo, $website),
            new ContactInfo($email, $phone, $github, $linkedin, $instagram, $contactWebsite),
            $data['social_networks'],
            $data['skills']
        );
    }
}
