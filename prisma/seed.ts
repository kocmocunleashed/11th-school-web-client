import { PrismaClient, Prisma } from "../src/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

export async function main() {
  const contestHolder = await prisma.contestHoster.create({
    data: {
      name: "dave and busters",
    },
  });

  const contest = await prisma.contest.create({
    data: {
      name: "the digga booty eating challenge",
      year: new Date("6767-01-01"),
      level: "INTERNATIONAL",
      hoster: {
        connect: {
          id: contestHolder.id,
        },
      },
    },
  });

  const achievementHolder = await prisma.achievementHolder.create({
    data: {
      name: "darja",
    },
  });

  await prisma.achievement.create({
    data: {
      contest: { connect: { id: contest.id } },
      spot: "GOLD",
      holder: { connect: { id: achievementHolder.id } },
      title: "FASTEST BLACK BOOTY EATER",
      description: "darja has eaten the most amount of ass in the world",
    },
  });
}

await main();
