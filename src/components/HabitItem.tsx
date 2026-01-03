import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Habit } from '../types';
import Checkbox from 'expo-checkbox'; // Kita install ini di awal

interface HabitItemProps {
  habit: Habit;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void; // Kita siapkan tombol hapus sekalian
}

export const HabitItem = ({ habit, onToggle, onDelete }: HabitItemProps) => {
  // Cek apakah hari ini sudah dicentang?
  const today = new Date().toISOString().split('T')[0];
  const isCompleted = habit.completedDates.includes(today);

  return (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        <Text style={[styles.title, isCompleted && styles.completedText]}>
          {habit.title}
        </Text>
        <Text style={styles.category}>{habit.category}</Text>
      </View>

      <View style={styles.actionContainer}>
        {/* Checkbox */}
        <Checkbox
          value={isCompleted}
          onValueChange={() => onToggle(habit.id)}
          color={isCompleted ? '#4630EB' : undefined}
          style={styles.checkbox}
        />
        
        {/* Tombol Hapus Kecil (X) */}
        <TouchableOpacity onPress={() => onDelete(habit.id)} style={styles.deleteBtn}>
           <Text style={styles.deleteText}>✕</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 8,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    // Shadow untuk efek kartu timbul
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoContainer: { flex: 1 },
  title: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  category: { fontSize: 12, color: '#666', marginTop: 4 },
  completedText: { textDecorationLine: 'line-through', color: '#aaa' },
  actionContainer: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  checkbox: { borderRadius: 6 },
  deleteBtn: { padding: 5 },
  deleteText: { color: '#FF4444', fontSize: 16, fontWeight: 'bold' }
});