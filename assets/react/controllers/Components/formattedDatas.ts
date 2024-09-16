import { Animal } from "../../../types/animalType";

export const formattedDatas = (data: Animal) => {
	const formData = new FormData();
	formData.append("name", data.name);
	formData.append("age", data.age.toString());
	formData.append("type", data.type);
	formData.append("breed", data.breed);
	formData.append("description", data.description || "");
	formData.append("price", data.price.toString());

	if (data.photos) {
		if (data.photos.length > 0 && data.photos[0] instanceof File) {
			(data.photos as File[]).forEach((photo: File, index: number) => {
				formData.append(`photos[${index}]`, photo);
			});
		} else {
			(data.photos as string[]).forEach((photo: string, index: number) => {
				formData.append(`photos[${index}]`, photo);
			});
		}
	}

	return formData;
};
