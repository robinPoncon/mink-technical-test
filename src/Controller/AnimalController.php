<?php

namespace App\Controller;

use App\Entity\Animal;
use App\Service\AnimalFormatter;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
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

    #[Route("/animal/supprimer/{id}", name: "delete_animal", methods: ["DELETE"])]
    public function deleteAnimal($id, EntityManagerInterface $em, Security $security): JsonResponse
    {
        if (!$security->isGranted('ROLE_ADMIN')) {
            throw $this->createAccessDeniedException('Accès refusé.');
        }

        $animal = $em->getRepository(Animal::class)->find($id);

        if (!$animal) {
            return new JsonResponse(["status" => "Animal not found"], 404);
        }

        $em->remove($animal);
        $em->flush();

        return new JsonResponse(["status" => "success"], 200);
    }

    #[Route('/animal/creer', name: 'create_animal', methods: ["POST"])]
    public function createAnimal(EntityManagerInterface $em, Request $request, Security $security) {
        if (!$security->isGranted('ROLE_ADMIN')) {
            throw $this->createAccessDeniedException('Accès refusé.');
        }

        $data = json_decode($request->getContent(), true);

        if (!$data["name"] || !$data["age"] || !$data["type"] || !$data["breed"] || !$data["price"]) {
            return new JsonResponse(['message' => 'Erreur, il manque des données obligatoires.'], 400);
        }

        $animal = new Animal();
        $animal->setName($data["name"]);
        $animal->setAge($data["age"]);
        $animal->setType($data["type"]);
        $animal->setBreed($data["breed"]);
        $animal->setDescription($data["description"] ?? null);
        $animal->setPrice($data["price"]);
        $animal->setPhotos($data["photos"] ?? null);

        $em->persist($animal);
        $em->flush();

        return new JsonResponse(['status' => 'success'], 200);
    }

    #[Route('/animal/{id}/editer', name: 'edit_animal', methods: ["POST"])]
    public function editAnimal($id, Request $request, EntityManagerInterface $em, Security $security): JsonResponse {
        if (!$security->isGranted('ROLE_ADMIN')) {
            throw $this->createAccessDeniedException('Accès refusé.');
        }

        $animal = $em->getRepository(Animal::class)->find($id);

        if (!$animal) {
            return new JsonResponse(['message' => 'Animal not found'], 404);
        }

        $data = json_decode($request->getContent(), true);

        if (!$data["name"] || !$data["age"] || !$data["type"] || !$data["breed"] || !$data["price"]) {
            return new JsonResponse(['message' => 'Erreur, il manque des données obligatoires.'], 400);
        }

        $animal->setName($data["name"]);
        $animal->setAge($data["age"]);
        $animal->setType($data["type"]);
        $animal->setBreed($data["breed"]);
        $animal->setDescription($data["description"] ?? null);
        $animal->setPrice($data["price"]);
        $animal->setPhotos($data["photos"] ?? null);

        $em->persist($animal);
        $em->flush();

        return new JsonResponse(['status' => 'success'], 200);
    }
}


