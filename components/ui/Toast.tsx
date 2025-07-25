import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const ToastContainer = styled(Animated.View)`
  position: absolute;
  top: ${screenHeight * 0.05}px;
  left: ${theme.spacing[4]}px;
  right: ${theme.spacing[4]}px;
  z-index: 9999;
  border-radius: ${theme.borderRadius.lg}px;
  padding: ${theme.spacing[3]}px ${theme.spacing[4]}px;
  flex-direction: row;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 12px;
  elevation: 8;
  min-height: 60px;
`;

const ToastContent = styled(View)`
  flex: 1;
  margin-left: ${theme.spacing[3]}px;
  margin-right: ${theme.spacing[2]}px;
`;

const ToastTitle = styled(Text)`
  font-size: ${theme.typography.sm}px;
  font-weight: ${theme.typography.fontWeights.semibold};
  margin-bottom: ${theme.spacing[0.5]}px;
`;

const ToastMessage = styled(Text)`
  font-size: ${theme.typography.xs}px;
  line-height: ${theme.typography.lineHeights.normal * theme.typography.sm}px;
`;

const CloseButton = styled(TouchableOpacity)`
  padding: ${theme.spacing[1]}px;
  margin-left: ${theme.spacing[1]}px;
`;

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  onClose?: () => void;
  visible: boolean;
  position?: 'top' | 'bottom';
}

const getToastStyles = (type: ToastType) => {
  switch (type) {
    case 'success':
      return {
        backgroundColor: theme.colors.success[50],
        borderLeftColor: theme.colors.success[500],
        iconColor: theme.colors.success[600],
        titleColor: theme.colors.success[800],
        messageColor: theme.colors.success[700],
        icon: 'checkmark-circle' as const,
      };
    case 'error':
      return {
        backgroundColor: theme.colors.error[50],
        borderLeftColor: theme.colors.error[500],
        iconColor: theme.colors.error[600],
        titleColor: theme.colors.error[800],
        messageColor: theme.colors.error[700],
        icon: 'close-circle' as const,
      };
    case 'warning':
      return {
        backgroundColor: theme.colors.warning[50],
        borderLeftColor: theme.colors.warning[500],
        iconColor: theme.colors.warning[600],
        titleColor: theme.colors.warning[800],
        messageColor: theme.colors.warning[700],
        icon: 'warning' as const,
      };
    case 'info':
      return {
        backgroundColor: theme.colors.primary[50],
        borderLeftColor: theme.colors.primary[500],
        iconColor: theme.colors.primary[600],
        titleColor: theme.colors.primary[800],
        messageColor: theme.colors.primary[700],
        icon: 'information-circle' as const,
      };
  }
};

export function Toast({ 
  type, 
  title, 
  message, 
  duration = 3000, 
  onClose, 
  visible,
  position = 'top'
}: ToastProps) {
  const translateY = useRef(new Animated.Value(position === 'top' ? -100 : 100)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.9)).current;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const styles = getToastStyles(type);

  useEffect(() => {
    if (visible) {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Show toast with spring animation for more natural feel
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          speed: 12,
          bounciness: 8,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
          speed: 12,
        })
      ]).start();

      // Auto-hide after duration
      if (duration > 0) {
        timeoutRef.current = setTimeout(() => {
          hideToast();
        }, duration);
      }
    } else {
      hideToast();
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [visible, duration]);

  const hideToast = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: position === 'top' ? -100 : 100,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 0.9,
        duration: 250,
        useNativeDriver: true,
      })
    ]).start(() => {
      onClose?.();
    });
  };

  const handleClose = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    hideToast();
  };

  if (!visible) return null;

  return (
    <ToastContainer
      style={[
        {
          backgroundColor: styles.backgroundColor,
          borderLeftWidth: 4,
          borderLeftColor: styles.borderLeftColor,
          transform: [{ translateY }, { scale }],
          opacity,
        },
        position === 'bottom' && { top: undefined, bottom: screenHeight * 0.05 }
      ]}
    >
      <Ionicons 
        name={styles.icon} 
        size={22} 
        color={styles.iconColor} 
      />
      
      <ToastContent>
        <ToastTitle style={{ color: styles.titleColor }}>
          {title}
        </ToastTitle>
        {message && (
          <ToastMessage style={{ color: styles.messageColor }}>
            {message}
          </ToastMessage>
        )}
      </ToastContent>

      <CloseButton onPress={handleClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <Ionicons 
          name="close" 
          size={18} 
          color={styles.messageColor} 
        />
      </CloseButton>
    </ToastContainer>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  }
});