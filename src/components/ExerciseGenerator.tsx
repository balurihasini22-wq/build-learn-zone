import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Zap, 
  Target, 
  Trophy, 
  Star, 
  Clock, 
  Code, 
  RefreshCw,
  CheckCircle,
  XCircle
} from "lucide-react";

interface Exercise {
  id: number;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  timeEstimate: string;
  points: number;
  category: string;
  starterCode: string;
  testCases: { input: string; expected: string }[];
}

const ExerciseGenerator = () => {
  const [difficulty, setDifficulty] = useState<string>("all");
  const [category, setCategory] = useState<string>("all");
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [userSolution, setUserSolution] = useState("");
  const [testResults, setTestResults] = useState<{ passed: boolean; message: string }[]>([]);

  const exercises: Exercise[] = [
    {
      id: 1,
      title: "Two Sum Problem",
      description: "Given an array of integers and a target sum, return the indices of two numbers that add up to the target.",
      difficulty: "Beginner",
      timeEstimate: "15 min",
      points: 100,
      category: "Arrays",
      starterCode: `function twoSum(nums, target) {
  // Your code here
  
}

// Test your function
console.log(twoSum([2, 7, 11, 15], 9)); // Should return [0, 1]`,
      testCases: [
        { input: "[2, 7, 11, 15], 9", expected: "[0, 1]" },
        { input: "[3, 2, 4], 6", expected: "[1, 2]" }
      ]
    },
    {
      id: 2,
      title: "Palindrome Checker",
      description: "Create a function that checks if a given string is a palindrome (reads the same forwards and backwards).",
      difficulty: "Beginner",
      timeEstimate: "10 min", 
      points: 75,
      category: "Strings",
      starterCode: `function isPalindrome(str) {
  // Your code here
  
}

// Test your function
console.log(isPalindrome("racecar")); // Should return true
console.log(isPalindrome("hello")); // Should return false`,
      testCases: [
        { input: "racecar", expected: "true" },
        { input: "hello", expected: "false" }
      ]
    },
    {
      id: 3,
      title: "Binary Tree Traversal",
      description: "Implement in-order traversal of a binary tree and return the values in an array.",
      difficulty: "Intermediate",
      timeEstimate: "25 min",
      points: 200,
      category: "Trees",
      starterCode: `function inorderTraversal(root) {
  // Your code here
  
}

// Tree node structure
class TreeNode {
  constructor(val, left, right) {
    this.val = val;
    this.left = left || null;
    this.right = right || null;
  }
}`,
      testCases: [
        { input: "TreeNode(1, null, TreeNode(2, TreeNode(3)))", expected: "[1, 3, 2]" }
      ]
    }
  ];

  const generateExercise = () => {
    const filteredExercises = exercises.filter(ex => {
      const difficultyMatch = difficulty === "all" || ex.difficulty.toLowerCase() === difficulty;
      const categoryMatch = category === "all" || ex.category.toLowerCase() === category;
      return difficultyMatch && categoryMatch;
    });
    
    const randomExercise = filteredExercises[Math.floor(Math.random() * filteredExercises.length)];
    setCurrentExercise(randomExercise);
    setUserSolution(randomExercise.starterCode);
    setTestResults([]);
  };

  const runTests = () => {
    // Simulate test results
    const results = currentExercise?.testCases.map((test, index) => ({
      passed: Math.random() > 0.3, // 70% pass rate for demo
      message: `Test case ${index + 1}: ${test.input} → Expected: ${test.expected}`
    })) || [];
    
    setTestResults(results);
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "Beginner": return "bg-accent/10 text-accent";
      case "Intermediate": return "bg-warning/10 text-warning";
      case "Advanced": return "bg-destructive/10 text-destructive";
      default: return "bg-muted/10 text-muted-foreground";
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Zap className="h-6 w-6 text-primary" />
          AI Exercise Generator
        </h2>
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-warning" />
          <span className="font-semibold">1,250 XP</span>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Difficulty:</span>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Category:</span>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Topics</SelectItem>
                  <SelectItem value="arrays">Arrays</SelectItem>
                  <SelectItem value="strings">Strings</SelectItem>
                  <SelectItem value="trees">Trees</SelectItem>
                  <SelectItem value="graphs">Graphs</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button onClick={generateExercise} className="ml-auto">
              <RefreshCw className="h-4 w-4 mr-2" />
              Generate Exercise
            </Button>
          </div>
        </CardContent>
      </Card>

      {currentExercise && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Exercise Details */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Challenge Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{currentExercise.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {currentExercise.description}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Badge className={getDifficultyColor(currentExercise.difficulty)}>
                    {currentExercise.difficulty}
                  </Badge>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {currentExercise.timeEstimate}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-warning" />
                      {currentExercise.points} XP
                    </div>
                  </div>
                  
                  <Badge variant="outline">{currentExercise.category}</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Test Results */}
            {testResults.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Test Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {testResults.map((result, index) => (
                    <div key={index} className="flex items-start gap-2 p-2 rounded border">
                      {result.passed ? (
                        <CheckCircle className="h-4 w-4 text-accent mt-0.5" />
                      ) : (
                        <XCircle className="h-4 w-4 text-destructive mt-0.5" />
                      )}
                      <div className="flex-1">
                        <span className="text-sm">{result.message}</span>
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-2">
                    <Badge 
                      variant={testResults.every(r => r.passed) ? "default" : "secondary"}
                      className="w-full justify-center py-2"
                    >
                      {testResults.filter(r => r.passed).length} / {testResults.length} Tests Passed
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Code Editor */}
          <div className="lg:col-span-2">
            <Card className="h-[600px]">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Solution Editor
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={runTests}>
                      Run Tests
                    </Button>
                    <Button size="sm" className="bg-accent hover:bg-accent/90">
                      Submit Solution
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0 h-full">
                <div className="code-editor h-full">
                  <textarea
                    value={userSolution}
                    onChange={(e) => setUserSolution(e.target.value)}
                    className="w-full h-full p-4 bg-transparent text-foreground font-mono text-sm leading-6 resize-none outline-none"
                    spellCheck={false}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {!currentExercise && (
        <Card className="text-center py-12">
          <CardContent>
            <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Ready to Practice?</h3>
            <p className="text-muted-foreground mb-4">
              Generate a custom coding exercise tailored to your skill level and interests.
            </p>
            <Button onClick={generateExercise} size="lg">
              <Zap className="h-4 w-4 mr-2" />
              Get Started
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ExerciseGenerator;