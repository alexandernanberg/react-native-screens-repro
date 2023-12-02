import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { Alert, Pressable, Text, useColorScheme } from 'react-native';
import { View } from '../components/Themed';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerLeft: () => (
              <Pressable
                style={{ backgroundColor: 'blue' }}
                hitSlop={12}
                onPress={() => {
                  Alert.alert('Test');
                }}
              >
                <Text style={{ color: 'white' }}>Press me</Text>
              </Pressable>
            ),
            headerRight: () => (
              <View style={{ paddingHorizontal: 12, marginHorizontal: -12 }}>
                <Pressable
                  style={{ backgroundColor: 'green' }}
                  hitSlop={12}
                  onPress={() => {
                    Alert.alert('Test');
                  }}
                >
                  <Text style={{ color: 'white' }}>Press me</Text>
                </Pressable>
              </View>
            ),
          }}
        />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}
