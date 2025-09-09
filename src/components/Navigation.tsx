import { User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  return (
    <nav className="w-full bg-background/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Profile Icon */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="rounded-full p-2 hover:bg-primary/10"
        >
          <User className="w-5 h-5 text-primary" />
        </Button>

        {/* App Name - Center */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <h1 className="text-xl md:text-2xl font-bold text-primary">
            PashuPehachan
          </h1>
        </div>

        {/* Spacer for balance */}
        <div className="w-9 h-9"></div>
      </div>
    </nav>
  );
};

export default Navigation;