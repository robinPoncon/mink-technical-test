<?php

namespace App\Controller;

use App\Entity\Animal;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class AnimalController extends AbstractController
{
    public function formattedDatas(array $animals) {
        return array_map(function (Animal $animal) {
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
        }, $animals);
    }

    #[Route('/', name: 'app_animal_index')]
    public function index(EntityManagerInterface $em): Response
    {
        $animals = $em->getRepository(Animal::class)->findAll();

        $formattedAnimals = $this->formattedDatas($animals);

        return $this->render('animal/index.html.twig', [
            'animals' => $formattedAnimals,
        ]);
    }
}


