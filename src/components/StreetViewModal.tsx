import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import GoogleStreetView from './GoogleStreetView';
import { X } from 'lucide-react';

interface StreetViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  coordinates?: {
    lat: number;
    lng: number;
  };
  title: string;
}

const StreetViewModal: React.FC<StreetViewModalProps> = ({
  isOpen,
  onClose,
  coordinates,
  title
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full h-[80vh] p-0 bg-card border border-border">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-foreground">
              360° View: {title}
            </DialogTitle>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </DialogHeader>
        <div className="flex-1 p-6 pt-4">
          <GoogleStreetView
            lat={coordinates?.lat}
            lng={coordinates?.lng}
            className="w-full h-full rounded-2xl"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StreetViewModal;