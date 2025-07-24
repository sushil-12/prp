import { useAuth } from '@/contexts/AuthContext';
import React, { useState } from 'react';
import { View } from 'react-native';
import SplashScreen from './SplashScreen';

interface SplashWrapperProps {
  children: React.ReactNode;
}

export default function SplashWrapper({ children }: SplashWrapperProps) {
  const [showSplash, setShowSplash] = useState(true);
  const { loading } = useAuth();

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  // Show splash until both splash animation and auth loading are complete
  const shouldShowSplash = showSplash || loading;

  if (shouldShowSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return <View style={{ flex: 1 }}>{children}</View>;
} 