import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Notifications() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const circleAnim = useRef(new Animated.Value(0)).current;

  const [notifications, setNotifications] = useState({
    workoutReminders: true,
    progressUpdates: false,
    achievements: true,
    socialUpdates: false,
    systemUpdates: true,
  });

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.timing(circleAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <View style={styles.container}>
      {/* Background Elements */}
      <Animated.View style={[
        styles.backgroundElements,
        {
          transform: [{
            rotate: circleAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '360deg'],
            })
          }]
        }
      ]}>
        <Animated.View style={[
          styles.circle1,
          {
            transform: [{
              scale: circleAnim.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [1, 1.1, 1],
              })
            }]
          }
        ]} />
        <Animated.View style={[
          styles.circle2,
          {
            opacity: circleAnim.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [0.05, 0.08, 0.05],
            })
          }
        ]} />
        <View style={styles.triangle} />
      </Animated.View>
      
      {/* Header */}
      <Animated.View style={[
        styles.header,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }
      ]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#ECEDEE" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notificações</Text>
        <View style={styles.placeholder} />
      </Animated.View>

      <Animated.ScrollView 
        contentContainerStyle={styles.scrollContent}
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }}
      >
        {/* Treino */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Treino</Text>
          
          <View style={styles.notificationItem}>
            <View style={styles.notificationInfo}>
              <Ionicons name="fitness-outline" size={24} color="#fab12f" />
              <View style={styles.textContainer}>
                <Text style={styles.notificationTitle}>Lembretes de Treino</Text>
                <Text style={styles.notificationDescription}>Receba notificações para não perder seus treinos</Text>
              </View>
            </View>
            <Switch
              value={notifications.workoutReminders}
              onValueChange={() => toggleNotification('workoutReminders')}
              trackColor={{ false: '#333', true: '#fab12f' }}
              thumbColor={notifications.workoutReminders ? '#000' : '#666'}
            />
          </View>

          <View style={styles.notificationItem}>
            <View style={styles.notificationInfo}>
              <Ionicons name="trending-up-outline" size={24} color="#fab12f" />
              <View style={styles.textContainer}>
                <Text style={styles.notificationTitle}>Atualizações de Progresso</Text>
                <Text style={styles.notificationDescription}>Relatórios semanais do seu desempenho</Text>
              </View>
            </View>
            <Switch
              value={notifications.progressUpdates}
              onValueChange={() => toggleNotification('progressUpdates')}
              trackColor={{ false: '#333', true: '#fab12f' }}
              thumbColor={notifications.progressUpdates ? '#000' : '#666'}
            />
          </View>
        </View>

        {/* Conquistas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conquistas</Text>
          
          <View style={styles.notificationItem}>
            <View style={styles.notificationInfo}>
              <Ionicons name="trophy-outline" size={24} color="#fab12f" />
              <View style={styles.textContainer}>
                <Text style={styles.notificationTitle}>Conquistas Desbloqueadas</Text>
                <Text style={styles.notificationDescription}>Seja notificado quando alcançar novos marcos</Text>
              </View>
            </View>
            <Switch
              value={notifications.achievements}
              onValueChange={() => toggleNotification('achievements')}
              trackColor={{ false: '#333', true: '#fab12f' }}
              thumbColor={notifications.achievements ? '#000' : '#666'}
            />
          </View>
        </View>

        {/* Social */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Social</Text>
          
          <View style={styles.notificationItem}>
            <View style={styles.notificationInfo}>
              <Ionicons name="people-outline" size={24} color="#fab12f" />
              <View style={styles.textContainer}>
                <Text style={styles.notificationTitle}>Atualizações Sociais</Text>
                <Text style={styles.notificationDescription}>Atividades de amigos e comunidade</Text>
              </View>
            </View>
            <Switch
              value={notifications.socialUpdates}
              onValueChange={() => toggleNotification('socialUpdates')}
              trackColor={{ false: '#333', true: '#fab12f' }}
              thumbColor={notifications.socialUpdates ? '#000' : '#666'}
            />
          </View>
        </View>

        {/* Sistema */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sistema</Text>
          
          <View style={styles.notificationItem}>
            <View style={styles.notificationInfo}>
              <Ionicons name="settings-outline" size={24} color="#fab12f" />
              <View style={styles.textContainer}>
                <Text style={styles.notificationTitle}>Atualizações do Sistema</Text>
                <Text style={styles.notificationDescription}>Novos recursos e melhorias do app</Text>
              </View>
            </View>
            <Switch
              value={notifications.systemUpdates}
              onValueChange={() => toggleNotification('systemUpdates')}
              trackColor={{ false: '#333', true: '#fab12f' }}
              thumbColor={notifications.systemUpdates ? '#000' : '#666'}
            />
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  backgroundElements: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  circle1: {
    position: 'absolute',
    top: 100,
    right: -40,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fab12f',
    opacity: 0.06,
  },
  circle2: {
    position: 'absolute',
    bottom: 200,
    left: -30,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fab12f',
    opacity: 0.05,
  },
  triangle: {
    position: 'absolute',
    top: '40%',
    right: 40,
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderBottomWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#fab12f',
    opacity: 0.04,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    color: '#ECEDEE',
    fontSize: 20,
    fontWeight: '700',
  },
  placeholder: {
    width: 40,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  section: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    color: '#ECEDEE',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
  },
  notificationItem: {
    backgroundColor: '#1c1c1c',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  notificationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textContainer: {
    marginLeft: 16,
    flex: 1,
  },
  notificationTitle: {
    color: '#ECEDEE',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  notificationDescription: {
    color: '#888',
    fontSize: 14,
  },
});