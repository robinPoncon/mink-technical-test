export const formattedPrice = (price: string) => {
	const numericPrice = parseFloat(price);

	if (isNaN(numericPrice)) {
		throw new Error("Prix invalide.");
	}

	return numericPrice.toLocaleString("fr-FR", {
		style: "currency",
		currency: "EUR",
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	});
};
