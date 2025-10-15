import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header com Avatar */}
        <View style={styles.header}>
          <LinearGradient
            colors={['#fab12f', '#ff8c00', '#fab12f']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerGradient}
          >
            <View style={styles.headerContent}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatarGlow}>
                  <Image
                    source={{ uri: "https://i.pravatar.cc/150?img=12" }}
                    style={styles.avatar}
                  />
                </View>
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
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <Ionicons name="trophy" size={20} color="#fab12f" />
              </View>
              <Text style={styles.statNumber}>47</Text>
              <Text style={styles.statLabel}>Treinos</Text>
              <Text style={styles.statSubLabel}>Este mês</Text>
            </View>
            <View style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <Ionicons name="flame" size={20} color="#ff4444" />
              </View>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Sequência</Text>
              <Text style={styles.statSubLabel}>Dias seguidos</Text>
            </View>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <Ionicons name="barbell" size={20} color="#4CAF50" />
              </View>
              <Text style={styles.statNumber}>85kg</Text>
              <Text style={styles.statLabel}>Deadlift PR</Text>
              <Text style={styles.statSubLabel}>+5kg este mês</Text>
            </View>
            <View style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <Ionicons name="time" size={20} color="#2196F3" />
              </View>
              <Text style={styles.statNumber}>18:45</Text>
              <Text style={styles.statLabel}>Melhor Fran</Text>
              <Text style={styles.statSubLabel}>-2:15 PR</Text>
            </View>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <Ionicons name="fitness" size={20} color="#9C27B0" />
              </View>
              <Text style={styles.statNumber}>156</Text>
              <Text style={styles.statLabel}>Total WODs</Text>
              <Text style={styles.statSubLabel}>Desde o início</Text>
            </View>
            <View style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <Ionicons name="flash" size={20} color="#FF9800" />
              </View>
              <Text style={styles.statNumber}>2.847</Text>
              <Text style={styles.statLabel}>Calorias</Text>
              <Text style={styles.statSubLabel}>Média semanal</Text>
            </View>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <Ionicons name="medal" size={20} color="#FFD700" />
              </View>
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>Conquistas</Text>
              <Text style={styles.statSubLabel}>Desbloqueadas</Text>
            </View>
            <View style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <Ionicons name="trending-up" size={20} color="#00BCD4" />
              </View>
              <Text style={styles.statNumber}>92%</Text>
              <Text style={styles.statLabel}>Consistência</Text>
              <Text style={styles.statSubLabel}>Últimos 30 dias</Text>
            </View>
          </View>
        </View>

        {/* Menu Options */}
        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}>
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
                <Ionicons name="fitness-outline" size={20} color="#fab12f" />
              </View>
              <Text style={styles.menuText}>Histórico de Treinos</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <View style={styles.menuIconContainer}>
                <Ionicons name="analytics-outline" size={20} color="#fab12f" />
              </View>
              <Text style={styles.menuText}>Estatísticas</Text>
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

        {/* Configurações */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Configurações</Text>
          
          <TouchableOpacity style={styles.menuItem}>
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

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <View style={styles.menuIconContainer}>
                <Ionicons name="help-circle-outline" size={20} color="#fab12f" />
              </View>
              <Text style={styles.menuText}>Ajuda & Suporte</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={20} color="#ff4444" />
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </TouchableOpacity>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Image 
            source={require('@/assets/images/logo.png')} 
            style={styles.appLogo}
            resizeMode="contain"
          />
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
    marginBottom: 30,
  },
  headerGradient: {
    borderRadius: 24,
    padding: 32,
    shadowColor: '#fab12f',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 15,
  },
  headerContent: {
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  avatarGlow: {
    padding: 4,
    borderRadius: 50,
    backgroundColor: 'rgba(0,0,0,0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
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
    backgroundColor: 'rgba(0,0,0,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  userLevel: {
    fontSize: 14,
    color: '#000',
    fontWeight: '700',
    marginLeft: 6,
  },
  statsContainer: {
    marginHorizontal: 20,
    marginBottom: 30,
    gap: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(250, 177, 47, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fab12f',
    textAlign: 'center',
    marginBottom: 2,
  },
  statSubLabel: {
    fontSize: 10,
    color: '#888',
    textAlign: 'center',
    fontWeight: '500',
  },
  menuSection: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  menuItem: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#222',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIconContainer: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 10,
    marginRight: 16,
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  premiumBadge: {
    backgroundColor: '#fab12f',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  premiumBadgeText: {
    color: '#000',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#ff4444',
    gap: 12,
  },
  logoutText: {
    color: '#ff4444',
    fontSize: 16,
    fontWeight: '600',
  },
  appInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  appLogo: {
    width: 40,
    height: 18,
    marginBottom: 8,
  },
  appVersion: {
    color: '#666',
    fontSize: 12,
    fontWeight: '500',
  },
});