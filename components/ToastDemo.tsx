import { Button } from '@/components/ui';
import { theme } from '@/constants/theme';
import { useToast } from '@/contexts/ToastContext';
import React from 'react';
import { View } from 'react-native';

export function ToastDemo() {
  const { showToast } = useToast();

  const showSuccessToast = () => {
    showToast('success', 'Success!', 'Operation completed successfully.');
  };

  const showErrorToast = () => {
    showToast('error', 'Error Occurred', 'Something went wrong. Please try again.');
  };

  const showWarningToast = () => {
    showToast('warning', 'Warning', 'Please check your input before proceeding.');
  };

  const showInfoToast = () => {
    showToast('info', 'Information', 'Here is some helpful information for you.');
  };

  const showLongToast = () => {
    showToast(
      'info', 
      'Long Message Example', 
      'This is a longer toast message that demonstrates how the toast component handles multi-line text and longer content. It should wrap properly and remain readable.',
      6000
    );
  };

  const showQuickToast = () => {
    showToast('success', 'Quick Message', 'This will disappear quickly!', 1500);
  };

  return (
    <View style={{ padding: theme.spacing[4], gap: theme.spacing[3] }}>
      <Button title="Show Success Toast" onPress={showSuccessToast} variant="primary" />
      <Button title="Show Error Toast" onPress={showErrorToast} variant="outline" />
      <Button title="Show Warning Toast" onPress={showWarningToast} variant="outline" />
      <Button title="Show Info Toast" onPress={showInfoToast} variant="outline" />
      <Button title="Show Long Toast" onPress={showLongToast} variant="outline" />
      <Button title="Show Quick Toast" onPress={showQuickToast} variant="outline" />
    </View>
  );
} 