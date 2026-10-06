import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { e, VERMELHO } from '../estilos';

const opcoes = [
  { imagem: require(''),
    titulo: 'Banho',
    icone: 'shower-head', 
    params: { 
        servico: 'Banho' 
    } 
},

  { titulo: 'Tosa', 
    icone: 'content-cut', 
    params: { 
        servico: 'Tosa' 
    } 
},

  { titulo: 'Consulta', 
    icone: 'stethoscope', 
    params: { 
        servico: 'Consulta' 
    } 
},

  { titulo: 'Produtos', 
    icone: 'shopping', 
    params: {} 
},

];

export default function Home({ navigation }) {
  return (
    <SafeAreaView style={e.tela}>
      <Text style={e.titulo}>Como posso ajudá-lo(a)?</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 16 }}>
        {opcoes.map((o) => (
          <TouchableOpacity
            key={o.titulo}
            style={[e.card, { width: '47%', aspectRatio: 1, alignItems: 'center', justifyContent: 'center' }]}
            onPress={() => navigation.navigate(o.tela, o.params)}
          >
            <MaterialCommunityIcons name={o.icone} size={44} color={VERMELHO} />
            <Text style={[e.itemTitulo, { marginTop: 8 }]}>{o.titulo}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}