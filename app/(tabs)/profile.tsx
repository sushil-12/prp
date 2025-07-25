import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import { ToastDemo } from '@/components/ToastDemo';
import { Button, Card } from '@/components/ui';
import { theme } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';

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

const ProfileSection = styled(View)`
  align-items: center;
  margin-bottom: ${theme.spacing[4]}px;
`;

const Avatar = styled(View)`
  width: 80px;
  height: 80px;
  border-radius: ${theme.borderRadius.full}px;
  background-color: ${theme.colors.primary[100]};
  align-items: center;
  justify-content: center;
  margin-bottom: ${theme.spacing[3]}px;
`;

const ProfileName = styled(Text)`
  font-size: ${theme.typography.xl}px;
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing[1]}px;
`;

const ProfileTitle = styled(Text)`
  font-size: ${theme.typography.base}px;
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing[2]}px;
`;

const ProfileStats = styled(View)`
  flex-direction: row;
  gap: ${theme.spacing[4]}px;
`;

const StatItem = styled(View)`
  align-items: center;
`;

const StatNumber = styled(Text)`
  font-size: ${theme.typography.lg}px;
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.colors.primary[600]};
`;

const StatLabel = styled(Text)`
  font-size: ${theme.typography.xs}px;
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

const MenuCard = styled(Card)`
  margin-bottom: ${theme.spacing[2]}px;
`;

const MenuItem = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-vertical: ${theme.spacing[3]}px;
`;

const MenuItemLeft = styled(View)`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

const MenuIcon = styled(View)`
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.base}px;
  background-color: ${theme.colors.gray[100]};
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing[3]}px;
`;

const MenuText = styled(View)`
  flex: 1;
`;

const MenuTitle = styled(Text)`
  font-size: ${theme.typography.base}px;
  font-weight: ${theme.typography.fontWeights.medium};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing[1]}px;
`;

const MenuSubtitle = styled(Text)`
  font-size: ${theme.typography.sm}px;
  color: ${theme.colors.text.secondary};
`;

const MenuArrow = styled(Ionicons)`
  color: ${theme.colors.gray[400]};
`;

const AchievementCard = styled(Card)`
  margin-bottom: ${theme.spacing[3]}px;
`;

const AchievementHeader = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${theme.spacing[2]}px;
`;

const AchievementIcon = styled(View)`
  width: 32px;
  height: 32px;
  border-radius: ${theme.borderRadius.base}px;
  background-color: ${theme.colors.success[100]};
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing[2]}px;
`;

const AchievementTitle = styled(Text)`
  font-size: ${theme.typography.base}px;
  font-weight: ${theme.typography.fontWeights.medium};
  color: ${theme.colors.text.primary};
  flex: 1;
`;

const AchievementDescription = styled(Text)`
  font-size: ${theme.typography.sm}px;
  color: ${theme.colors.text.secondary};
`;

// Mock data
const mockAchievements = [
  {
    id: '1',
    title: 'First Interview',
    description: 'Completed your first mock interview',
    icon: 'trophy',
    date: '2 days ago',
  },
  {
    id: '2',
    title: 'Skill Master',
    description: 'Reached 80% proficiency in React Native',
    icon: 'star',
    date: '1 week ago',
  },
  {
    id: '3',
    title: 'Resume Ready',
    description: 'Created your first professional resume',
    icon: 'document-text',
    date: '2 weeks ago',
  },
];

const mockMenuItems = [
  {
    id: '1',
    title: 'Edit Profile',
    subtitle: 'Update your personal information',
    icon: 'person-outline',
    action: 'navigate',
  },
  {
    id: '2',
    title: 'Job Preferences',
    subtitle: 'Manage your job search criteria',
    icon: 'settings-outline',
    action: 'navigate',
  },
  {
    id: '3',
    title: 'Notifications',
    subtitle: 'Control your notification settings',
    icon: 'notifications-outline',
    action: 'toggle',
    value: true,
  },
  {
    id: '4',
    title: 'Privacy Settings',
    subtitle: 'Manage your privacy and data',
    icon: 'shield-outline',
    action: 'navigate',
  },
  {
    id: '5',
    title: 'Help & Support',
    subtitle: 'Get help and contact support',
    icon: 'help-circle-outline',
    action: 'navigate',
  },
  {
    id: '6',
    title: 'About',
    subtitle: 'App version and information',
    icon: 'information-circle-outline',
    action: 'navigate',
  },
];

export default function ProfileScreen() {
  const { user, signOut, loading } = useAuth();
  const { showToast } = useToast();
  const [menuItems, setMenuItems] = useState(mockMenuItems);
  const [achievements] = useState(mockAchievements);

  const toggleMenuItem = (id: string) => {
    setMenuItems(prev => 
      prev.map(item => 
        item.id === id && item.action === 'toggle' 
          ? { ...item, value: !item.value }
          : item
      )
    );
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/');
    } catch (error: any) {
      // Error is already handled by AuthContext with toast
    }
  };

  const handleExportData = () => {
    showToast('info', 'Export Data', 'This feature will export your profile data, job applications, and preferences.');
    
    // Simulate data export
    setTimeout(() => {
      showToast('success', 'Export Initiated', 'Your data export has been initiated. You will receive an email when it\'s ready.');
    }, 2000);
  };

  return (
    <Container>
      <Header>
        <ProfileSection>
          <Avatar>
            {user?.photoURL ? (
              <Image source={{ uri: user.photoURL }} style={{ width: 80, height: 80, borderRadius: 40 }} />
            ) : (
              <Ionicons name="person" size={40} color={theme.colors.primary[600]} />
            )}
          </Avatar>
          <ProfileName>{user?.displayName || 'User'}</ProfileName>
          <ProfileTitle>{user?.email || 'No email'}</ProfileTitle>
          <ProfileStats>
            <StatItem>
              <StatNumber>12</StatNumber>
              <StatLabel>Applications</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>3</StatNumber>
              <StatLabel>Interviews</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>1</StatNumber>
              <StatLabel>Offers</StatLabel>
            </StatItem>
          </ProfileStats>
        </ProfileSection>
      </Header>

      <Content>
        {/* Recent Achievements */}
        <Section>
          <SectionTitle>Recent Achievements</SectionTitle>
          {achievements.map((achievement) => (
            <AchievementCard key={achievement.id} variant="elevated">
              <AchievementHeader>
                <AchievementIcon>
                  <Ionicons name={achievement.icon as any} size={16} color={theme.colors.success[600]} />
                </AchievementIcon>
                <AchievementTitle>{achievement.title}</AchievementTitle>
                <Text style={{ fontSize: theme.typography.xs, color: theme.colors.gray[500] }}>
                  {achievement.date}
                </Text>
              </AchievementHeader>
              <AchievementDescription>{achievement.description}</AchievementDescription>
            </AchievementCard>
          ))}
        </Section>

        {/* Settings */}
        <Section>
          <SectionTitle>Settings</SectionTitle>
          {menuItems.map((item) => (
            <MenuCard key={item.id} variant="elevated">
              <MenuItem onPress={() => toggleMenuItem(item.id)}>
                <MenuItemLeft>
                  <MenuIcon>
                    <Ionicons name={item.icon as any} size={20} color={theme.colors.gray[600]} />
                  </MenuIcon>
                  <MenuText>
                    <MenuTitle>{item.title}</MenuTitle>
                    <MenuSubtitle>{item.subtitle}</MenuSubtitle>
                  </MenuText>
                </MenuItemLeft>
                {item.action === 'toggle' ? (
                  <Switch
                    value={item.value}
                    onValueChange={() => toggleMenuItem(item.id)}
                    trackColor={{ false: theme.colors.gray[300], true: theme.colors.primary[100] }}
                    thumbColor={item.value ? theme.colors.primary[500] : theme.colors.gray[400]}
                  />
                ) : (
                  <MenuArrow name="chevron-forward" size={20} />
                )}
              </MenuItem>
            </MenuCard>
          ))}
        </Section>

        {/* Account Actions */}
        <Section>
          <SectionTitle>Account</SectionTitle>
          <View style={{ gap: theme.spacing[3] }}>
            <Button
              title="Export Data"
              onPress={handleExportData}
              variant="outline"
              fullWidth
            />
            <Button
              title="Sign Out"
              onPress={handleSignOut}
              variant="ghost"
              fullWidth
              loading={loading}
            />
          </View>
        </Section>

        {/* Toast Demo - Remove this section after testing */}
        <Section>
          <SectionTitle>Toast Demo</SectionTitle>
          <ToastDemo />
        </Section>
      </Content>
    </Container>
  );
} 