import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return <section className="min-h-[70vh] flex items-center justify-center bg-white pt-32 relative overflow-hidden border-b-4 border-orange-500">
      <div className="container mx-auto px-6 py-24 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black mb-6 animate-fade-up leading-tight text-gray-900">
            Meet <span className="text-orange-500">Dooza Table</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 font-semibold mb-6 animate-fade-up [animation-delay:100ms] opacity-0 [animation-fill-mode:forwards]">
            The #1 Airtable alternative that's 3x more affordable
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-10 animate-fade-up [animation-delay:150ms] opacity-0 [animation-fill-mode:forwards]">
            <div className="bg-orange-50 border border-orange-200 rounded-full px-4 py-2">
              <span className="text-orange-700 font-semibold text-sm">🤖 Built with AI</span>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-full px-4 py-2">
              <span className="text-blue-700 font-semibold text-sm">⚡ Super Flexible</span>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-full px-4 py-2">
              <span className="text-green-700 font-semibold text-sm">📚 Easy to Learn</span>
            </div>
          </div>
          <div className="animate-fade-up [animation-delay:250ms] opacity-0 [animation-fill-mode:forwards] flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="default" 
              size="lg" 
              className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 text-xl font-black rounded-lg shadow-2xl hover:shadow-orange-200 transition-all duration-300 hover:scale-105 border-0"
              onClick={() => {
                // Track get started click in Google Analytics
                if (typeof gtag !== 'undefined') {
                  gtag('event', 'click', {
                    event_category: 'engagement',
                    event_label: 'get_started_hero',
                    value: 1
                  });
                }
                navigate('/signup');
              }}
            >
              START FREE TRIAL →
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white px-8 py-4 text-lg font-bold rounded-lg transition-all duration-300"
              onClick={() => {
                // Track demo booking click in Google Analytics
                if (typeof gtag !== 'undefined') {
                  gtag('event', 'click', {
                    event_category: 'engagement',
                    event_label: 'demo_booking_hero',
                    value: 1
                  });
                }
                navigate('/pricing');
              }}
            >
              See Pricing
            </Button>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;