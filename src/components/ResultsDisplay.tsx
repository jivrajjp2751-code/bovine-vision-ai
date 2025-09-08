import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Activity, Eye, Download, BarChart3 } from "lucide-react";

interface ClassificationResult {
  animalType: "Cattle" | "Buffalo";
  confidence: number;
  bodyStructureScore: number;
  traits: {
    bodySize: number;
    posture: number;
    symmetry: number;
  };
  recommendations: string[];
}

interface ResultsDisplayProps {
  result: ClassificationResult;
  imageUrl: string;
  onNewAnalysis: () => void;
}

const ResultsDisplay = ({ result, imageUrl, onNewAnalysis }: ResultsDisplayProps) => {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-success";
    if (confidence >= 70) return "text-accent";
    return "text-destructive";
  };

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 90) return "High Confidence";
    if (confidence >= 70) return "Medium Confidence";
    return "Low Confidence";
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-4 py-2 bg-success/10 text-success rounded-full mb-4">
          <CheckCircle className="w-5 h-5 mr-2" />
          <span className="font-medium">Analysis Complete</span>
        </div>
        <h2 className="text-3xl font-bold mb-2">Classification Results</h2>
        <p className="text-muted-foreground">AI-powered analysis of your livestock image</p>
      </div>

      {/* Main Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Image and Primary Classification */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Eye className="w-5 h-5 mr-2" />
              Visual Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <img
                src={imageUrl}
                alt="Analyzed livestock"
                className="w-full h-64 object-cover rounded-lg"
              />
              
              <div className="text-center space-y-3">
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-1">
                    {result.animalType}
                  </h3>
                  <Badge 
                    variant={result.confidence >= 90 ? "default" : result.confidence >= 70 ? "secondary" : "destructive"}
                    className="text-sm"
                  >
                    {getConfidenceBadge(result.confidence)}
                  </Badge>
                </div>
                
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-2">Confidence Score</p>
                  <div className="flex items-center space-x-3">
                    <Progress value={result.confidence} className="flex-1" />
                    <span className={`text-2xl font-bold ${getConfidenceColor(result.confidence)}`}>
                      {result.confidence}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Metrics */}
        <div className="space-y-6">
          {/* Body Structure Score */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Body Structure Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">
                    {result.bodyStructureScore}/100
                  </div>
                  <p className="text-sm text-muted-foreground">Overall Score</p>
                </div>
                
                <Progress value={result.bodyStructureScore} className="h-3" />
                
                <div className="grid grid-cols-1 gap-3">
                  {Object.entries(result.traits).map(([trait, score]) => (
                    <div key={trait} className="flex justify-between items-center">
                      <span className="text-sm font-medium capitalize">
                        {trait === "bodySize" ? "Body Size" : trait}
                      </span>
                      <div className="flex items-center space-x-2 flex-1 ml-4">
                        <Progress value={score} className="flex-1 h-2" />
                        <span className="text-sm font-medium w-12 text-right">{score}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
        <Button onClick={onNewAnalysis} size="lg" className="px-8">
          <Eye className="w-5 h-5 mr-2" />
          Analyze Another Image
        </Button>
        
        <Button variant="outline" size="lg" className="px-8">
          <Download className="w-5 h-5 mr-2" />
          Download Report
        </Button>
      </div>
    </div>
  );
};

export default ResultsDisplay;