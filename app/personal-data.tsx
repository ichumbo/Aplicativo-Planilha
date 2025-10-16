import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Animated, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function PersonalDataScreen() {
  const router = useRouter();
  
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(30);
  const circleAnim = new Animated.Value(0);
  
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.timing(circleAnim, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      })
    ).start();
  }, []);
  
  const [formData, setFormData] = useState({
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '(11) 99999-9999',
    birthDate: '15/03/1990',
    height: '175',
    weight: '78',
    goal: 'Ganho de massa muscular',
    experience: 'Intermediário'
  });

  const handleSave = () => {
    // Lógica para salvar os dados
    router.back();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f0f0f" />
      
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
        <Text style={styles.headerTitle}>Dados Pessoais</Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.ScrollView 
        contentContainerStyle={styles.scrollContent}
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }}
      >
        {/* Informações Básicas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações Básicas</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Nome Completo</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="person-outline" size={20} color="#fab12f" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(text) => setFormData({...formData, name: text})}
                placeholderTextColor="#888"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>E-mail</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={20} color="#fab12f" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(text) => setFormData({...formData, email: text})}
                keyboardType="email-address"
                placeholderTextColor="#888"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Telefone</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="call-outline" size={20} color="#fab12f" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={formData.phone}
                onChangeText={(text) => setFormData({...formData, phone: text})}
                keyboardType="phone-pad"
                placeholderTextColor="#888"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Data de Nascimento</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="calendar-outline" size={20} color="#fab12f" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={formData.birthDate}
                onChangeText={(text) => setFormData({...formData, birthDate: text})}
                placeholder="DD/MM/AAAA"
                placeholderTextColor="#888"
              />
            </View>
          </View>
        </View>

        {/* Dados Físicos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dados Físicos</Text>
          
          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.inputLabel}>Altura (cm)</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="resize-outline" size={20} color="#fab12f" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={formData.height}
                  onChangeText={(text) => setFormData({...formData, height: text})}
                  keyboardType="numeric"
                  placeholderTextColor="#888"
                />
              </View>
            </View>

            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.inputLabel}>Peso (kg)</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="barbell-outline" size={20} color="#fab12f" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={formData.weight}
                  onChangeText={(text) => setFormData({...formData, weight: text})}
                  keyboardType="numeric"
                  placeholderTextColor="#888"
                />
              </View>
            </View>
          </View>
        </View>

        {/* Objetivos e Experiência */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Treino</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Objetivo Principal</Text>
            <TouchableOpacity style={styles.selectInput}>
              <Ionicons name="target-outline" size={20} color="#fab12f" style={styles.inputIcon} />
              <Text style={styles.selectText}>{formData.goal}</Text>
              <Ionicons name="chevron-down" size={20} color="#888" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Nível de Experiência</Text>
            <TouchableOpacity style={styles.selectInput}>
              <Ionicons name="trophy-outline" size={20} color="#fab12f" style={styles.inputIcon} />
              <Text style={styles.selectText}>{formData.experience}</Text>
              <Ionicons name="chevron-down" size={20} color="#888" />
            </TouchableOpacity>
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
  saveButton: {
    backgroundColor: '#fab12f',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '700',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 0,
    marginTop: 20,
  },
  sectionTitle: {
    color: '#ECEDEE',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    color: '#fab12f',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 4,
  },
  inputWrapper: {
    backgroundColor: '#1c1c1c',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    minHeight: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: '#ECEDEE',
    fontSize: 16,
    paddingVertical: 16,
  },
  selectInput: {
    backgroundColor: '#1c1c1c',
    borderRadius: 16,
    paddingHorizontal: 16,
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectText: {
    color: '#ECEDEE',
    fontSize: 16,
    flex: 1,
    marginLeft: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
});