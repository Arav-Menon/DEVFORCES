import "dotenv/config";
import { db } from ".";

const seedUsers = async () => {
  try {
    await db.user.upsert({
      where: {
        id: "1",
      },
      update: {},
      create: {
        id: "1",
        username: "test",
        email: "test.devforce@example.com",
        password: "@Kodetzea-1",
        role: "ADMIN",
        isBlocked: false,
      },
    });

    await db.user.upsert({
      where: {
        id: "2",
      },
      update: {},
      create: {
        id: "2",
        username: "test2",
        email: "test2.devforce@example.com",
        password: "@Kodetzea-1",
        role: "CREATOR",
        isBlocked: false,
      },
    });
  } catch (err) {
    console.error("Error seeding users", err);
    throw err;
  }
};

const seedContest = async () => {
  try {
    await db.contest.upsert({
      where: {
        id: "123",
      },
      update: {},
      create: {
        id: "123",
        title: "#weekly-devforce-contest",
        slug: "weekly-contest",
        startTime: new Date("2024-06-20T10:00:00Z"),
        status: "UPCOMING",
        createdById: "1",
      },
    });
  } catch (err) {
    console.error("Error seeding contest", err);
    throw err;
  }
};

const seedChallenge = async () => {
  try {
    await db.challenge.upsert({
      where: {
        slug: "two-sum",
      },
      update: {},
      create: {
        id: "c1",
        slug: "two-sum",
        title: "Two Sum",
        description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.",
        requirements: "You may assume that each input would have exactly one solution, and you may not use the same element twice.",
        constraints: "- 2 <= nums.length <= 10^4\n- -10^9 <= nums[i] <= 10^9\n- -10^9 <= target <= 10^9",
        difficulty: "EASY",
        maxPoints: 100,
        allowedLanguages: ["javascript", "typescript", "python"],
        evaluationConfig: {
          testCases: [
            { input: "[2,7,11,15], 9", output: "[0,1]" },
            { input: "[3,2,4], 6", output: "[1,2]" },
          ],
        },
        startAt: new Date("2024-06-20T10:00:00Z"),
        endAt: new Date("2024-06-20T12:00:00Z"),
        contestId: "123",
      },
    });
  } catch (err) {
    console.error("Error seeding challenges", err);
    throw err;
  }
};

const main = async () => {
  try {
    console.log("Seeding database...");
    await seedUsers();
    await seedContest();
    await seedChallenge();
    console.log("Seeding completed successfully.");
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  } finally {
    await db.$disconnect();
  }
};

main();