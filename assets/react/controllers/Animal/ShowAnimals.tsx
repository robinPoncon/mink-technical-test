import React, { useEffect, useState } from "react";
import { Animal } from "../../../types/animalType";
import { formattedPrice } from "../Components/formattedPrice";

type ShowAnimalsProps = {
	animals: Animal[];
};

const ShowAnimals: React.FC<ShowAnimalsProps> = ({ animals }) => {
	const [filteredAnimals, setFilteredAnimals] = useState<Animal[]>(animals);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [sortOption, setSortOption] = useState<string>("");

	useEffect(() => {
		let filtered = [...animals];

		if (searchTerm !== "") {
			filtered = animals.filter(
				(animal) =>
					animal.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
					animal.type.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
					animal.breed.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
			);
		}

		switch (sortOption) {
			case "age-asc":
				filtered.sort((a, b) => Number(a.age) - Number(b.age));
				break;
			case "age-desc":
				filtered.sort((a, b) => Number(b.age) - Number(a.age));
				break;
			case "price-asc":
				filtered.sort((a, b) => Number(a.price) - Number(b.price));
				break;
			case "price-desc":
				filtered.sort((a, b) => Number(b.price) - Number(a.price));
				break;
			default:
				break;
		}

		setFilteredAnimals(filtered);
	}, [searchTerm, sortOption]);

	return (
		<section className="mx-2">
			<div className="flex flex-col gap-3 text-center w-fit mx-auto">
				<label htmlFor="search">
					Vous pouvez rechercher un animal via son nom, son type ou sa race !
				</label>
				<input
					className="p-2 rounded-md"
					type="text"
					id="search"
					placeholder="Rechercher un animal"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.currentTarget.value)}
				/>
			</div>
			<div className="flex flex-col gap-3 text-center w-fit mx-auto mt-10">
				<label htmlFor="sort">
					Vous pouvez trier les animaux via leur âge ou leur prix !
				</label>
				<select
					className="bg-white p-2 rounded-md w-fit mx-auto"
					id="sort"
					value={sortOption}
					onChange={(e) => setSortOption(e.currentTarget.value)}
				>
					<option value="">Aucun tri</option>
					<option value="age-asc">Âge croissant</option>
					<option value="age-desc">Âge décroissant</option>
					<option value="price-asc">Prix croissant</option>
					<option value="price-desc">Prix décroissant</option>
				</select>
			</div>
			<div className="flex flex-wrap justify-around py-10 gap-10">
				{filteredAnimals.length > 0 ? (
					filteredAnimals?.map((animal) => (
						<div
							className="flex flex-col gap-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-white rounded-md p-5 h-fit my-auto"
							key={animal.id}
						>
							<p className="font-bold text-xl text-center">
								Nom : <span className="italic">{animal.name}</span>
							</p>
							{animal.photos && animal.photos[0] ? (
								<img
									className="w-52 h-52 mx-auto"
									alt="animal image"
									src={`/uploads/animals/${animal.photos[0]}`}
								/>
							) : null}
							<p className="font-bold text-lg text-center">
								Âge : <span className="italic">{`${animal.age} ans`}</span>
							</p>
							<p className="font-bold text-lg text-center">
								Race : <span className="italic">{animal.breed}</span>
							</p>
							<p className="font-bold text-lg text-center">
								Prix :{" "}
								<span className="text-2xl">{formattedPrice(animal.price)}</span>
							</p>
							<a
								href={`/animal/${animal.id}`}
								className="bg-green-600 text-white font-semibold py-2 px-3 rounded-md w-fit mx-auto hover:bg-green-700"
							>
								Voir en détail
							</a>
						</div>
					))
				) : (
					<div>Aucun animal ne correspond à votre recherche !</div>
				)}
			</div>
		</section>
	);
};

export default ShowAnimals;
