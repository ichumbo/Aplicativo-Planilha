import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function AdminScreen() {
  const router = useRouter();

  const adminActions = [
    {
      id: 1,
      title: "Adicionar Curso",
      subtitle: "Criar novos cursos",
      icon: "school",
      route: "/add-course",
      color: "#fab12f"
    },
    {
      id: 2,
      title: "Adicionar Treino",
      subtitle: "Configurar exercícios",
      icon: "fitness",
      route: "/add-training",
      color: "#fab12f"
    },
  ];

  const stats = [
    { label: "Cursos Ativos", value: "12", icon: "book" },
    { label: "Usuários", value: "248", icon: "people" },
    { label: "Treinos", value: "36", icon: "barbell" }
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      {/* HEADER */}
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.headerRight}>
          <View style={styles.adminBadge}>
            <Ionicons name="shield-checkmark" size={16} color="#fab12f" />
            <Text style={styles.adminText}>ADMIN</Text>
          </View>
          <TouchableOpacity>
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=12" }}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* WELCOME */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Painel Administrativo</Text>
          <Text style={styles.welcomeSubtitle}>Gerencie a plataforma</Text>
        </View>
        
        {/* STATS */}
        <View style={styles.statsSection}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <Ionicons name={stat.icon as any} size={24} color="#fab12f" />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
        
        {/* ACTIONS GRID */}
        <View style={styles.actionsGrid}>
          {adminActions.map((action) => {
            const isAddAction = action.id === 1 || action.id === 2;
            return (
              <TouchableOpacity 
                key={action.id}
                style={[
                  styles.actionCard, 
                  { 
                    borderColor: action.color,
                    backgroundColor: isAddAction ? action.color : "#111"
                  }
                ]}
                onPress={() => router.push(action.route as any)}
              >
                <View style={[
                  styles.iconContainer, 
                  { backgroundColor: isAddAction ? "#000" : action.color }
                ]}>
                  <Ionicons 
                    name={action.icon as any} 
                    size={24} 
                    color={isAddAction ? "#fab12f" : "#fff"} 
                  />
                </View>
                <Text style={[
                  styles.actionTitle,
                  { color: isAddAction ? "#000" : "#fff" }
                ]}>{action.title}</Text>
                <Text style={[
                  styles.actionSubtitle,
                  { color: isAddAction ? "#333" : "#ccc" }
                ]}>{action.subtitle}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  logo: {
    width: 35,
    height: 35,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  adminBadge: {
    flexDirection: "row",
    gap: 4,
    backgroundColor: "#faaf2f5b",
    borderWidth: 1,
    borderColor: "#fab12f",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  adminText: {
    color: "#fab12f",
    fontSize: 12,
    fontWeight: "600",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#fab12f",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  welcomeSection: {
    marginBottom: 24,
  },
  welcomeTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 4,
  },
  welcomeSubtitle: {
    color: "#ccc",
    fontSize: 16,
  },
  statsSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#111",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#222",
  },
  statValue: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    marginTop: 8,
  },
  statLabel: {
    color: "#ccc",
    fontSize: 12,
    marginTop: 4,
    textAlign: "center",
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    paddingBottom: 20,
  },
  actionCard: {
    width: "47%",
    backgroundColor: "#111",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    borderWidth: 1,
    minHeight: 120,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  actionTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 4,
  },
  actionSubtitle: {
    color: "#ccc",
    fontSize: 12,
    textAlign: "center",
  },
});