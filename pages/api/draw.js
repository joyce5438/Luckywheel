import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const prizes = await prisma.prize.findMany({ where: { quantity: { gt: 0 } } })
    if (prizes.length === 0) {
      return res.status(400).json({ error: '所有獎項已抽完！' })
    }

    const winningPrize = prizes[Math.floor(Math.random() * prizes.length)]

    await prisma.prize.update({
      where: { id: winningPrize.id },
      data: { quantity: { decrement: 1 } }
    })

    res.status(200).json({ message: `恭喜中獎：${winningPrize.name}` })
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}