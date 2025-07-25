import { router } from 'expo-router';
import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import { Button } from '@/components/ui'; // Assuming this is your custom button
import { theme } from '@/constants/theme'; // Assuming this is your theme file

// A full-screen container with a background image.
// The source would be a professional, abstract, or motivational image related to careers.
const StyledImageBackground = styled(ImageBackground).attrs({
  source: require('@/assets/images/landing-background.png'), // <-- IMPORTANT: Replace with a high-quality background image
})`
  flex: 1;
`;

// A dark overlay to ensure text is readable over any background image.
const Overlay = styled(View)`
  background-color: rgba(0, 0, 0, 0.5); /* Adjust opacity as needed */
  ${StyleSheet.absoluteFillObject};
`;

// The main content container, using SafeAreaView and distributing content.
const ContentContainer = styled(SafeAreaView)`
  flex: 1;
  justify-content: space-between;
  padding: ${theme.spacing[6]}px;
`;

// Top section for the logo. Kept minimal.
const Header = styled(View)`
  align-items: center;
`;

// A more subtle logo presentation.
const Logo = styled(View)`
  width: 50px;
  height: 50px;
  border-radius: ${theme.borderRadius.lg}px;
  background-color: ${theme.colors.primary[500]};
  align-items: center;
  justify-content: center;
`;

// The main "hero" section with the primary marketing message.
const HeroSection = styled(View)`
  padding: ${theme.spacing[4]}px;
`;

const Title = styled(Text)`
  font-size: ${theme.typography['4xl']}px;
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.colors.text.inverse}; /* Assuming you have an inverse text color for dark backgrounds */
  text-align: center;
  margin-bottom: ${theme.spacing[3]}px;
`;

const Subtitle = styled(Text)`
  font-size: ${theme.typography.lg}px;
  color: ${theme.colors.text.inverse};
  text-align: center;
  line-height: ${theme.typography.lg * 1.5}px;
  opacity: 0.9;
`;

// Container for the call-to-action buttons at the bottom.
const ActionContainer = styled(View)`
  align-items: center;
`;

const SignInPrompt = styled(TouchableOpacity)`
  margin-top: ${theme.spacing[6]}px;
`;

const SignInText = styled(Text)`
  font-size: ${theme.typography.base}px;
  color: ${theme.colors.text.inverse};
`;

const SignInTextHighlight = styled(Text)`
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.colors.primary[300]}; /* A lighter primary for dark backgrounds */
`;
const LogoImage = styled(Image)`
  width: 200px;
  height: 200px;
  resize-mode: contain;
`;

const HeroImage = styled(Image)`
  width: 70%;
  height: 200px;
  align-self: center;
  border-radius: ${theme.borderRadius.base}px;
`;

export default function LandingScreen() {
  const handleCreateAccount = () => {
    router.push('/auth/sign-up');
  };

  const handleSignIn = () => {
    router.push('/auth/sign-in');
  };

  return (
    <StyledImageBackground>
      <Overlay />
      <ContentContainer>
        <Header>
            {/* Using an icon here as a placeholder for a simplified logo */}
            <LogoImage source={require('@/assets/images/logo.png')} />
        </Header>
          <HeroImage source={require('@/assets/images/hero.png')} resizeMode="contain" />

        <HeroSection>
          <Title>Unlock Your Next Career Move</Title>
          <Subtitle>The all-in-one platform to launch your professional life.</Subtitle>
        </HeroSection>

        <ActionContainer>
          <Button
            title="Create a Free Account"
            onPress={handleCreateAccount}
            variant="primary"
            size="lg"
            fullWidth
          />
          <SignInPrompt onPress={handleSignIn}>
            <SignInText>
              Already have an account? <SignInTextHighlight>Sign In</SignInTextHighlight>
            </SignInText>
          </SignInPrompt>
        </ActionContainer>
      </ContentContainer>
    </StyledImageBackground>
  );
}