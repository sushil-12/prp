import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import { Button, Input } from '@/components/ui';
import { theme } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { SignInFormData, signInSchema } from '@/lib/validation/auth';

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
  font-size: ${theme.typography['2xl']}px;
  color: ${theme.colors.text.secondary};
  font-weight: ${theme.typography.fontWeights.medium};
  text-align: left;
`;

const FormSection = styled(View)`
  margin-bottom: ${theme.spacing[6]}px;
`;

const ForgotPasswordLink = styled(TouchableOpacity)`
  align-self: flex-end;
  margin-top: ${theme.spacing[2]}px;
  margin-bottom: ${theme.spacing[4]}px;
`;

const ForgotPasswordText = styled(Text)`
  font-size: ${theme.typography.sm}px;
  color: ${theme.colors.primary[600]};
  font-weight: ${theme.typography.fontWeights.medium};
`;

const Divider = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-vertical: ${theme.spacing[4]}px;
`;

const DividerLine = styled(View)`
  flex: 1;
  height: 1px;
  background-color: ${theme.colors.border.light};
`;

const DividerText = styled(Text)`
  padding-horizontal: ${theme.spacing[3]}px;
  font-size: ${theme.typography.sm}px;
  color: ${theme.colors.text.tertiary};
  font-weight: ${theme.typography.fontWeights.medium};
`;

const GoogleButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing[4]}px;
  background-color: ${theme.colors.background.primary};
  border-width: 1px;
  border-color: ${theme.colors.border.medium};
  border-radius: ${theme.borderRadius.base}px;
  margin-bottom: ${theme.spacing[4]}px;
`;

const GoogleButtonText = styled(Text)`
  font-size: ${theme.typography.base}px;
  font-weight: ${theme.typography.fontWeights.medium};
  color: ${theme.colors.text.primary};
  margin-left: ${theme.spacing[2]}px;
`;

const SignUpLink = styled(Link)`
  align-self: center;
  padding: ${theme.spacing[3]}px;
`;

const SignUpText = styled(Text)`
  font-size: ${theme.typography.base}px;
  color: ${theme.colors.text.secondary};
`;

const SignUpLinkText = styled(Text)`
  color: ${theme.colors.primary[600]};
  font-weight: ${theme.typography.fontWeights.medium};
`;

const HeroImage = styled(Image)`
  width: 50%;
  height: 150px;
  align-self: center;
  border-radius: ${theme.borderRadius.base}px;
  margin-top: ${theme.spacing[4]}px;
  margin-bottom: ${theme.spacing[4]}px;
`;

export default function SignInScreen() {
  const { signIn, signInWithGoogle, loading, error, clearError } = useAuth();
  const { showToast } = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError: setFormError,
    getValues,
    trigger,
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: 'sushil.kumar@gmail.com',
      password: '123456',
    },
  });

  const handleSignIn = async () => {
    console.log('🔍 SIGN-IN: Button pressed');
    const data = getValues();
    const isValid = await trigger();
    
    if (!isValid) {
      console.log('🔍 SIGN-IN: Form validation failed');
      return;
    }

    console.log('🔍 SIGN-IN: Starting authentication with:', data.email);
    try {
      clearError();
      await signIn(data.email, data.password);
      console.log('🔍 SIGN-IN: Authentication successful, navigating to tabs');
      // Only navigate on successful sign-in (no error thrown)
      router.replace('/(tabs)');
    } catch (err: any) {
      console.log('🔍 SIGN-IN: Authentication failed:', err.code);
      // Handle specific form field errors
      if (err.code === 'auth/user-not-found') {
        setFormError('email', { message: 'No account found with this email address' });
      } else if (err.code === 'auth/wrong-password') {
        setFormError('password', { message: 'Incorrect password' });
      } else if (err.code === 'auth/invalid-email') {
        setFormError('email', { message: 'Please enter a valid email address' });
      } else if (err.code === 'auth/too-many-requests') {
        showToast('warning', 'Too Many Attempts', 'Please wait a few minutes before trying again.');
      }
      // Other errors are already handled by the toast system in AuthContext
      // Don't navigate on error - stay on the sign-in screen
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      clearError();
      // In a real app, you would integrate with Google Sign-In SDK
      // For now, we'll show an info toast
      showToast('info', 'Google Sign-In', 'Google Sign-In integration would be implemented with the Google Sign-In SDK. For demo purposes, you can simulate the sign-in.');
      
      // Simulate Google sign-in after a short delay
      setTimeout(async () => {
        try {
          await signInWithGoogle('mock-google-token');
          // Only navigate on successful sign-in (no error thrown)
          router.replace('/(tabs)');
        } catch (err: any) {
          // Error is already handled by AuthContext
          // Don't navigate on error - stay on the sign-in screen
        }
      }, 2000);
    } catch (err: any) {
      // Error is already handled by AuthContext
    }
  };

  const handleForgotPassword = () => {
    router.push('/auth/forgot-password');
  };

  return (
    <Container>
      <Content behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
        <HeroImage source={require('@/assets/images/green-app-icon.png')} resizeMode="contain" />
        <Header>
          <Subtitle>Sign in to continue your job search journey</Subtitle>
        </Header>

        <FormSection>
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
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Password"
                placeholder="Enter your password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.password?.message}
                secureTextEntry
                autoComplete="password"
              />
            )}
          />

          <ForgotPasswordLink onPress={handleForgotPassword}>
            <ForgotPasswordText>Forgot password?</ForgotPasswordText>
          </ForgotPasswordLink>

          <Button
            title="Sign In"
            onPress={handleSignIn}
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
          />
        </FormSection>

        <Divider>
          <DividerLine />
          <DividerText>OR</DividerText>
          <DividerLine />
        </Divider>

        <GoogleButton onPress={handleGoogleSignIn}>
          <Ionicons name="logo-google" size={20} color={theme.colors.text.primary} />
          <GoogleButtonText>Continue with Google</GoogleButtonText>
        </GoogleButton>

        <SignUpLink href="/auth/sign-up" asChild>
          <TouchableOpacity>
            <SignUpText>
              Don't have an account? <SignUpLinkText>Sign up</SignUpLinkText>
            </SignUpText>
          </TouchableOpacity>
        </SignUpLink>
      </Content>
    </Container>
  );
} 