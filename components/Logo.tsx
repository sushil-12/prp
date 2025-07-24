import React from 'react';
import { Image, Text, View } from 'react-native';
import styled from 'styled-components/native';

import { theme } from '@/constants/theme';

const LogoContainer = styled(View)`
  align-items: center;
  margin-bottom: ${theme.spacing[6]}px;
`;

const LogoImage = styled(Image)`
  width: 80px;
  height: 80px;
  margin-bottom: ${theme.spacing[3]}px;
`;

const LogoText = styled(Text)`
  font-size: ${theme.typography['3xl']}px;
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.colors.text.primary};
  letter-spacing: -0.5px;
`;

const LogoSubtext = styled(Text)`
  font-size: ${theme.typography.base}px;
  color: ${theme.colors.text.secondary};
  margin-top: ${theme.spacing[1]}px;
  font-weight: ${theme.typography.fontWeights.medium};
`;

interface LogoProps {
  showSubtext?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ showSubtext = true, size = 'md' }: LogoProps) {
  const getLogoSize = () => {
    switch (size) {
      case 'sm':
        return { width: 60, height: 60 };
      case 'lg':
        return { width: 100, height: 100 };
      default:
        return { width: 80, height: 80 };
    }
  };

  const logoSize = getLogoSize();

  return (
    <LogoContainer>
      <LogoImage 
        source={require('@/assets/images/black-app-icon.png')} 
        style={logoSize}
        resizeMode="contain"
      />
      <LogoText>PrepLaunch</LogoText>
      {showSubtext && (
        <LogoSubtext>Your Career Launchpad</LogoSubtext>
      )}
    </LogoContainer>
  );
}