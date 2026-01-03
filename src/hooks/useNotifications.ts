import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// PERBAIKAN 1: Menambahkan properti wajib (Banner & List) agar TypeScript senang
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true, // Wajib di versi baru
    shouldShowList: true,   // Wajib di versi baru
  }),
});

export const useNotifications = () => {
  
  // 1. Fungsi meminta izin
  const requestPermissions = async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      alert('Izin notifikasi diperlukan agar pengingat berfungsi!');
      return false;
    }
    return true;
  };

  // 2. Fungsi menjadwalkan notifikasi
  const scheduleNotification = async (title: string, hour: number, minute: number) => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return null;

    const identifier = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Waktunya Habit!",
        body: `Jangan lupa: ${title}`,
      },
      trigger: {
        // PERBAIKAN: Tambahkan 'type' secara eksplisit
        type: Notifications.SchedulableTriggerInputTypes.DAILY, 
        hour,
        minute,
      },
    });
    
    return identifier;
  };

  // 3. Fungsi membatalkan notifikasi
  const cancelNotification = async (notificationId: string) => {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  };

  return { scheduleNotification, cancelNotification };
};