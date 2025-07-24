import { router, useSegments } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import styled from 'styled-components/native';

import { theme } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';

const LoadingContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.background.primary};
`;

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { user, loading } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === 'auth';
    const inOnboardingGroup = segments[0] === 'onboarding';

    if (!user && !inAuthGroup && !inOnboardingGroup) {
      // User is not authenticated and not on auth or onboarding screens
      router.replace('/');
    } else if (user && inAuthGroup) {
      // User is authenticated but on auth screens
      router.replace('/(tabs)');
    }
  }, [user, loading, segments]);

  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color={theme.colors.primary[500]} />
      </LoadingContainer>
    );
  }

  return <>{children}</>;
} 