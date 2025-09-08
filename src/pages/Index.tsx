import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import ImageUpload from "@/components/ImageUpload";
import ResultsDisplay from "@/components/ResultsDisplay";
import { toast } from "@/components/ui/use-toast";

// Simulated AI classification function
const simulateAIClassification = (file: File): Promise<any> => {
  return new Promise((resolve) => {
    // Simulate AI processing time
    setTimeout(() => {
      // Generate realistic mock results based on filename/random
      const isBuffalo = file.name.toLowerCase().includes('buffalo') || Math.random() > 0.6;
      const confidence = Math.floor(Math.random() * 20) + 80; // 80-99%
      
      const result = {
        animalType: isBuffalo ? "Buffalo" as const : "Cattle" as const,
        confidence,
        bodyStructureScore: Math.floor(Math.random() * 15) + 85, // 85-99
        traits: {
          bodySize: Math.floor(Math.random() * 20) + 80,
          posture: Math.floor(Math.random() * 25) + 75,
          symmetry: Math.floor(Math.random() * 15) + 85,
        },
        recommendations: [
          "Excellent body structure indicates good breeding potential",
          "Consider nutrition optimization for enhanced muscle development", 
          "Regular health monitoring recommended for optimal productivity",
          "Genetic traits suggest strong reproductive capabilities"
        ].slice(0, Math.floor(Math.random() * 2) + 2)
      };
      
      resolve(result);
    }, 2000 + Math.random() * 1000); // 2-3 seconds
  });
};

type ViewState = 'hero' | 'upload' | 'results';

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewState>('hero');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleGetStarted = () => {
    setCurrentView('upload');
  };

  const handleImageUploaded = async (file: File, preview: string) => {
    setUploadedImage(preview);
    setIsAnalyzing(true);

    try {
      toast({
        title: "Processing image",
        description: "Our AI is analyzing your livestock image...",
      });

      const result = await simulateAIClassification(file);
      setAnalysisResult(result);
      setCurrentView('results');
      
      toast({
        title: "Analysis complete!",
        description: `Classified as ${result.animalType} with ${result.confidence}% confidence`,
      });
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "There was an error processing your image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleNewAnalysis = () => {
    setCurrentView('upload');
    setUploadedImage(null);
    setAnalysisResult(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {currentView === 'hero' && (
        <HeroSection onGetStarted={handleGetStarted} />
      )}
      
      {currentView === 'upload' && (
        <div className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="w-full max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
                AI Classification
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Upload an image of your cattle or buffalo for instant AI-powered body structure analysis
              </p>
            </div>
            
            <ImageUpload 
              onImageUploaded={handleImageUploaded}
              isAnalyzing={isAnalyzing}
            />
          </div>
        </div>
      )}
      
      {currentView === 'results' && analysisResult && uploadedImage && (
        <div className="min-h-screen px-4 py-20">
          <ResultsDisplay 
            result={analysisResult}
            imageUrl={uploadedImage}
            onNewAnalysis={handleNewAnalysis}
          />
        </div>
      )}
    </div>
  );
};

export default Index;