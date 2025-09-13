import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Hero from "@/components/Hero";
import CodeEditor from "@/components/CodeEditor";
import TutorialSystem from "@/components/TutorialSystem";
import ExerciseGenerator from "@/components/ExerciseGenerator";

const Index = () => {
  const [activeTab, setActiveTab] = useState("hero");

  return (
    <div className="min-h-screen bg-background">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-card/80 backdrop-blur-sm border">
          <TabsTrigger value="hero">Platform</TabsTrigger>
          <TabsTrigger value="editor">Code Editor</TabsTrigger>
          <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
          <TabsTrigger value="exercises">Exercises</TabsTrigger>
        </TabsList>
        
        <TabsContent value="hero" className="mt-0">
          <Hero />
        </TabsContent>
        
        <TabsContent value="editor" className="mt-16">
          <CodeEditor />
        </TabsContent>
        
        <TabsContent value="tutorials" className="mt-16">
          <TutorialSystem />
        </TabsContent>
        
        <TabsContent value="exercises" className="mt-16">
          <ExerciseGenerator />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;