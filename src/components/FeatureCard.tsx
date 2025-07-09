import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
  gradient?: string;
}

const FeatureCard = ({ title, description, icon: Icon, onClick, gradient = "bg-gradient-spiritual" }: FeatureCardProps) => {
  return (
    <Card className="card-divine group cursor-pointer transition-all duration-300 hover:scale-105" onClick={onClick}>
      <div className="p-6 text-center space-y-4">
        <div className={`w-16 h-16 ${gradient} rounded-full flex items-center justify-center mx-auto group-hover:animate-divine-glow`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
        <Button variant="ghost" className="w-full group-hover:bg-gradient-spiritual group-hover:text-white transition-all duration-300">
          Begin Journey
        </Button>
      </div>
    </Card>
  );
};

export default FeatureCard;