import { useState } from "react";
import Navigation from "@/components/Navigation";
import CameraSection from "@/components/CameraSection";
import AnimalResultCard from "@/components/AnimalResultCard";
import { toast } from "@/components/ui/use-toast";

// Animal database with information
const animalDatabase = {
  Dog: {
    moods: ["Calm", "Aggressive"] as const,
    description: "Dogs are loyal companions and one of humanity's oldest domesticated animals. They come in many breeds with different temperaments and characteristics.",
    habitat: "Domestic environments worldwide, originally descended from wolves in various natural habitats.",
    safetyTips: [
      "Approach slowly and let the dog sniff your hand first",
      "Avoid direct eye contact if the dog seems nervous",
      "Never disturb a dog while eating or sleeping",
      "Ask the owner before petting"
    ],
    funFact: "Dogs have an incredible sense of smell that's 10,000 to 100,000 times more sensitive than humans!"
  },
  Snake: {
    moods: ["Calm", "Aggressive"] as const,
    description: "Snakes are legless reptiles found on every continent except Antarctica. Most species are harmless to humans and play important roles in their ecosystems.",
    habitat: "Diverse environments including forests, deserts, grasslands, and aquatic areas worldwide.",
    safetyTips: [
      "Keep a safe distance and do not attempt to handle",
      "Make noise when walking in snake habitats",
      "Wear proper footwear in areas where snakes are common",
      "If bitten, seek immediate medical attention"
    ],
    funFact: "Snakes can dislocate their jaws to swallow prey much larger than their head!"
  },
  Cow: {
    moods: ["Calm", "Aggressive"] as const,
    description: "Cows are gentle herbivores and one of the most important domesticated animals, providing milk, meat, and other products to humans worldwide.",
    habitat: "Domesticated worldwide, prefer grasslands and pastures with access to fresh water.",
    safetyTips: [
      "Move slowly and calmly around cattle",
      "Avoid getting between a cow and her calf",
      "Be aware that bulls can be more aggressive than cows",
      "Respect fencing and boundaries"
    ],
    funFact: "Cows have best friends and can become stressed when separated from their companions!"
  },
  Leopard: {
    moods: ["Calm", "Aggressive"] as const,
    description: "Leopards are powerful, adaptable big cats known for their distinctive spotted coats and incredible climbing abilities. They are solitary and primarily nocturnal hunters.",
    habitat: "Forests, grasslands, mountains, and semi-deserts across Africa and Asia.",
    safetyTips: [
      "Never approach or attempt to interact with wild leopards",
      "Make noise when hiking in leopard territory",
      "Travel in groups and avoid walking alone at dawn or dusk",
      "If you encounter one, back away slowly without turning around"
    ],
    funFact: "Leopards can carry prey twice their body weight up into trees to keep it safe from other predators!"
  },
  Monkey: {
    moods: ["Calm", "Aggressive"] as const,
    description: "Monkeys are intelligent primates with complex social structures. They are highly adaptable and found in various environments around the world.",
    habitat: "Tropical forests, savannas, mountains, and urban areas across Africa, Asia, and Central/South America.",
    safetyTips: [
      "Do not feed monkeys as it makes them aggressive and dependent",
      "Keep food and shiny objects secure and out of sight",
      "Maintain distance and avoid direct eye contact",
      "If approached aggressively, make yourself appear larger and back away"
    ],
    funFact: "Some monkeys use tools like sticks to extract insects and stones to crack nuts!"
  },
  Elephant: {
    moods: ["Calm", "Aggressive"] as const,
    description: "Elephants are the largest land mammals, known for their intelligence, strong family bonds, and excellent memory. They play crucial roles in their ecosystems.",
    habitat: "Savannas, forests, and grasslands in Africa and Asia.",
    safetyTips: [
      "Keep a safe distance of at least 25 meters",
      "Never get between an elephant and its young",
      "Stay in vehicles when in elephant areas",
      "If charged, run in a zigzag pattern to nearby shelter"
    ],
    funFact: "Elephants can communicate with other elephants over long distances using infrasonic sounds!"
  }
};

// Simulated AI classification function
const simulateWildlifeClassification = (file: File): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Randomly select an animal based on filename or random
      const animals = Object.keys(animalDatabase);
      let selectedAnimal = animals[Math.floor(Math.random() * animals.length)];
      
      // Check filename for hints
      const filename = file.name.toLowerCase();
      for (const animal of animals) {
        if (filename.includes(animal.toLowerCase())) {
          selectedAnimal = animal;
          break;
        }
      }

      const animalInfo = animalDatabase[selectedAnimal as keyof typeof animalDatabase];
      const mood = animalInfo.moods[Math.floor(Math.random() * animalInfo.moods.length)];
      const confidence = Math.floor(Math.random() * 20) + 80; // 80-99%
      
      const result = {
        animalType: selectedAnimal,
        mood,
        confidence,
        description: animalInfo.description,
        habitat: animalInfo.habitat,
        safetyTips: animalInfo.safetyTips,
        funFact: animalInfo.funFact
      };
      
      resolve(result);
    }, 2000 + Math.random() * 1000); // 2-3 seconds
  });
};

type ViewState = 'main' | 'results';

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewState>('main');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleImageUploaded = async (file: File, preview: string) => {
    setUploadedImage(preview);
    setIsAnalyzing(true);

    try {
      toast({
        title: "Processing image",
        description: "Our AI is identifying the animal...",
      });

      const result = await simulateWildlifeClassification(file);
      setAnalysisResult(result);
      setCurrentView('results');
      
      toast({
        title: "Identification complete!",
        description: `Identified as ${result.animalType} with ${result.confidence}% confidence`,
      });
    } catch (error) {
      toast({
        title: "Identification failed",
        description: "There was an error processing your image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleNewAnalysis = () => {
    setCurrentView('main');
    setUploadedImage(null);
    setAnalysisResult(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {currentView === 'main' && (
        <CameraSection 
          onImageUploaded={handleImageUploaded}
          isAnalyzing={isAnalyzing}
        />
      )}
      
      {currentView === 'results' && analysisResult && uploadedImage && (
        <AnimalResultCard 
          result={analysisResult}
          imageUrl={uploadedImage}
          onNewAnalysis={handleNewAnalysis}
        />
      )}
    </div>
  );
};

export default Index;