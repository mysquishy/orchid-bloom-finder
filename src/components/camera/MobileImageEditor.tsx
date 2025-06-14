
import React, { useState, useRef, useEffect } from 'react';
import { RotateCw, Crop, Contrast, Sun, Palette, Download, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

interface MobileImageEditorProps {
  imageUrl: string;
  onSave: (editedImageUrl: string) => void;
  onCancel: () => void;
}

const MobileImageEditor: React.FC<MobileImageEditorProps> = ({ imageUrl, onSave, onCancel }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [filters, setFilters] = useState({
    brightness: 0,
    contrast: 0,
    saturation: 0,
    rotation: 0
  });
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      setImage(img);
      drawImage(img);
    };
    img.src = imageUrl;
  }, [imageUrl]);

  useEffect(() => {
    if (image) {
      drawImage(image);
    }
  }, [filters, image]);

  const drawImage = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply rotation
    if (filters.rotation !== 0) {
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((filters.rotation * Math.PI) / 180);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);
    }

    // Apply filters
    const filterString = [
      `brightness(${100 + filters.brightness}%)`,
      `contrast(${100 + filters.contrast}%)`,
      `saturate(${100 + filters.saturation}%)`
    ].join(' ');

    ctx.filter = filterString;
    ctx.drawImage(img, 0, 0);

    if (filters.rotation !== 0) {
      ctx.restore();
    }
  };

  const handleFilterChange = (filterType: string, value: number) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleRotate = () => {
    setFilters(prev => ({
      ...prev,
      rotation: (prev.rotation + 90) % 360
    }));
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const editedImageUrl = canvas.toDataURL('image/jpeg', 0.9);
    onSave(editedImageUrl);
  };

  const resetFilters = () => {
    setFilters({
      brightness: 0,
      contrast: 0,
      saturation: 0,
      rotation: 0
    });
    setActiveFilter(null);
  };

  const filterControls = [
    {
      id: 'brightness',
      icon: Sun,
      label: 'Brightness',
      min: -50,
      max: 50,
      value: filters.brightness
    },
    {
      id: 'contrast',
      icon: Contrast,
      label: 'Contrast',
      min: -50,
      max: 50,
      value: filters.contrast
    },
    {
      id: 'saturation',
      icon: Palette,
      label: 'Saturation',
      min: -50,
      max: 50,
      value: filters.saturation
    }
  ];

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-black text-white">
        <Button onClick={onCancel} variant="ghost" className="text-white">
          <X className="w-5 h-5" />
        </Button>
        <h2 className="text-lg font-semibold">Edit Photo</h2>
        <Button onClick={handleSave} variant="ghost" className="text-white">
          <Check className="w-5 h-5" />
        </Button>
      </div>

      {/* Canvas */}
      <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
        <canvas
          ref={canvasRef}
          className="max-w-full max-h-full object-contain"
          style={{ maxWidth: '100%', maxHeight: '100%' }}
        />
      </div>

      {/* Filter Slider */}
      {activeFilter && (
        <div className="px-4 pb-4">
          <Card className="bg-black/80 border-gray-600">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4 text-white">
                <span className="text-sm font-medium min-w-0">
                  {filterControls.find(f => f.id === activeFilter)?.label}
                </span>
                <Slider
                  value={[filters[activeFilter as keyof typeof filters] as number]}
                  onValueChange={(value) => handleFilterChange(activeFilter, value[0])}
                  min={filterControls.find(f => f.id === activeFilter)?.min || -50}
                  max={filterControls.find(f => f.id === activeFilter)?.max || 50}
                  step={1}
                  className="flex-1"
                />
                <span className="text-sm min-w-0">
                  {filters[activeFilter as keyof typeof filters]}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Controls */}
      <div className="p-4 bg-black">
        <div className="flex items-center justify-center space-x-6">
          {/* Rotate button */}
          <Button
            onClick={handleRotate}
            variant="ghost"
            className="text-white flex flex-col items-center space-y-1"
          >
            <RotateCw className="w-6 h-6" />
            <span className="text-xs">Rotate</span>
          </Button>

          {/* Filter buttons */}
          {filterControls.map((filter) => {
            const Icon = filter.icon;
            return (
              <Button
                key={filter.id}
                onClick={() => setActiveFilter(activeFilter === filter.id ? null : filter.id)}
                variant="ghost"
                className={`text-white flex flex-col items-center space-y-1 ${
                  activeFilter === filter.id ? 'bg-white/20' : ''
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs">{filter.label}</span>
              </Button>
            );
          })}

          {/* Reset button */}
          <Button
            onClick={resetFilters}
            variant="ghost"
            className="text-white flex flex-col items-center space-y-1"
          >
            <Download className="w-6 h-6 rotate-180" />
            <span className="text-xs">Reset</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileImageEditor;
