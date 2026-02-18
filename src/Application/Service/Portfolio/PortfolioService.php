<?php

declare(strict_types=1);

namespace App\Application\Service\Portfolio;

use App\Domain\Portfolio\Portfolio;
use App\Domain\Portfolio\PortfolioRepository;

final class PortfolioService
{
    public function __construct(
        private readonly PortfolioRepository $portfolioRepository
    ) {
    }

    public function getPortfolio(): Portfolio
    {
        return $this->portfolioRepository->find();
    }

    /**
     * @return array<string, string|null>
     */
    public function getPersonalInfo(): array
    {
        $portfolio = $this->getPortfolio();

        return [
            'name' => $portfolio->personalInfo()->name(),
            'title' => $portfolio->personalInfo()->title(),
            'tagline' => $portfolio->personalInfo()->tagline(),
            'bio' => $portfolio->personalInfo()->bio(),
            'location' => $portfolio->personalInfo()->location(),
            'photo' => $portfolio->personalInfo()->photo(),
            'website' => $portfolio->personalInfo()->website(),
        ];
    }

    /**
     * @return array<string, string|null>
     */
    public function getContactInfo(): array
    {
        $portfolio = $this->getPortfolio();

        return [
            'email' => $portfolio->contactInfo()->email(),
            'phone' => $portfolio->contactInfo()->phone(),
            'github' => $portfolio->contactInfo()->github(),
            'linkedin' => $portfolio->contactInfo()->linkedin(),
            'instagram' => $portfolio->contactInfo()->instagram(),
            'website' => $portfolio->contactInfo()->website(),
        ];
    }
}
