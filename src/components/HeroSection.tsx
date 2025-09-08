import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, TrendingUp } from "lucide-react";
import heroBackground from "@/assets/dairy-hero-bg.jpg";

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <div 
      className="min-h-screen bg-gradient-hero flex items-center justify-center px-4 py-20 relative bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(135deg, hsl(var(--primary) / 0.9) 0%, hsl(var(--accent) / 0.8) 100%), url(${heroBackground})`
      }}
    >
      <div className="max-w-6xl mx-auto text-center text-white">
        <div className="mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
            <Zap className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">AI-Powered Dairy Classification</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Revolutionizing
            <span className="block bg-gradient-to-r from-white to-primary-glow bg-clip-text text-transparent">
              Dairy Farming
            </span>
            with AI
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform traditional cattle and buffalo evaluation with cutting-edge AI technology. 
            Get instant, accurate body structure classifications for improved livestock management.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            size="lg"
            onClick={onGetStarted}
            className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4 h-auto shadow-glow transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            Start Classification
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4 h-auto backdrop-blur-sm"
          >
            Learn More
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            {
              icon: <Zap className="w-8 h-8" />,
              title: "Instant Analysis",
              description: "Get classification results in seconds with advanced AI processing"
            },
            {
              icon: <Shield className="w-8 h-8" />,
              title: "99.2% Accuracy",
              description: "Industry-leading precision for reliable livestock evaluation"
            },
            {
              icon: <TrendingUp className="w-8 h-8" />,
              title: "Improved Yields",
              description: "Optimize breeding and management for better farm productivity"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-primary-glow mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-white/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;