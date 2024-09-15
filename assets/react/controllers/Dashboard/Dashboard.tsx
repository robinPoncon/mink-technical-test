import React, { useState } from "react";
import { Animal } from "../../../types/animalType";
import { formattedPrice } from "../Components/formattedPrice";

type ShowAnimalsProps = {
	animals: Animal[];
};

const Dashboard: React.FC<ShowAnimalsProps> = ({ animals }) => {
	const [openModal, setOpenModal] = useState<boolean>(false);
	// const [animal]

	return (
		<div>
			{openModal && (
				<div>
					<h2>Êtes-vous sûr de vouloir supprimer ?</h2>
				</div>
			)}
			<table>
				<thead>
					<tr>
						<th>Nom</th>
						<th>Type</th>
						<th>Race</th>
						<th>Prix</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{animals.map((animal) => (
						<tr key={animal.id}>
							<td>{animal.name}</td>
							<td>{animal.type}</td>
							<td>{animal.breed}</td>
							<td>{formattedPrice(animal.price)}</td>
							<a href={`/animal/${animal.id}/editer`}>Éditer</a>
							<button onClick={() => setOpenModal(true)}>Supprimer</button>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Dashboard;
