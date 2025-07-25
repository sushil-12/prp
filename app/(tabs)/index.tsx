import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import { Badge, Button, Card } from '@/components/ui';
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

const JobCard = styled(Card)`
  margin-bottom: ${theme.spacing[3]}px;
`;

const JobHeader = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing[2]}px;
`;

const JobTitle = styled(Text)`
  font-size: ${theme.typography.lg}px;
  font-weight: ${theme.typography.fontWeights.semibold};
  color: ${theme.colors.text.primary};
  flex: 1;
  margin-right: ${theme.spacing[2]}px;
`;

const JobCompany = styled(Text)`
  font-size: ${theme.typography.base}px;
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing[1]}px;
`;

const JobLocation = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${theme.spacing[2]}px;
`;

const JobLocationText = styled(Text)`
  font-size: ${theme.typography.sm}px;
  color: ${theme.colors.text.tertiary};
  margin-left: ${theme.spacing[1]}px;
`;

const JobTags = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${theme.spacing[2]}px;
  margin-bottom: ${theme.spacing[3]}px;
`;

const JobFooter = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const JobSalary = styled(Text)`
  font-size: ${theme.typography.base}px;
  font-weight: ${theme.typography.fontWeights.medium};
  color: ${theme.colors.primary[600]};
`;

const QuickActions = styled(View)`
  flex-direction: row;
  gap: ${theme.spacing[3]}px;
  margin-bottom: ${theme.spacing[4]}px;
`;

const StatsCard = styled(Card)`
  flex: 1;
  align-items: center;
`;

const StatsNumber = styled(Text)`
  font-size: ${theme.typography['3xl']}px;
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.colors.primary[600]};
  margin-bottom: ${theme.spacing[1]}px;
`;

const StatsLabel = styled(Text)`
  font-size: ${theme.typography.sm}px;
  color: ${theme.colors.text.secondary};
  text-align: center;
`;

// Mock data
const mockJobs = [
  {
    id: '1',
    title: 'Senior React Native Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    salary: '$120k - $150k',
    type: 'Full-time',
    tags: ['React Native', 'TypeScript', 'Mobile'],
    posted: '2 days ago',
  },
  {
    id: '2',
    title: 'Frontend Engineer',
    company: 'StartupXYZ',
    location: 'Remote',
    salary: '$90k - $120k',
    type: 'Full-time',
    tags: ['React', 'JavaScript', 'CSS'],
    posted: '1 week ago',
  },
  {
    id: '3',
    title: 'UI/UX Designer',
    company: 'Design Studio',
    location: 'New York, NY',
    salary: '$80k - $110k',
    type: 'Full-time',
    tags: ['Figma', 'Sketch', 'Prototyping'],
    posted: '3 days ago',
  },
];

export default function JobsScreen() {
  const [applicationsCount, setApplicationsCount] = useState(12);
  const [interviewsCount, setInterviewsCount] = useState(3);
  const [offersCount, setOffersCount] = useState(1);

  return (
    <Container>
      <Header>
        <HeaderTitle>Jobs</HeaderTitle>
        <HeaderSubtitle>Find your next opportunity</HeaderSubtitle>
      </Header>

      <Content>
        {/* Quick Stats */}
        <Section>
          <SectionTitle>Your Progress</SectionTitle>
          <QuickActions>
            <StatsCard>
              <StatsNumber>{applicationsCount}</StatsNumber>
              <StatsLabel>Applications</StatsLabel>
            </StatsCard>
            <StatsCard>
              <StatsNumber>{interviewsCount}</StatsNumber>
              <StatsLabel>Interviews</StatsLabel>
            </StatsCard>
            <StatsCard>
              <StatsNumber>{offersCount}</StatsNumber>
              <StatsLabel>Offers</StatsLabel>
            </StatsCard>
          </QuickActions>
        </Section>

        {/* Recommended Jobs */}
        <Section>
          <SectionTitle>Recommended for You</SectionTitle>
          {mockJobs.map((job) => (
            <JobCard key={job.id} variant="elevated" onPress={() => {}}>
              <JobHeader>
                <JobTitle>{job.title}</JobTitle>
                <Badge label={job.type} variant="outline" size="sm" />
              </JobHeader>
              
              <JobCompany>{job.company}</JobCompany>
              
              <JobLocation>
                <Ionicons name="location-outline" size={16} color={theme.colors.gray[500]} />
                <JobLocationText>{job.location}</JobLocationText>
              </JobLocation>
              
              <JobTags>
                {job.tags.map((tag, index) => (
                  <Badge key={index} label={tag} variant="secondary" size="sm" />
                ))}
              </JobTags>
              
              <JobFooter>
                <JobSalary>{job.salary}</JobSalary>
                <Text style={{ fontSize: theme.typography.xs, color: theme.colors.gray[500] }}>
                  {job.posted}
                </Text>
              </JobFooter>
            </JobCard>
          ))}
        </Section>

        {/* Quick Actions */}
        <Section>
          <SectionTitle>Quick Actions</SectionTitle>
          <View style={{ gap: theme.spacing[3] }}>
            <Button
              title="Upload Resume"
              onPress={() => {}}
              variant="primary"
              fullWidth
            />
            <Button
              title="Set Job Preferences"
              onPress={() => {}}
              variant="outline"
              fullWidth
            />
          </View>
        </Section>
      </Content>
    </Container>
  );
}
