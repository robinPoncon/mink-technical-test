import React, { ChangeEvent, FocusEvent, FormEvent, useEffect, useState } from "react";
import { Animal } from "../../../types/animalType";
import { FlashMessage } from "../../../types/flashMessageType";
import { formattedDatas } from "../Components/formattedDatas";

type errorMessages = {
	name: string;
	message: string | null;
};

const AddAnimal = () => {
	const [flashMessage, setFlashMessage] = useState<FlashMessage | null>(null);
	const [errorMessages, setErrorMessages] = useState<errorMessages[]>([
		{ name: "name", message: null },
		{ name: "age", message: null },
		{ name: "type", message: null },
		{ name: "breed", message: null },
		{ name: "price", message: null }
	]);
	const [isBtnDisabled, setIsBtnDisabled] = useState(true);
	const [formData, setFormData] = useState<Animal>({
		name: "",
		age: "",
		type: "",
		breed: "",
		description: "",
		price: "",
		photos: [],
		newPhotos: []
	});

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		let valueInput = value;
		if (name === "age" || name === "price") {
			valueInput = valueInput.replace(/[^0-9]+/, "");
		}
		setFormData({
			...formData,
			[name]: valueInput
		});
	};

	const handleChangeTextarea = (event: ChangeEvent<HTMLTextAreaElement>) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value
		});
	};

	const uploadPhotos = (event: ChangeEvent<HTMLInputElement>) => {
		const getPhotos = event?.currentTarget.files;
		if (getPhotos) {
			const filesArray = Array.from(getPhotos);
			setFormData({
				...formData,
				newPhotos: filesArray
			});
		}
	};

	const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
		const { name, value } = event.currentTarget;
		const copyErrorMsg = [...errorMessages];
		const getIndexName = copyErrorMsg.findIndex((element) => element.name === name);
		if (!value) {
			copyErrorMsg[getIndexName].message = "Ce champs est obligatoire";
		} else {
			copyErrorMsg[getIndexName].message = null;
		}
		setErrorMessages(copyErrorMsg);
	};

	const isErrorMsg = () => {
		return errorMessages.find((element) => element.message);
	};

	useEffect(() => {
		if (
			formData.name &&
			formData.age &&
			formData.type &&
			formData.breed &&
			formData.price &&
			!isErrorMsg()
		) {
			setIsBtnDisabled(false);
		} else {
			setIsBtnDisabled(true);
		}
	}, [formData]);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event?.preventDefault();
		if (formData) {
			const submitDatas = formattedDatas(formData);

			try {
				const response = await fetch(`/animal/ajouter`, {
					method: "POST",
					body: submitDatas
				});

				if (response.ok) {
					window.scrollTo(0, 0);
					setFlashMessage({
						type: "success",
						message: `L'animal ${formData.name} a bien été ajouté !`
					});
				} else {
					setFlashMessage({
						type: "error",
						message: `Une erreur est survenue, l'animal ${formData.name} n'a pas pu être ajouté !`
					});
				}
			} catch (error) {
				setFlashMessage({
					type: "error",
					message: `Une erreur est survenue, l'animal ${formData.name} n'a pas pu être ajouté !`
				});
			}
		}
	};

	return (
		<div className="mx-2">
			<form
				className="w-full mx-auto flex flex-col gap-5 sm:w-96"
				onSubmit={handleSubmit}
			>
				{flashMessage && (
					<div
						className={`py-2 px-4 mb-5 rounded-md text-center ${
							flashMessage.type === "success" ? "bg-green-200" : "bg-red-200"
						}`}
					>
						<p>{flashMessage.message}</p>
					</div>
				)}
				<div className="flex flex-col">
					<label htmlFor="name">
						Nom de l'animal <span className="text-red-500">*</span>
					</label>
					<input
						className={`rounded-sm p-2 ${
							errorMessages[0].message ? "border-2 border-red-500" : ""
						}`}
						type="text"
						name="name"
						id="name"
						value={formData.name}
						onChange={handleChange}
						required
						onBlur={handleBlur}
					/>
					{errorMessages[0].message && (
						<p className="text-red-500">{errorMessages[0].message}</p>
					)}
				</div>
				<div className="flex flex-col">
					<label htmlFor="age">
						Âge <span className="text-red-500">*</span>
					</label>
					<input
						className={`rounded-sm p-2 ${
							errorMessages[1].message ? "border-2 border-red-500" : ""
						}`}
						type="text"
						name="age"
						id="age"
						value={formData.age}
						onChange={handleChange}
						required
						onBlur={handleBlur}
					/>
					{errorMessages[1].message && (
						<p className="text-red-500">{errorMessages[1].message}</p>
					)}
				</div>
				<div className="flex flex-col">
					<label htmlFor="type">
						Type <span className="text-red-500">*</span>
					</label>
					<input
						className={`rounded-sm p-2 ${
							errorMessages[2].message ? "border-2 border-red-500" : ""
						}`}
						type="text"
						name="type"
						id="type"
						value={formData.type}
						onChange={handleChange}
						required
						onBlur={handleBlur}
					/>
					{errorMessages[2].message && (
						<p className="text-red-500">{errorMessages[2].message}</p>
					)}
				</div>
				<div className="flex flex-col">
					<label htmlFor="breed">
						Race <span className="text-red-500">*</span>
					</label>
					<input
						className={`rounded-sm p-2 ${
							errorMessages[3].message ? "border-2 border-red-500" : ""
						}`}
						type="text"
						name="breed"
						id="breed"
						value={formData.breed}
						onChange={handleChange}
						required
						onBlur={handleBlur}
					/>
					{errorMessages[3].message && (
						<p className="text-red-500">{errorMessages[3].message}</p>
					)}
				</div>
				<div className="flex flex-col">
					<label htmlFor="description">Description</label>
					<textarea
						className="rounded-sm p-2"
						name="description"
						id="description"
						value={formData.description}
						onChange={handleChangeTextarea}
					/>
				</div>
				<div className="flex flex-col">
					<label htmlFor="price">
						Prix <span className="text-red-500">*</span>
					</label>
					<input
						className={`rounded-sm p-2 ${
							errorMessages[4].message ? "border-2 border-red-500" : ""
						}`}
						type="text"
						name="price"
						id="price"
						value={formData.price}
						onChange={handleChange}
						required
						onBlur={handleBlur}
					/>
					{errorMessages[4].message && (
						<p className="text-red-500">{errorMessages[4].message}</p>
					)}
				</div>

				<div className="flex flex-col">
					<label htmlFor="photos">Photos</label>
					<input
						className="rounded-sm p-2"
						type="file"
						name="photos"
						id="photos"
						accept="image/png, image/jpeg, image/jpg"
						onChange={uploadPhotos}
						multiple
					/>
				</div>

				<button
					className={`bg-green-600 text-white font-semibold py-2 px-3 rounded-md w-fit mx-auto hover:bg-green-700 ${
						isBtnDisabled ? "pointer-events-none opacity-50" : ""
					}`}
					type="submit"
				>
					Ajouter l'animal
				</button>
			</form>
		</div>
	);
};

export default AddAnimal;
