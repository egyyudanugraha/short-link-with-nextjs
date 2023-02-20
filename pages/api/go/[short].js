import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET' && req.query) {
    const { short } = req.query;
    const link = await prisma.link.findUnique({
      where: {
        short,
      },
    });

    return res.status(200).json({
      message: 'Get link success',
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
