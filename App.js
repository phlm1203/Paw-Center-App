import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from './src/firebase';
import { NotificacoesProvider } from './src/notificacoes';
import { VERMELHO } from './src/estilos';

import Login from './src/Telas/Login';
import Cadastro from './src/Telas/Cadastro';
import Home from './src/Telas/Home';
import Notificacoes from './src/Telas/Tela-Notificacao';
import Perfil from './src/Telas/Perfil';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Abas() {
  const icones = { Home: 'home', Notificações: 'notifications', Perfil: 'person' };
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: VERMELHO,
        tabBarIcon: ({ color, size }) => <Ionicons name={icones[route.name]} size={size} color={color} />,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Notificações" component={Notificacoes} />
      <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setCarregando(false);
    });
  }, []);

  if (carregando) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: VERMELHO }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <NotificacoesProvider>
      <NavigationContainer>
        {user ? (
          <Stack.Navigator>
            <Stack.Screen name="Abas" component={Abas} options={{ headerShown: false }} />
            <Stack.Screen name="Agendar" component={Agendar} options={({ route }) => ({ title: route.params.servico })} />
            <Stack.Screen name="Produtos" component={Produtos} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Cadastro" component={Cadastro} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </NotificacoesProvider>
  );
}