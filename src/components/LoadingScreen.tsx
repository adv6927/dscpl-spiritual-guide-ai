import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onLoadingComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      {/* DSCPL Branding */}
      <div className="text-center space-y-8">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold bg-gradient-spiritual bg-clip-text text-transparent">
            DSCPL
          </h1>
          <p className="text-xl text-muted-foreground">
            Your Spiritual Companion
          </p>
        </div>

        {/* Pyramid Loader */}
        <div className="flex justify-center">
          <div className="dark:block hidden">
            <div className="pyramid-loader">
              <div className="wrapper">
                <span className="side side1"></span>
                <span className="side side2"></span>
                <span className="side side3"></span>
                <span className="side side4"></span>
                <span className="shadow"></span>
              </div>
            </div>
          </div>

          <div className="dark:hidden block">
            <div className="pyramid-loader-light">
              <div className="wrapper">
                <span className="side side1"></span>
                <span className="side side2"></span>
                <span className="side side3"></span>
                <span className="side side4"></span>
                <span className="shadow"></span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="space-y-4">
          <p className="text-lg text-muted-foreground">
            Preparing your spiritual journey
          </p>
          <div className="space-y-2">
            <p className="text-2xl font-semibold text-foreground">{progress}%</p>
            <div className="w-80 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-spiritual rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Scripture Quote */}
        <div className="max-w-md text-center space-y-2">
          <p className="text-lg text-muted-foreground italic">
            "Be still and know that I am God"
          </p>
          <p className="text-sm text-muted-foreground">
            - Psalm 46:10
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;