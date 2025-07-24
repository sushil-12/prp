import React, { useEffect, useRef } from 'react';
import { Animated, Text, View } from 'react-native';
import styled from 'styled-components/native';

const Container = styled(View)`
  flex: 1;
  background-color: #FFFFFF;
  align-items: center;
  justify-content: center;
`;

const LogoContainer = styled(View)`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const LogoText = styled(Text)`
  font-size: 48px;
  font-weight: 700;
  letter-spacing: 2px;
`;

const PrepText = styled(Text)`
  color: #22C55E;
    font-size: 48px;
  font-weight: 700;
`;

const LaunchText = styled(Text)`
  color: #374151;
   font-size: 48px;
  font-weight: 700;
`;

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const prepOpacityAnim = useRef(new Animated.Value(0)).current;
  const launchOpacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      // Logo appears
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1.1,
          friction: 3,
          useNativeDriver: true,
        }),
      ]),
      // Logo settles
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 7,
        useNativeDriver: true,
      }),
      // "prep" appears
      Animated.timing(prepOpacityAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      // "launch" appears
      Animated.timing(launchOpacityAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <Container>
      <LogoContainer>
        <Animated.View style={{ 
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
          display: 'flex',
        }}>
          <Animated.View style={{ opacity: prepOpacityAnim }}>
            <PrepText>prep</PrepText>
          </Animated.View>
          <Animated.View style={{ opacity: launchOpacityAnim }}>
            <LaunchText>launch</LaunchText>
          </Animated.View>
        </Animated.View>

      </LogoContainer>
    </Container>
  );
}
