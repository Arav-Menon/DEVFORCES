import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const db = new PrismaClient();

const SALT_ROUNDS = 10;
const HASHED_PASSWORD = await bcrypt.hash("Password123!", SALT_ROUNDS);
const NOW = new Date();
const ALL_LANGUAGES = ["cpp", "java", "python", "javascript", "typescript", "go", "rust"];

function daysFromNow(d: number): Date { return new Date(NOW.getTime() + d * 86400000); }
function hoursFromNow(h: number): Date { return new Date(NOW.getTime() + h * 3600000); }
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function randomInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

// ---------------------------------------------------------------------------
// Users (12 total: 1 admin, 1 creator, 10 users)
// ---------------------------------------------------------------------------

const USERS = [
  { username: "admin_devforce", email: "admin@devforce.io", role: "ADMIN" as const },
  { username: "contest_master", email: "creator@devforce.io", role: "CREATOR" as const },
  { username: "alex_codes", email: "alex@gmail.com", role: "USER" as const },
  { username: "priya_dev", email: "priya@gmail.com", role: "USER" as const },
  { username: "chen_wei", email: "chen@gmail.com", role: "USER" as const },
  { username: "sara_k", email: "sara@gmail.com", role: "USER" as const },
  { username: "marcus_j", email: "marcus@gmail.com", role: "USER" as const },
  { username: "yuki_t", email: "yuki@gmail.com", role: "USER" as const },
  { username: "omar_f", email: "omar@gmail.com", role: "USER" as const },
  { username: "lisa_nguyen", email: "lisa@gmail.com", role: "USER" as const },
  { username: "david_p", email: "david@gmail.com", role: "USER" as const },
  { username: "emma_w", email: "emma@gmail.com", role: "USER" as const },
];

async function seedUsers(): Promise<string[]> {
  console.log("Seeding users...");
  const ids: string[] = [];
  for (const u of USERS) {
    const c = await db.user.upsert({ where: { username: u.username }, update: {}, create: { ...u, password: HASHED_PASSWORD } });
    ids.push(c.id);
  }
  console.log(`  Seeded ${ids.length} users`);
  return ids;
}

// ---------------------------------------------------------------------------
// Contests (6 total: 2 ended, 2 ongoing, 2 upcoming)
// ---------------------------------------------------------------------------

const CONTESTS = [
  { title: "Weekly Contest #1", slug: "weekly-contest-1", startTime: daysFromNow(-30), status: "ENDED" as const },
  { title: "Weekly Contest #2", slug: "weekly-contest-2", startTime: daysFromNow(-14), status: "ENDED" as const },
  { title: "DP Marathon", slug: "dp-marathon", startTime: daysFromNow(-2), status: "ONGOING" as const },
  { title: "Graph Challenge", slug: "graph-challenge", startTime: daysFromNow(-1), status: "ONGOING" as const },
  { title: "Weekly Contest #3", slug: "weekly-contest-3", startTime: daysFromNow(7), status: "UPCOMING" as const },
  { title: "Backend Battle", slug: "backend-battle", startTime: daysFromNow(14), status: "UPCOMING" as const },
];

async function seedContests(creatorId: string) {
  console.log("Seeding contests...");
  const results: { id: string; slug: string; status: string }[] = [];
  for (const c of CONTESTS) {
    const cr = await db.contest.upsert({ where: { slug: c.slug }, update: {}, create: { ...c, createdById: creatorId } });
    results.push({ id: cr.id, slug: cr.slug, status: c.status });
  }
  console.log(`  Seeded ${results.length} contests`);
  return results;
}

// ---------------------------------------------------------------------------
// Challenges (3 per contest = 18 total)
// ---------------------------------------------------------------------------

const CHALLENGES: Array<{
  slug: string; title: string; description: string; requirements: string;
  constraints: string; difficulty: "EASY" | "MEDIUM" | "HARD"; maxPoints: number;
  examples: Array<{ input: string; output: string; explanation: string }>;
  contestSlug: string;
}> = [
  // ── Weekly Contest #1 (ENDED) ──
  {
    slug: "two-sum", title: "Two Sum",
    description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume each input has exactly one solution and may not use the same element twice.",
    requirements: "- Must run in O(n) time using a hash map.\n- Return the answer as an array of two indices.",
    constraints: "- 2 <= nums.length <= 10^4\n- -10^9 <= nums[i] <= 10^9",
    difficulty: "EASY", maxPoints: 100,
    examples: [{ input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "nums[0] + nums[1] = 2 + 7 = 9." }],
    contestSlug: "weekly-contest-1",
  },
  {
    slug: "valid-parentheses", title: "Valid Parentheses",
    description: "Given a string `s` containing just `()[]{}`, determine if the input string is valid. Open brackets must be closed by the same type and in the correct order.",
    requirements: "- Use a stack-based solution.\n- Time complexity O(n).",
    constraints: "- 1 <= s.length <= 10^4\n- s consists of parentheses only.",
    difficulty: "EASY", maxPoints: 100,
    examples: [{ input: 's = "()"', output: "true", explanation: "One pair of matching parentheses." }],
    contestSlug: "weekly-contest-1",
  },
  {
    slug: "maximum-subarray", title: "Maximum Subarray",
    description: "Given an integer array `nums`, find the subarray with the largest sum and return its sum. A subarray is a contiguous non-empty sequence of elements.",
    requirements: "- Implement Kadane's algorithm for O(n).\n- Handle arrays with all negative numbers.",
    constraints: "- 1 <= nums.length <= 10^5\n- -10^4 <= nums[i] <= 10^4",
    difficulty: "MEDIUM", maxPoints: 200,
    examples: [{ input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "Subarray [4,-1,2,1] has the largest sum." }],
    contestSlug: "weekly-contest-1",
  },

  // ── Weekly Contest #2 (ENDED) ──
  {
    slug: "merge-intervals", title: "Merge Intervals",
    description: "Given an array of intervals where intervals[i] = [start_i, end_i], merge all overlapping intervals and return an array of non-overlapping intervals.",
    requirements: "- Sort by start time before merging.\n- Return sorted output.",
    constraints: "- 1 <= intervals.length <= 10^4\n- 0 <= start_i <= end_i <= 10^4",
    difficulty: "MEDIUM", maxPoints: 200,
    examples: [{ input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]", explanation: "[1,3] and [2,6] overlap, merged into [1,6]." }],
    contestSlug: "weekly-contest-2",
  },
  {
    slug: "group-anagrams", title: "Group Anagrams",
    description: "Given an array of strings `strs`, group the anagrams together. An anagram is formed by rearranging letters of a different word.",
    requirements: "- Use a hash map with sorted string as key.\n- Handle empty strings.",
    constraints: "- 1 <= strs.length <= 10^4\n- 0 <= strs[i].length <= 100",
    difficulty: "MEDIUM", maxPoints: 200,
    examples: [{ input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]', explanation: "Grouped by sorted characters." }],
    contestSlug: "weekly-contest-2",
  },
  {
    slug: "sliding-window-maximum", title: "Sliding Window Maximum",
    description: "Given an array `nums` and window size `k`, return the max in each sliding window position. Use a monotonic deque approach.",
    requirements: "- Use a deque (monotonic queue).\n- O(n) time complexity.",
    constraints: "- 1 <= nums.length <= 10^5\n- -10^4 <= nums[i] <= 10^4\n- 1 <= k <= nums.length",
    difficulty: "HARD", maxPoints: 400,
    examples: [{ input: "nums = [1,3,-1,-3,5,3,6,7], k = 3", output: "[3,3,5,5,6,7]", explanation: "Max of each window of size 3." }],
    contestSlug: "weekly-contest-2",
  },

  // ── DP Marathon (ONGOING) ──
  {
    slug: "climbing-stairs", title: "Climbing Stairs",
    description: "You are climbing a staircase with `n` steps. Each time you can climb 1 or 2 steps. Return the number of distinct ways to reach the top.",
    requirements: "- Use DP or fibonacci approach.\n- dp[i] = dp[i-1] + dp[i-2].",
    constraints: "- 1 <= n <= 45",
    difficulty: "EASY", maxPoints: 100,
    examples: [{ input: "n = 3", output: "3", explanation: "Ways: 1+1+1, 1+2, 2+1." }],
    contestSlug: "dp-marathon",
  },
  {
    slug: "longest-common-subsequence", title: "Longest Common Subsequence",
    description: "Given two strings `text1` and `text2`, return the length of their longest common subsequence. A subsequence preserves relative order.",
    requirements: "- Use 2D DP.\n- If characters match: dp[i][j] = dp[i-1][j-1] + 1.\n- Otherwise: max(dp[i-1][j], dp[i][j-1]).",
    constraints: "- 1 <= text1.length, text2.length <= 1000\n- Only lowercase English letters.",
    difficulty: "MEDIUM", maxPoints: 250,
    examples: [{ input: 'text1 = "abcde", text2 = "ace"', output: "3", explanation: "LCS is 'ace' with length 3." }],
    contestSlug: "dp-marathon",
  },
  {
    slug: "edit-distance", title: "Edit Distance",
    description: "Given two strings `word1` and `word2`, return the minimum number of operations (insert, delete, replace) to convert word1 to word2.",
    requirements: "- Use 2D DP.\n- dp[i][j] = min operations to convert word1[0..i-1] to word2[0..j-1].",
    constraints: "- 0 <= word1.length, word2.length <= 500\n- Only lowercase English letters.",
    difficulty: "HARD", maxPoints: 400,
    examples: [{ input: 'word1 = "horse", word2 = "ros"', output: "3", explanation: "horse -> rorse (replace h->r) -> rose (delete r) -> ros (delete e)." }],
    contestSlug: "dp-marathon",
  },

  // ── Graph Challenge (ONGOING) ──
  {
    slug: "number-of-islands", title: "Number of Islands",
    description: "Given a 2D binary grid of '1's (land) and '0's (water), return the number of islands. An island is formed by connecting adjacent land horizontally or vertically.",
    requirements: "- Use BFS or DFS for connected components.\n- Mark visited cells.",
    constraints: "- 1 <= m, n <= 300\n- grid[i][j] is '0' or '1'.",
    difficulty: "MEDIUM", maxPoints: 250,
    examples: [{ input: 'grid = [["1","1","0"],["1","1","0"],["0","0","1"]]', output: "2", explanation: "Two separate islands." }],
    contestSlug: "graph-challenge",
  },
  {
    slug: "course-schedule", title: "Course Schedule",
    description: "There are `numCourses` courses with prerequisites given as [ai, bi] meaning bi must be taken before ai. Return true if you can finish all courses (detect cycle).",
    requirements: "- Model as directed graph.\n- Use topological sort (Kahn's) or DFS cycle detection.",
    constraints: "- 1 <= numCourses <= 2000\n- 0 <= prerequisites.length <= 5000",
    difficulty: "MEDIUM", maxPoints: 250,
    examples: [{ input: "numCourses = 2, prerequisites = [[1,0]]", output: "true", explanation: "Take 0 first, then 1. No cycle." }],
    contestSlug: "graph-challenge",
  },
  {
    slug: "dijkstra-shortest-path", title: "Dijkstra's Shortest Path",
    description: "Given a weighted directed graph and a source vertex `src`, find the shortest path from src to every other vertex. Return distance array (-1 if unreachable).",
    requirements: "- Use a min-heap / priority queue.\n- Handle unreachable vertices.",
    constraints: "- 1 <= n <= 100\n- 0 <= weight <= 100",
    difficulty: "MEDIUM", maxPoints: 300,
    examples: [{ input: "src = 0, graph = [[[1,1],[2,4]],[[2,2],[3,6]],[[3,3]],[]]", output: "[0,1,2,5]", explanation: "Shortest distances from vertex 0." }],
    contestSlug: "graph-challenge",
  },

  // ── Weekly Contest #3 (UPCOMING) ──
  {
    slug: "lru-cache", title: "LRU Cache",
    description: "Design a Least Recently Used cache. Implement get(key) and put(key, value) both in O(1). When capacity is exceeded, evict the LRU key.",
    requirements: "- Doubly linked list + hash map.\n- Both get and put must be O(1).",
    constraints: "- 1 <= capacity <= 3000\n- At most 2 * 10^5 calls.",
    difficulty: "HARD", maxPoints: 400,
    examples: [{ input: '["LRUCache","put","put","get","put"]\n[[2],[1,1],[2,2],[1],[3,3]]', output: "[null,null,null,1,null]", explanation: "get(1) returns 1. put(3,3) evicts key 2." }],
    contestSlug: "weekly-contest-3",
  },
  {
    slug: "coin-change", title: "Coin Change",
    description: "Given coins of different denominations and a total amount, return the fewest coins needed. Return -1 if impossible. You have infinite coins of each kind.",
    requirements: "- Bottom-up DP.\n- dp[i] = min coins for amount i.",
    constraints: "- 1 <= coins.length <= 12\n- 0 <= amount <= 10^4",
    difficulty: "MEDIUM", maxPoints: 250,
    examples: [{ input: "coins = [1,5,10,25], amount = 30", output: "2", explanation: "5 + 25 = 30. Two coins." }],
    contestSlug: "weekly-contest-3",
  },
  {
    slug: "implement-trie", title: "Implement Trie (Prefix Tree)",
    description: "Implement a Trie with insert(word), search(word), and startsWith(prefix). Each operation should run in O(m) where m is the word length.",
    requirements: "- Each node has children map and end-of-word flag.\n- Search checks complete word match.\n- StartsWith checks prefix existence.",
    constraints: "- 1 <= word.length, prefix.length <= 2000\n- Only lowercase English letters.",
    difficulty: "MEDIUM", maxPoints: 250,
    examples: [{ input: '["Trie","insert","search","startsWith"]\n[[],["apple"],["apple"],["app"]]', output: "[null,null,true,true]", explanation: "Insert 'apple', search 'apple' returns true, startsWith 'app' returns true." }],
    contestSlug: "weekly-contest-3",
  },

  // ── Backend Battle (UPCOMING) ──
  {
    slug: "design-rate-limiter", title: "Design Rate Limiter",
    description: "Design a rate limiter that limits requests per user within a time window. Implement allow(userId) to check if a request is permitted.",
    requirements: "- Sliding window or token bucket approach.\n- Track per-user request counts.",
    constraints: "- 1 <= maxRequests <= 1000\n- At most 10^4 calls.",
    difficulty: "MEDIUM", maxPoints: 300,
    examples: [{ input: '["RateLimiter","allow","allow"]\n[[3,1],["user1"],["user1"]]', output: "[null,true,true]", explanation: "User1 makes 2 requests, both under the 3-request limit." }],
    contestSlug: "backend-battle",
  },
  {
    slug: "meeting-rooms-ii", title: "Meeting Rooms II",
    description: "Given meeting intervals [start, end], return the minimum number of conference rooms required.",
    requirements: "- Sort by start time.\n- Use a min-heap to track active meetings.\n- Heap size = rooms needed.",
    constraints: "- 1 <= intervals.length <= 10^4\n- 0 <= start_i < end_i <= 10^6",
    difficulty: "MEDIUM", maxPoints: 300,
    examples: [{ input: "intervals = [[0,30],[5,10],[15,20]]", output: "2", explanation: "[0,30] and [5,10] overlap, requiring 2 rooms." }],
    contestSlug: "backend-battle",
  },
  {
    slug: "task-scheduler", title: "Task Scheduler",
    description: "Given a task array and cooldown `n`, return the least number of time units to finish all tasks. Same tasks must be separated by at least n units.",
    requirements: "- Greedy approach: schedule most frequent first.\n- Calculate idle slots from frequency.",
    constraints: "- 1 <= tasks.length <= 10^4\n- tasks[i] is uppercase English letter\n- 0 <= n <= 100",
    difficulty: "MEDIUM", maxPoints: 300,
    examples: [{ input: 'tasks = ["A","A","A","B","B","B"], n = 2', output: "8", explanation: "A -> B -> idle -> A -> B -> idle -> A -> B." }],
    contestSlug: "backend-battle",
  },
];

async function seedChallenges(contestMap: Map<string, string>) {
  console.log("Seeding challenges...");
  const data = CHALLENGES.map((ch) => ({
    slug: ch.slug, title: ch.title, description: ch.description,
    requirements: ch.requirements, constraints: ch.constraints,
    difficulty: ch.difficulty, maxPoints: ch.maxPoints,
    allowedLanguages: ALL_LANGUAGES,
    evaluationConfig: { timeLimit: ch.difficulty === "HARD" ? 2000 : 1000, memoryLimit: 256, testCases: 20 },
    examples: ch.examples as any,
    startAt: daysFromNow(-35), endAt: daysFromNow(60),
    contestId: contestMap.get(ch.contestSlug)!,
  }));
  await db.$transaction(data.map((d) => db.challenge.upsert({ where: { slug: d.slug }, update: {}, create: d })));
  console.log(`  Seeded ${CHALLENGES.length} challenges`);
}

// ---------------------------------------------------------------------------
// Leaderboards (for ENDED contests only)
// ---------------------------------------------------------------------------

async function seedLeaderboards(userIds: string[], contestData: { id: string; slug: string; status: string }[]) {
  console.log("Seeding leaderboards...");
  const ended = contestData.filter((c) => c.status === "ENDED");
  let total = 0;
  for (const contest of ended) {
    await db.leaderboard.deleteMany({ where: { contestId: contest.id } });
    const entries = shuffle(userIds).map((userId, i) => ({ rank: i + 1, userId, contestId: contest.id }));
    await db.leaderboard.createMany({ data: entries });
    total += entries.length;
  }
  console.log(`  Seeded ${total} leaderboard entries`);
}

// ---------------------------------------------------------------------------
// Submissions (compact: ~80 total)
// ---------------------------------------------------------------------------

async function seedSubmissions(userIds: string[], contestData: { id: string; slug: string; status: string }[]) {
  console.log("Seeding submissions...");
  await db.submission.deleteMany();

  const challenges = await db.challenge.findMany({ include: { contest: { select: { slug: true } } } });
  const byContest = new Map<string, typeof challenges>();
  for (const ch of challenges) {
    const list = byContest.get(ch.contest.slug) || [];
    list.push(ch);
    byContest.set(ch.contest.slug, list);
  }

  const all: any[] = [];
  const active = contestData.filter((c) => c.status === "ENDED" || c.status === "ONGOING");

  for (const contest of active) {
    const chals = byContest.get(contest.slug) || [];
    if (!chals.length) continue;

    // Only 5 random users per contest
    const users = shuffle(userIds).slice(0, 5);

    for (const userId of users) {
      // 1-2 challenges per user per contest
      const selected = shuffle(chals).slice(0, randomInt(1, Math.min(2, chals.length)));
      for (const ch of selected) {
        const rand = Math.random();
        const status = rand < 0.7 ? "COMPLETED" : rand < 0.85 ? "PROCESSING" : "PENDING";
        const entry: any = {
          submissionId: `sub_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
          status, userId, challengeId: ch.id,
        };
        if (status === "COMPLETED") {
          const total = (ch.evaluationConfig as any)?.testCases || 20;
          const passed = randomInt(Math.floor(total * 0.5), total);
          entry.score = Math.round((passed / total) * ch.maxPoints);
          entry.result = { testCasesPassed: passed, totalTestCases: total, runtime: randomInt(12, 800), memory: randomInt(8, 64) };
          entry.submittedAt = daysFromNow(-randomInt(0, 30));
        } else {
          entry.submittedAt = daysFromNow(-randomInt(0, 2));
        }
        all.push(entry);
      }
    }
  }

  if (all.length) await db.submission.createMany({ data: all });
  console.log(`  Seeded ${all.length} submissions`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log("Starting database seed...\n");
  const userIds = await seedUsers();
  const contestData = await seedContests(userIds[1]); // CREATOR
  const contestMap = new Map(contestData.map((c) => [c.slug, c.id]));

  await seedChallenges(contestMap);
  await seedLeaderboards(userIds, contestData);
  await seedSubmissions(userIds, contestData);

  console.log("\nSeed completed successfully!");
}

main()
  .then(() => db.$disconnect())
  .catch(async (e) => { console.error("Seed failed:", e); await db.$disconnect(); process.exit(1); });
