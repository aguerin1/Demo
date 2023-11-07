// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "@/model/db";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log('Create Book: ', req.body);
    try {
        const book = await prisma.book.create({ data: req.body });
        res.status(200).json(book);
    } catch (e) {
        console.log(e);
        res.status(400).json(e);
    }
}
