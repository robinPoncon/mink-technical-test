import { Animal } from "../../../types/animalType";

export const formattedDatas = (data: Animal) => {
	const formData = new FormData();
	formData.append("name", data.name);
	formData.append("age", data.age.toString());
	formData.append("type", data.type);
	formData.append("breed", data.breed);
	formData.append("description", data.description || "");
	formData.append("price", data.price.toString());

	if (data.newPhotos) {
		if (data.newPhotos.length > 0 && data.newPhotos[0] instanceof File) {
			(data.newPhotos as File[]).forEach((photo: File, index: number) => {
				formData.append(`newPhotos[${index}]`, photo);
			});
		}
	}

	if (data.photos && Array.isArray(data.photos)) {
		(data.photos as string[]).forEach((photo: string, index: number) => {
			if (typeof photo === "string") {
				formData.append(`photos[${index}]`, photo);
			}
		});
	}

	return formData;
};
