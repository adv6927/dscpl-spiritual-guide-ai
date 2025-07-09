import { useState } from "react";
import { Book, HandHeart, Brain, Shield, MessageCircle, Sparkles } from "lucide-react";
import FeatureCard from "./FeatureCard";
import ChatBot from "./ChatBot";
import ThemeToggle from "./ThemeToggle";
import TransitionLoader from "./TransitionLoader";

type ViewType = "dashboard" | "devotion" | "prayer" | "meditation" | "accountability" | "chat";

const MainDashboard = () => {
  const [currentView, setCurrentView] = useState<ViewType>("dashboard");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextView, setNextView] = useState<ViewType>("dashboard");

  const handleViewChange = (newView: ViewType) => {
    if (newView !== currentView) {
      setNextView(newView);
      setIsTransitioning(true);
    }
  };

  const handleTransitionComplete = () => {
    setCurrentView(nextView);
    setIsTransitioning(false);
  };

  const features = [
    {
      id: "devotion" as ViewType,
      title: "Daily Devotion",
      description: "5-minute Bible reading with prayer and faith declarations",
      icon: Book,
      gradient: "bg-gradient-to-br from-purple-500 to-pink-500"
    },
    {
      id: "prayer" as ViewType,
      title: "Daily Prayer",
      description: "Guided prayer using the ACTS model (Adoration, Confession, Thanksgiving, Supplication)",
      icon: HandHeart,
      gradient: "bg-gradient-to-br from-blue-500 to-cyan-500"
    },
    {
      id: "meditation" as ViewType,
      title: "Daily Meditation",
      description: "Scripture-focused meditation with breathing guides and reflection prompts",
      icon: Brain,
      gradient: "bg-gradient-to-br from-green-500 to-emerald-500"
    },
    {
      id: "accountability" as ViewType,
      title: "Daily Accountability",
      description: "Spiritual strength and support for overcoming challenges with biblical truth",
      icon: Shield,
      gradient: "bg-gradient-to-br from-orange-500 to-red-500"
    },
    {
      id: "chat" as ViewType,
      title: "Just Chat",
      description: "Have a conversation with your spiritual AI companion anytime",
      icon: MessageCircle,
      gradient: "bg-gradient-to-br from-violet-500 to-purple-500"
    }
  ];

  const renderContent = () => {
    switch (currentView) {
      case "chat":
        return <ChatBot />;
      case "devotion":
        return (
          <div className="card-divine p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Daily Devotion</h2>
            <p className="text-muted-foreground mb-6">Coming soon! Choose topics like stress, fear, relationships, and more.</p>
            <button 
              onClick={() => handleViewChange("dashboard")} 
              className="btn-divine px-6 py-2 rounded-lg text-white"
            >
              Back to Dashboard
            </button>
          </div>
        );
      case "prayer":
        return (
          <div className="card-divine p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Daily Prayer</h2>
            <p className="text-muted-foreground mb-6">Coming soon! Guided prayer sessions with personal growth focus.</p>
            <button 
              onClick={() => handleViewChange("dashboard")} 
              className="btn-divine px-6 py-2 rounded-lg text-white"
            >
              Back to Dashboard
            </button>
          </div>
        );
      case "meditation":
        return (
          <div className="card-divine p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Daily Meditation</h2>
            <p className="text-muted-foreground mb-6">Coming soon! Scripture-focused meditation with breathing guides.</p>
            <button 
              onClick={() => handleViewChange("dashboard")} 
              className="btn-divine px-6 py-2 rounded-lg text-white"
            >
              Back to Dashboard
            </button>
          </div>
        );
      case "accountability":
        return (
          <div className="card-divine p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Daily Accountability</h2>
            <p className="text-muted-foreground mb-6">Coming soon! Spiritual strength for overcoming challenges.</p>
            <button 
              onClick={() => handleViewChange("dashboard")} 
              className="btn-divine px-6 py-2 rounded-lg text-white"
            >
              Back to Dashboard
            </button>
          </div>
        );
      default:
        return (
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-4">
                <h1 className="text-5xl font-bold bg-gradient-spiritual bg-clip-text text-transparent">
                  DSCPL
                </h1>
                <Sparkles className="w-8 h-8 text-primary animate-divine-glow" />
              </div>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Your personal spiritual assistant, guiding you daily through devotionals, prayer, 
                meditation, and accountability. What do you need today?
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                <FeatureCard
                  key={feature.id}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  onClick={() => handleViewChange(feature.id)}
                  gradient={feature.gradient}
                />
              ))}
            </div>

            {/* Daily Verse */}
            <div className="card-divine p-6 text-center bg-gradient-glow">
              <h3 className="text-lg font-semibold mb-2">Today's Verse</h3>
              <blockquote className="text-muted-foreground italic mb-2">
                "Cast all your anxiety on him because he cares for you."
              </blockquote>
              <cite className="text-sm text-primary font-medium">1 Peter 5:7</cite>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Transition Loader */}
      <TransitionLoader 
        isVisible={isTransitioning} 
        onComplete={handleTransitionComplete} 
      />

      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {currentView !== "dashboard" && (
              <button
                onClick={() => handleViewChange("dashboard")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back
              </button>
            )}
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/50 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            DSCPL - Your Spiritual AI Companion | Rooted in Scripture, Empowered by Grace
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MainDashboard;