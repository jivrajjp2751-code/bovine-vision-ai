import { useState, useRef } from "react";
import { Camera, Upload, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

interface CameraSectionProps {
  onImageCaptured: (file: File, preview: string) => void;
  isAnalyzing: boolean;
}

const CameraSection = ({ onImageCaptured, isAnalyzing }: CameraSectionProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file (JPG, PNG, etc.)",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 10MB",
        variant: "destructive",
      });
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    onImageCaptured(file, previewUrl);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    if (isAnalyzing) return;
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isAnalyzing) {
      setDragActive(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleButtonClick = () => {
    if (isAnalyzing) return;
    fileInputRef.current?.click();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const clearImage = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="p-8 shadow-nature border border-border/50 bg-gradient-soft">
        {!preview ? (
          <div
            className={`
              relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer 
              transition-all duration-300 transform
              ${dragActive || isAnalyzing
                ? "border-primary bg-primary-light scale-105" 
                : "border-border hover:border-primary/50 hover:bg-primary-light/30 hover:scale-102"
              }
              ${isAnalyzing ? "opacity-50 cursor-not-allowed" : ""}
            `}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={handleButtonClick}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
              disabled={isAnalyzing}
            />
            
            <div className="flex flex-col items-center space-y-6">
              <div className="relative">
                <div className="p-6 bg-gradient-nature rounded-full shadow-glow">
                  <Camera className="w-12 h-12 text-white" />
                </div>
                {dragActive && (
                  <div className="absolute inset-0 p-6 bg-primary/20 rounded-full animate-pulse">
                    <Upload className="w-12 h-12 text-primary" />
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-foreground">
                  {dragActive ? "Drop your photo here!" : "Capture or Upload"}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Take a photo of any animal or drag & drop an image to identify the species and mood
                </p>
              </div>
              
              <Button 
                className="mt-4 rounded-full px-8 py-3 bg-gradient-nature hover:shadow-nature transition-all duration-300 transform hover:scale-105"
                disabled={isAnalyzing}
              >
                <Camera className="w-4 h-4 mr-2" />
                Choose Photo
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="relative">
              <img
                src={preview}
                alt="Captured animal"
                className="w-full h-64 object-cover rounded-xl shadow-warm"
              />
              
              {!isAnalyzing && (
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-3 right-3 rounded-full shadow-lg"
                  onClick={clearImage}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
              
              {isAnalyzing && (
                <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <div className="text-center text-white">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3" />
                    <p className="text-sm font-medium">Identifying animal...</p>
                  </div>
                </div>
              )}
            </div>
            
            {!isAnalyzing && (
              <div className="text-center">
                <Button 
                  variant="outline" 
                  onClick={clearImage}
                  className="rounded-full px-6 border-border/50 hover:bg-primary-light/30"
                >
                  Try Another Photo
                </Button>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default CameraSection;