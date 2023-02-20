import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET' && req.query) {
    const { id } = req.query;
    const link = await prisma.link.findUnique({
      where: {
        id,
      },
    });

    return res.status(200).json({
      messgae: 'Get link success',
      data: {
        ...link,
      },
    });
  }

  res.status(405).json({
    error: '405',
    messgae: 'Method not allowed',
  });
}
