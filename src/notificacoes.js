import React, { createContext, useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

// No Expo Go o expo-notifications quebra ao ser carregado e não funciona,
// É só pegar o módulo fora do Expo Go.
const emExpoGo = Constants.executionEnvironment === 'storeClient';
const Notifications = emExpoGo ? null : require('expo-notifications');

if (Notifications) {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}

const Ctx = createContext();
export const useNotificacoes = () => useContext(Ctx);

export function NotificacoesProvider({ children }) {
  const [lista, setLista] = useState([]);

  const guardar = (id, titulo, corpo) =>
    setLista((atual) =>
      atual.some((x) => x.id === id)
        ? atual
        : [{ id, titulo, corpo, hora: new Date().toLocaleString('pt-BR') }, ...atual]
    );

  useEffect(() => {
    if (!Notifications) return;

    (async () => {
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'PawCenter',
          importance: Notifications.AndroidImportance.MAX,
        });
      }
      await Notifications.requestPermissionsAsync();
    })();

    const receber = (n) => {
      const { title, body } = n.request.content;
      guardar(n.request.identifier, title, body);
    };
    const s1 = Notifications.addNotificationReceivedListener(receber);
    const s2 = Notifications.addNotificationResponseReceivedListener((r) => receber(r.notification));
    return () => { s1.remove(); s2.remove(); };
  }, []);

  function enviar(titulo, corpo, segundos = 1) {
    if (!Notifications) {
      // Expo Go: simula, só adicionando na lista
      setTimeout(() => guardar(String(Date.now() + Math.random()), titulo, corpo), segundos * 1000);
      return Promise.resolve();
    }
    return Notifications.scheduleNotificationAsync({
      content: { title: titulo, body: corpo },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: segundos,
        channelId: 'default',
      },
    });
  }

  return <Ctx.Provider value={{ lista, enviar }}>{children}</Ctx.Provider>;
}