import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Image, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import { Button, Input } from '@/components/ui';
import { theme } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
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
  font-size: ${theme.typography.base}px;
  color: ${theme.colors.text.secondary};
  text-align: center;
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

const ErrorText = styled(Text)`
  font-size: ${theme.typography.sm}px;
  color: ${theme.colors.error[500]};
  text-align: center;
  margin-bottom: ${theme.spacing[3]}px;
`;

export default function SignInScreen() {
  const { signIn, signInWithGoogle, loading, error, clearError } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      clearError();
      await signIn(data.email, data.password);
      router.replace('/(tabs)');
    } catch (err: any) {
      if (err.code === 'auth/user-not-found') {
        setError('email', { message: 'No account found with this email address' });
      } else if (err.code === 'auth/wrong-password') {
        setError('password', { message: 'Incorrect password' });
      } else {
        Alert.alert('Sign In Error', err.message);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      clearError();
      // In a real app, you would integrate with Google Sign-In SDK
      // For now, we'll show an alert
      Alert.alert(
        'Google Sign-In',
        'Google Sign-In would be implemented with the Google Sign-In SDK. For demo purposes, this shows the integration point.',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Simulate',
            onPress: async () => {
              try {
                // Simulate Google sign-in
                await signInWithGoogle('mock-google-token');
                router.replace('/(tabs)');
              } catch (err: any) {
                Alert.alert('Google Sign-In Error', err.message);
              }
            },
          },
        ]
      );
    } catch (err: any) {
      Alert.alert('Google Sign-In Error', err.message);
    }
  };

  const handleForgotPassword = () => {
    router.push('/auth/forgot-password');
  };

  return (
    <Container>
      
      <Content behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
      <HeroImage source={require('@/assets/images/hero.png')} resizeMode="cover" />
        {/* <Logo /> */}
        <Header>
          <Title>Welcome Back</Title>
          <Subtitle>Sign in to continue your job search journey</Subtitle>
        </Header>

        <FormSection>
          {error && <ErrorText>{error.message}</ErrorText>}

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
            onPress={handleSubmit(onSubmit)}
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