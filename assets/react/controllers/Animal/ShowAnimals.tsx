import React from "react";
import { Animal } from "../../../types/animalType";
import { formattedPrice } from "../Components/formattedPrice";

type ShowAnimalsProps = {
	animals: Animal[];
};

const ShowAnimals: React.FC<ShowAnimalsProps> = ({ animals }) => {
	return (
		<div className="flex flex-wrap justify-around py-10 gap-10 mx-2">
			{animals?.map((animal) => (
				<div
					className="flex flex-col gap-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-white rounded-md p-5"
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
						Race : <span className="italic">{animal.breed}</span>
					</p>
					<p className="font-bold text-lg text-center">
						Prix : <span className="text-2xl">{formattedPrice(animal.price)}</span>
					</p>
					<a
						href={`/animal/${animal.id}`}
						className="bg-green-600 text-white font-semibold py-2 px-3 rounded-md w-fit mx-auto hover:bg-green-700"
					>
						Voir en détail
					</a>
				</div>
			))}
		</div>
	);
};

export default ShowAnimals;
