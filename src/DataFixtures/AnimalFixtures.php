<?php

namespace App\DataFixtures;

use App\Entity\Animal;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AnimalFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $animal1 = new Animal();
        $animal1->setName('Bessie');
        $animal1->setAge(4);
        $animal1->setType('Vache');
        $animal1->setBreed('Holstein');
        $animal1->setDescription('Une vache laitière très productive.');
        $animal1->setPrice(1200.0);
        $animal1->setPhotos(['bessie1.jpg']);

        $animal2 = new Animal();
        $animal2->setName('Dolly');
        $animal2->setAge(3);
        $animal2->setType('Mouton');
        $animal2->setBreed('Merinos');
        $animal2->setDescription('Un mouton avec une laine douce et épaisse.');
        $animal2->setPrice(800.0);
        $animal2->setPhotos(['dolly1.jpg']);

        $animal3 = new Animal();
        $animal3->setName('Didier');
        $animal3->setAge(2);
        $animal3->setType('Coq');
        $animal3->setBreed('Poule soie');
        $animal3->setDescription('Un coq coloré qui chante au lever du soleil.');
        $animal3->setPrice(50.0);
        $animal3->setPhotos(['didier1.jpg',]);

        $animal4 = new Animal();
        $animal4->setName('Clarance');
        $animal4->setAge(1);
        $animal4->setType('Poule');
        $animal4->setBreed('Poule de Bresse');
        $animal4->setDescription('Une poule connue pour ses œufs délicieux.');
        $animal4->setPrice(30.0);
        $animal4->setPhotos(['clara1.jpg']);

        $animal5 = new Animal();
        $animal5->setName('Thunder');
        $animal5->setAge(6);
        $animal5->setType('Cheval');
        $animal5->setBreed('Clydesdale');
        $animal5->setDescription('Un cheval puissant et majestueux, idéal pour le travail agricole.');
        $animal5->setPrice(2500.0);
        $animal5->setPhotos(['thunder1.jpg']);

        $animal6 = new Animal();
        $animal6->setName('Lola');
        $animal6->setAge(5);
        $animal6->setType('Âne');
        $animal6->setBreed('Âne du Poitou');
        $animal6->setDescription('Un âne robuste, parfait pour le travail et les promenades.');
        $animal6->setPrice(1000.0);
        $animal6->setPhotos(['lola1.jpg']);

        $animal7 = new Animal();
        $animal7->setName('Mia');
        $animal7->setAge(3);
        $animal7->setType('Chat');
        $animal7->setBreed('Siamois');
        $animal7->setDescription('Un chat affectueux et curieux.');
        $animal7->setPrice(300.0);
        $animal7->setPhotos(['mia1.jpg']);

        $animal8 = new Animal();
        $animal8->setName('Rex');
        $animal8->setAge(5);
        $animal8->setType('Chien');
        $animal8->setBreed('Berger Allemand');
        $animal8->setDescription('Un chien fidèle et protecteur.');
        $animal8->setPrice(500.0);
        $animal8->setPhotos(['rex1.jpg']);

        $animals = [$animal1, $animal2, $animal3, $animal4, $animal5, $animal6, $animal7, $animal8];

        foreach ($animals as $animal) {
            $manager->persist($animal);
        }
        
        $manager->flush();

    }
}
