import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Animated, Linking, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HelpSupportScreen() {
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

  const handleContact = (type: string) => {
    switch (type) {
      case 'email':
        Linking.openURL('mailto:suporte@crossplan.com');
        break;
      case 'whatsapp':
        Linking.openURL('https://wa.me/5511999999999');
        break;
      case 'phone':
        Linking.openURL('tel:+5511999999999');
        break;
    }
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
        <Text style={styles.headerTitle}>Ajuda & Suporte</Text>
        <View style={styles.placeholder} />
      </Animated.View>

      <Animated.ScrollView 
        contentContainerStyle={styles.scrollContent}
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }}
      >
        {/* FAQ Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Perguntas Frequentes</Text>
          
          <TouchableOpacity style={styles.faqItem}>
            <View style={styles.faqLeft}>
              <Ionicons name="help-circle-outline" size={20} color="#fab12f" style={styles.faqIcon} />
              <Text style={styles.faqText}>Como criar um treino personalizado?</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#888" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.faqItem}>
            <View style={styles.faqLeft}>
              <Ionicons name="help-circle-outline" size={20} color="#fab12f" style={styles.faqIcon} />
              <Text style={styles.faqText}>Como sincronizar dados entre dispositivos?</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#888" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.faqItem}>
            <View style={styles.faqLeft}>
              <Ionicons name="help-circle-outline" size={20} color="#fab12f" style={styles.faqIcon} />
              <Text style={styles.faqText}>Como cancelar minha assinatura?</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#888" />
          </TouchableOpacity>
        </View>

        {/* Contact Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Entre em Contato</Text>
          
          <TouchableOpacity style={styles.contactItem} onPress={() => handleContact('email')}>
            <View style={styles.contactLeft}>
              <View style={styles.contactIconContainer}>
                <Ionicons name="mail-outline" size={20} color="#fab12f" />
              </View>
              <View>
                <Text style={styles.contactTitle}>E-mail</Text>
                <Text style={styles.contactSubtitle}>suporte@crossplan.com</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#888" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactItem} onPress={() => handleContact('whatsapp')}>
            <View style={styles.contactLeft}>
              <View style={styles.contactIconContainer}>
                <Ionicons name="logo-whatsapp" size={20} color="#fab12f" />
              </View>
              <View>
                <Text style={styles.contactTitle}>WhatsApp</Text>
                <Text style={styles.contactSubtitle}>(11) 99999-9999</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#888" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactItem} onPress={() => handleContact('phone')}>
            <View style={styles.contactLeft}>
              <View style={styles.contactIconContainer}>
                <Ionicons name="call-outline" size={20} color="#fab12f" />
              </View>
              <View>
                <Text style={styles.contactTitle}>Telefone</Text>
                <Text style={styles.contactSubtitle}>(11) 99999-9999</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#888" />
          </TouchableOpacity>
        </View>

        {/* Resources Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recursos</Text>
          
          <TouchableOpacity style={styles.resourceItem}>
            <View style={styles.resourceLeft}>
              <Ionicons name="document-text-outline" size={20} color="#fab12f" style={styles.resourceIcon} />
              <Text style={styles.resourceText}>Guia do Usuário</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#888" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.resourceItem}>
            <View style={styles.resourceLeft}>
              <Ionicons name="play-circle-outline" size={20} color="#fab12f" style={styles.resourceIcon} />
              <Text style={styles.resourceText}>Tutoriais em Vídeo</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#888" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.resourceItem}>
            <View style={styles.resourceLeft}>
              <Ionicons name="shield-checkmark-outline" size={20} color="#fab12f" style={styles.resourceIcon} />
              <Text style={styles.resourceText}>Política de Privacidade</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#888" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.resourceItem}>
            <View style={styles.resourceLeft}>
              <Ionicons name="document-outline" size={20} color="#fab12f" style={styles.resourceIcon} />
              <Text style={styles.resourceText}>Termos de Uso</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#888" />
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoTitle}>CrossPlan</Text>
          <Text style={styles.appInfoVersion}>Versão 1.0.0</Text>
          <Text style={styles.appInfoCopyright}>© 2024 CrossPlan. Todos os direitos reservados.</Text>
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
  faqItem: {
    backgroundColor: '#1c1c1c',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  faqLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  faqIcon: {
    marginRight: 12,
  },
  faqText: {
    color: '#ECEDEE',
    fontSize: 16,
    flex: 1,
  },
  contactItem: {
    backgroundColor: '#1c1c1c',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  contactLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  contactIconContainer: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 10,
    marginRight: 16,
  },
  contactTitle: {
    color: '#ECEDEE',
    fontSize: 16,
    fontWeight: '600',
  },
  contactSubtitle: {
    color: '#fab12f',
    fontSize: 14,
    marginTop: 2,
  },
  resourceItem: {
    backgroundColor: '#1c1c1c',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  resourceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  resourceIcon: {
    marginRight: 12,
  },
  resourceText: {
    color: '#ECEDEE',
    fontSize: 16,
    flex: 1,
  },
  appInfo: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  appInfoTitle: {
    color: '#fab12f',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  appInfoVersion: {
    color: '#ECEDEE',
    fontSize: 16,
    marginBottom: 8,
  },
  appInfoCopyright: {
    color: '#888',
    fontSize: 12,
    textAlign: 'center',
  },
});