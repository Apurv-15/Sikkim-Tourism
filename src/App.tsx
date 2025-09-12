import React, { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Destinations from "./pages/Destinations";
import EastSikkim from "./pages/EastSikkim";
import WestSikkim from "./pages/WestSikkim";
import SouthSikkim from "./pages/SouthSikkim";
import NorthSikkim from "./pages/NorthSikkim";
import Culture from "./pages/Culture";
import Food from "./pages/Food";
import Plan from "./pages/Plan";
import Map from "./pages/Map";
import NotFound from "./pages/NotFound";
import Loader from "./components/Loader";
import ChatBot from "./components/ChatBot";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Add dark mode class to document
    document.documentElement.classList.add('dark');
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {isLoading ? (
          <Loader onComplete={handleLoadingComplete} />
        ) : (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/east-sikkim" element={<EastSikkim />} />
              <Route path="/west-sikkim" element={<WestSikkim />} />
              <Route path="/south-sikkim" element={<SouthSikkim />} />
              <Route path="/north-sikkim" element={<NorthSikkim />} />
              <Route path="/culture" element={<Culture />} />
              <Route path="/food" element={<Food />} />
              <Route path="/plan" element={<Plan />} />
              <Route path="/map" element={<Map />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ChatBot />
          </BrowserRouter>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
