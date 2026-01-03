import React from 'react';
// PERBAIKAN: Hapus SafeAreaView dari sini
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
// PERBAIKAN: Import SafeAreaView dari library yang benar
import { SafeAreaView } from 'react-native-safe-area-context'; 

import { useHabits } from '../context/HabitContext';
import { HabitItem } from '../components/HabitItem';

export const HomeScreen = () => {
  const { habits, toggleHabitCompletion, deleteHabit, addHabit } = useHabits();
  
  const today = new Date().toISOString().split('T')[0];

  // Fungsi Sementara untuk Menambah Data Dummy
  const handleAddDummy = () => {
    addHabit("Minum Air 2L", "Health");
    addHabit("Coding 1 Jam", "Learning");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Habits</Text>
        <Text style={styles.date}>{today}</Text>
      </View>

      {/* Daftar Kebiasaan */}
      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HabitItem 
            habit={item} 
            onToggle={(id) => toggleHabitCompletion(id, today)} 
            onDelete={deleteHabit}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Belum ada kebiasaan.</Text>
            <TouchableOpacity onPress={handleAddDummy} style={styles.addButton}>
              <Text style={styles.addButtonText}>+ Tambah Contoh</Text>
            </TouchableOpacity>
          </View>
        }
        contentContainerStyle={{ padding: 20 }}
      />
      
      {/* Nanti di sini kita akan tambahkan Tombol Floating (+) 
         untuk membuka Form Input yang sebenarnya 
      */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { padding: 20, backgroundColor: 'white', paddingBottom: 10 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#333' },
  date: { fontSize: 14, color: '#666', marginTop: 5 },
  emptyContainer: { alignItems: 'center', marginTop: 50 },
  emptyText: { color: '#888', marginBottom: 20 },
  addButton: { backgroundColor: '#4630EB', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  addButtonText: { color: 'white', fontWeight: 'bold' }
});