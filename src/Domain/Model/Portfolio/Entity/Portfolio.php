<?php

declare(strict_types=1);

namespace App\Domain\Model\Portfolio\Entity;

final class Portfolio
{
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

    public function socialNetworks(): array
    {
        return $this->socialNetworks;
    }

    public function skills(): array
    {
        return $this->skills;
    }

    public static function fromArray(array $data): self
    {
        return new self(
            new PersonalInfo(
                $data['personal_info']['name'],
                $data['personal_info']['title'],
                $data['personal_info']['tagline'], 
                $data['personal_info']['bio'],
                $data['personal_info']['location'],
                $data['personal_info']['photo'] ?? null,
                $data['personal_info']['website'] ?? null
            ),
            new ContactInfo(
                $data['contact']['email'],
                $data['contact']['phone']
            ),
            $data['social_networks'],
            $data['skills']
        );
    }
}
