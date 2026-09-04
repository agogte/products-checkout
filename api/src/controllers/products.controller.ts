import { Request, Response } from "express";
import products from "../products";

export const getProducts = (req: Request, res : Response) => {
    let id = req.params.id === undefined ? null : Number(req.params.id);
    let result = getProductsFromDb(id);
    result !== null ? res.status(200).json(result) : res.status(404).json({ error: "Product not found."});
    return;
}

function getProductsFromDb(id? : number | null){
    if(id === null)
        return [... products.values()];
    else {
        if (!products.has(id!))
            return null;
        else
            return products.get(id!);
    }
}