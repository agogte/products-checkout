import { Request, Response } from "express";
import products from "../products";
import stripe from "../config/stripe";
import { PaymentIntent } from "stripe"
import { StatusCodes } from "http-status-codes";

interface CheckoutDto {
    productId: number;
    paymentMethod?: string;
}

export async function createCheckout(req: Request, res: Response){
    let { productId, paymentMethod = "pm_card_visa"}: CheckoutDto = req.body;
    let product = products.get(productId);
    if(!product){
        res.status(StatusCodes.NOT_FOUND).json({ error: `Product with id: ${productId} not found.`});
        return;
    }
    let amount = product.priceInCents;
    try{
        const paymentIntent: PaymentIntent = await stripe.paymentIntents.create({
            amount, currency: "usd", payment_method: paymentMethod, confirm: true, 
            automatic_payment_methods: { enabled: true, allow_redirects: "never" }
        });

        console.log(paymentIntent);

        res.status(StatusCodes.OK).json({
            status: paymentIntent.status,
            paymentIntentId: paymentIntent.id
        });
    }
    catch(err){
        res.status(StatusCodes.BAD_REQUEST).json({ error: "Payment failed.", details: (err as Error).message})
    }
}