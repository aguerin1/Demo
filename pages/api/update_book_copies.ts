import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "@/model/db";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log('Updated Book Copies: ', req.body);
    try {
        const book = await prisma.book.update({
            where: {bId: req.body.bId},
            data: {copiesOut: req.body.copiesOut},
        });
        res.status(200).json(book);
    } catch (e) {
        res.status(400).json(e);
    }
}