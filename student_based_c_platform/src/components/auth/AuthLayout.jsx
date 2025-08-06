import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import FeatureSection from './FeatureSection';
import BackgroundEffects from '../ui/BackgroundEffects';

const AuthLayout = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <BackgroundEffects />
      
      <div className="relative w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        <FeatureSection />
        
        <div className="w-full max-w-md mx-auto">
          {isLogin ? (
            <LoginForm onToggleMode={toggleMode} />
          ) : (
            <SignupForm onToggleMode={toggleMode} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;