import { useState, useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import MainDashboard from "@/components/MainDashboard";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize dark mode on first load
    document.documentElement.classList.add("dark");
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return <MainDashboard />;
};

export default Index;
