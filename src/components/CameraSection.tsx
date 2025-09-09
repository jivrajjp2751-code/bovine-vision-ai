import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Camera, Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

interface CameraSectionProps {
  onImageUploaded: (file: File, preview: string) => void;
  isAnalyzing: boolean;
}

const CameraSection = ({ onImageUploaded, isAnalyzing }: CameraSectionProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file (JPG, PNG, etc.)",
          variant: "destructive",
        });
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 10MB",
          variant: "destructive",
        });
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      onImageUploaded(file, previewUrl);
    }
  }, [onImageUploaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.webp']
    },
    multiple: false,
    disabled: isAnalyzing,
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Identify Wildlife
        </h2>
        <p className="text-muted-foreground">
          Take a photo or upload an image to identify animals and learn about them
        </p>
      </div>

      <Card className="p-8 shadow-warm border-border/50 max-w-md w-full">
        {!preview ? (
          <div
            {...getRootProps()}
            className={`
              border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300
              ${isDragActive 
                ? "border-primary bg-primary/5 scale-105" 
                : "border-border hover:border-primary/50 hover:bg-primary/5"
              }
              ${isAnalyzing ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            <input {...getInputProps()} />
            
            <div className="flex flex-col items-center space-y-6">
              {/* Large Camera Icon */}
              <div className="p-6 bg-gradient-nature rounded-full shadow-soft">
                <Camera className="w-12 h-12 text-white" />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">
                  {isDragActive ? "Drop your photo here" : "Capture or Upload"}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Take a photo of any animal to get instant identification
                </p>
              </div>
              
              <Button 
                className="bg-primary hover:bg-primary-hover text-primary-foreground rounded-xl px-6 py-3"
                disabled={isAnalyzing}
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose Photo
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="relative mb-4">
              <img
                src={preview}
                alt="Uploaded animal"
                className="w-full h-48 object-cover rounded-xl shadow-card"
              />
              
              {isAnalyzing && (
                <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
                  <div className="text-center text-white">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                    <p className="text-sm">Identifying animal...</p>
                  </div>
                </div>
              )}
            </div>
            
            {!isAnalyzing && (
              <Button 
                variant="outline" 
                onClick={() => setPreview(null)}
                className="rounded-xl"
              >
                Try Another Photo
              </Button>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default CameraSection;