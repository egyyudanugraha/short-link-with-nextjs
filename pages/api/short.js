import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const links = await prisma.link.findMany();

    return res.status(200).json({
      messgae: 'Get all links success',
      data: [...links],
    });
  }

  if (req.method === 'POST') {
    const { short, destination } = req.body;
    try {
      const link = await prisma.link.create({
        data: {
          short,
          destination,
        },
      });

      return res.status(201).json({
        messgae: 'Short link added successfully',
        data: {
          ...link,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        return res.status(400).json({
          error: 'Bad request',
          message: `Short link ${short} sudah dipakai!`,
        });
      }

      res.status(500).json({
        message: 'Internal server error',
      });
    }
  }

  res.status(405).json({
    error: '405',
    messgae: 'Method not allowed',
  });
}
