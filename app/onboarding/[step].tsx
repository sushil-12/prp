import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import { Button, ProgressBar } from '@/components/ui';
import { theme } from '@/constants/theme';
import {
    OnboardingStep1Data,
    onboardingStep1Schema,
    OnboardingStep2Data,
    onboardingStep2Schema,
    OnboardingStep3Data,
    onboardingStep3Schema
} from '@/lib/validation/onboarding';

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${theme.colors.background.primary};
`;

const Content = styled(ScrollView)`
  flex: 1;
  padding: ${theme.spacing[6]}px;
`;

const Header = styled(View)`
  align-items: center;
  margin-bottom: ${theme.spacing[6]}px;
`;

const StepIndicator = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${theme.spacing[4]}px;
`;

const StepText = styled(Text)`
  font-size: ${theme.typography.sm}px;
  color: ${theme.colors.text.secondary};
  margin-right: ${theme.spacing[3]}px;
`;

const Title = styled(Text)`
  font-size: ${theme.typography['2xl']}px;
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.colors.text.primary};
  text-align: center;
  margin-bottom: ${theme.spacing[2]}px;
`;

const Subtitle = styled(Text)`
  font-size: ${theme.typography.base}px;
  color: ${theme.colors.text.secondary};
  text-align: center;
  margin-bottom: ${theme.spacing[6]}px;
`;

const RoleCard = styled(TouchableOpacity)<{ selected: boolean }>`
  padding: ${theme.spacing[4]}px;
  background-color: ${(props: { selected: boolean }) => props.selected ? theme.colors.primary[50] : theme.colors.background.primary};
  border-width: 2px;
  border-color: ${(props: { selected: boolean }) => props.selected ? theme.colors.primary[500] : theme.colors.border.light};
  border-radius: ${theme.borderRadius.lg}px;
  margin-bottom: ${theme.spacing[3]}px;
  flex-direction: row;
  align-items: center;
`;

const RoleIcon = styled(View)<{ selected: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: ${theme.borderRadius.base}px;
  background-color: ${(props: { selected: boolean }) => props.selected ? theme.colors.primary[500] : theme.colors.gray[100]};
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing[3]}px;
`;

const RoleContent = styled(View)`
  flex: 1;
`;

const RoleTitle = styled(Text)<{ selected: boolean }>`
  font-size: ${theme.typography.lg}px;
  font-weight: ${theme.typography.fontWeights.semibold};
  color: ${(props: { selected: boolean }) => props.selected ? theme.colors.primary[700] : theme.colors.text.primary};
  margin-bottom: ${theme.spacing[1]}px;
`;

const RoleDescription = styled(Text)<{ selected: boolean }>`
  font-size: ${theme.typography.sm}px;
  color: ${(props: { selected: boolean }) => props.selected ? theme.colors.primary[600] : theme.colors.text.secondary};
`;

const SkillsInput = styled(View)`
  margin-bottom: ${theme.spacing[4]}px;
`;

const SkillsContainer = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: ${theme.spacing[3]}px;
`;

const SkillChip = styled(View)`
  flex-direction: row;
  align-items: center;
  background-color: ${theme.colors.primary[100]};
  padding-horizontal: ${theme.spacing[3]}px;
  padding-vertical: ${theme.spacing[2]}px;
  border-radius: ${theme.borderRadius.full}px;
  margin-right: ${theme.spacing[2]}px;
  margin-bottom: ${theme.spacing[2]}px;
`;

const SkillText = styled(Text)`
  font-size: ${theme.typography.sm}px;
  color: ${theme.colors.primary[700]};
  font-weight: ${theme.typography.fontWeights.medium};
  margin-right: ${theme.spacing[2]}px;
`;

const RemoveButton = styled(TouchableOpacity)`
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background-color: ${theme.colors.primary[100]};
  align-items: center;
  justify-content: center;
`;

const UploadArea = styled(TouchableOpacity)<{ uploaded: boolean }>`
  padding: ${theme.spacing[8]}px;
  background-color: ${(props: { uploaded: boolean }) => props.uploaded ? theme.colors.success[50] : theme.colors.gray[50]};
  border-width: 2px;
  border-color: ${(props: { uploaded: boolean }) => props.uploaded ? theme.colors.success[500] : theme.colors.border.light};
  border-style: dashed;
  border-radius: ${theme.borderRadius.lg}px;
  align-items: center;
  justify-content: center;
  margin-bottom: ${theme.spacing[4]}px;
`;

const UploadIcon = styled(View)<{ uploaded: boolean }>`
  width: 64px;
  height: 64px;
  border-radius: ${theme.borderRadius.full}px;
  background-color: ${(props: { uploaded: boolean }) => props.uploaded ? theme.colors.success[500] : theme.colors.gray[200]};
  align-items: center;
  justify-content: center;
  margin-bottom: ${theme.spacing[3]}px;
`;

const UploadText = styled(Text)<{ uploaded: boolean }>`
  font-size: ${theme.typography.lg}px;
  font-weight: ${theme.typography.fontWeights.semibold};
  color: ${(props: { uploaded: boolean }) => props.uploaded ? theme.colors.success[700] : theme.colors.text.primary};
  margin-bottom: ${theme.spacing[1]}px;
`;

const UploadSubtext = styled(Text)<{ uploaded: boolean }>`
  font-size: ${theme.typography.sm}px;
  color: ${(props: { uploaded: boolean }) => props.uploaded ? theme.colors.success[600] : theme.colors.text.secondary};
  text-align: center;
`;

const ButtonContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${theme.spacing[6]}px;
`;

const ErrorText = styled(Text)`
  font-size: ${theme.typography.sm}px;
  color: ${theme.colors.error[500]};
  text-align: center;
  margin-bottom: ${theme.spacing[3]}px;
`;

const roles = [
  {
    id: 'developer',
    title: 'Developer',
    description: 'Software engineer, programmer, or technical specialist',
    icon: 'code',
  },
  {
    id: 'designer',
    title: 'Designer',
    description: 'UI/UX designer, graphic designer, or creative professional',
    icon: 'brush',
  },
  {
    id: 'marketer',
    title: 'Marketer',
    description: 'Digital marketer, content creator, or growth specialist',
    icon: 'trending-up',
  },
  {
    id: 'manager',
    title: 'Manager',
    description: 'Project manager, team lead, or business professional',
    icon: 'people',
  },
  {
    id: 'other',
    title: 'Other',
    description: 'Other professional roles and specialties',
    icon: 'briefcase',
  },
];

export default function OnboardingScreen() {
  const { step } = useLocalSearchParams<{ step: string }>();
  const currentStep = parseInt(step || '1');
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Step 1: Role Selection
  const step1Form = useForm<OnboardingStep1Data>({
    resolver: zodResolver(onboardingStep1Schema),
    defaultValues: {
      role: '',
    },
  });

  // Step 2: Skills
  const step2Form = useForm<OnboardingStep2Data>({
    resolver: zodResolver(onboardingStep2Schema),
    defaultValues: {
      skills: [],
    },
  });

  // Step 3: Resume Upload
  const step3Form = useForm<OnboardingStep3Data>({
    resolver: zodResolver(onboardingStep3Schema),
    defaultValues: {
      resumeUploaded: false,
    },
  });

  const getCurrentForm = () => {
    switch (currentStep) {
      case 1:
        return step1Form;
      case 2:
        return step2Form;
      case 3:
        return step3Form;
      default:
        return step1Form;
    }
  };

  const currentForm = getCurrentForm();

  const handleContinue = async () => {
    try {
      setIsLoading(true);
      
      if (currentStep === 1) {
        const isValid = await step1Form.trigger();
        if (isValid) {
          router.push('/onboarding/2');
        }
      } else if (currentStep === 2) {
        const isValid = await step2Form.trigger();
        if (isValid) {
          router.push('/onboarding/3');
        }
      } else if (currentStep === 3) {
        const isValid = await step3Form.trigger();
        if (isValid) {
          // Complete onboarding
          router.replace('/(tabs)');
        }
      }
    } catch (error) {
      console.error('Onboarding error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      router.push(`/onboarding/${currentStep - 1}`);
    } else {
      router.back();
    }
  };

  const handleRoleSelect = (roleId: string) => {
    step1Form.setValue('role', roleId);
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      const updatedSkills = [...skills, newSkill.trim()];
      setSkills(updatedSkills);
      step2Form.setValue('skills', updatedSkills);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const updatedSkills = skills.filter(skill => skill !== skillToRemove);
    setSkills(updatedSkills);
    step2Form.setValue('skills', updatedSkills);
  };

  const handleResumeUpload = () => {
    // In a real app, this would integrate with file picker
    Alert.alert(
      'Upload Resume',
      'File picker would be implemented here. For demo purposes, this simulates a successful upload.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Simulate Upload',
          onPress: () => {
            setResumeUploaded(true);
            step3Form.setValue('resumeUploaded', true);
          },
        },
      ]
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <View>
            <Controller
              control={step1Form.control}
              name="role"
              render={({ field: { value } }) => (
                <View>
                  {roles.map((role) => (
                    <RoleCard
                      key={role.id}
                      selected={value === role.id}
                      onPress={() => handleRoleSelect(role.id)}
                    >
                      <RoleIcon selected={value === role.id}>
                        <Ionicons
                          name={role.icon as any}
                          size={24}
                          color={value === role.id ? theme.colors.text.inverse : theme.colors.text.secondary}
                        />
                      </RoleIcon>
                      <RoleContent>
                        <RoleTitle selected={value === role.id}>{role.title}</RoleTitle>
                        <RoleDescription selected={value === role.id}>{role.description}</RoleDescription>
                      </RoleContent>
                      {value === role.id && (
                        <Ionicons
                          name="checkmark-circle"
                          size={24}
                          color={theme.colors.primary[500]}
                        />
                      )}
                    </RoleCard>
                  ))}
                </View>
              )}
            />
          </View>
        );

      case 2:
        return (
          <View>
            <SkillsInput>
              <Text style={{ 
                fontSize: theme.typography.base, 
                fontWeight: theme.typography.fontWeights.medium,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing[2]
              }}>
                Add your skills
              </Text>
              <Controller
                control={step2Form.control}
                name="skills"
                render={({ field: { value } }) => (
                  <View>
                    <View style={{ 
                      flexDirection: 'row', 
                      borderWidth: 1, 
                      borderColor: theme.colors.border.light,
                      borderRadius: theme.borderRadius.base,
                      paddingHorizontal: theme.spacing[3],
                      paddingVertical: theme.spacing[2]
                    }}>
                      <TextInput
                        value={newSkill}
                        onChangeText={setNewSkill}
                        placeholder="Type a skill and press Enter"
                        style={{ 
                          flex: 1, 
                          fontSize: theme.typography.base,
                          color: theme.colors.text.primary
                        }}
                        onSubmitEditing={handleAddSkill}
                        returnKeyType="done"
                      />
                    </View>
                    <SkillsContainer>
                      {skills.map((skill, index) => (
                        <SkillChip key={index}>
                          <SkillText>{skill}</SkillText>
                          <RemoveButton onPress={() => handleRemoveSkill(skill)}>
                            <Ionicons name="close" size={12} color={theme.colors.primary[700]} />
                          </RemoveButton>
                        </SkillChip>
                      ))}
                    </SkillsContainer>
                  </View>
                )}
              />
            </SkillsInput>
          </View>
        );

      case 3:
        return (
          <View>
            <Controller
              control={step3Form.control}
              name="resumeUploaded"
              render={({ field: { value } }) => (
                <UploadArea uploaded={value} onPress={handleResumeUpload}>
                  <UploadIcon uploaded={value}>
                    <Ionicons
                      name={value ? "checkmark" : "cloud-upload"}
                      size={32}
                      color={value ? theme.colors.text.inverse : theme.colors.text.secondary}
                    />
                  </UploadIcon>
                  <UploadText uploaded={value}>
                    {value ? 'Resume Uploaded!' : 'Upload Your Resume'}
                  </UploadText>
                  <UploadSubtext uploaded={value}>
                    {value ? 'Your resume has been successfully uploaded' : 'Drag and drop your resume here or tap to browse'}
                  </UploadSubtext>
                </UploadArea>
              )}
            />
          </View>
        );

      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return 'What\'s your role?';
      case 2:
        return 'What are your skills?';
      case 3:
        return 'Upload your resume';
      default:
        return '';
    }
  };

  const getStepSubtitle = () => {
    switch (currentStep) {
      case 1:
        return 'Select the role that best describes your professional background';
      case 2:
        return 'Add the skills that showcase your expertise and experience';
      case 3:
        return 'Upload your resume to help us personalize your experience';
      default:
        return '';
    }
  };

  return (
    <Container>
      <Content showsVerticalScrollIndicator={false}>
        <Header>
          <StepIndicator>
            <StepText>Step {currentStep} of 3</StepText>
            <ProgressBar progress={(currentStep / 3) * 100} variant="primary" size="sm" />
          </StepIndicator>
          
          <Title>{getStepTitle()}</Title>
          <Subtitle>{getStepSubtitle()}</Subtitle>
        </Header>

        {currentForm.formState.errors.root && (
          <ErrorText>{currentForm.formState.errors.root.message}</ErrorText>
        )}

        {renderStepContent()}

        <ButtonContainer>
          {currentStep > 1 && (
            <Button
              title="Back"
              onPress={handleBack}
              variant="outline"
              size="lg"
              style={{ flex: 1, marginRight: theme.spacing[3] }}
            />
          )}
          
          <Button
            title={currentStep === 3 ? 'Complete' : 'Continue'}
            onPress={handleContinue}
            variant="primary"
            size="lg"
            loading={isLoading}
            style={{ flex: 1 }}
          />
        </ButtonContainer>
      </Content>
    </Container>
  );
} 