import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { e } from '../estilos';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function entrar() {
    try {
      await signInWithEmailAndPassword(auth, email.trim(), senha);
    } catch (erro) {
      Alert.alert('Erro', 'E-mail ou senha incorretos.');
    }
  }

  return (
    <View style={e.telaVermelha}>
      <View style={{ alignItems: 'center', marginBottom: 16 }}>
        <MaterialCommunityIcons name="pokeball" size={72} color="#fff" />
        <Text style={{ color: '#fff', fontSize: 22, fontWeight: '800' }}>PawCenter</Text>
      </View>

      <View style={e.card}>
        <Text style={e.label}>Email</Text>
        <TextInput style={e.input} value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
        <Text style={e.label}>Senha</Text>
        <TextInput style={e.input} value={senha} onChangeText={setSenha} secureTextEntry />

        <TouchableOpacity style={e.botao} onPress={entrar}>
          <Text style={e.botaoTxt}>Entrar</Text>
        </TouchableOpacity>

        <Text style={e.linkTxt}>Não possui uma conta?</Text>
        <TouchableOpacity style={[e.botao, e.botaoEscuro]} onPress={() => navigation.navigate('Cadastro')}>
          <Text style={e.botaoTxt}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}