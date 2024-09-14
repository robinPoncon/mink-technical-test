<?php

namespace App\Controller;

use App\Entity\Animal;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class AnimalController extends AbstractController
{
    public function formatAnimal(Animal $animal): array {
        return [
            'id' => $animal->getId(),
            'name' => $animal->getName(),
            'age' => $animal->getAge(),
            'type' => $animal->getType(),
            'breed' => $animal->getBreed(),
            'description' => $animal->getDescription(),
            'price' => $animal->getPrice(),
            'photos' => $animal->getPhotos(),
        ];
    }

    public function formatAnimals(array $animals) {
        return array_map(function (Animal $animal) {
            return $this->formatAnimal($animal);
        }, $animals);
    }

    #[Route('/', name: 'app_animal_index')]
    public function index(EntityManagerInterface $em): Response
    {
        $animals = $em->getRepository(Animal::class)->findAll();

        $formattedAnimals = $this->formatAnimals($animals);

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

        $formatAnimal = $this->formatAnimal($animal);

        return $this->render("animal/showAnimal.html.twig", [
            "animal" => $formatAnimal
        ]);
    }
}


