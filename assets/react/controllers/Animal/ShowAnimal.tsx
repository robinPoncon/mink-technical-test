import React, { useEffect, useState } from "react";
import { Animal } from "../../../types/animalType";

type ShowAnimalProps = {
	animal: Animal;
};

type PhotoObject = {
	src: string;
	isDisplayed: boolean;
};

const ShowAnimal: React.FC<ShowAnimalProps> = ({ animal }) => {
	console.log("test " + JSON.stringify(animal));
	const formattedPrice = (price: number) => {
		return price.toLocaleString("fr-FR", {
			style: "currency",
			currency: "EUR",
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		});
	};

	const [allPhotos, setAllPhotos] = useState<PhotoObject[]>([]);
	const [displayedPhoto, setDisplayedPhoto] = useState();

	useEffect(() => {
		if (animal.photos && animal.photos.length > 0) {
			let newCarousel: PhotoObject[] = [];
			animal.photos.forEach((photo, index) => {
				const newPhotoObject = {
					src: `/uploads/animals/${photo}`,
					isDisplayed: index === 0 ? true : false
				};
				newCarousel = [...newCarousel, newPhotoObject];
			});
			setAllPhotos(newCarousel);
		}
	}, [animal.photos]);

	const showDisplayedPhoto = () => {
		const findDisplayedPhoto = allPhotos.find((photo) => photo.isDisplayed === true);
		return findDisplayedPhoto?.src;
	};

	return (
		<div className="flex flex-wrap justify-around gap-10 mx-2">
			<div
				className="flex flex-col gap-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-white rounded-md p-5"
				key={animal.id}
			>
				{animal.photos && animal.photos[0] ? (
					<img
						className="w-52 h-52 mx-auto"
						alt="animal image"
						src={showDisplayedPhoto()}
					/>
				) : null}
				<p className="font-bold text-lg text-center">
					Race : <span className="italic">{animal.breed}</span>
				</p>
				<p className="font-bold text-lg text-center">
					Prix : <span className="text-2xl">{formattedPrice(animal.price)}</span>
				</p>
			</div>
		</div>
	);
};

export default ShowAnimal;
