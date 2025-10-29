import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';

const tabs = [
  { name: '/(tabs)', title: 'Home', icon: 'home', iconOutline: 'home-outline' },
  { name: '/(tabs)/training', title: 'Training', icon: 'fitness', iconOutline: 'fitness-outline' },
  { name: '/(tabs)/timer', title: 'Timer', icon: 'stopwatch', iconOutline: 'stopwatch-outline' },
  { name: '/(tabs)/ranking', title: 'Ranking', icon: 'trophy', iconOutline: 'trophy-outline' },
  { name: '/(tabs)/profile', title: 'Perfil', icon: 'person', iconOutline: 'person-outline' },
  { name: '/(tabs)/admin', title: 'Admin', icon: 'settings', iconOutline: 'settings-outline' },
];

export default function CustomTabBar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.tabBar}>
      {tabs.map((tab) => {
        const isActive = pathname === tab.name || (tab.name === '/(tabs)' && pathname === '/(tabs)/index');
        
        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tabItem}
            onPress={() => router.push(tab.name as any)}
          >
            <Ionicons
              name={isActive ? tab.icon as any : tab.iconOutline as any}
              size={24}
              color={isActive ? '#FAB12F' : '#666666'}
            />
            <Text style={[styles.tabLabel, { color: isActive ? '#FAB12F' : '#666666' }]}>
              {tab.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
    letterSpacing: 0.3,
  },
});