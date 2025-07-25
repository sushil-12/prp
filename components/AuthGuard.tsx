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
  const { user, loading, isAuthenticating } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    // Completely ignore all navigation during authentication
    if (loading || isAuthenticating) {
      return;
    }

    const inTabsGroup = segments[0] === '(tabs)';

    // Only redirect unauthenticated users away from protected screens
    // This is the ONLY navigation decision the AuthGuard should make
    if (!user && inTabsGroup) {
      router.replace('/');
    }
  }, [user, loading, isAuthenticating, segments]);

  if (loading || isAuthenticating) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color={theme.colors.primary[500]} />
      </LoadingContainer>
    );
  }

  return <>{children}</>;
} 