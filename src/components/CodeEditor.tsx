import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Play, 
  Save, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  Lightbulb,
  Bug,
  Code
} from "lucide-react";

const CodeEditor = () => {
  const [code, setCode] = useState(`function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`);

  const [errors] = useState([
    {
      line: 4,
      type: "warning",
      message: "Consider using memoization for better performance",
      suggestion: "This recursive function could benefit from memoization to avoid redundant calculations."
    },
    {
      line: 6,
      type: "info", 
      message: "Good use of console.log for testing",
      suggestion: "Consider adding more test cases to verify your function works correctly."
    }
  ]);

  const [isRunning, setIsRunning] = useState(false);

  const runCode = () => {
    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 1500);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Code className="h-6 w-6 text-primary" />
          Interactive Code Editor
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button 
            onClick={runCode}
            disabled={isRunning}
            className="bg-accent hover:bg-accent/90"
          >
            {isRunning ? (
              <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <Play className="h-4 w-4 mr-2" />
            )}
            Run Code
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Code Editor */}
        <div className="lg:col-span-2">
          <Card className="h-[600px]">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">JavaScript Editor</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="code-editor h-full">
                <div className="flex">
                  {/* Line numbers */}
                  <div className="bg-muted/50 px-4 py-4 text-muted-foreground text-sm font-mono select-none">
                    {code.split('\n').map((_, i) => (
                      <div key={i} className="leading-6">{i + 1}</div>
                    ))}
                  </div>
                  
                  {/* Code area */}
                  <div className="flex-1 p-4">
                    <textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="w-full h-full bg-transparent text-foreground font-mono text-sm leading-6 resize-none outline-none"
                      spellCheck={false}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Panel */}
        <div className="space-y-4">
          <Tabs defaultValue="errors" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="errors">Issues</TabsTrigger>
              <TabsTrigger value="suggestions">Tips</TabsTrigger>
              <TabsTrigger value="output">Output</TabsTrigger>
            </TabsList>
            
            <TabsContent value="errors" className="space-y-3">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Bug className="h-4 w-4" />
                    Code Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {errors.map((error, i) => (
                    <div key={i} className="p-3 rounded-lg border bg-card/50">
                      <div className="flex items-start gap-2">
                        {error.type === "warning" ? (
                          <AlertTriangle className="h-4 w-4 text-warning mt-0.5" />
                        ) : error.type === "error" ? (
                          <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />
                        ) : (
                          <Info className="h-4 w-4 text-primary mt-0.5" />
                        )}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs">
                              Line {error.line}
                            </Badge>
                            <Badge 
                              variant={error.type === "warning" ? "secondary" : "outline"}
                              className="text-xs"
                            >
                              {error.type}
                            </Badge>
                          </div>
                          <p className="text-sm font-medium">{error.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {error.suggestion}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="suggestions">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    Smart Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 rounded-lg border bg-accent/10">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-accent mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Optimization Tip</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Use dynamic programming to optimize your fibonacci function
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg border bg-primary/10">
                    <div className="flex items-start gap-2">
                      <Info className="h-4 w-4 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Best Practice</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Add input validation to handle edge cases
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="output">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Console Output</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/50 p-3 rounded font-mono text-sm">
                    <div className="text-accent">$ node fibonacci.js</div>
                    <div className="text-foreground">55</div>
                    <div className="text-muted-foreground">Program completed successfully</div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;