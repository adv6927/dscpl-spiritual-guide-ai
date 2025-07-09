import { useEffect, useState } from "react";

interface TransitionLoaderProps {
  isVisible: boolean;
  onComplete?: () => void;
}

const TransitionLoader = ({ isVisible, onComplete }: TransitionLoaderProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        onComplete?.();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm">
      <div className="dark:block hidden">
        <div className="pyramid-loader scale-75">
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
        <div className="pyramid-loader-light scale-75">
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
  );
};

export default TransitionLoader;