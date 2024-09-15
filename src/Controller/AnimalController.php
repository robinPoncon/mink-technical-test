<?php

namespace App\Controller;

use App\Entity\Animal;
use App\Service\AnimalFormatter;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class AnimalController extends AbstractController
{
    private $animalFormatter;

    public function __construct(AnimalFormatter $animalFormatter)
    {
        $this->animalFormatter = $animalFormatter;
    }

    #[Route('/', name: 'app_animal_index')]
    public function index(EntityManagerInterface $em): Response
    {
        $animals = $em->getRepository(Animal::class)->findAll();
        $formattedAnimals = $this->animalFormatter->formatAnimals($animals);

        return $this->render('animal/index.html.twig', [
            'animals' => $formattedAnimals,
        ]);
    }

    #[Route('/animal/{id}', name: 'app_animal_show_detail', methods: ["GET"])]
    public function showAnimal(int $id, EntityManagerInterface $em): Response {
        $animal = $em->getRepository(Animal::class)->find($id);
        if (!$animal) {
            throw $this->createNotFoundException("Cet animal n'est plus en vente ou n'existe pas");
        }

        $formatAnimal = $this->animalFormatter->formatAnimal($animal);

        return $this->render("animal/showAnimal.html.twig", [
            "animal" => $formatAnimal
        ]);
    }
}


