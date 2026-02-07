<?php

declare(strict_types=1);

namespace App\Domain\Model\Portfolio\Entity;

final class Portfolio
{
    /**
     * @param array<string, string> $socialNetworks
     * @param array<int, array<string, mixed>> $skills
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
     * @return array<string, string>
     */
    public function socialNetworks(): array
    {
        return $this->socialNetworks;
    }

    /**
     * @return array<int, array<string, mixed>>
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

        $personalInfo = $data['personal_info'];
        $contact = $data['contact'];

        return new self(
            new PersonalInfo(
                is_string($personalInfo['name'] ?? null) ? $personalInfo['name'] : throw new \InvalidArgumentException('Invalid name'),
                is_string($personalInfo['title'] ?? null) ? $personalInfo['title'] : throw new \InvalidArgumentException('Invalid title'),
                is_string($personalInfo['tagline'] ?? null) ? $personalInfo['tagline'] : throw new \InvalidArgumentException('Invalid tagline'),
                is_string($personalInfo['bio'] ?? null) ? $personalInfo['bio'] : throw new \InvalidArgumentException('Invalid bio'),
                is_string($personalInfo['location'] ?? null) ? $personalInfo['location'] : throw new \InvalidArgumentException('Invalid location'),
                isset($personalInfo['photo']) && is_string($personalInfo['photo']) ? $personalInfo['photo'] : null,
                isset($personalInfo['website']) && is_string($personalInfo['website']) ? $personalInfo['website'] : null
            ),
            new ContactInfo(
                is_string($contact['email'] ?? null) ? $contact['email'] : throw new \InvalidArgumentException('Invalid email'),
                is_string($contact['phone'] ?? null) ? $contact['phone'] : throw new \InvalidArgumentException('Invalid phone')
            ),
            $data['social_networks'],
            $data['skills']
        );
    }
}
