import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle, 
  Play,
  Code,
  Target,
  Lightbulb
} from "lucide-react";

interface TutorialStep {
  id: number;
  title: string;
  content: string;
  code: string;
  hint: string;
  completed: boolean;
}

const TutorialSystem = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [tutorials] = useState<TutorialStep[]>([
    {
      id: 1,
      title: "Understanding Variables",
      content: "Variables are containers for storing data values. In JavaScript, you can create variables using let, const, or var.",
      code: `// Try creating a variable
let message = "Hello, World!";
console.log(message);`,
      hint: "Use 'let' for variables that can change, 'const' for constants",
      completed: true
    },
    {
      id: 2,
      title: "Working with Functions",
      content: "Functions are reusable blocks of code that perform specific tasks. They help organize your code and avoid repetition.",
      code: `// Create your first function
function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("CodeMaster"));`,
      hint: "Functions can take parameters and return values",
      completed: true
    },
    {
      id: 3,
      title: "Loops and Iteration",
      content: "Loops allow you to repeat code multiple times. The for loop is perfect when you know how many times to repeat.",
      code: `// Practice with loops
for (let i = 1; i <= 5; i++) {
  console.log("Step " + i);
}`,
      hint: "The loop has three parts: initialization, condition, and increment",
      completed: false
    },
    {
      id: 4,
      title: "Arrays and Data",
      content: "Arrays store multiple values in a single variable. They're essential for working with collections of data.",
      code: `// Working with arrays
let fruits = ["apple", "banana", "cherry"];
console.log(fruits[0]); // First item
console.log(fruits.length); // Array size`,
      hint: "Array indexes start from 0, not 1",
      completed: false
    }
  ]);

  const currentTutorial = tutorials[currentStep];
  const progress = ((currentStep + 1) / tutorials.length) * 100;

  const nextStep = () => {
    if (currentStep < tutorials.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          Interactive Tutorials
        </h2>
        <Badge variant="outline" className="px-3 py-1">
          Step {currentStep + 1} of {tutorials.length}
        </Badge>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Tutorial Progress</span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Tutorial Navigation */}
        <div className="lg:col-span-1 space-y-2">
          <h3 className="font-semibold mb-3">Lessons</h3>
          {tutorials.map((tutorial, index) => (
            <Card 
              key={tutorial.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                index === currentStep ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setCurrentStep(index)}
            >
              <CardContent className="p-3">
                <div className="flex items-center gap-2">
                  {tutorial.completed ? (
                    <CheckCircle className="h-4 w-4 text-accent" />
                  ) : (
                    <div className={`h-4 w-4 rounded-full border-2 ${
                      index === currentStep ? 'border-primary bg-primary' : 'border-muted'
                    }`} />
                  )}
                  <span className="text-sm font-medium">{tutorial.title}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Tutorial Content */}
        <div className="lg:col-span-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                {currentTutorial.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                {currentTutorial.content}
              </p>
              
              {/* Code Example */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Code className="h-4 w-4 text-accent" />
                  <span className="font-medium">Try This Code:</span>
                </div>
                <div className="code-editor bg-muted/50 rounded-lg border">
                  <pre className="p-4 text-sm overflow-x-auto">
                    <code>{currentTutorial.code}</code>
                  </pre>
                </div>
                <Button className="w-full bg-accent hover:bg-accent/90">
                  <Play className="h-4 w-4 mr-2" />
                  Run Example
                </Button>
              </div>

              {/* Hint Section */}
              <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Lightbulb className="h-4 w-4 text-warning mt-0.5" />
                  <div>
                    <span className="font-medium text-warning">Hint:</span>
                    <p className="text-sm text-muted-foreground mt-1">
                      {currentTutorial.hint}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between pt-4">
                <Button 
                  variant="outline" 
                  onClick={prevStep}
                  disabled={currentStep === 0}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                
                <div className="flex gap-2">
                  <Button variant="outline">
                    Mark Complete
                  </Button>
                  <Button 
                    onClick={nextStep}
                    disabled={currentStep === tutorials.length - 1}
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Practice Area */}
          <Card>
            <CardHeader>
              <CardTitle>Practice Zone</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/30 rounded-lg p-4 border-2 border-dashed border-muted">
                <textarea
                  placeholder="Try writing your own code here..."
                  className="w-full h-32 bg-transparent resize-none outline-none font-mono text-sm"
                />
              </div>
              <div className="flex gap-2 mt-4">
                <Button size="sm">
                  <Play className="h-4 w-4 mr-2" />
                  Test Code
                </Button>
                <Button variant="outline" size="sm">
                  Get Help
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TutorialSystem;