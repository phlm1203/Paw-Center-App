import { Text, FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNotificacoes } from '../notificacoes';
import { e } from '../estilos';

export default function Notificacoes() {
  const { lista } = useNotificacoes();

  return (
    <SafeAreaView style={e.tela}>
      <Text style={e.titulo}>Notificações</Text>
      <FlatList
        data={lista}
        keyExtractor={(n) => n.id}
        ListEmptyComponent={<Text>Nenhuma notificação ainda.</Text>}
        renderItem={({ item }) => (
          <View style={e.item}>
            <Text style={e.itemTitulo}>{item.titulo}</Text>
            <Text>{item.corpo}</Text>
            <Text style={{ fontSize: 11, color: '#888', marginTop: 4 }}>{item.hora}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}