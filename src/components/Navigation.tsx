import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Navigation = () => {
  return (
    <nav className="w-full bg-card/80 backdrop-blur-sm border-b border-border/50 shadow-soft sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Profile Icon - Left */}
          <Button variant="ghost" size="sm" className="rounded-full p-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary/10 text-primary">
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </Button>

          {/* Website Name - Center */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <h1 className="text-2xl font-bold bg-gradient-nature bg-clip-text text-transparent">
              PashuPehachan
            </h1>
          </div>

          {/* Spacer for balance - Right */}
          <div className="w-12"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;