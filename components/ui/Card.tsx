import React from 'react';
import { View, ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '../../constants/theme';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
  onPress?: () => void;
}

const StyledCard = styled(View)<{
  variant: CardProps['variant'];
  padding: CardProps['padding'];
  pressable: boolean;
}>`
  background-color: ${theme.colors.background.primary};
  border-radius: ${theme.borderRadius.lg}px;
  
  /* Variant styles */
  ${(props: { variant: CardProps['variant'] }) => {
    switch (props.variant) {
      case 'outlined':
        return `
          border-width: 1px;
          border-color: ${theme.colors.border.light};
        `;
      default:
        return '';
    }
  }}
  
  /* Padding styles */
  ${(props: { padding: CardProps['padding'] }) => {
    switch (props.padding) {
      case 'sm':
        return `padding: ${theme.spacing[3]}px;`;
      case 'lg':
        return `padding: ${theme.spacing[6]}px;`;
      default: // md
        return `padding: ${theme.spacing[4]}px;`;
    }
  }}
`;

const PressableCard = styled.TouchableOpacity<{
  variant: CardProps['variant'];
  padding: CardProps['padding'];
}>`
  background-color: ${theme.colors.background.primary};
  border-radius: ${theme.borderRadius.lg}px;
  
  /* Variant styles */
  ${(props: { variant: CardProps['variant'] }) => {
    switch (props.variant) {
      case 'outlined':
        return `
          border-width: 1px;
          border-color: ${theme.colors.border.light};
        `;
      default:
        return '';
    }
  }}
  
  /* Padding styles */
  ${(props: { padding: CardProps['padding'] }) => {
    switch (props.padding) {
      case 'sm':
        return `padding: ${theme.spacing[3]}px;`;
      case 'lg':
        return `padding: ${theme.spacing[6]}px;`;
      default: // md
        return `padding: ${theme.spacing[4]}px;`;
    }
  }}
`;

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  style,
  onPress,
}) => {
  // Get shadow styles based on variant
  const getShadowStyle = () => {
    switch (variant) {
      case 'elevated':
        return theme.shadows.md;
      case 'default':
        return theme.shadows.sm;
      default:
        return {};
    }
  };

  const shadowStyle = getShadowStyle();
  const combinedStyle = [shadowStyle, style].filter(Boolean);

  if (onPress) {
    return (
      <PressableCard
        variant={variant}
        padding={padding}
        style={combinedStyle}
        onPress={onPress}
        activeOpacity={0.8}
      >
        {children}
      </PressableCard>
    );
  }

  return (
    <StyledCard
      variant={variant}
      padding={padding}
      pressable={false}
      style={combinedStyle}
    >
      {children}
    </StyledCard>
  );
}; 