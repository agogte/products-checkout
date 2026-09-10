import { Request, Response } from "express";
import products from "../products";
import { StatusCodes } from "http-status-codes";

export const getProducts = (req: Request, res : Response) => {
    let id = req.params.id === undefined ? null : Number(req.params.id);
    let result = getProductsFromDb(id);
    result !== null ? res.status(StatusCodes.OK).json(result) 
        : res.status(StatusCodes.NOT_FOUND).json({ error: "Product not found."});
    return;
}

export function getProductsFromDb(id? : number | null){
    if(id === null)
        return [... products.values()];
    else 
        return products.get(id!) ?? null;
}