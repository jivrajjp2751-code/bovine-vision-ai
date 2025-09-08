import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface ImageUploadProps {
  onImageUploaded: (file: File, preview: string) => void;
  isAnalyzing: boolean;
}

const ImageUpload = ({ onImageUploaded, isAnalyzing }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

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
      setUploadedFile(file);
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

  const clearImage = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    setUploadedFile(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="p-8 shadow-card border-border/50">
        {!preview ? (
          <div
            {...getRootProps()}
            className={`
              border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300
              ${isDragActive 
                ? "border-primary bg-primary/5 scale-105" 
                : "border-border hover:border-primary/50 hover:bg-primary/5"
              }
              ${isAnalyzing ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            <input {...getInputProps()} />
            
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-primary/10 rounded-full">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Upload Cattle or Buffalo Image
                </h3>
                <p className="text-muted-foreground mb-4">
                  {isDragActive 
                    ? "Drop your image here..." 
                    : "Drag and drop an image, or click to browse"
                  }
                </p>
                <p className="text-sm text-muted-foreground">
                  Supports JPG, PNG, GIF up to 10MB
                </p>
              </div>
              
              <Button 
                variant="outline" 
                className="mt-4"
                disabled={isAnalyzing}
              >
                <ImageIcon className="w-4 h-4 mr-2" />
                Choose Image
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="relative">
              <img
                src={preview}
                alt="Uploaded cattle/buffalo"
                className="w-full h-64 object-cover rounded-lg shadow-card"
              />
              
              {!isAnalyzing && (
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={clearImage}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
              
              {isAnalyzing && (
                <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                  <div className="text-center text-white">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                    <p className="text-sm">Analyzing image...</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                <strong>{uploadedFile?.name}</strong> ({((uploadedFile?.size || 0) / 1024 / 1024).toFixed(1)} MB)
              </p>
              
              {!isAnalyzing && (
                <Button 
                  variant="outline" 
                  onClick={clearImage}
                  className="mr-2"
                >
                  Upload Different Image
                </Button>
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ImageUpload;