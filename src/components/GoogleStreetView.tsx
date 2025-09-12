import React from 'react';
import { MapPin } from 'lucide-react';

interface GoogleStreetViewProps {
  lat?: number;
  lng?: number;
  heading?: number;
  pitch?: number;
  zoom?: number;
  className?: string;
}

const GoogleStreetView: React.FC<GoogleStreetViewProps> = ({
  lat = 27.3389, // Gangtok coordinates
  lng = 88.6065,
  heading = 34,
  pitch = 10,
  zoom = 1,
  className = "w-full h-96"
}) => {
  return (
    <div className={`${className} rounded-2xl overflow-hidden bg-gradient-mountain relative`}>
      <div className="w-full h-full">
        {/* Placeholder content - would be replaced by actual Street View */}
        <div className="flex items-center justify-center h-full text-white">
          <div className="text-center glass rounded-2xl p-8">
            <MapPin className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">360° Street View</h3>
            <p className="text-white/80 mb-4">
              Virtual tour of Gangtok, Sikkim
            </p>
            <div className="text-sm text-white/60">
              <p>Coordinates: {lat}, {lng}</p>
              <p className="mt-2">
                Google Maps Street View integration ready<br />
                (API key required for activation)
              </p>
            </div>
            <button 
              onClick={() => {
                window.open(
                  `https://www.google.com/maps/@${lat},${lng},3a,75y,${heading}h,${pitch}t/data=!3m6!1e1!3m4!1s0x0:0x0!2e0!7i16384!8i8192`,
                  '_blank'
                );
              }}
              className="mt-4 px-6 py-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            >
              Open in Google Maps
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleStreetView;