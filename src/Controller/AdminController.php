<?php

namespace App\Controller;

use App\Entity\Animal;
use App\Service\AnimalFormatter;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\SecurityBundle\Security;

class AdminController extends AbstractController
{
    private $animalFormatter;

    public function __construct(AnimalFormatter $animalFormatter)
    {
        $this->animalFormatter = $animalFormatter;
    }

    #[Route('/admin/dashboard', name: 'admin_dashboard')]
    public function index(Security $security, EntityManagerInterface $em): Response
    {
        $animals = $em->getRepository(Animal::class)->findAll();
        $formattedAnimals = $this->animalFormatter->formatAnimals($animals);

        if (!$security->isGranted('ROLE_ADMIN')) {
            throw $this->createAccessDeniedException('Accès refusé.');
        }

        return $this->render('admin/dashboard.html.twig', [
            "animals" => $formattedAnimals
        ]);
    }
}
