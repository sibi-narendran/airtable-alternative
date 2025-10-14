import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "/month",
      description: "Perfect for personal projects and small teams",
      features: [
        "Up to 1,200 records per base",
        "Up to 5 bases",
        "Grid, Calendar, Kanban, and Gallery views", 
        "Rich field types (attachments, checkboxes, dropdowns)",
        "Collaborative editing and comments",
        "Basic mobile apps",
        "Email support",
        "2GB attachment space per base"
      ],
      buttonText: "Start Free",
      highlighted: false,
      comparison: "vs Airtable Free: Same great features"
    },
    {
      name: "Plus", 
      price: "$6",
      period: "/user/month",
      description: "70% cheaper than Airtable Plus ($20/month)",
      features: [
        "Everything in Free",
        "Up to 5,000 records per base",
        "Unlimited bases",
        "Calendar sync (Google, Outlook, Apple)",
        "Timeline and Gantt views",
        "Custom field types and formatting",
        "Dashboard with charts and summaries", 
        "Expanded color and formatting options",
        "Personal and locked views",
        "Advanced calendar features",
        "5GB attachment space per base"
      ],
      buttonText: "Choose Plus",
      highlighted: true,
      annualPrice: "$5/user/month billed annually",
      comparison: "vs Airtable Plus: Save $168/user/year"
    },
    {
      name: "Pro",
      price: "$14",
      period: "/user/month", 
      description: "70% cheaper than Airtable Pro ($45/month)",
      features: [
        "Everything in Plus",
        "Up to 50,000 records per base",
        "Advanced automation workflows",
        "AI-powered data insights",
        "Advanced integrations (Salesforce, HubSpot)",
        "Advanced permissions and admin controls",
        "Revision history and snapshot backups",
        "Advanced reporting and analytics",
        "Priority support",
        "20GB attachment space per base"
      ],
      buttonText: "Choose Pro",
      highlighted: false,
      annualPrice: "$12/user/month billed annually", 
      comparison: "vs Airtable Pro: Save $372/user/year"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-6 pt-40 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              70% Cheaper Than Airtable
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              All the power of Airtable at a fraction of the cost
            </p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-2xl mx-auto mb-8">
              <p className="text-red-800 font-semibold">
                🔥 <strong>Airtable Plus:</strong> $20/user/month → <strong>Dooza Table:</strong> $6/user/month
              </p>
              <p className="text-red-600 text-sm mt-1">Save $168 per user per year!</p>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto mb-20">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white border rounded-2xl p-8 transition-all duration-500 ${
                  plan.highlighted 
                    ? 'border-orange-500 shadow-2xl ring-2 ring-orange-500/20 scale-105' 
                    : 'border-gray-200 hover:shadow-2xl hover:border-orange-300'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-orange-500 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-4xl font-bold text-orange-600">{plan.price}</span>
                    <span className="text-gray-500 ml-1">{plan.period}</span>
                  </div>
                  {plan.annualPrice && (
                    <p className="text-sm text-green-600 font-semibold mb-2">
                      or {plan.annualPrice}
                    </p>
                  )}
                  <p className="text-gray-600 mb-2">{plan.description}</p>
                  {plan.comparison && (
                    <p className="text-xs text-orange-600 font-semibold bg-orange-50 px-2 py-1 rounded">
                      {plan.comparison}
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-orange-600" />
                      </div>
                      <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  variant={plan.highlighted ? "default" : "outline"}
                  size="lg"
                  className={`w-full rounded-full py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 ${
                    plan.highlighted 
                      ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-xl hover:shadow-2xl' 
                      : 'border-2 border-gray-300 text-gray-700 hover:border-orange-500 hover:text-orange-600 hover:bg-orange-50 shadow-lg hover:shadow-xl'
                  }`}
                  onClick={() => navigate('/signup')}
                >
                  {plan.buttonText}
                </Button>
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
};

export default Pricing;
