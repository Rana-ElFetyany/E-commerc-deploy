
import { Brand, Category, Subcategory } from './product';

export interface Products {
    Subcategory: Subcategory[];
	_id: string;
    title:string;
    quantity: number;
    imageCover:string;
    category:Category;
    brand:Brand;
    ratingsAverage:number;
    id:string;
}

export interface Product {
	count: number;
	_id: string;
	product: Products;
	price: number;
}

export interface Data {
	_id: string;
	cartOwner: string;
	products: Product[];
	createdAt: string;
	updatedAt: string;
	__v: number;
	totalCartPrice: number;
}

export interface Cart {
	status: string;
	message: string;
	numOfCartItems: number;
	cartId: string;
	data: Data;
}
