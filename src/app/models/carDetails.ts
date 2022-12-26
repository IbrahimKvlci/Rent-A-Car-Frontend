import { CarImage } from "./carImage";

export interface CarDetails{
    id:number;
    brandName:string;
    modelName:string;
    colorName:string;
    dailyPrice:number;
    modelYear:number;
    description:string;
    imagePath:CarImage[];
}