import React from 'react';
import { Shield, Zap, Globe } from 'lucide-react';

const FeatureSection = () => {
  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Authentication",
      description: "End-to-end encryption with industry-standard security protocols"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Optimized performance with instant load times and smooth interactions"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Access",
      description: "Access your account from anywhere in the world, anytime"
    }
  ];

  return (
    <>
      {/* Desktop Features */}
      <div className="hidden lg:block text-white space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Welcome to the Future
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed">
            Experience next-generation authentication with cutting-edge security and seamless user experience.
          </p>
        </div>

        <div className="space-y-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4 group hover:translate-x-2 transition-transform duration-300">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white group-hover:shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Features - This would be rendered in AuthLayout after the form */}
      <div className="lg:hidden mt-8 grid grid-cols-1 gap-4">
        {features.map((feature, index) => (
          <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-semibold text-white">{feature.title}</h3>
                <p className="text-sm text-slate-400">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FeatureSection;