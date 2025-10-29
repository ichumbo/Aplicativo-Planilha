import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";
import CustomTabBar from "../components/CustomTabBar";

export default function AdminScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [selectedDate, setSelectedDate] = useState("2024-09-26");
  const [showCalendar, setShowCalendar] = useState(false);
  const [trainingNote, setTrainingNote] = useState("");
  const [trainingTip, setTrainingTip] = useState("");
  
  // Estados para o formulário de exercício
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseCategory, setExerciseCategory] = useState("");
  const [exerciseTime, setExerciseTime] = useState(0);
  const [timeInput, setTimeInput] = useState("00:00");
  const [exerciseLevel, setExerciseLevel] = useState("iniciante");
  const [exerciseVideo, setExerciseVideo] = useState("");
  const [exerciseAbout, setExerciseAbout] = useState("");
  const [muscle1, setMuscle1] = useState("");
  const [muscle2, setMuscle2] = useState("");
  const [muscle3, setMuscle3] = useState("");
  const [muscle4, setMuscle4] = useState("");
  const [exerciseBenefits, setExerciseBenefits] = useState("");
  const [exerciseErrors, setExerciseErrors] = useState("");
  const [exerciseTechnique, setExerciseTechnique] = useState("");
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);
  const [showLevelModal, setShowLevelModal] = useState(false);

  useEffect(() => {
    if (params.addExercises) {
      const exercises = JSON.parse(params.addExercises as string);
      const program = params.program as string;
      const date = (params.selectedDate as string) || selectedDate;
      
      setTrainingData(prev => ({
        ...prev,
        [date]: {
          ...prev[date],
          [program]: [
            ...(prev[date]?.[program] || []),
            ...exercises
          ]
        }
      }));
    }
    
    if (params.addExercise) {
      const exercise = JSON.parse(params.addExercise as string);
      
      setTrainingData(prev => ({
        ...prev,
        [selectedDate]: {
          ...prev[selectedDate],
          elite: [
            ...(prev[selectedDate]?.elite || []),
            exercise
          ]
        }
      }));
    }
    
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [params.addExercises, params.addExercise, params.program, params.selectedDate, selectedDate, timerInterval]);

  const [trainingData, setTrainingData] = useState({
    "2024-09-26": {
      elite: [
        { name: "Deadlift", sets: "3", reps: "5", notes: "Foque na técnica" },
        { name: "Back Squat", sets: "4", reps: "6", notes: "Profundidade completa" },
      ],
    },
  });

  const getCurrentDayData = () => {
    return trainingData[selectedDate] || { elite: [] };
  };

  const removeExercise = (program: string, index: number) => {
    Alert.alert(
      "Remover Exercício",
      "Tem certeza que deseja remover este exercício?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          style: "destructive",
          onPress: () => {
            setTrainingData(prev => ({
              ...prev,
              [selectedDate]: {
                ...prev[selectedDate],
                [program]: prev[selectedDate]?.[program]?.filter((_, i) => i !== index) || []
              }
            }));
          }
        }
      ]
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const months = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
    return `${months[date.getMonth()]}' ${date.getFullYear().toString().slice(-2)}`;
  };

  const startTimer = () => {
    if (!timerRunning) {
      setTimerRunning(true);
      const interval = setInterval(() => {
        setExerciseTime(prev => prev + 1);
      }, 1000);
      setTimerInterval(interval);
    }
  };

  const stopTimer = () => {
    if (timerRunning && timerInterval) {
      setTimerRunning(false);
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  };

  const resetTimer = () => {
    stopTimer();
    setExerciseTime(0);
    setTimeInput("00:00");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const parseTimeInput = (timeStr: string) => {
    const parts = timeStr.split(':');
    if (parts.length === 2) {
      const mins = parseInt(parts[0]) || 0;
      const secs = parseInt(parts[1]) || 0;
      return mins * 60 + secs;
    }
    return 0;
  };

  const handleTimeInputChange = (text: string) => {
    // Remove caracteres não numéricos exceto :
    const cleaned = text.replace(/[^0-9:]/g, '');
    
    // Limita o formato MM:SS
    if (cleaned.length <= 5) {
      let formatted = cleaned;
      
      // Auto-adiciona : após 2 dígitos
      if (cleaned.length === 2 && !cleaned.includes(':')) {
        formatted = cleaned + ':';
      }
      
      setTimeInput(formatted);
      
      // Atualiza o tempo em segundos se o formato estiver correto
      if (formatted.match(/^\d{1,2}:\d{1,2}$/)) {
        const totalSeconds = parseTimeInput(formatted);
        setExerciseTime(totalSeconds);
      }
    }
  };

  const clearForm = () => {
    setExerciseName("");
    setExerciseCategory("");
    setExerciseTime(0);
    setTimeInput("00:00");
    setExerciseLevel("iniciante");
    setExerciseVideo("");
    setExerciseAbout("");
    setMuscle1("");
    setMuscle2("");
    setMuscle3("");
    setMuscle4("");
    setExerciseBenefits("");
    setExerciseErrors("");
    setExerciseTechnique("");
    stopTimer();
  };

  const saveExercise = () => {
    if (!exerciseName.trim()) {
      Alert.alert("Erro", "Nome do exercício é obrigatório");
      return;
    }
    
    Alert.alert(
      "Salvar Exercício",
      "Exercício salvo com sucesso!",
      [{ text: "OK", onPress: clearForm }]
    );
  };

  const currentData = getCurrentDayData();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color="#fab12f" />
            </TouchableOpacity>
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
        </View>

        {/* HEADER CALENDÁRIO */}
        <View style={styles.calendarHeader}>
          <Text style={styles.monthText}>{formatDate(selectedDate)}</Text>
          <TouchableOpacity onPress={() => setShowCalendar(!showCalendar)}>
            <Ionicons
              name={showCalendar ? "calendar" : "calendar-outline"}
              size={20}
              color="#fab12f"
            />
          </TouchableOpacity>
        </View>

        {/* FORMULÁRIO DE EXERCÍCIO */}
        <View style={styles.exerciseFormSection}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconContainer}>
              <Ionicons name="fitness" size={20} color="#fab12f" />
            </View>
            <Text style={styles.sectionTitle}>Adicionar Curso</Text>
          </View>

          {/* Nome do Exercício */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Nome do Exercício</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o nome do exercício"
              placeholderTextColor="#666"
              value={exerciseName}
              onChangeText={setExerciseName}
            />
          </View>

          {/* Categoria */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Categoria</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Cardio, Força, Flexibilidade"
              placeholderTextColor="#666"
              value={exerciseCategory}
              onChangeText={setExerciseCategory}
            />
          </View>

          {/* Timer */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Tempo de Exercício</Text>
            <View style={styles.timerContainer}>
              <TextInput
                style={styles.timerInput}
                value={timerRunning ? formatTime(exerciseTime) : timeInput}
                onChangeText={handleTimeInputChange}
                placeholder="00:00"
                placeholderTextColor="#666"
                keyboardType="numeric"
                maxLength={5}
                editable={!timerRunning}
              />
              <View style={styles.timerButtons}>
                <TouchableOpacity 
                  style={[styles.timerButton, timerRunning && styles.timerButtonActive]} 
                  onPress={timerRunning ? stopTimer : startTimer}
                >
                  <Ionicons name={timerRunning ? "pause" : "play"} size={16} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.timerButton} onPress={resetTimer}>
                  <Ionicons name="refresh" size={16} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Nível */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Nível</Text>
            <TouchableOpacity 
              style={styles.levelSelector} 
              onPress={() => setShowLevelModal(true)}
            >
              <Text style={styles.levelText}>
                {exerciseLevel === 'iniciante' ? 'Iniciante' : 
                 exerciseLevel === 'intermediario' ? 'Intermediário' : 'Avançado'}
              </Text>
              <Ionicons name="chevron-down" size={16} color="#fab12f" />
            </TouchableOpacity>
          </View>

          {/* Vídeo */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Vídeo (URL)</Text>
            <TextInput
              style={styles.input}
              placeholder="Cole o link do vídeo"
              placeholderTextColor="#666"
              value={exerciseVideo}
              onChangeText={setExerciseVideo}
            />
          </View>

          {/* Sobre o movimento */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Sobre o Movimento</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Descreva o movimento"
              placeholderTextColor="#666"
              value={exerciseAbout}
              onChangeText={setExerciseAbout}
              multiline
              numberOfLines={3}
            />
          </View>

          {/* Músculos trabalhados */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Músculos Trabalhados</Text>
            <View style={styles.muscleInputs}>
              <TextInput
                style={[styles.input, styles.muscleInput]}
                placeholder="Músculo 1"
                placeholderTextColor="#666"
                value={muscle1}
                onChangeText={setMuscle1}
              />
              <TextInput
                style={[styles.input, styles.muscleInput]}
                placeholder="Músculo 2"
                placeholderTextColor="#666"
                value={muscle2}
                onChangeText={setMuscle2}
              />
              <TextInput
                style={[styles.input, styles.muscleInput]}
                placeholder="Músculo 3"
                placeholderTextColor="#666"
                value={muscle3}
                onChangeText={setMuscle3}
              />
              <TextInput
                style={[styles.input, styles.muscleInput]}
                placeholder="Músculo 4"
                placeholderTextColor="#666"
                value={muscle4}
                onChangeText={setMuscle4}
              />
            </View>
          </View>

          {/* Benefícios */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Benefícios</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Liste os benefícios do exercício"
              placeholderTextColor="#666"
              value={exerciseBenefits}
              onChangeText={setExerciseBenefits}
              multiline
              numberOfLines={3}
            />
          </View>

          {/* Erros */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Erros Comuns</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Descreva os erros mais comuns"
              placeholderTextColor="#666"
              value={exerciseErrors}
              onChangeText={setExerciseErrors}
              multiline
              numberOfLines={3}
            />
          </View>

          {/* Técnica */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Técnica</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Explique a técnica correta"
              placeholderTextColor="#666"
              value={exerciseTechnique}
              onChangeText={setExerciseTechnique}
              multiline
              numberOfLines={3}
            />
          </View>

          {/* Botões de ação */}
          <View style={styles.formButtons}>
            <TouchableOpacity style={styles.clearButton} onPress={clearForm}>
              <Ionicons name="refresh" size={16} color="#fff" />
              <Text style={styles.clearButtonText}>Limpar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveExerciseButton} onPress={saveExercise}>
              <Ionicons name="checkmark" size={16} color="#fff" />
              <Text style={styles.saveExerciseButtonText}>Salvar Exercício</Text>
            </TouchableOpacity>
          </View>
        </View>

       

        {showCalendar && (
          <View style={styles.calendarContainer}>
            <View style={styles.calendarHeader2}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowCalendar(false)}
              >
                <Ionicons name="close" size={18} color="#fff" />
              </TouchableOpacity>
            </View>

            <Calendar
              current={selectedDate}
              onDayPress={(day) => {
                setSelectedDate(day.dateString);
                setShowCalendar(false);
              }}
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  selectedColor: "#fab12f",
                  selectedTextColor: "#000",
                },
              }}
              theme={{
                backgroundColor: "#161616ff",
                calendarBackground: "#161616ff",
                textSectionTitleColor: "#fab12f",
                selectedDayBackgroundColor: "#fab12f",
                selectedDayTextColor: "#000",
                todayTextColor: "#fab12f",
                dayTextColor: "#fff",
                textDisabledColor: "#666",
                dotColor: "#fab12f",
                selectedDotColor: "#000",
                arrowColor: "#fab12f",
                monthTextColor: "#fff",
                indicatorColor: "#fab12f",
                textDayFontWeight: "600",
                textMonthFontWeight: "700",
                textDayHeaderFontWeight: "700",
                textDayFontSize: 16,
                textMonthFontSize: 18,
                textDayHeaderFontSize: 13,
              }}
              style={{
                borderRadius: 16,
                paddingBottom: 10,
              }}
            />
          </View>
        )}

        {/* MODAL DE NÍVEL */}
        <Modal
          visible={showLevelModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowLevelModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Selecionar Nível</Text>
              
              <TouchableOpacity 
                style={styles.levelOption}
                onPress={() => {
                  setExerciseLevel('iniciante');
                  setShowLevelModal(false);
                }}
              >
                <Text style={styles.levelOptionText}>Iniciante</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.levelOption}
                onPress={() => {
                  setExerciseLevel('intermediario');
                  setShowLevelModal(false);
                }}
              >
                <Text style={styles.levelOptionText}>Intermediário</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.levelOption}
                onPress={() => {
                  setExerciseLevel('avancado');
                  setShowLevelModal(false);
                }}
              >
                <Text style={styles.levelOptionText}>Avançado</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.modalCloseButton}
                onPress={() => setShowLevelModal(false)}
              >
                <Text style={styles.modalCloseText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        
      </ScrollView>
      <CustomTabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0fff",
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 50,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    paddingVertical: 20,
    minHeight: 80,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 0,
    padding: 8,
  },
  logo: {
    width: 35,
    height: 35,
  },
  headerRight: {
    position: "absolute",
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  adminBadge: {
    flexDirection: "row",
    alignItems: "center",
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
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  monthText: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
  },
  calendarContainer: {
    marginBottom: 20,
    backgroundColor: "#161616ff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
    borderWidth: 1,
    borderColor: "#333",
  },
  calendarHeader2: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 16,
  },
  closeButton: {
    backgroundColor: "#333",
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  programSection: {
    marginBottom: 15,
  },
  programHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  programTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  programTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fab12f",
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#faaf2f5b",
    borderWidth: 2,
    borderColor: "#fab12f",
    justifyContent: "center",
    alignItems: "center",
  },
  exercisesList: {
    gap: 10,
  },
  exerciseCard: {
    backgroundColor: "#161616ff",
    borderRadius: 16,
    padding: 16,
    position: "relative",
  },
  exerciseHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  exerciseName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  exerciseDetails: {
    color: "#fab12f",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },
  exerciseNotes: {
    color: "#888",
    fontSize: 13,
    lineHeight: 18,
  },
  removeButton: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(231, 76, 60, 0.1)",
    borderWidth: 1,
    borderColor: "#e74c3c",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#666",
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "center",
    paddingVertical: 20,
  },
  notesSection: {
    marginBottom: 20,
    gap: 16,
  },
  noteHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  noteTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  noteIconContainer: {
    backgroundColor: "#fab12f20",
    padding: 10,
    borderRadius: 12,
    marginRight: 4,
  },
  noteInput: {
    backgroundColor: "#161616ff",
    borderRadius: 16,
    padding: 16,
    color: "#fff",
    fontSize: 15,
    borderWidth: 2,
    borderColor: "#fab12f",
    textAlignVertical: "top",
    minHeight: 90,
    lineHeight: 22,
    fontWeight: "500",
  },
  noteInputFocused: {
    borderColor: "#fab12f",
    backgroundColor: "#1a1a1a",
  },
  saveTrainingButton: {
    backgroundColor: "#fab12f",
    borderRadius: 10,
    padding: 16,
    marginBottom: 25,
  },
  saveButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  exerciseFormSection: {
    marginBottom: 20,
    borderRadius: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  sectionIconContainer: {
    backgroundColor: "#fab12f20",
    padding: 8,
    borderRadius: 10,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    color: "#fab12f",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#0f0f0fff",
    borderRadius: 12,
    padding: 12,
    color: "#fff",
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#333",
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#0f0f0fff",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#333",
  },
  timerInput: {
    color: "#fab12f",
    fontSize: 18,
    fontWeight: "700",
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
    minWidth: 60,
  },
  timerButtons: {
    flexDirection: "row",
    gap: 8,
  },
  timerButton: {
    backgroundColor: "#333",
    borderRadius: 8,
    padding: 8,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  timerButtonActive: {
    backgroundColor: "#fab12f",
  },
  levelSelector: {
    backgroundColor: "#0f0f0fff",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#333",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  levelText: {
    color: "#fff",
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#161616ff",
    borderRadius: 16,
    padding: 20,
    width: "80%",
    maxWidth: 300,
  },
  modalTitle: {
    color: "#fab12f",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },
  levelOption: {
    backgroundColor: "#0f0f0fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#333",
  },
  levelOptionText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  modalCloseButton: {
    backgroundColor: "#333",
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  modalCloseText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },
  muscleInputs: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  muscleInput: {
    flex: 1,
    minWidth: "45%",
  },
  formButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  clearButton: {
    flex: 1,
    backgroundColor: "#333",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  clearButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  saveExerciseButton: {
    flex: 2,
    backgroundColor: "#fab12f",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  saveExerciseButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  adminButtonsSection: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 25,
  },
  adminButton: {
    flex: 1,
    backgroundColor: "#fab12f",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    gap: 8,
  },
  adminButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});