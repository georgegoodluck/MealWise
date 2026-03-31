import { useRef, useState, useCallback } from 'react';
import { Animated } from 'react-native';

export function useModal() {
  const [visible, setVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(700)).current;
  const fadeAnim  = useRef(new Animated.Value(0)).current;

  const open = useCallback(() => {
    setVisible(true);
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 0, useNativeDriver: true, tension: 68, friction: 12,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1, duration: 240, useNativeDriver: true,
      }),
    ]).start();
  }, [slideAnim, fadeAnim]);

  const close = useCallback((onDone) => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 700, duration: 260, useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0, duration: 200, useNativeDriver: true,
      }),
    ]).start(() => {
      setVisible(false);
      onDone?.();
    });
  }, [slideAnim, fadeAnim]);

  return { visible, open, close, slideAnim, fadeAnim };
}
