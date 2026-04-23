<?php

declare(strict_types=1);

namespace App\AuSoleil\Infrastructure\Http\Public;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class AuSoleilContactController extends AbstractController
{
    #[Route('/au-soleil/contacto', name: 'ausoleil_contact', methods: ['GET'])]
    public function __invoke(): Response
    {
        return $this->render('ausoleil/public/contact.html.twig');
    }
}
