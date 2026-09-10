import { Request, Response } from "express";
import Stripe from "stripe";
import stripe from "../config/stripe";
import { StatusCodes } from "http-status-codes";

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!;

export function handleStripeWebhook(req: Request, res: Response){
    const signature = req.headers["stripe-signature"] as string;

    let event: Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).send(`Webhook signature verification failed: ${(error as Error).message}`);
        return;
    }

    switch(event.type){
        case "payment_intent.succeeded": {
            const paymentIntent = event.data.object as Stripe.PaymentIntent;
            console.log(`Payment succeeded: ${paymentIntent.id}`);
            //this marks order is paid
            break;
        }
        case "payment_intent.payment_failed" : {
            const paymentIntent = event.data.object as Stripe.PaymentIntent;
            console.log(`Payment failed: ${paymentIntent.id}`);
            break;
        }
        default: console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(StatusCodes.OK).json({received: true});
}