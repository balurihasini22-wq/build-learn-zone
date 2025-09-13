import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Zap, BookOpen, Target, CheckCircle, ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Code className="h-6 w-6 text-primary" />
          </div>
          <span className="text-xl font-bold gradient-text">CodeMaster</span>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost">Sign In</Button>
          <Button variant="default">Get Started</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center space-y-8">
          <Badge variant="secondary" className="px-4 py-2">
            <Zap className="h-4 w-4 mr-2" />
            AI-Powered Learning Platform
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Master Programming with
            <span className="block gradient-text">Intelligent Analysis</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Learn to code with real-time error detection, personalized debugging suggestions, 
            interactive tutorials, and AI-generated exercises tailored to your skill level.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button size="lg" className="text-lg px-8 py-4 animate-glow">
              Start Learning <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              View Demo
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          <Card className="hover-lift border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                <Code className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Code Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Real-time code analysis with intelligent suggestions
              </p>
            </CardContent>
          </Card>

          <Card className="hover-lift border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-destructive/10 rounded-full w-fit mx-auto mb-4">
                <Target className="h-8 w-8 text-destructive" />
              </div>
              <h3 className="font-semibold mb-2">Error Detection</h3>
              <p className="text-sm text-muted-foreground">
                Instant error detection with helpful debugging tips
              </p>
            </CardContent>
          </Card>

          <Card className="hover-lift border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-accent/10 rounded-full w-fit mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Interactive Tutorials</h3>
              <p className="text-sm text-muted-foreground">
                Step-by-step guided learning with hands-on practice
              </p>
            </CardContent>
          </Card>

          <Card className="hover-lift border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-warning/10 rounded-full w-fit mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-warning" />
              </div>
              <h3 className="font-semibold mb-2">Smart Exercises</h3>
              <p className="text-sm text-muted-foreground">
                AI-generated coding challenges based on your progress
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-20 p-8 bg-card/30 rounded-2xl backdrop-blur-sm">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">10K+</div>
            <div className="text-muted-foreground">Active Learners</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent">500+</div>
            <div className="text-muted-foreground">Interactive Lessons</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-warning">98%</div>
            <div className="text-muted-foreground">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;