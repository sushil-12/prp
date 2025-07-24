import React from 'react';
import { ActivityIndicator, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '../../constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const StyledTouchableOpacity = styled(TouchableOpacity)<{
  variant: ButtonProps['variant'];
  size: ButtonProps['size'];
  disabled: boolean;
  fullWidth: boolean;
}>`
  align-items: center;
  justify-content: center;
  border-radius: ${theme.borderRadius.base}px;
  flex-direction: row;
  ${(props: { fullWidth: boolean }) => props.fullWidth && 'width: 100%;'}
  
  /* Variant styles */
  ${(props: { variant: ButtonProps['variant']; disabled: boolean }) => {
    if (props.disabled) {
      return `
        background-color: ${theme.colors.gray[200]};
        border: 1px solid ${theme.colors.gray[200]};
      `;
    }
    
    switch (props.variant) {
      case 'primary':
        return `
          background-color: ${theme.colors.primary[500]};
          border: 1px solid ${theme.colors.primary[500]};
        `;
      case 'secondary':
        return `
          background-color: ${theme.colors.gray[100]};
          border: 1px solid ${theme.colors.gray[100]};
        `;
      case 'outline':
        return `
          background-color: transparent;
          border: 1px solid ${theme.colors.primary[500]};
        `;
      case 'ghost':
        return `
          background-color: transparent;
          border: 1px solid transparent;
        `;
      default:
        return `
          background-color: ${theme.colors.primary[500]};
          border: 1px solid ${theme.colors.primary[500]};
        `;
    }
  }}
  
  /* Size styles */
  ${(props: { size: ButtonProps['size'] }) => {
    switch (props.size) {
      case 'sm':
        return `
          padding-horizontal: ${theme.spacing[3]}px;
          padding-vertical: ${theme.spacing[2]}px;
          min-height: 32px;
        `;
      case 'lg':
        return `
          padding-horizontal: ${theme.spacing[6]}px;
          padding-vertical: ${theme.spacing[4]}px;
          min-height: 48px;
        `;
      default: // md
        return `
          padding-horizontal: ${theme.spacing[4]}px;
          padding-vertical: ${theme.spacing[3]}px;
          min-height: 40px;
        `;
    }
  }}
`;

const ButtonText = styled(Text)<{
  variant: ButtonProps['variant'];
  size: ButtonProps['size'];
  disabled: boolean;
}>`
  font-weight: ${theme.typography.fontWeights.medium};
  text-align: center;
  
  /* Variant text colors */
  ${(props: { variant: ButtonProps['variant']; disabled: boolean }) => {
    if (props.disabled) {
      return `color: ${theme.colors.gray[400]};`;
    }
    
    switch (props.variant) {
      case 'primary':
        return `color: ${theme.colors.text.inverse};`;
      case 'secondary':
        return `color: ${theme.colors.text.primary};`;
      case 'outline':
        return `color: ${theme.colors.primary[500]};`;
      case 'ghost':
        return `color: ${theme.colors.primary[500]};`;
      default:
        return `color: ${theme.colors.text.inverse};`;
    }
  }}
  
  /* Size text styles */
  ${(props: { size: ButtonProps['size'] }) => {
    switch (props.size) {
      case 'sm':
        return `font-size: ${theme.typography.sm}px;`;
      case 'lg':
        return `font-size: ${theme.typography.lg}px;`;
      default: // md
        return `font-size: ${theme.typography.base}px;`;
    }
  }}
`;

const LoadingSpinner = styled(ActivityIndicator)<{
  variant: ButtonProps['variant'];
}>`
  margin-right: ${theme.spacing[2]}px;
  ${(props: { variant: ButtonProps['variant'] }) => {
    switch (props.variant) {
      case 'primary':
        return `color: ${theme.colors.text.inverse};`;
      case 'secondary':
        return `color: ${theme.colors.text.primary};`;
      case 'outline':
      case 'ghost':
        return `color: ${theme.colors.primary[500]};`;
      default:
        return `color: ${theme.colors.text.inverse};`;
    }
  }}
`;

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
}) => {
  return (
    <StyledTouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      style={style}
      activeOpacity={0.8}
    >
      {loading && (
        <LoadingSpinner
          size="small"
          variant={variant}
        />
      )}
      <ButtonText
        variant={variant}
        size={size}
        disabled={disabled}
        style={textStyle}
      >
        {title}
      </ButtonText>
    </StyledTouchableOpacity>
  );
}; 