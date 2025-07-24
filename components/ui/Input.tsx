import React, { useState } from 'react';
import { Text, TextInput, TextStyle, View, ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '../../constants/theme';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  disabled?: boolean;
  secureTextEntry?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  onFocus?: () => void;
  onBlur?: () => void;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'number-pad' | 'decimal-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoComplete?: 'off' | 'username' | 'password' | 'email' | 'name' | 'tel' | 'street-address' | 'postal-code' | 'cc-number' | 'cc-csc' | 'cc-exp' | 'cc-exp-month' | 'cc-exp-year';
}

const InputContainer = styled(View)`
  margin-bottom: ${theme.spacing[4]}px;
`;

const Label = styled(Text)<{ error?: boolean }>`
  font-size: ${theme.typography.sm}px;
  font-weight: ${theme.typography.fontWeights.medium};
  color: ${(props: { error?: boolean }) => props.error ? theme.colors.error[500] : theme.colors.text.primary};
  margin-bottom: ${theme.spacing[1]}px;
`;

const StyledTextInput = styled(TextInput)<{
  error?: boolean;
  disabled?: boolean;
  multiline?: boolean;
}>`
  border-width: 1px;
  border-radius: ${theme.borderRadius.base}px;
  padding-horizontal: ${theme.spacing[4]}px;
  padding-vertical: ${theme.spacing[3]}px;
  font-size: ${theme.typography.base}px;
  color: ${theme.colors.text.primary};
  background-color: ${theme.colors.background.primary};
  
  ${(props: { disabled?: boolean; error?: boolean }) => {
    if (props.disabled) {
      return `
        border-color: ${theme.colors.gray[200]};
        background-color: ${theme.colors.gray[50]};
        color: ${theme.colors.gray[400]};
      `;
    }
    
    if (props.error) {
      return `
        border-color: ${theme.colors.error[500]};
      `;
    }
    
    return `
      border-color: ${theme.colors.border.medium};
    `;
  }}
  
  ${(props: { multiline?: boolean }) => props.multiline && `
    min-height: 80px;
    text-align-vertical: top;
  `}
`;

const ErrorText = styled(Text)`
  font-size: ${theme.typography.xs}px;
  color: ${theme.colors.error[500]};
  margin-top: ${theme.spacing[1]}px;
`;

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  disabled = false,
  secureTextEntry = false,
  multiline = false,
  numberOfLines = 1,
  style,
  inputStyle,
  onFocus,
  onBlur,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  autoComplete = 'off',
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  return (
    <InputContainer style={style}>
      {label && (
        <Label error={!!error}>
          {label}
        </Label>
      )}
              <StyledTextInput
          placeholder={placeholder}
          placeholderTextColor={theme.colors.gray[400]}
          value={value}
          onChangeText={onChangeText}
          error={!!error}
          disabled={disabled}
          secureTextEntry={secureTextEntry}
          multiline={multiline}
          numberOfLines={numberOfLines}
          style={inputStyle}
          onFocus={handleFocus}
          onBlur={handleBlur}
          editable={!disabled}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
        />
      {error && (
        <ErrorText>
          {error}
        </ErrorText>
      )}
    </InputContainer>
  );
}; 