import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import { e } from '../estilos';

const campos = [
  ['nome', 'Nome'],
  ['sobrenome', 'Sobrenome'],
  ['celular', 'Celular'],
  ['email', 'Email'],
  ['senha', 'Senha'],
  ['confirma', 'Confirme a senha'],
];

export default function Cadastro({ navigation }) {
  const [dados, setDados] = useState({ nome: '', sobrenome: '', celular: '', email: '', senha: '', confirma: '' });

  async function cadastrar() {
    if (!dados.nome || !dados.email || !dados.senha) return Alert.alert('Atenção', 'Preencha todos os campos.');
    if (dados.senha !== dados.confirma) return Alert.alert('Atenção', 'As senhas não conferem.');

    try {
      const cred = await createUserWithEmailAndPassword(auth, dados.email.trim(), dados.senha);
      await updateProfile(cred.user, { displayName: `${dados.nome} ${dados.sobrenome}`.trim() });
    } catch (erro) {
      if (erro.code === 'auth/email-already-in-use') Alert.alert('Erro', 'Este e-mail já está cadastrado.');
      else if (erro.code === 'auth/weak-password') Alert.alert('Erro', 'A senha precisa ter 6 ou mais caracteres.');
      else Alert.alert('Erro', 'Não foi possível cadastrar.');
    }
  }

  return (
    <ScrollView style={{ backgroundColor: '#FF0000' }} contentContainerStyle={{ padding: 24, paddingTop: 56 }}>
      <View style={e.card}>
        {campos.map(([chave, rotulo]) => (
          <View key={chave}>
            <Text style={e.label}>{rotulo}</Text>
            <TextInput
              style={e.input}
              value={dados[chave]}
              onChangeText={(t) => setDados({ ...dados, [chave]: t })}
              secureTextEntry={chave === 'senha' || chave === 'confirma'}
              autoCapitalize={chave === 'email' ? 'none' : 'words'}
            />
          </View>
        ))}
        <TouchableOpacity style={[e.botao, e.botaoEscuro]} onPress={cadastrar}>
          <Text style={e.botaoTxt}>Cadastrar-se</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={e.linkTxt}>Já tenho conta</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}