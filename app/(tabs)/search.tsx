import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import { Badge, Button, Card, Input } from '@/components/ui';
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
  margin-bottom: ${theme.spacing[3]}px;
`;

const SearchContainer = styled(View)`
  margin-bottom: ${theme.spacing[4]}px;
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

const FilterChips = styled(ScrollView)`
  margin-bottom: ${theme.spacing[4]}px;
`;

const FilterChip = styled(TouchableOpacity)<{ active: boolean }>`
  padding-horizontal: ${theme.spacing[3]}px;
  padding-vertical: ${theme.spacing[2]}px;
  border-radius: ${theme.borderRadius.full}px;
  margin-right: ${theme.spacing[2]}px;
  border-width: 1px;
  background-color: ${(props: { active: boolean }) => props.active ? theme.colors.primary[500] : theme.colors.background.primary};
  border-color: ${(props: { active: boolean }) => props.active ? theme.colors.primary[500] : theme.colors.border.medium};
`;

const FilterChipText = styled(Text)<{ active: boolean }>`
  font-size: ${theme.typography.sm}px;
  font-weight: ${theme.typography.fontWeights.medium};
  color: ${(props: { active: boolean }) => props.active ? theme.colors.text.inverse : theme.colors.text.primary};
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

const ResultsCount = styled(Text)`
  font-size: ${theme.typography.sm}px;
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing[3]}px;
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
    match: 95,
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
    match: 87,
  },
  {
    id: '3',
    title: 'Mobile App Developer',
    company: 'MobileFirst',
    location: 'Austin, TX',
    salary: '$100k - $130k',
    type: 'Full-time',
    tags: ['React Native', 'iOS', 'Android'],
    posted: '3 days ago',
    match: 92,
  },
  {
    id: '4',
    title: 'Full Stack Developer',
    company: 'WebSolutions',
    location: 'Denver, CO',
    salary: '$85k - $115k',
    type: 'Full-time',
    tags: ['React', 'Node.js', 'MongoDB'],
    posted: '5 days ago',
    match: 78,
  },
];

const filterOptions = [
  'All Jobs',
  'Remote',
  'Full-time',
  'Part-time',
  'Contract',
  'React Native',
  'TypeScript',
  'Mobile',
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState(['All Jobs']);
  const [jobs] = useState(mockJobs);

  const toggleFilter = (filter: string) => {
    if (filter === 'All Jobs') {
      setActiveFilters(['All Jobs']);
    } else {
      setActiveFilters(prev => {
        const newFilters = prev.filter(f => f !== 'All Jobs');
        if (newFilters.includes(filter)) {
          return newFilters.filter(f => f !== filter);
        } else {
          return [...newFilters, filter];
        }
      });
    }
  };

  const filteredJobs = jobs.filter(job => {
    if (activeFilters.includes('All Jobs') || activeFilters.length === 0) {
      return true;
    }
    
    return activeFilters.some(filter => 
      job.tags.includes(filter) || 
      job.type === filter ||
      (filter === 'Remote' && job.location.toLowerCase().includes('remote'))
    );
  });

  return (
    <Container>
      <Header>
        <HeaderTitle>Search Jobs</HeaderTitle>
        <SearchContainer>
          <Input
            placeholder="Search jobs, companies, or keywords..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </SearchContainer>
      </Header>

      <Content>
        {/* Filters */}
        <Section>
          <SectionTitle>Filters</SectionTitle>
          <FilterChips horizontal showsHorizontalScrollIndicator={false}>
            {filterOptions.map((filter) => (
              <FilterChip
                key={filter}
                active={activeFilters.includes(filter)}
                onPress={() => toggleFilter(filter)}
              >
                <FilterChipText active={activeFilters.includes(filter)}>
                  {filter}
                </FilterChipText>
              </FilterChip>
            ))}
          </FilterChips>
        </Section>

        {/* Search Results */}
        <Section>
          <SectionTitle>Search Results</SectionTitle>
          <ResultsCount>
            {filteredJobs.length} jobs found
          </ResultsCount>
          
          {filteredJobs.map((job) => (
            <JobCard key={job.id} variant="elevated" onPress={() => {}}>
              <JobHeader>
                <JobTitle>{job.title}</JobTitle>
                <View style={{ alignItems: 'flex-end' }}>
                  <Badge label={job.type} variant="outline" size="sm" />
                  <Text style={{ 
                    fontSize: theme.typography.xs, 
                    color: theme.colors.success[600],
                    marginTop: theme.spacing[1]
                  }}>
                    {job.match}% match
                  </Text>
                </View>
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

        {/* Load More */}
        {filteredJobs.length > 0 && (
          <Section>
            <Button
              title="Load More Jobs"
              onPress={() => {}}
              variant="outline"
              fullWidth
            />
          </Section>
        )}
      </Content>
    </Container>
  );
} 