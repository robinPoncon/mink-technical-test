export interface Animal {
	id?: number;
	name: string;
	age: string;
	type: string;
	breed: string;
	description?: string;
	price: string;
	photos?: string[] | File[];
}
