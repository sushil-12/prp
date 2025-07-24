import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import { Badge, Button, Card, ProgressBar } from '@/components/ui';
import { theme } from '@/constants/theme';

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${theme.colors.background.secondary};
`;

const Header = styled(View)`
  background-color: ${theme.colors.background.primary};
  padding: ${theme.spacing[4]}px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border.light};
`;

const HeaderTitle = styled(Text)`
  font-size: ${theme.typography['2xl']}px;
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing[1]}px;
`;

const HeaderSubtitle = styled(Text)`
  font-size: ${theme.typography.base}px;
  color: ${theme.colors.text.secondary};
`;

const Content = styled(ScrollView)`
  flex: 1;
  padding: ${theme.spacing[4]}px;
`;

const Section = styled(View)`
  margin-bottom: ${theme.spacing[6]}px;
`;

const SectionTitle = styled(Text)`
  font-size: ${theme.typography.lg}px;
  font-weight: ${theme.typography.fontWeights.semibold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing[3]}px;
`;

const SkillCard = styled(Card)`
  margin-bottom: ${theme.spacing[3]}px;
`;

const SkillHeader = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing[2]}px;
`;

const SkillName = styled(Text)`
  font-size: ${theme.typography.lg}px;
  font-weight: ${theme.typography.fontWeights.semibold};
  color: ${theme.colors.text.primary};
`;

const SkillLevel = styled(Text)`
  font-size: ${theme.typography.sm}px;
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing[2]}px;
`;

const ResourceCard = styled(Card)`
  margin-bottom: ${theme.spacing[3]}px;
`;

const ResourceHeader = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing[2]}px;
`;

const ResourceTitle = styled(Text)`
  font-size: ${theme.typography.base}px;
  font-weight: ${theme.typography.fontWeights.semibold};
  color: ${theme.colors.text.primary};
  flex: 1;
  margin-right: ${theme.spacing[2]}px;
`;

const ResourceDescription = styled(Text)`
  font-size: ${theme.typography.sm}px;
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing[2]}px;
`;

const ResourceMeta = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ResourceDuration = styled(Text)`
  font-size: ${theme.typography.xs}px;
  color: ${theme.colors.text.tertiary};
`;

const QuickActions = styled(View)`
  flex-direction: row;
  gap: ${theme.spacing[3]}px;
  margin-bottom: ${theme.spacing[4]}px;
`;

const ActionCard = styled(Card)`
  flex: 1;
  align-items: center;
  padding: ${theme.spacing[4]}px;
`;

const ActionIcon = styled(View)`
  width: 48px;
  height: 48px;
  border-radius: ${theme.borderRadius.full}px;
  background-color: ${theme.colors.primary[100]};
  align-items: center;
  justify-content: center;
  margin-bottom: ${theme.spacing[2]}px;
`;

const ActionTitle = styled(Text)`
  font-size: ${theme.typography.sm}px;
  font-weight: ${theme.typography.fontWeights.medium};
  color: ${theme.colors.text.primary};
  text-align: center;
`;

// Mock data
const mockSkills = [
  {
    id: '1',
    name: 'React Native',
    level: 85,
    category: 'Mobile Development',
  },
  {
    id: '2',
    name: 'TypeScript',
    level: 78,
    category: 'Programming',
  },
  {
    id: '3',
    name: 'Node.js',
    level: 72,
    category: 'Backend Development',
  },
  {
    id: '4',
    name: 'UI/UX Design',
    level: 65,
    category: 'Design',
  },
];

const mockResources = [
  {
    id: '1',
    title: 'React Native Interview Questions',
    description: 'Comprehensive guide to common React Native interview questions and answers',
    type: 'Interview Prep',
    duration: '30 min read',
    difficulty: 'Intermediate',
  },
  {
    id: '2',
    title: 'Advanced TypeScript Patterns',
    description: 'Learn advanced TypeScript patterns used in production applications',
    type: 'Tutorial',
    duration: '2 hours',
    difficulty: 'Advanced',
  },
  {
    id: '3',
    title: 'System Design for Mobile Apps',
    description: 'Understanding system design principles for mobile applications',
    type: 'Course',
    duration: '4 hours',
    difficulty: 'Advanced',
  },
];

export default function PreparationScreen() {
  const [skills] = useState(mockSkills);
  const [resources] = useState(mockResources);

  return (
    <Container>
      <Header>
        <HeaderTitle>Prepare</HeaderTitle>
        <HeaderSubtitle>Build your skills and ace interviews</HeaderSubtitle>
      </Header>

      <Content>
        {/* Quick Actions */}
        <Section>
          <SectionTitle>Quick Actions</SectionTitle>
          <QuickActions>
            <ActionCard onPress={() => {}}>
              <ActionIcon>
                <Ionicons name="videocam" size={24} color={theme.colors.primary[600]} />
              </ActionIcon>
              <ActionTitle>Mock Interview</ActionTitle>
            </ActionCard>
            <ActionCard onPress={() => {}}>
              <ActionIcon>
                <Ionicons name="document-text" size={24} color={theme.colors.primary[600]} />
              </ActionIcon>
              <ActionTitle>Resume Builder</ActionTitle>
            </ActionCard>
            <ActionCard onPress={() => {}}>
              <ActionIcon>
                <Ionicons name="school" size={24} color={theme.colors.primary[600]} />
              </ActionIcon>
              <ActionTitle>Skill Assessment</ActionTitle>
            </ActionCard>
          </QuickActions>
        </Section>

        {/* Skills Progress */}
        <Section>
          <SectionTitle>Your Skills</SectionTitle>
          {skills.map((skill) => (
            <SkillCard key={skill.id} variant="elevated">
              <SkillHeader>
                <SkillName>{skill.name}</SkillName>
                <Badge label={`${skill.level}%`} variant="primary" size="sm" />
              </SkillHeader>
              <SkillLevel>{skill.category}</SkillLevel>
              <ProgressBar
                progress={skill.level}
                variant="primary"
                size="sm"
                showLabel={false}
              />
            </SkillCard>
          ))}
        </Section>

        {/* Learning Resources */}
        <Section>
          <SectionTitle>Recommended Resources</SectionTitle>
          {resources.map((resource) => (
            <ResourceCard key={resource.id} variant="elevated" onPress={() => {}}>
              <ResourceHeader>
                <ResourceTitle>{resource.title}</ResourceTitle>
                <Badge label={resource.difficulty} variant="outline" size="sm" />
              </ResourceHeader>
              <ResourceDescription>{resource.description}</ResourceDescription>
              <ResourceMeta>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="time-outline" size={14} color={theme.colors.gray[500]} />
                  <ResourceDuration style={{ marginLeft: theme.spacing[1] }}>
                    {resource.duration}
                  </ResourceDuration>
                </View>
                <Badge label={resource.type} variant="secondary" size="sm" />
              </ResourceMeta>
            </ResourceCard>
          ))}
        </Section>

        {/* Interview Prep */}
        <Section>
          <SectionTitle>Interview Preparation</SectionTitle>
          <View style={{ gap: theme.spacing[3] }}>
            <Button
              title="Practice Coding Challenges"
              onPress={() => {}}
              variant="primary"
              fullWidth
            />
            <Button
              title="Behavioral Questions"
              onPress={() => {}}
              variant="outline"
              fullWidth
            />
            <Button
              title="System Design Practice"
              onPress={() => {}}
              variant="outline"
              fullWidth
            />
          </View>
        </Section>

        {/* Progress Overview */}
        <Section>
          <SectionTitle>Your Progress</SectionTitle>
          <Card variant="elevated" padding="lg">
            <View style={{ marginBottom: theme.spacing[4] }}>
              <Text style={{ 
                fontSize: theme.typography.base, 
                fontWeight: theme.typography.fontWeights.medium,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing[2]
              }}>
                Overall Preparation
              </Text>
              <ProgressBar
                progress={73}
                variant="primary"
                size="lg"
                showLabel={true}
                label="73% Complete"
              />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ 
                  fontSize: theme.typography['2xl'], 
                  fontWeight: theme.typography.fontWeights.bold,
                  color: theme.colors.primary[600]
                }}>
                  12
                </Text>
                <Text style={{ fontSize: theme.typography.sm, color: theme.colors.text.secondary }}>
                  Resources Completed
                </Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ 
                  fontSize: theme.typography['2xl'], 
                  fontWeight: theme.typography.fontWeights.bold,
                  color: theme.colors.success[600]
                }}>
                  5
                </Text>
                <Text style={{ fontSize: theme.typography.sm, color: theme.colors.text.secondary }}>
                  Mock Interviews
                </Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ 
                  fontSize: theme.typography['2xl'], 
                  fontWeight: theme.typography.fontWeights.bold,
                  color: theme.colors.warning[600]
                }}>
                  8.5
                </Text>
                <Text style={{ fontSize: theme.typography.sm, color: theme.colors.text.secondary }}>
                  Average Score
                </Text>
              </View>
            </View>
          </Card>
        </Section>
      </Content>
    </Container>
  );
} 