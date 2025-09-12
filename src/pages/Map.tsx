import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import { regionsData, MonasteryData } from '@/data/monasteries';
import Layout from '@/components/Layout';
import { Search, MapPin, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icon for monasteries
const monasteryIcon = new Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41]
});

// Component to center map on search results
const MapController = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  
  useEffect(() => {
    if (center && center[0] !== 0 && center[1] !== 0) {
      map.setView(center, 12);
    }
  }, [center, map]);
  
  return null;
};

const Map: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [filteredMonasteries, setFilteredMonasteries] = useState<MonasteryData[]>([]);
  const [selectedMonastery, setSelectedMonastery] = useState<MonasteryData | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([27.3389, 88.6065]); // Gangtok coordinates
  const mapRef = useRef<any>(null);

  // Get all monasteries from all regions
  const allMonasteries = regionsData.flatMap(region => 
    region.monasteries.map(monastery => ({
      ...monastery,
      region: region.name,
      regionId: region.id
    }))
  );

  // Filter monasteries based on search and filters
  useEffect(() => {
    let filtered = allMonasteries;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(monastery =>
        monastery.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        monastery.nearestTown.toLowerCase().includes(searchTerm.toLowerCase()) ||
        monastery.significance.toLowerCase().includes(searchTerm.toLowerCase()) ||
        monastery.specialFeatures.some(feature => 
          feature.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Region filter
    if (selectedRegion !== 'all') {
      filtered = filtered.filter(monastery => monastery.regionId === selectedRegion);
    }

    // Difficulty filter
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(monastery => monastery.difficulty === selectedDifficulty);
    }

    setFilteredMonasteries(filtered);
  }, [searchTerm, selectedRegion, selectedDifficulty]);

  // Handle monastery selection
  const handleMonasterySelect = (monastery: MonasteryData) => {
    setSelectedMonastery(monastery);
    if (monastery.coordinates) {
      setMapCenter([monastery.coordinates.lat, monastery.coordinates.lng]);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedRegion('all');
    setSelectedDifficulty('all');
    setSelectedMonastery(null);
    setMapCenter([27.3389, 88.6065]); // Reset to Gangtok
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'moderate': return 'bg-yellow-500';
      case 'difficult': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-sky">
        {/* Header */}
        <div className="pt-24 pb-8 px-6">
          <div className="container mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-mountain bg-clip-text text-transparent mb-4">
                Sikkim Monasteries Map
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore the sacred monasteries of Sikkim with our interactive map. 
                Discover spiritual sites across all four regions of this beautiful state.
              </p>
            </div>

            {/* Search and Filters */}
            <div className="glass rounded-2xl p-6 mb-8">
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search monasteries, towns, or features..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Region Filter */}
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder="Select Region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    <SelectItem value="east">East Sikkim</SelectItem>
                    <SelectItem value="west">West Sikkim</SelectItem>
                    <SelectItem value="south">South Sikkim</SelectItem>
                    <SelectItem value="north">North Sikkim</SelectItem>
                  </SelectContent>
                </Select>

                {/* Difficulty Filter */}
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder="Select Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Difficulties</SelectItem>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="difficult">Difficult</SelectItem>
                  </SelectContent>
                </Select>

                {/* Clear Filters */}
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="w-full lg:w-auto"
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear Filters
                </Button>
              </div>

              {/* Results Count */}
              <div className="mt-4 text-sm text-muted-foreground">
                Showing {filteredMonasteries.length} of {allMonasteries.length} monasteries
              </div>
            </div>
          </div>
        </div>

        {/* Map and Sidebar */}
        <div className="container mx-auto px-6 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map */}
            <div className="lg:col-span-2">
              <div className="glass rounded-2xl overflow-hidden h-96 lg:h-[600px]">
                <MapContainer
                  center={mapCenter}
                  zoom={10}
                  style={{ height: '100%', width: '100%' }}
                  ref={mapRef}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  
                  <MapController center={mapCenter} />
                  
                  {filteredMonasteries.map((monastery) => {
                    if (!monastery.coordinates) return null;
                    
                    return (
                      <Marker
                        key={monastery.id}
                        position={[monastery.coordinates.lat, monastery.coordinates.lng]}
                        icon={monasteryIcon}
                        eventHandlers={{
                          click: () => handleMonasterySelect(monastery)
                        }}
                      >
                        <Popup>
                          <div className="p-2">
                            <h3 className="font-semibold text-sm mb-1">{monastery.name}</h3>
                            <p className="text-xs text-muted-foreground mb-2">{monastery.nearestTown}</p>
                            <p className="text-xs">{monastery.significance.substring(0, 100)}...</p>
                            {monastery.altitude && (
                              <Badge variant="secondary" className="text-xs mt-2">
                                {monastery.altitude}
                              </Badge>
                            )}
                          </div>
                        </Popup>
                      </Marker>
                    );
                  })}
                </MapContainer>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Selected Monastery Details */}
              {selectedMonastery && (
                <Card className="glass">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      {selectedMonastery.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Nearest Town</p>
                      <p className="font-medium">{selectedMonastery.nearestTown}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Significance</p>
                      <p className="text-sm">{selectedMonastery.significance}</p>
                    </div>

                    {selectedMonastery.altitude && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Altitude</p>
                        <Badge variant="secondary">{selectedMonastery.altitude}</Badge>
                      </div>
                    )}

                    {selectedMonastery.difficulty && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Difficulty</p>
                        <Badge className={`${getDifficultyColor(selectedMonastery.difficulty)} text-white`}>
                          {selectedMonastery.difficulty.charAt(0).toUpperCase() + selectedMonastery.difficulty.slice(1)}
                        </Badge>
                      </div>
                    )}

                    {selectedMonastery.requiresPermit && (
                      <Badge variant="destructive">Requires Permit</Badge>
                    )}

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Special Features</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedMonastery.specialFeatures.map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Monastery List */}
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-primary" />
                    Monasteries ({filteredMonasteries.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {filteredMonasteries.map((monastery) => (
                      <div
                        key={monastery.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:bg-primary/5 ${
                          selectedMonastery?.id === monastery.id ? 'bg-primary/10 border-primary' : 'border-border'
                        }`}
                        onClick={() => handleMonasterySelect(monastery)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-sm mb-1">{monastery.name}</h4>
                            <p className="text-xs text-muted-foreground mb-2">{monastery.nearestTown}</p>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {monastery.region}
                              </Badge>
                              {monastery.difficulty && (
                                <Badge className={`${getDifficultyColor(monastery.difficulty)} text-white text-xs`}>
                                  {monastery.difficulty.charAt(0).toUpperCase() + monastery.difficulty.slice(1)}
                                </Badge>
                              )}
                              {monastery.requiresPermit && (
                                <Badge variant="destructive" className="text-xs">Permit</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Map;
