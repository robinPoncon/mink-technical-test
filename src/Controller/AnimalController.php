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

    #[Route('/animal/{id}', name: 'app_animal_show_detail', methods: ["GET"], requirements: ["id" => "\d+"])]
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

    #[Route('/animal/ajouter', name: 'add_animal_form', methods: ["GET"])]
    public function addAnimalForm(): Response {
        return $this->render("animal/addAnimal.html.twig");
    }

    #[Route('/animal/ajouter', name: 'add_animal', methods: ["POST"])]
    public function addAnimal(EntityManagerInterface $em, Request $request, Security $security): JsonResponse {
        if (!$security->isGranted('ROLE_ADMIN')) {
            throw $this->createAccessDeniedException('Accès refusé.');
        }

        $name = $request->request->get('name');
        $age = (int)$request->request->get('age');
        $type = $request->request->get('type');
        $breed = $request->request->get('breed');
        $description = $request->request->get('description');
        $price = (float)$request->request->get('price');

        if (!$name || !$age || !$type || !$breed || !$price) {
            return new JsonResponse(['message' => 'Erreur, il manque des données obligatoires.'], 400);
        }

        $animal = new Animal();
        $animal->setName($name);
        $animal->setAge($age);
        $animal->setType($type);
        $animal->setBreed($breed);
        $animal->setDescription($description ?? null);
        $animal->setPrice($price);

        $validFormats = ["image/jpeg", "image/png", "image/jpg"];
        $photos = $request->files->get('newPhotos');
        $uploadedPhotos = [];

        if ($photos) {
            foreach ($photos as $photo) {
                if (in_array($photo->getMimeType(), $validFormats)) {
                    $fileName = uniqid() . '-' . $photo->getClientOriginalName(); 
                    $photo->move($this->getParameter('kernel.project_dir') . '/public/uploads/animals', $fileName);
                    $uploadedPhotos[] = $fileName;
                } else {
                    return new JsonResponse(['message' => 'Format de fichier non autorisé.'], 400);
                }
            }
        }

        $animal->setPhotos($uploadedPhotos);

        $em->persist($animal);
        $em->flush();

        return new JsonResponse(['status' => 'success'], 200);
    }

    #[Route('/animal/editer/{id}', name: 'edit_animal_form', methods: ["GET"])]
    public function editAnimalForm($id, EntityManagerInterface $em): Response {
        $animal = $em->getRepository(Animal::class)->find($id);
        if (!$animal) {
            throw $this->createNotFoundException("Cet animal n'est plus en vente ou n'existe pas");
        }

        $formatAnimal = $this->animalFormatter->formatAnimal($animal);

        return $this->render("animal/editAnimal.html.twig", [
            "animal" => $formatAnimal
        ]);
    }

    #[Route('/animal/editer/{id}', name: 'edit_animal', methods: ["POST"])]
    public function editAnimal($id, Animal $animal, Request $request, EntityManagerInterface $em, Security $security): JsonResponse {
        if (!$security->isGranted('ROLE_ADMIN')) {
            throw $this->createAccessDeniedException('Accès refusé.');
        }
    
        $animal = $em->getRepository(Animal::class)->find($id);
        $name = $request->request->get('name');
        $age = (int)$request->request->get('age');
        $type = $request->request->get('type');
        $breed = $request->request->get('breed');
        $description = $request->request->get('description');
        $price = (float)$request->request->get('price');

        if (!$name || !$age || !$type || !$breed || !$price) {
            return new JsonResponse(['message' => 'Erreur, il manque des données obligatoires.'], 400);
        }

        $animal->setName($name);
        $animal->setAge($age);
        $animal->setType($type);
        $animal->setBreed($breed);
        $animal->setDescription($description ?? null);
        $animal->setPrice($price);

        $validFormats = ["image/jpeg", "image/png", "image/jpg"];
        $newPhotos = $request->files->get('newPhotos', []);
        $existingPhotos = $request->request->all('photos');
        $uploadedPhotos = [];
        $currentPhotosInDb = $animal->getPhotos() ?? [];
        $photosToDelete = array_diff($currentPhotosInDb, $existingPhotos);
    
        foreach ($photosToDelete as $photoToDelete) {
            $photoPath = $this->getParameter('kernel.project_dir') . '/public/uploads/animals/' . $photoToDelete;
            if (file_exists($photoPath)) {
                unlink($photoPath); 
            }
        }
    
        $uploadedPhotos = array_merge($uploadedPhotos, $existingPhotos);
    
        if ($newPhotos) {
            foreach ($newPhotos as $photo) {
                if ($photo && in_array($photo->getMimeType(), $validFormats)) {
                    $fileName = uniqid() . '-' . $photo->getClientOriginalName(); 
                    $photo->move($this->getParameter('kernel.project_dir') . '/public/uploads/animals', $fileName);
                    $uploadedPhotos[] = $fileName;
                } else {
                    return new JsonResponse(['message' => 'Format de fichier non autorisé.'], 400);
                }
            }
        }

        $animal->setPhotos($uploadedPhotos);
    
        $em->persist($animal);
        $em->flush();
    
        return new JsonResponse(['status' => 'success'], 200);
    }

    #[Route("/animal/supprimer/{id}", name: "delete_animal", methods: ["DELETE"])]
    public function deleteAnimal(int $id, EntityManagerInterface $em, Security $security): JsonResponse
    {
        if (!$security->isGranted('ROLE_ADMIN')) {
            throw $this->createAccessDeniedException('Accès refusé.');
        }

        $animal = $em->getRepository(Animal::class)->find($id);

        if (!$animal) {
            return new JsonResponse(["status" => "Animal not found"], 404);
        }

        $uploadDirectory = $this->getParameter('kernel.project_dir').'/public/uploads/animals';

        $photos = $animal->getPhotos();
        foreach ($photos as $photo) {
            $photoPath = $uploadDirectory.'/'.$photo;
            if (file_exists($photoPath)) {
                unlink($photoPath);
            }
        }

        $em->remove($animal);
        $em->flush();

        return new JsonResponse(["status" => "success"], 200);
    }
}


