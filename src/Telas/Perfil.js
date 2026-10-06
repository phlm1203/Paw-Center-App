import { Text, TouchableOpacity, Alert, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { e } from '../estilos';

export default function Perfil() {
  const user = auth.currentUser;

  function sair() {
    Alert.alert('Sair', 'Deseja sair da sua conta?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', onPress: () => signOut(auth) },
    ]);
  }

  return (
    <SafeAreaView style={e.tela}>
      <Text style={e.titulo}>Meu perfil</Text>
      <View style={e.card}>
        <Text style={e.label}>Nome</Text>
        <Text style={{ marginBottom: 12 }}>{user?.displayName || '-'}</Text>
        <Text style={e.label}>E-mail</Text>
        <Text>{user?.email}</Text>
      </View>
      <TouchableOpacity style={[e.botao, e.botaoEscuro]} onPress={sair}>
        <Text style={e.botaoTxt}>Sair</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}