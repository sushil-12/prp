import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import { Button, Input } from '@/components/ui';
import { theme } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { ForgotPasswordFormData, forgotPasswordSchema } from '@/lib/validation/auth';

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${theme.colors.background.primary};
`;

const Content = styled(KeyboardAvoidingView)`
  flex: 1;
  padding: ${theme.spacing[6]}px;
`;

const Header = styled(View)`
  align-items: center;
  margin-bottom: ${theme.spacing[8]}px;
  margin-top: ${theme.spacing[4]}px;
`;

const Title = styled(Text)`
  font-size: ${theme.typography['2xl']}px;
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing[2]}px;
`;

const Subtitle = styled(Text)`
  font-size: ${theme.typography.base}px;
  color: ${theme.colors.text.secondary};
  text-align: center;
  line-height: ${theme.typography.lineHeights.normal * theme.typography.base}px;
`;

const FormSection = styled(View)`
  margin-bottom: ${theme.spacing[6]}px;
`;

const BackToSignIn = styled(Link)`
  align-self: center;
  padding: ${theme.spacing[3]}px;
`;

const BackToSignInText = styled(Text)`
  font-size: ${theme.typography.base}px;
  color: ${theme.colors.text.secondary};
`;

const BackToSignInLinkText = styled(Text)`
  color: ${theme.colors.primary[600]};
  font-weight: ${theme.typography.fontWeights.medium};
`;

const ErrorText = styled(Text)`
  font-size: ${theme.typography.sm}px;
  color: ${theme.colors.error[500]};
  text-align: center;
  margin-bottom: ${theme.spacing[3]}px;
`;

const SuccessText = styled(Text)`
  font-size: ${theme.typography.sm}px;
  color: ${theme.colors.success[500]};
  text-align: center;
  margin-bottom: ${theme.spacing[3]}px;
`;

export default function ForgotPasswordScreen() {
  const { sendPasswordResetEmail, loading, error, clearError } = useAuth();
  const [isEmailSent, setIsEmailSent] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      clearError();
      await sendPasswordResetEmail(data.email);
      setIsEmailSent(true);
    } catch (err: any) {
      Alert.alert('Error', err.message);
    }
  };

  const handleBackToSignIn = () => {
    router.back();
  };

  return (
    <Container>
      <Content behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Header>
          <Title>Reset Password</Title>
          <Subtitle>
            Enter your email address and we'll send you a link to reset your password.
          </Subtitle>
        </Header>

        <FormSection>
          {error && <ErrorText>{error.message}</ErrorText>}
          {isEmailSent && (
            <SuccessText>
              Password reset email sent! Please check your inbox and follow the instructions.
            </SuccessText>
          )}

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Email"
                placeholder="Enter your email"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.email?.message}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                disabled={isEmailSent}
              />
            )}
          />

          <Button
            title={isEmailSent ? "Email Sent" : "Send Reset Link"}
            onPress={handleSubmit(onSubmit)}
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
            disabled={isEmailSent}
          />
        </FormSection>

        <BackToSignIn href="/auth/sign-in" asChild>
          <TouchableOpacity onPress={handleBackToSignIn}>
            <BackToSignInText>
              Back to <BackToSignInLinkText>Sign In</BackToSignInLinkText>
            </BackToSignInText>
          </TouchableOpacity>
        </BackToSignIn>
      </Content>
    </Container>
  );
} 