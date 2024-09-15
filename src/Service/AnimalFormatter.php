<?php

namespace App\Service;

use App\Entity\Animal;

class AnimalFormatter
{
    public function formatAnimal(Animal $animal): array
    {
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

    public function formatAnimals(array $animals): array
    {
        return array_map(function (Animal $animal) {
            return $this->formatAnimal($animal);
        }, $animals);
    }
}