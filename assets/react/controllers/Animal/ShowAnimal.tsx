import React, { useEffect, useState } from "react";
import { Animal } from "../../../types/animalType";
import { formattedPrice } from "../Components/formattedPrice";

type ShowAnimalProps = {
	animal: Animal;
};

type PhotoObject = {
	src: string;
	isDisplayed: boolean;
};

const ShowAnimal: React.FC<ShowAnimalProps> = ({ animal }) => {
	const [allPhotos, setAllPhotos] = useState<PhotoObject[]>([]);

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

	const CarouselManagement = (action: "next" | "previous") => {
		const displayedPhotoIndex = allPhotos.findIndex((photo) => photo.isDisplayed === true);
		const previousIndex =
			displayedPhotoIndex === 0 ? allPhotos.length - 1 : displayedPhotoIndex - 1;
		const nextIndex =
			displayedPhotoIndex === allPhotos.length - 1 ? 0 : displayedPhotoIndex + 1;
		const copyAllPhotos = [...allPhotos];
		copyAllPhotos[displayedPhotoIndex].isDisplayed = false;
		copyAllPhotos[action === "previous" ? previousIndex : nextIndex].isDisplayed = true;
		setAllPhotos(copyAllPhotos);
	};

	return (
		<div className="flex flex-wrap justify-around gap-10 my-10 mx-2">
			<div
				className="flex flex-col gap-4 w-full sm:w-96 bg-white rounded-md p-5"
				key={animal.id}
			>
				{allPhotos.length > 0 && (
					<div className="flex">
						{allPhotos.length > 1 && (
							<button
								className="w-8 h-8 my-auto pr-1 bg-green-500 rounded-full hover:bg-green-600 sm:w-12 sm:h-12"
								onClick={() => CarouselManagement("previous")}
							>
								<img
									src="/icons/icon_chevron-left.svg"
									alt="icon chevron left"
								/>
							</button>
						)}

						<img
							className="w-40 h-40 mx-auto rounded-md sm:w-52 sm:h-52"
							alt="animal image"
							src={showDisplayedPhoto()}
						/>

						{allPhotos.length > 1 && (
							<button
								className="w-8 h-8 my-auto cursor-pointer pl-1 bg-green-500 rounded-full hover:bg-green-600 sm:w-12 sm:h-12"
								onClick={() => CarouselManagement("next")}
							>
								<img
									src="/icons/icon_chevron-right.svg"
									alt="icon chevron right"
								/>
							</button>
						)}
					</div>
				)}
				<p className="font-bold text-lg text-center">
					Âge : <span className="italic">{`${animal.age} ans`}</span>
				</p>
				<p className="font-bold text-lg text-center">
					Type : <span className="italic">{animal.type}</span>
				</p>
				<p className="font-bold text-lg text-center">
					Race : <span className="italic">{animal.breed}</span>
				</p>
				{animal.description && (
					<p className="font-bold text-lg text-center">
						Description : <span className="italic">{animal.description}</span>
					</p>
				)}
				<p className="font-bold text-lg text-center">
					Prix :{" "}
					<span className="text-2xl text-green-700">{formattedPrice(animal.price)}</span>
				</p>
			</div>
		</div>
	);
};

export default ShowAnimal;
