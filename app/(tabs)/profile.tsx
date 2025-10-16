import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const flameAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const sparkleAnim = useRef(new Animated.Value(0)).current;
  
  const stats = {
    totalWorkouts: 127,
    currentStreak: 12,
    personalRecord: 85,
    weeklyGoal: 85,
    monthlyCalories: 28470,
    avgWorkoutTime: 68
  };

  const getFlameLevel = (streak: number) => {
    if (streak >= 30) return 'legendary';
    if (streak >= 21) return 'fire';
    if (streak >= 14) return 'hot';
    if (streak >= 7) return 'warm';
    return 'spark';
  };

  const flameLevel = getFlameLevel(stats.currentStreak);
  const nextMilestone = stats.currentStreak < 7 ? 7 : stats.currentStreak < 14 ? 14 : stats.currentStreak < 21 ? 21 : 30;
  const progressToNext = ((stats.currentStreak % (nextMilestone === 7 ? 7 : nextMilestone === 14 ? 7 : nextMilestone === 21 ? 7 : 9)) / (nextMilestone === 7 ? 7 : nextMilestone === 14 ? 7 : nextMilestone === 21 ? 7 : 9)) * 100;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(flameAnim, { toValue: 1, duration: 1500, useNativeDriver: true }),
        Animated.timing(flameAnim, { toValue: 0, duration: 1500, useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.1, duration: 800, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.timing(sparkleAnim, { toValue: 1, duration: 2000, useNativeDriver: true })
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.header}>
          <ImageBackground
            source={{ uri: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=400&fit=crop" }}
            style={styles.headerBackground}
            imageStyle={styles.headerBackgroundImage}
          >
            <LinearGradient
              colors={['rgba(250, 177, 47, 0.8)', 'rgba(255, 140, 0, 0.8)', 'rgba(250, 177, 47, 0.8)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.headerGradient}
            >
              <TouchableOpacity style={styles.editBackgroundButton}>
                <Ionicons name="image" size={16} color="#000" />
              </TouchableOpacity>
              <View style={styles.headerContent}>
                <View style={styles.avatarContainer}>
                  <Image source={{ uri: "https://i.pravatar.cc/150?img=12" }} style={styles.avatar} />
                  <TouchableOpacity style={styles.editAvatarButton}>
                    <Ionicons name="camera" size={18} color="#fab12f" />
                  </TouchableOpacity>
                </View>
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>João Silva</Text>
                  <View style={styles.levelContainer}>
                    <Ionicons name="star" size={14} color="#000" />
                    <Text style={styles.userLevel}>Atleta Intermediário</Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statsGrid}>
            <TouchableOpacity style={[styles.statCard, styles.streakCard]} activeOpacity={0.8}>
              <LinearGradient
                colors={['rgba(250, 177, 47, 0.8)', 'rgba(255, 140, 0, 0.8)', 'rgba(250, 177, 47, 0.8)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.streakGradient}
              >
                <View style={styles.streakHeader}>
                  <View style={styles.streakMainContent}>
                    <Animated.View style={[styles.flameContainer, { transform: [{ scale: pulseAnim }] }]}>
                      <View style={styles.flameBackground}>
                        <Animated.View style={[styles.flameIcon, {
                          opacity: flameAnim.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1] }),
                          transform: [{ translateY: flameAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -2] }) }]
                        }]}>
                          <Ionicons name="flame" size={32} color="#000" />
                        </Animated.View>
                        {flameLevel === 'legendary' && (
                          <Animated.View style={[styles.sparkles, { opacity: sparkleAnim }]}>
                            <Ionicons name="sparkles" size={18} color="#000" style={styles.sparkle1} />
                            <Ionicons name="sparkles" size={14} color="#000" style={styles.sparkle2} />
                            <Ionicons name="sparkles" size={12} color="#000" style={styles.sparkle3} />
                          </Animated.View>
                        )}
                      </View>
                    </Animated.View>
                    <View style={styles.streakInfo}>
                      <View style={styles.streakNumberContainer}>
                        <Text style={styles.streakNumber}>{stats.currentStreak}</Text>
                        <Text style={styles.streakDays}>DIAS</Text>
                      </View>
                      <Text style={styles.streakLabel}>Sequência em Chamas</Text>
                    </View>
                  </View>
                </View>
                
                <View style={styles.progressSection}>
                  <View style={styles.progressInfo}>
                    <Text style={styles.progressText}>Próxima meta: {nextMilestone} dias</Text>
                    <Text style={styles.progressPercent}>{Math.round(progressToNext)}%</Text>
                  </View>
                  <View style={styles.progressBar}>
                    <Animated.View style={[styles.progressFill, {
                      width: `${progressToNext}%`,
                      opacity: pulseAnim.interpolate({ inputRange: [1, 1.1], outputRange: [0.8, 1] })
                    }]} />
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.statCard}>
              <View style={styles.statContent}>
                <Ionicons name="fitness" size={20} color="#fab12f" />
                <View style={styles.statTextContainer}>
                  <Text style={styles.statNumber}>{stats.totalWorkouts}</Text>
                  <Text style={styles.statLabel}>Total de Treinos</Text>
                </View>
              </View>
            </View>

            <View style={styles.statCard}>
              <View style={styles.statContent}>
                <Ionicons name="trophy" size={20} color="#fab12f" />
                <View style={styles.statTextContainer}>
                  <Text style={styles.statNumber}>{stats.personalRecord}kg</Text>
                  <Text style={styles.statLabel}>Record Pessoal</Text>
                </View>
              </View>
            </View>

            <View style={styles.statCard}>
              <View style={styles.statContent}>
                <Ionicons name="time" size={20} color="#fab12f" />
                <View style={styles.statTextContainer}>
                  <Text style={styles.statNumber}>{stats.avgWorkoutTime}min</Text>
                  <Text style={styles.statLabel}>Tempo Médio</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/personal-data')}>
            <View style={styles.menuLeft}>
              <View style={styles.menuIconContainer}>
                <Ionicons name="person-outline" size={20} color="#fab12f" />
              </View>
              <Text style={styles.menuText}>Dados Pessoais</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <View style={styles.menuIconContainer}>
                <Ionicons name="diamond-outline" size={20} color="#fab12f" />
              </View>
              <Text style={styles.menuText}>Plano Premium</Text>
            </View>
            <View style={styles.premiumBadge}>
              <Text style={styles.premiumBadgeText}>PRO</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Configurações</Text>
          
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/notifications')}>
            <View style={styles.menuLeft}>
              <View style={styles.menuIconContainer}>
                <Ionicons name="notifications-outline" size={20} color="#fab12f" />
              </View>
              <Text style={styles.menuText}>Notificações</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <View style={styles.menuIconContainer}>
                <Ionicons name="shield-outline" size={20} color="#fab12f" />
              </View>
              <Text style={styles.menuText}>Privacidade</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/help-support')}>
            <View style={styles.menuLeft}>
              <View style={styles.menuIconContainer}>
                <Ionicons name="help-circle-outline" size={20} color="#fab12f" />
              </View>
              <Text style={styles.menuText}>Ajuda & Suporte</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#666" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={() => router.push('/login')}>
          <Ionicons name="log-out-outline" size={20} color="#ff4444" />
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </TouchableOpacity>

        <View style={styles.appInfo}>
          <Image source={require('@/assets/images/logo.png')} style={styles.appLogo} resizeMode="contain" />
          <Text style={styles.appVersion}>CrossPlan v1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#030303',
  },
  header: {
    marginTop: 50,
    marginHorizontal: 20,
    marginBottom: 15,
  },
  headerBackground: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  headerBackgroundImage: {
    borderRadius: 24,
  },
  headerGradient: {
    borderRadius: 24,
    padding: 32,
    position: 'relative',
  },
  editBackgroundButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  headerContent: {
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 4,
    borderColor: '#fff',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: '#fff',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 28,
    fontWeight: '900',
    color: '#000',
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  userLevel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  streakCard: {
    minWidth: '100%',
    padding: 0,
    backgroundColor: 'transparent',
    borderWidth: 0,
    marginBottom: 8,
  },
  streakGradient: {
    borderRadius: 16,
    padding: 20,
  },
  streakHeader: {
    marginBottom: 16,
  },
  streakMainContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  flameContainer: {
    position: 'relative',
    marginRight: 20,
  },
  flameBackground: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(0,0,0,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.2)',
  },
  flameIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sparkles: {
    position: 'absolute',
    top: -10,
    right: -10,
    width: 40,
    height: 40,
  },
  sparkle1: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  sparkle2: {
    position: 'absolute',
    top: 12,
    right: 16,
  },
  sparkle3: {
    position: 'absolute',
    top: 20,
    right: 4,
  },
  streakInfo: {
    flex: 1,
  },
  streakNumberContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  streakNumber: {
    fontSize: 40,
    fontWeight: '900',
    color: '#000',
    lineHeight: 44,
    marginRight: 8,
  },
  streakDays: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    opacity: 0.7,
  },
  streakLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    opacity: 0.8,
  },
  streakBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0,0,0,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
  },
  streakLevel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000',
    opacity: 0.9,
  },
  progressSection: {
    marginBottom: 16,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
    opacity: 0.8,
  },
  progressPercent: {
    fontSize: 13,
    fontWeight: '700',
    color: '#000',
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#000',
    borderRadius: 3,
  },
  statContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statTextContainer: {
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
    fontWeight: '500',
  },
  menuSection: {
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginHorizontal: 20,
    marginBottom: 12,
    marginTop: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(250, 177, 47, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  premiumBadge: {
    backgroundColor: '#fab12f',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  premiumBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#000',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'rgba(255, 68, 68, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 68, 68, 0.3)',
    marginBottom: 20,
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ff4444',
  },
  appInfo: {
    alignItems: 'center',
    paddingBottom: 20,
    gap: 8,
  },
  appLogo: {
    width: 60,
    height: 24,
    opacity: 0.6,
  },
  appVersion: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
});