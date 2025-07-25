import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router } from 'expo-router';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import { Button, Input } from '@/components/ui';
import { theme } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { SignUpFormData, signUpSchema } from '@/lib/validation/auth';

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${theme.colors.background.primary};
`;

const Content = styled(KeyboardAvoidingView)`
  flex: 1;
`;

const ScrollContent = styled(ScrollView)`
  flex: 1;
  padding: ${theme.spacing[6]}px;
`;

const Header = styled(View)`
  align-items: center;
  margin-bottom: ${theme.spacing[8]}px;
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
  text-align: left;
  font-weight: ${theme.typography.fontWeights.medium};
`;

const FormSection = styled(View)`
  margin-bottom: ${theme.spacing[6]}px;
`;

const CheckboxContainer = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${theme.spacing[4]}px;
  padding-vertical: ${theme.spacing[2]}px;
`;

const Checkbox = styled(View)<{ checked: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: ${theme.borderRadius.sm}px;
  border-width: 2px;
  border-color: ${(props: { checked: boolean }) => props.checked ? theme.colors.primary[500] : theme.colors.border.medium};
  background-color: ${(props: { checked: boolean }) => props.checked ? theme.colors.primary[500] : 'transparent'};
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing[3]}px;
`;

const CheckboxText = styled(Text)`
  font-size: ${theme.typography.sm}px;
  color: ${theme.colors.text.secondary};
  flex: 1;
  line-height: ${theme.typography.lineHeights.normal * theme.typography.sm}px;
`;

const TermsLink = styled(Text)`
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

const SignInLink = styled(Link)`
  align-self: center;
  padding: ${theme.spacing[3]}px;
`;

const HeroImage = styled(Image)`
  width: 50%;
  height: 80px;
  align-self: center;
  margin-top: ${theme.spacing[4]}px;
  border-radius: ${theme.borderRadius.base}px;
`;

const SignInText = styled(Text)`
  font-size: ${theme.typography.base}px;
  color: ${theme.colors.text.secondary};
`;

const SignInLinkText = styled(Text)`
  color: ${theme.colors.primary[600]};
  font-weight: ${theme.typography.fontWeights.medium};
`;

const PrepText = styled(Text)`
  font-size: ${theme.typography['3xl']}px;
  font-weight: ${theme.typography.fontWeights.bolder};
  color: ${theme.colors.primary[600]};
`;

const LaunchText = styled(Text)`
  font-size: ${theme.typography['3xl']}px;
  font-weight: ${theme.typography.fontWeights.bolder};
  color: ${theme.colors.text.primary};
`;

export default function SignUpScreen() {
  const { signUp, signInWithGoogle, loading, error, clearError } = useAuth();
  const { showToast } = useToast();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    setError: setFormError,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    },
  });

  const agreeToTerms = watch('agreeToTerms');

  const onSubmit = async (data: SignUpFormData) => {
    try {
      clearError();
      await signUp(data.name, data.email, data.password);
      // Only navigate on successful sign-up (no error thrown)
      router.replace('/onboarding/1');
    } catch (err: any) {
      // Handle specific form field errors
      if (err.code === 'auth/email-already-in-use') {
        setFormError('email', { message: 'An account with this email already exists' });
      } else if (err.code === 'auth/weak-password') {
        setFormError('password', { message: 'Password is too weak. Please choose a stronger password' });
      } else if (err.code === 'auth/invalid-email') {
        setFormError('email', { message: 'Please enter a valid email address' });
      } else if (err.code === 'auth/too-many-requests') {
        showToast('warning', 'Too Many Attempts', 'Please wait a few minutes before trying again.');
      }
      // Other errors are already handled by the toast system in AuthContext
      // Don't navigate on error - stay on the sign-up screen
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      clearError();
      // In a real app, you would integrate with Google Sign-In SDK
      showToast('info', 'Google Sign-Up', 'Google Sign-Up integration would be implemented with the Google Sign-In SDK. For demo purposes, you can simulate the sign-up.');
      
      // Simulate Google sign-up after a short delay
      setTimeout(async () => {
        try {
          await signInWithGoogle('mock-google-token');
          // Only navigate on successful sign-up (no error thrown)
          router.replace('/onboarding/1');
        } catch (err: any) {
          // Error is already handled by AuthContext
          // Don't navigate on error - stay on the sign-up screen
        }
      }, 2000);
    } catch (err: any) {
      // Error is already handled by AuthContext
    }
  };

  const toggleTerms = () => {
    setValue('agreeToTerms', !agreeToTerms);
  };

  const scaleAnim = useSharedValue(0.5);
  const opacityAnim = useSharedValue(0);
  const prepOpacityAnim = useSharedValue(0);
  const launchOpacityAnim = useSharedValue(0);

  useEffect(() => {
    scaleAnim.value = withTiming(1, { duration: 1000 });
    opacityAnim.value = withTiming(1, { duration: 1000 });
    prepOpacityAnim.value = withTiming(1, { duration: 1000 });
    launchOpacityAnim.value = withTiming(1, { duration: 1000 });
  }, []);

  return (
    <Container>
      <Content behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <HeroImage source={require('@/assets/images/green-app-icon.png')} resizeMode="contain" />
        <ScrollContent showsVerticalScrollIndicator={false}>
          <Header>
            <Subtitle>Join the millions of professionals finding their dream jobs</Subtitle>
          </Header>

          <FormSection>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.name?.message}
                  autoCapitalize="words"
                  autoComplete="name"
                />
              )}
            />

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
                  placeholder="Create a password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.password?.message}
                  secureTextEntry
                  autoComplete="password"
                />
              )}
            />

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.confirmPassword?.message}
                  secureTextEntry
                  autoComplete="password"
                />
              )}
            />

            <Controller
              control={control}
              name="agreeToTerms"
              render={({ field: { value } }) => (
                <CheckboxContainer onPress={toggleTerms}>
                  <Checkbox checked={value}>
                    {value && (
                      <Ionicons name="checkmark" size={12} color={theme.colors.text.inverse} />
                    )}
                  </Checkbox>
                  <CheckboxText>
                    I agree to the <TermsLink>Terms of Service</TermsLink> and{' '}
                    <TermsLink>Privacy Policy</TermsLink>
                  </CheckboxText>
                </CheckboxContainer>
              )}
            />

            {errors.agreeToTerms && (
              <Text style={{ 
                fontSize: theme.typography.sm, 
                color: theme.colors.error[500], 
                marginBottom: theme.spacing[3] 
              }}>
                {errors.agreeToTerms.message}
              </Text>
            )}

            <Button
              title="Create Account"
              onPress={handleSubmit(onSubmit)}
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
              disabled={!agreeToTerms}
            />
          </FormSection>

          <Divider>
            <DividerLine />
            <DividerText>OR</DividerText>
            <DividerLine />
          </Divider>

          <GoogleButton onPress={handleGoogleSignUp}>
            <Ionicons name="logo-google" size={20} color={theme.colors.text.primary} />
            <GoogleButtonText>Continue with Google</GoogleButtonText>
          </GoogleButton>

          <SignInLink href="/auth/sign-in" asChild>
            <TouchableOpacity>
              <SignInText>
                Already have an account? <SignInLinkText>Sign in</SignInLinkText>
              </SignInText>
            </TouchableOpacity>
          </SignInLink>
        </ScrollContent>
      </Content>
    </Container>
  );
} 