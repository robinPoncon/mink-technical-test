import React from "react";

interface Animal {
	id?: number;
	name: string;
	age: number;
	type: string;
	breed: string;
	description?: string;
	price: number;
	photos?: string[];
}

type ShowAnimalsProps = {
	animals: Animal[];
};

const ShowAnimals: React.FC<ShowAnimalsProps> = ({ animals }) => {
	console.log("test " + JSON.stringify(animals));
	return (
		<div>
			{animals?.map((animal) => (
				<div key={animal.id}>
					<p className="font-bold">
						Nom : <span className="italic">{animal.name}</span>
					</p>
					{animal.photos?.map((photo) => (
						<img
							alt="animal image"
							src={`/uploads/animals/${photo}`}
							width={150}
							height={150}
						/>
					))}
				</div>
			))}
		</div>
	);
};

export default ShowAnimals;
