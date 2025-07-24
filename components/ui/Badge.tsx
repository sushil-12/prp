import React from 'react';
import { Text, ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '../../constants/theme';

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
}

const StyledBadge = styled(Text)<{
  variant: BadgeProps['variant'];
  size: BadgeProps['size'];
}>`
  align-self: flex-start;
  text-align: center;
  border-radius: ${theme.borderRadius.full}px;
  overflow: hidden;
  
  /* Variant styles */
  ${(props: { variant: BadgeProps['variant'] }) => {
    switch (props.variant) {
      case 'primary':
        return `
          background-color: ${theme.colors.primary[500]};
          color: ${theme.colors.text.inverse};
        `;
      case 'secondary':
        return `
          background-color: ${theme.colors.gray[100]};
          color: ${theme.colors.text.primary};
        `;
      case 'success':
        return `
          background-color: ${theme.colors.success[500]};
          color: ${theme.colors.text.inverse};
        `;
      case 'warning':
        return `
          background-color: ${theme.colors.warning[500]};
          color: ${theme.colors.text.inverse};
        `;
      case 'error':
        return `
          background-color: ${theme.colors.error[500]};
          color: ${theme.colors.text.inverse};
        `;
      case 'outline':
        return `
          background-color: transparent;
          color: ${theme.colors.primary[500]};
          border-width: 1px;
          border-color: ${theme.colors.primary[500]};
        `;
      default:
        return `
          background-color: ${theme.colors.primary[500]};
          color: ${theme.colors.text.inverse};
        `;
    }
  }}
  
  /* Size styles */
  ${(props: { size: BadgeProps['size'] }) => {
    switch (props.size) {
      case 'sm':
        return `
          font-size: ${theme.typography.xs}px;
          padding-horizontal: ${theme.spacing[2]}px;
          padding-vertical: ${theme.spacing[1]}px;
          font-weight: ${theme.typography.fontWeights.medium};
        `;
      case 'lg':
        return `
          font-size: ${theme.typography.base}px;
          padding-horizontal: ${theme.spacing[4]}px;
          padding-vertical: ${theme.spacing[2]}px;
          font-weight: ${theme.typography.fontWeights.semibold};
        `;
      default: // md
        return `
          font-size: ${theme.typography.sm}px;
          padding-horizontal: ${theme.spacing[3]}px;
          padding-vertical: ${theme.spacing[1]}px;
          font-weight: ${theme.typography.fontWeights.medium};
        `;
    }
  }}
`;

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'primary',
  size = 'md',
  style,
}) => {
  return (
    <StyledBadge
      variant={variant}
      size={size}
      style={style}
    >
      {label}
    </StyledBadge>
  );
}; 