import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "@/model/db";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log('Checkout Book: ', req.body);
    try {
        const checkout = await prisma.checkout.create({ data: req.body });
        res.status(200).json(checkout);
    } catch (e) {
        res.status(400).json(e);
    }
}