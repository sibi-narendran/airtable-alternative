import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Brain, Zap, GraduationCap } from "lucide-react";

const KeyFeatures = () => {
  const { ref, isVisible } = useScrollAnimation(0.2);

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Built with AI",
      description: "Generate databases, automate workflows, and get intelligent insights with our AI-first approach. No more manual setup.",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      borderColor: "border-orange-200"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Super Flexible",
      description: "Adapt to any workflow with unlimited custom fields, views, and automations. Build exactly what your team needs.",
      bgColor: "bg-blue-50", 
      iconColor: "text-blue-600",
      borderColor: "border-blue-200"
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Easy to Learn",
      description: "Intuitive interface that anyone can master in minutes. No technical expertise required to build powerful databases.",
      bgColor: "bg-green-50",
      iconColor: "text-green-600", 
      borderColor: "border-green-200"
    }
  ];

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div 
            className={`text-center mb-16 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Why Teams Love Dooza Table
            </h2>
            <p className="text-lg text-gray-700 font-semibold max-w-2xl mx-auto">
              The perfect combination of power and simplicity
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`${feature.bgColor} border-2 ${feature.borderColor} rounded-xl p-8 text-center transition-all duration-700 hover:shadow-lg hover:scale-105 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 ${feature.iconColor} mb-6 bg-white rounded-full shadow-sm`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
