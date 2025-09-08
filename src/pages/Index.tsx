import { useState } from "react";
import Navigation from "@/components/Navigation";
import CameraSection from "@/components/CameraSection";
import AnimalResultCard from "@/components/AnimalResultCard";
import { toast } from "@/hooks/use-toast";

// Mock animal database with realistic data
const animalDatabase = [
  {
    name: "Golden Retriever",
    species: "Canis lupus familiaris",
    mood: "Calm" as const,
    description: "Golden Retrievers are friendly, intelligent, and devoted dogs. They are among the most popular dog breeds and make excellent family pets.",
    habitat: "Domestic environments, parks, and family homes. Originally bred for retrieving waterfowl.",
    safetyTips: [
      "Generally very friendly and safe around humans",
      "Always ask the owner before petting",
      "Let the dog sniff your hand first"
    ],
    funFact: "Golden Retrievers have a 'soft mouth' that allows them to carry eggs without breaking them!"
  },
  {
    name: "Bengal Tiger",
    species: "Panthera tigris tigris",
    mood: "Aggressive" as const,
    description: "Bengal Tigers are powerful apex predators native to India. They are solitary hunters and one of the largest cat species in the world.",
    habitat: "Dense forests, grasslands, and mangrove swamps primarily in India and Bangladesh.",
    safetyTips: [
      "Maintain a safe distance of at least 100 meters",
      "Never approach or attempt to feed",
      "If encountered, back away slowly and avoid direct eye contact",
      "Make yourself appear larger by raising your arms"
    ],
    funFact: "Tigers are excellent swimmers and can swim up to 3 miles!"
  },
  {
    name: "Indian Elephant",
    species: "Elephas maximus indicus",
    mood: "Calm" as const,
    description: "Indian Elephants are gentle giants known for their intelligence and emotional depth. They live in family groups led by the oldest female.",
    habitat: "Tropical forests, grasslands, and scrublands across India and Southeast Asia.",
    safetyTips: [
      "Keep a respectful distance of at least 25 meters",
      "Never walk behind an elephant",
      "Avoid loud noises or sudden movements",
      "If an elephant charges, try to find a tree or large rock for protection"
    ],
    funFact: "Elephants can hear sounds through their feet and communicate over long distances!"
  },
  {
    name: "Indian Cobra",
    species: "Naja naja",
    mood: "Aggressive" as const,
    description: "Indian Cobras are venomous snakes known for their iconic hood. They are generally shy but can be dangerous when threatened.",
    habitat: "Grasslands, forests, and agricultural areas throughout the Indian subcontinent.",
    safetyTips: [
      "Never approach or attempt to handle",
      "Back away slowly if you see one",
      "Seek immediate medical attention if bitten",
      "Keep your surroundings clean to avoid attracting prey"
    ],
    funFact: "Cobras are immune to their own venom and can live up to 20 years!"
  },
  {
    name: "Rhesus Macaque",
    species: "Macaca mulatta",
    mood: "Aggressive" as const,
    description: "Rhesus Macaques are intelligent primates that often live near human settlements. They can be aggressive when protecting their territory or young.",
    habitat: "Forests, temples, urban areas, and mountainous regions across Asia.",
    safetyTips: [
      "Do not feed or approach monkeys",
      "Secure food and belongings when in monkey areas",
      "Avoid direct eye contact as it can be seen as threatening",
      "If approached aggressively, back away slowly"
    ],
    funFact: "Rhesus Macaques were the first primates launched into space and safely returned!"
  },
  {
    name: "Indian Peacock",
    species: "Pavo cristatus",
    mood: "Calm" as const,
    description: "Indian Peacocks are magnificent birds known for their colorful tail feathers. Males display their plumage to attract females during mating season.",
    habitat: "Forests, parks, and gardens throughout India and Sri Lanka.",
    safetyTips: [
      "Generally harmless but can be territorial during breeding season",
      "Keep distance from nesting areas",
      "Don't try to touch or grab their tail feathers",
      "They can fly despite their size, so give them space"
    ],
    funFact: "A peacock's tail has over 200 feathers, and they can live up to 25 years!"
  }
];

// Simulated AI identification function
const simulateAnimalIdentification = (file: File): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Select random animal for demo
      const randomAnimal = animalDatabase[Math.floor(Math.random() * animalDatabase.length)];
      
      // Add some variation to confidence based on "difficulty"
      const confidence = Math.floor(Math.random() * 15) + 85; // 85-99%
      
      resolve({
        ...randomAnimal,
        confidence
      });
    }, 2000 + Math.random() * 1500); // 2-3.5 seconds
  });
};

type ViewState = 'main' | 'results';

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewState>('main');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [animalResult, setAnimalResult] = useState<any>(null);

  const handleImageCaptured = async (file: File, preview: string) => {
    setCapturedImage(preview);
    setIsAnalyzing(true);

    try {
      toast({
        title: "Analyzing photo",
        description: "Our AI is identifying the animal and analyzing its mood...",
      });

      const result = await simulateAnimalIdentification(file);
      setAnimalResult(result);
      setCurrentView('results');
      
      toast({
        title: "Identification complete!",
        description: `Found ${result.name} with ${result.confidence}% confidence`,
      });
    } catch (error) {
      toast({
        title: "Identification failed",
        description: "There was an error analyzing your photo. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleNewPhoto = () => {
    setCurrentView('main');
    setCapturedImage(null);
    setAnimalResult(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {currentView === 'main' && (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-nature bg-clip-text text-transparent">
                Discover Wildlife Around You
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Snap a photo of any animal to learn about its species, behavior, and get safety tips. 
                Your friendly wildlife companion!
              </p>
            </div>

            {/* Camera Section */}
            <div className="flex justify-center">
              <CameraSection 
                onImageCaptured={handleImageCaptured}
                isAnalyzing={isAnalyzing}
              />
            </div>
          </div>
        )}
        
        {currentView === 'results' && animalResult && capturedImage && (
          <div className="py-4">
            <AnimalResultCard 
              result={animalResult}
              imageUrl={capturedImage}
              onNewPhoto={handleNewPhoto}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;