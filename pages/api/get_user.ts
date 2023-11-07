import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "@/model/db";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log('Get User: ', req.body);
    try {
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                email: req.body.email,
                password: req.body.password,
            }
        })
        res.status(200).json(user);
    } catch (e) {
        res.status(400).json(e);
    }
}