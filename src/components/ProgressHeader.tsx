import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Habit } from '../types';

export const ProgressHeader = ({ habits }: { habits: Habit[] }) => {
  const today = new Date().toISOString().split('T')[0];
  
  // Hitung statistik
  const total = habits.length;
  const completed = habits.filter(h => h.completedDates.includes(today)).length;
  const progress = total > 0 ? completed / total : 0;
  const percentage = Math.round(progress * 100);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Statistik Hari Ini</Text>
      <Text style={styles.subtitle}>
        Kamu telah menyelesaikan <Text style={styles.bold}>{completed}</Text> dari <Text style={styles.bold}>{total}</Text> kebiasaan.
      </Text>

      {/* Batang Progres */}
      <View style={styles.progressBarBg}>
        <View style={[styles.progressBarFill, { width: `${percentage}%` }]} />
      </View>
      
      <Text style={styles.percentage}>{percentage}% Selesai</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4630EB',
    padding: 20,
    borderRadius: 16,
    margin: 20,
    marginBottom: 10,
    shadowColor: "#4630EB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  title: { color: 'rgba(255,255,255,0.8)', fontSize: 14, fontWeight: '600' },
  subtitle: { color: 'white', fontSize: 18, marginTop: 5, marginBottom: 15 },
  bold: { fontWeight: 'bold' },
  progressBarBg: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 4,
  },
  percentage: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 8,
  }
});