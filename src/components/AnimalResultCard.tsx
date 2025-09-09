import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Heart, Home, Shield, Lightbulb } from "lucide-react";

interface AnimalResult {
  animalType: string;
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
  onNewAnalysis: () => void;
}

const AnimalResultCard = ({ result, imageUrl, onNewAnalysis }: AnimalResultCardProps) => {
  const moodColor = result.mood === "Calm" ? "bg-success text-success-foreground" : "bg-warning text-warning-foreground";
  const moodIcon = result.mood === "Calm" ? <Heart className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Card className="shadow-warm border-border/50 overflow-hidden">
        {/* Image */}
        <div className="relative">
          <img
            src={imageUrl}
            alt={result.animalType}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-4 right-4">
            <Badge variant="secondary" className="bg-white/90 text-foreground">
              {result.confidence}% Confident
            </Badge>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Animal Type & Mood */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              {result.animalType}
            </h2>
            <Badge className={`${moodColor} rounded-full px-4 py-2`}>
              {moodIcon}
              <span className="ml-2 font-semibold">{result.mood}</span>
            </Badge>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Lightbulb className="w-4 h-4" />
              <span className="text-sm font-medium">About this animal</span>
            </div>
            <p className="text-foreground leading-relaxed">
              {result.description}
            </p>
          </div>

          {/* Habitat */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Home className="w-4 h-4" />
              <span className="text-sm font-medium">Natural Habitat</span>
            </div>
            <p className="text-foreground">
              {result.habitat}
            </p>
          </div>

          {/* Safety Tips */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Safety Tips</span>
            </div>
            <ul className="space-y-2">
              {result.safetyTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2 text-foreground">
                  <span className="text-primary mt-1">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Fun Fact */}
          <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
            <h4 className="font-semibold text-primary mb-2">🎉 Fun Fact</h4>
            <p className="text-foreground text-sm">
              {result.funFact}
            </p>
          </div>

          {/* Action Button */}
          <Button 
            onClick={onNewAnalysis}
            className="w-full bg-gradient-nature hover:opacity-90 text-white rounded-xl py-3 font-semibold"
          >
            Identify Another Animal
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AnimalResultCard;