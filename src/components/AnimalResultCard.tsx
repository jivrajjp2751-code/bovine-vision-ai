import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, AlertTriangle, Camera, Info, Shield, Eye } from "lucide-react";

interface AnimalResult {
  name: string;
  species: string;
  mood: "Calm" | "Aggressive";
  confidence: number;
  description: string;
  habitat: string;
  safetyTips: string[];
  funFact: string;
}

interface AnimalResultCardProps {
  result: AnimalResult;
  imageUrl: string;
  onNewPhoto: () => void;
}

const AnimalResultCard = ({ result, imageUrl, onNewPhoto }: AnimalResultCardProps) => {
  const moodColor = result.mood === "Calm" ? "calm" : "aggressive";
  const moodIcon = result.mood === "Calm" ? Heart : AlertTriangle;
  const MoodIcon = moodIcon;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Main Result Card */}
      <Card className="shadow-nature border border-border/50 bg-gradient-soft overflow-hidden">
        <div className="relative">
          <img
            src={imageUrl}
            alt={`${result.name} photo`}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          
          {/* Floating mood badge */}
          <div className="absolute top-4 right-4">
            <Badge 
              className={`
                px-3 py-2 rounded-full shadow-lg backdrop-blur-sm border-0
                ${result.mood === "Calm" 
                  ? "bg-calm/90 text-calm-foreground" 
                  : "bg-aggressive/90 text-aggressive-foreground"
                }
              `}
            >
              <MoodIcon className="w-4 h-4 mr-2" />
              {result.mood}
            </Badge>
          </div>
        </div>

        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold text-foreground mb-1">
                {result.name}
              </CardTitle>
              <p className="text-muted-foreground italic">
                {result.species}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">
                {result.confidence}%
              </div>
              <p className="text-xs text-muted-foreground">Confidence</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Description */}
          <div className="space-y-2">
            <div className="flex items-center text-foreground font-medium">
              <Info className="w-4 h-4 mr-2 text-primary" />
              About this animal
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed pl-6">
              {result.description}
            </p>
          </div>

          {/* Habitat */}
          <div className="space-y-2">
            <div className="flex items-center text-foreground font-medium">
              <Eye className="w-4 h-4 mr-2 text-primary" />
              Habitat
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed pl-6">
              {result.habitat}
            </p>
          </div>

          {/* Safety Tips */}
          <div className="space-y-3">
            <div className="flex items-center text-foreground font-medium">
              <Shield className="w-4 h-4 mr-2 text-primary" />
              Safety Tips
            </div>
            <div className="pl-6 space-y-2">
              {result.safetyTips.map((tip, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {tip}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Fun Fact */}
          <div className="bg-primary-light/50 rounded-xl p-4 border border-primary/20">
            <div className="flex items-center text-primary font-medium mb-2">
              <Heart className="w-4 h-4 mr-2" />
              Fun Fact
            </div>
            <p className="text-foreground text-sm leading-relaxed">
              {result.funFact}
            </p>
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <Button 
              onClick={onNewPhoto}
              className="w-full rounded-full bg-gradient-nature hover:shadow-nature transition-all duration-300 transform hover:scale-105"
              size="lg"
            >
              <Camera className="w-5 h-5 mr-2" />
              Identify Another Animal
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnimalResultCard;