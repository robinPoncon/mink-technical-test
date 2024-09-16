import React, { useState } from "react";
import { Animal } from "../../../types/animalType";

type EditAnimalProps = {
	animal: Animal;
};

const EditAnimal: React.FC<EditAnimalProps> = () => {
	const [formData, setFormData] = useState({
		name: "",
		age: "",
		type: "",
		breed: "",
		description: "",
		price: "",
		photos: []
	});

	return <div></div>;
};

export default EditAnimal;
