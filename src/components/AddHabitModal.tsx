import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Category } from '../types';

interface AddHabitModalProps {
  visible: boolean;
  onClose: () => void;
  // UPDATE: onAdd sekarang menerima parameter ke-3 (reminderTime)
  onAdd: (title: string, category: Category, reminderTime?: Date) => void;
}

export const AddHabitModal = ({ visible, onClose, onAdd }: AddHabitModalProps) => {
  const [title, setTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('General');
  
  // State untuk Waktu Pengingat
  const [reminderTime, setReminderTime] = useState<Date | undefined>(undefined);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const categories: Category[] = ['Health', 'Work', 'Learning', 'General'];

  const handleSubmit = () => {
    if (title.trim()) {
      onAdd(title, selectedCategory, reminderTime);
      // Reset Form
      setTitle('');
      setSelectedCategory('General');
      setReminderTime(undefined);
      onClose();
    }
  };

  const handleTimeChange = (event: any, selectedDate?: Date) => {
    setShowTimePicker(false);
    if (selectedDate) {
      setReminderTime(selectedDate);
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.centeredView}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Tambah Kebiasaan</Text>

          {/* Input Judul */}
          <TextInput
            style={styles.input}
            placeholder="Contoh: Jogging Sore..."
            value={title}
            onChangeText={setTitle}
            autoFocus
          />

          {/* Pilihan Kategori */}
          <Text style={styles.label}>Kategori:</Text>
          <View style={styles.categoryContainer}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[styles.categoryChip, selectedCategory === cat && styles.categoryActive]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text style={[styles.categoryText, selectedCategory === cat && styles.categoryTextActive]}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Pilihan Waktu (Notifikasi) */}
          <Text style={styles.label}>Pengingat Harian (Opsional):</Text>
          <TouchableOpacity 
            style={styles.timeButton} 
            onPress={() => setShowTimePicker(true)}
          >
            <Text style={styles.timeButtonText}>
              {reminderTime 
                ? `⏰ Jam: ${reminderTime.getHours().toString().padStart(2, '0')}:${reminderTime.getMinutes().toString().padStart(2, '0')}` 
                : "🔕 Atur Waktu Pengingat"
              }
            </Text>
          </TouchableOpacity>

          {/* DateTimePicker Logic */}
          {showTimePicker && (
            <DateTimePicker
              value={reminderTime || new Date()}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={handleTimeChange}
            />
          )}

          {/* Tombol Aksi */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Batal</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit} style={styles.saveButton}>
              <Text style={styles.saveText}>Simpan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 20 },
  modalView: { backgroundColor: 'white', borderRadius: 20, padding: 25, elevation: 5 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 10, marginBottom: 15, fontSize: 16 },
  label: { fontSize: 14, color: '#666', marginBottom: 8 },
  categoryContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 15 },
  categoryChip: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, backgroundColor: '#f0f0f0' },
  categoryActive: { backgroundColor: '#4630EB' },
  categoryText: { color: '#666', fontSize: 12 },
  categoryTextActive: { color: 'white', fontWeight: 'bold' },
  
  // Style Baru untuk Tombol Waktu
  timeButton: { 
    backgroundColor: '#E8EAF6', 
    padding: 12, 
    borderRadius: 10, 
    alignItems: 'center', 
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#C5CAE9',
    borderStyle: 'dashed'
  },
  timeButtonText: { color: '#3F51B5', fontWeight: 'bold' },

  buttonContainer: { flexDirection: 'row', gap: 10 },
  cancelButton: { flex: 1, padding: 12, borderRadius: 10, backgroundColor: '#f5f5f5', alignItems: 'center' },
  saveButton: { flex: 1, padding: 12, borderRadius: 10, backgroundColor: '#4630EB', alignItems: 'center' },
  cancelText: { color: '#333', fontWeight: 'bold' },
  saveText: { color: 'white', fontWeight: 'bold' },
});