// ==================== TYPES ====================

export interface UserProfile {
  name: string;
  username: string;
  initials: string;
  rating: number;
  rank: number;
  problemsSolved: number;
  streak: number;
  contestRating: string;
}

export interface RatingData {
  day: string;
  rating: number;
}

export interface SubmissionsByDay {
  day: string;
  count: number;
}

export interface DifficultyDistribution {
  name: string;
  value: number;
  color: string;
}

export interface Problem {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  acceptance: number;
  solved: boolean;
}

export interface Submission {
  id: string;
  problemTitle: string;
  status: "Accepted" | "Wrong Answer" | "Runtime Error" | "Time Limit Exceeded";
  language: string;
  time: string;
  timestamp: number;
}

export interface LeaderboardUser {
  rank: number;
  username: string;
  rating: number;
  isCurrentUser?: boolean;
}

export interface SkillTopic {
  name: string;
  solved: number;
  attempted: number;
  accuracy: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export interface UpcomingContest {
  id: string;
  title: string;
  slug: string;
  startTime: string;
  participants: number;
  challenges: number;
}

export interface QuickAction {
  label: string;
  href: string;
  icon: string;
}

// ==================== MOCK DATA ====================

export const mockUserProfile: UserProfile = {
  name: "Arav Menon",
  username: "aravmenon",
  initials: "AM",
  rating: 1847,
  rank: 1234,
  problemsSolved: 342,
  streak: 15,
  contestRating: "Top 10%",
};

export const mockRatingData: RatingData[] = [
  { day: "Mon", rating: 1720 },
  { day: "Tue", rating: 1735 },
  { day: "Wed", rating: 1710 },
  { day: "Thu", rating: 1755 },
  { day: "Fri", rating: 1780 },
  { day: "Sat", rating: 1765 },
  { day: "Sun", rating: 1800 },
  { day: "Mon", rating: 1790 },
  { day: "Tue", rating: 1815 },
  { day: "Wed", rating: 1795 },
  { day: "Thu", rating: 1830 },
  { day: "Fri", rating: 1810 },
  { day: "Sat", rating: 1845 },
  { day: "Sun", rating: 1835 },
  { day: "Mon", rating: 1860 },
  { day: "Tue", rating: 1840 },
  { day: "Wed", rating: 1870 },
  { day: "Thu", rating: 1855 },
  { day: "Fri", rating: 1880 },
  { day: "Sat", rating: 1865 },
  { day: "Sun", rating: 1890 },
  { day: "Mon", rating: 1875 },
  { day: "Tue", rating: 1900 },
  { day: "Wed", rating: 1885 },
  { day: "Thu", rating: 1870 },
  { day: "Fri", rating: 1895 },
  { day: "Sat", rating: 1880 },
  { day: "Sun", rating: 1847 },
];

export const mockSubmissionsByDay: SubmissionsByDay[] = [
  { day: "Mon", count: 8 },
  { day: "Tue", count: 12 },
  { day: "Wed", count: 6 },
  { day: "Thu", count: 15 },
  { day: "Fri", count: 10 },
  { day: "Sat", count: 18 },
  { day: "Sun", count: 5 },
];

export const mockDifficultyDistribution: DifficultyDistribution[] = [
  { name: "Easy", value: 180, color: "#22c55e" },
  { name: "Medium", value: 120, color: "#eab308" },
  { name: "Hard", value: 42, color: "#ef4444" },
];

export const mockProblems: Problem[] = [
  { id: "1", title: "Two Sum", difficulty: "Easy", acceptance: 47.3, solved: true },
  { id: "2", title: "Median of Two Sorted Arrays", difficulty: "Hard", acceptance: 31.2, solved: false },
  { id: "3", title: "Longest Substring Without Repeating Characters", difficulty: "Medium", acceptance: 34.8, solved: true },
  { id: "4", title: "Binary Tree Level Order Traversal", difficulty: "Medium", acceptance: 52.1, solved: false },
  { id: "5", title: "Regular Expression Matching", difficulty: "Hard", acceptance: 27.6, solved: false },
  { id: "6", title: "Container With Most Water", difficulty: "Medium", acceptance: 51.3, solved: true },
  { id: "7", title: "Merge Two Sorted Lists", difficulty: "Easy", acceptance: 61.2, solved: true },
  { id: "8", title: "Course Schedule", difficulty: "Medium", acceptance: 44.7, solved: false },
];

export const mockSubmissions: Submission[] = [
  { id: "1", problemTitle: "Two Sum", status: "Accepted", language: "Python", time: "5m ago", timestamp: Date.now() - 300000 },
  { id: "2", problemTitle: "Container With Most Water", status: "Accepted", language: "JavaScript", time: "1h ago", timestamp: Date.now() - 3600000 },
  { id: "3", problemTitle: "Longest Substring Without Repeating Characters", status: "Wrong Answer", language: "Python", time: "2h ago", timestamp: Date.now() - 7200000 },
  { id: "4", problemTitle: "LRU Cache", status: "Accepted", language: "C++", time: "3h ago", timestamp: Date.now() - 10800000 },
  { id: "5", problemTitle: "Binary Tree Level Order Traversal", status: "Time Limit Exceeded", language: "Python", time: "5h ago", timestamp: Date.now() - 18000000 },
  { id: "6", problemTitle: "Word Ladder", status: "Runtime Error", language: "JavaScript", time: "1d ago", timestamp: Date.now() - 86400000 },
  { id: "7", problemTitle: "Reverse Nodes in k-Group", status: "Accepted", language: "Python", time: "2d ago", timestamp: Date.now() - 172800000 },
  { id: "8", problemTitle: "Median of Two Sorted Arrays", status: "Wrong Answer", language: "Java", time: "3d ago", timestamp: Date.now() - 259200000 },
];

export const mockLeaderboardUsers: LeaderboardUser[] = [
  { rank: 1, username: "codemaster", rating: 2847, isCurrentUser: false },
  { rank: 2, username: "algorithm_pro", rating: 2756, isCurrentUser: false },
  { rank: 3, username: "competitive_dev", rating: 2734, isCurrentUser: false },
  { rank: 4, username: "aravmenon", rating: 1847, isCurrentUser: true },
  { rank: 5, username: "data_structures", rating: 2412, isCurrentUser: false },
];

export const mockSkillTopics: SkillTopic[] = [
  { name: "Dynamic Programming", solved: 28, attempted: 45, accuracy: 62 },
  { name: "Graphs", solved: 22, attempted: 38, accuracy: 58 },
  { name: "Trees", solved: 35, attempted: 48, accuracy: 73 },
  { name: "Binary Search", solved: 30, attempted: 40, accuracy: 75 },
  { name: "Sorting", solved: 42, attempted: 50, accuracy: 84 },
  { name: "Greedy", solved: 25, attempted: 30, accuracy: 83 },
  { name: "Arrays", solved: 65, attempted: 72, accuracy: 90 },
  { name: "Strings", solved: 48, attempted: 55, accuracy: 87 },
  { name: "Math", solved: 38, attempted: 42, accuracy: 90 },
  { name: "Geometry", solved: 9, attempted: 15, accuracy: 60 },
];

export const mockAchievements: Achievement[] = [
  { id: "1", title: "First Blood", description: "Solve your first problem", icon: "Code", unlocked: true },
  { id: "2", title: "7-Day Streak", description: "Solve problems 7 days in a row", icon: "Flame", unlocked: true },
  { id: "3", title: "Century Club", description: "Solve 100 problems", icon: "Target", unlocked: true },
  { id: "4", title: "Contest Champion", description: "Win a weekly contest", icon: "Trophy", unlocked: true },
  { id: "5", title: "Speed Demon", description: "Solve a problem in under 2 minutes", icon: "Zap", unlocked: false },
  { id: "6", title: "Bug Hunter", description: "Find a bug in contest problems", icon: "Bug", unlocked: false },
  { id: "7", title: "500 Club", description: "Solve 500 problems", icon: "Star", unlocked: false },
  { id: "8", title: "Grandmaster", description: "Reach rating 2400+", icon: "Crown", unlocked: false },
];

export const mockUpcomingContests: UpcomingContest[] = [
  { id: "1", title: "Weekly DevForce #12", slug: "weekly-devforce-12", startTime: new Date(Date.now() + 86400000).toISOString(), participants: 45, challenges: 5 },
  { id: "2", title: "Algorithm Sprint", slug: "algorithm-sprint-1", startTime: new Date(Date.now() + 259200000).toISOString(), participants: 23, challenges: 4 },
  { id: "3", title: "Code Golf Challenge", slug: "code-golf-1", startTime: new Date(Date.now() + 604800000).toISOString(), participants: 67, challenges: 3 },
];

export const mockQuickActions: QuickAction[] = [
  { label: "Start Practice", href: "/problems", icon: "BookOpen" },
  { label: "Join Contest", href: "/contests", icon: "Trophy" },
  { label: "View Submissions", href: "/submissions", icon: "FileCode" },
  { label: "Browse Problems", href: "/problems", icon: "Code" },
  { label: "Leaderboard", href: "/leaderboard", icon: "BarChart3" },
  { label: "My Profile", href: "/profile", icon: "User" },
];
