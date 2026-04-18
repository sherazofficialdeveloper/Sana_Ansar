import React from "react";
import { 
  CheckCircle, 
  XCircle,
  Package,
  MessageSquare,
  Lightbulb,
  BarChart3,
  Calendar,
  DollarSign,
  Layers,
  Target,
  TrendingUp,
  Users,
  Sparkles,
  Rocket,
  Handshake,
  Wallet,
  Bot,
  Globe,
  Heart,
  Gauge
} from "lucide-react";

export default function ComparisonSection() {
  const leftItems = [
    { text: "Generic Solutions", icon: <Package size={18} /> },
    { text: "Jargon Overload", icon: <MessageSquare size={18} /> },
    { text: "Boring Creativity", icon: <Lightbulb size={18} /> },
    { text: "Fluff Metrics", icon: <BarChart3 size={18} /> },
    { text: "One-Time Campaigners", icon: <Calendar size={18} /> },
    { text: "Hidden Costs", icon: <DollarSign size={18} /> },
    { text: "Outdated Methods", icon: <Layers size={18} /> },
    { text: "Limited Scope", icon: <Target size={18} /> },
    { text: "Reactive Tactics", icon: <TrendingUp size={18} /> },
    { text: "Just Another Client", icon: <Users size={18} /> },
  ];

  const rightItems = [
    { text: "Personalized Plans", icon: <Sparkles size={18} /> },
    { text: "Plain Talk", icon: <MessageSquare size={18} /> },
    { text: "Bold Ideas", icon: <Rocket size={18} /> },
    { text: "Real ROI", icon: <Gauge size={18} /> },
    { text: "Long-Term Partners", icon: <Handshake size={18} /> },
    { text: "Transparent Pricing", icon: <Wallet size={18} /> },
    { text: "AI-Enabled Tools", icon: <Bot size={18} /> },
    { text: "Full-Service Experts", icon: <Globe size={18} /> },
    { text: "Proactive Strategies", icon: <Target size={18} /> },
    { text: "Passion & Care", icon: <Heart size={18} /> },
  ];

  return (
    <div className="bg-[#f6f1e7] py-20 px-4">
      {/* Heading */}
      <div className="text-center mb-16 relative">
        <h1 className="text-6xl md:text-7xl font-extrabold text-[#3b0d1d] leading-tight">
          Built different
        </h1>
        <p className="text-4xl md:text-5xl font-bold text-[#3b0d1d]">
          (in a good way)
        </p>

        {/* Badge */}
        <div className="absolute left-1/2 -translate-x-1/2 top-6 rotate-[-12deg]">
          <span className="bg-yellow-300 px-4 py-1 text-sm font-bold rounded-full shadow">
            Differences
          </span>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto relative">
        <div className="flex rounded-3xl overflow-hidden shadow-lg">
          
          {/* Left Side */}
          <div className="flex-1 bg-[#d8a4d3] p-8">
            <h2 className="text-xl font-bold mb-6">Other Agencies</h2>

            <ul className="space-y-4">
              {leftItems.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 border-b border-black/30 pb-2"
                >
                  <span className="text-[#3b0d1d]">{item.icon}</span>
                  <span className="flex-1">{item.text}</span>
                  <XCircle size={18} className="text-[#3b0d1d]" />
                </li>
              ))}
            </ul>
          </div>

          {/* VERSUS Divider */}
          <div className="relative w-16 bg-[#3b0d1d] flex items-center justify-center">
            <span className="text-white text-sm font-bold tracking-wider rotate-90 whitespace-nowrap">
              VERSUS
            </span>
          </div>

          {/* Right Side */}
          <div className="flex-1 bg-[#e8e6a7] p-8">
            <h2 className="text-xl font-bold mb-6">Artyreal</h2>

            <ul className="space-y-4">
              {rightItems.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 border-b border-black/30 pb-2"
                >
                  <span className="text-[#3b0d1d]">{item.icon}</span>
                  <span className="flex-1">{item.text}</span>
                  <CheckCircle size={18} className="text-green-700" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}