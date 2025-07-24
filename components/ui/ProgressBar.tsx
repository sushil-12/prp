import React from 'react';
import { Text, View, ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '../../constants/theme';

interface ProgressBarProps {
  progress: number; // 0 to 100
  variant?: 'primary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
  style?: ViewStyle;
}

const ProgressContainer = styled(View)`
  width: 100%;
`;

const ProgressLabel = styled(Text)`
  font-size: ${theme.typography.sm}px;
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing[2]}px;
`;

const ProgressTrack = styled(View)<{
  size: ProgressBarProps['size'];
}>`
  background-color: ${theme.colors.gray[200]};
  border-radius: ${theme.borderRadius.full}px;
  overflow: hidden;
  
  /* Size styles */
  ${(props: { size: ProgressBarProps['size'] }) => {
    switch (props.size) {
      case 'sm':
        return `height: 4px;`;
      case 'lg':
        return `height: 12px;`;
      default: // md
        return `height: 8px;`;
    }
  }}
`;

const ProgressFill = styled(View)<{
  progress: number;
  variant: ProgressBarProps['variant'];
  size: ProgressBarProps['size'];
}>`
  height: 100%;
  border-radius: ${theme.borderRadius.full}px;
  width: ${(props: { progress: number }) => Math.min(Math.max(props.progress, 0), 100)}%;
  
  /* Variant styles */
  ${(props: { variant: ProgressBarProps['variant'] }) => {
    switch (props.variant) {
      case 'success':
        return `background-color: ${theme.colors.success[500]};`;
      case 'warning':
        return `background-color: ${theme.colors.warning[500]};`;
      case 'error':
        return `background-color: ${theme.colors.error[500]};`;
      default: // primary
        return `background-color: ${theme.colors.primary[500]};`;
    }
  }}
`;

const ProgressText = styled(Text)`
  font-size: ${theme.typography.xs}px;
  color: ${theme.colors.text.tertiary};
  margin-top: ${theme.spacing[1]}px;
  text-align: right;
`;

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  variant = 'primary',
  size = 'md',
  showLabel = false,
  label,
  style,
}) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  
  return (
    <ProgressContainer style={style}>
      {(showLabel || label) && (
        <ProgressLabel>
          {label || `${Math.round(clampedProgress)}%`}
        </ProgressLabel>
      )}
      <ProgressTrack size={size}>
        <ProgressFill
          progress={clampedProgress}
          variant={variant}
          size={size}
        />
      </ProgressTrack>
      {showLabel && !label && (
        <ProgressText>
          {Math.round(clampedProgress)}%
        </ProgressText>
      )}
    </ProgressContainer>
  );
}; 