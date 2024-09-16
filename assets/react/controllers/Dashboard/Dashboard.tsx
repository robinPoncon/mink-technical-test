import React, { useState } from "react";
import { Animal } from "../../../types/animalType";
import { FlashMessage } from "../../../types/flashMessageType";
import { formattedPrice } from "../Components/formattedPrice";

type ShowAnimalsProps = {
	getAnimals: Animal[];
};

const Dashboard: React.FC<ShowAnimalsProps> = ({ getAnimals }) => {
	const [animals, setAnimals] = useState<Animal[]>(getAnimals);
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [animalSelected, setAnimalSelected] = useState<Animal | null>(null);
	const [flashMessage, setFlashMessage] = useState<FlashMessage | null>(null);

	const openDeleteConfirmationModal = (animal: Animal) => {
		setAnimalSelected(animal);
		setOpenModal(true);
	};

	const cancelDelete = () => {
		setAnimalSelected(null);
		setOpenModal(false);
	};

	const deleteAnimal = async () => {
		if (animalSelected) {
			try {
				const response = await fetch(`/animal/supprimer/${animalSelected.id}`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json"
					}
				});

				if (response.ok) {
					window.scrollTo(0, 0);
					setFlashMessage({
						type: "success",
						message: `L'animal ${animalSelected.name} a bien été supprimé !`
					});
					const copyAnimals = [...animals];
					const indexDelete = copyAnimals.findIndex(
						(animal) => animal === animalSelected
					);
					copyAnimals.splice(indexDelete, 1);
					setAnimals(copyAnimals);
					setAnimalSelected(null);
					setOpenModal(false);
				} else {
					setFlashMessage({
						type: "error",
						message: `Une erreur est survenue, l'animal ${animalSelected.name} n'a pas été supprimé !`
					});
				}
			} catch (error) {
				setFlashMessage({
					type: "error",
					message: `Une erreur est survenue, l'animal ${animalSelected.name} n'a pas été supprimé !`
				});
			}
		}
	};

	return (
		<div className="w-full px-4 pb-10">
			{animalSelected && openModal && (
				<div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
					<div className="bg-white p-5 rounded-lg shadow-lg w-1/3 max-w-lg">
						<h2>Êtes-vous sûr de vouloir supprimer {animalSelected.name} ?</h2>
						<div className="mt-4 flex justify-end space-x-4">
							<button
								onClick={cancelDelete}
								className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
							>
								Annuler
							</button>
							<button
								onClick={deleteAnimal}
								className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
							>
								Supprimer
							</button>
						</div>
					</div>
				</div>
			)}
			<div className="flex justify-center gap-4 pb-10">
				<h2 className="text-center text-lg my-auto font-semibold">
					Envie d'ajouter un nouvel animal ?
				</h2>
				<a
					className="flex py-2 px-3 gap-2 rounded-md bg-gray-700 text-white hover:bg-gray-900"
					href="/animal/ajouter"
				>
					Ajouter
					<img
						className="w-6 h-6"
						src="/icons/icon_add.svg"
						alt="icon add"
					/>
				</a>
			</div>
			<div className="w-fit mx-auto">
				{flashMessage && (
					<div
						className={`py-2 px-4 mb-5 rounded-md text-center ${
							flashMessage.type === "success" ? "bg-green-200" : "bg-red-200"
						}`}
					>
						<p>{flashMessage.message}</p>
					</div>
				)}
				<table className="bg-white border-2 border-gray-300 rounded-md">
					<thead className="rounded-t-md">
						<tr>
							<th className="border-2 py-2 px-3 border-gray-300">Nom</th>
							<th className="border-2 py-2 px-3 border-gray-300">Type</th>
							<th className="border-2 py-2 px-3 border-gray-300">Race</th>
							<th className="border-2 py-2 px-3 border-gray-300">Prix</th>
							<th className="border-2 py-2 px-3 border-gray-300">Actions</th>
						</tr>
					</thead>
					<tbody className="rounded-b-md">
						{animals.map((animal) => (
							<tr
								key={animal.id}
								className="odd:bg-gray-100"
							>
								<td className="p-4  border-2 border-gray-300">{animal.name}</td>
								<td className="p-4 border-2 border-gray-300">{animal.type}</td>
								<td className="p-4 border-2 border-gray-300">{animal.breed}</td>
								<td className="p-4 border-2 border-gray-300">
									{formattedPrice(animal.price)}
								</td>
								<td className="p-4 flex gap-4">
									<a
										className="flex gap-2 bg-blue-600 text-white rounded-md py-2 px-3 hover:bg-blue-700"
										href={`/animal/editer/${animal.id}`}
									>
										<img
											className="w-6 h-6"
											src="/icons/icon_edit.svg"
											alt="icon edit"
										/>
										Éditer
									</a>
									<button
										className="bg-red-600 text-white rounded-md py-2 px-3 hover:bg-red-700"
										onClick={() => openDeleteConfirmationModal(animal)}
									>
										Supprimer
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Dashboard;
