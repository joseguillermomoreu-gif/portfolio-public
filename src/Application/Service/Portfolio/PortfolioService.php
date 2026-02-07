<?php

declare(strict_types=1);

namespace App\Application\Service\Portfolio;

use App\Domain\Model\Portfolio\Entity\Portfolio;
use App\Domain\Model\Portfolio\Repository\PortfolioRepositoryInterface;

final class PortfolioService 
{
    public function __construct(
        private readonly PortfolioRepositoryInterface $portfolioRepository
    ) {}
    
    public function getPortfolio(): Portfolio 
    {
        return $this->portfolioRepository->find();
    }
    
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
    
    public function getContactInfo(): array
    {
        $portfolio = $this->getPortfolio();
        
        return [
            'email' => $portfolio->contactInfo()->email(),
            'phone' => $portfolio->contactInfo()->phone(),
        ];
    }
}
