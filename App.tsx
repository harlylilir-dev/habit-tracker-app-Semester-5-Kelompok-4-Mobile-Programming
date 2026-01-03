import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { HabitProvider, useHabits } from './src/context/HabitContext';
import { HabitItem } from './src/components/HabitItem';
import { AddHabitModal } from './src/components/AddHabitModal';
import { Category } from './src/types';
import { ProgressHeader } from './src/components/ProgressHeader';

// Komponen Utama (Isi Aplikasi)
const HabitTrackerApp = () => {
  const { habits, addHabit, toggleHabitCompletion, deleteHabit, isLoading, resetData } = useHabits();
  const [isModalVisible, setModalVisible] = useState(false);

  // Fungsi saat tombol "Simpan" di Modal ditekan
  // Fungsi saat tombol "Simpan" di Modal ditekan
  // UPDATE: Tambahkan parameter reminderTime
  const handleAddHabit = async (title: string, category: Category, reminderTime?: Date) => {
    await addHabit(title, category, reminderTime);
  };

  // PERBAIKAN DI SINI:
  // Kita buat fungsi pembungkus untuk menyuntikkan tanggal hari ini
  const handleToggle = (id: string) => {
    const today = new Date().toISOString().split('T')[0]; // Ambil tanggal hari ini (YYYY-MM-DD)
    toggleHabitCompletion(id, today);
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4630EB" />
      </View>
    );
  }

  return (
    // ... kode sebelumnya ...
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
  <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
    <View>
      <Text style={styles.headerTitle}>Habit Tracker</Text>
      <Text style={styles.headerSubtitle}>Tetap konsisten setiap hari!</Text>
    </View>
    {/* Tombol Reset Kecil */}
    <TouchableOpacity onPress={resetData} style={{padding: 8}}>
       <Text style={{color: 'red', fontSize: 12}}>Reset</Text>
    </TouchableOpacity>
  </View>
</View>

      {/* --- TAMBAHKAN INI --- */}
      <ProgressHeader habits={habits} />
      {/* --------------------- */}

      <FlatList
// ... kode seterusnya ...
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HabitItem 
            habit={item} 
            onToggle={handleToggle} // Gunakan fungsi pembungkus tadi
            onDelete={deleteHabit} 
          />
        )}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Belum ada kebiasaan. Tambah sekarang!</Text>
        }
      />

      {/* Tombol Tambah (+) Melayang */}
      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      {/* Modal Form Input */}
      <AddHabitModal 
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleAddHabit}
      />
    </SafeAreaView>
  );
};

// App Wrapper (Pembungkus Provider)
export default function App() {
  return (
    <HabitProvider>
      <HabitTrackerApp />
    </HabitProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { padding: 20, paddingTop: 40, backgroundColor: 'white', marginBottom: 10 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  headerSubtitle: { fontSize: 14, color: '#666', marginTop: 5 },
  listContainer: { padding: 20, paddingBottom: 100 },
  emptyText: { textAlign: 'center', color: '#999', marginTop: 50, fontSize: 16 },
  
  // Gaya Tombol Melayang (FAB)
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4630EB',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  fabText: { color: 'white', fontSize: 30, fontWeight: 'bold', marginTop: -2 },
});