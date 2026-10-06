import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { e, VERMELHO } from '../estilos';

const opcoes = [
  { imagem: require('../../assets/imagens/banho.png'),
    titulo: 'Banho',
    icone: 'shower-head', 
    params: { 
        servico: 'Banho' 
    } 
},

  { imagem: require('../../assets/imagens/tosa.png'),
    titulo: 'Tosa', 
    icone: 'content-cut', 
    params: { 
        servico: 'Tosa' 
    } 
},

  { imagem: require('../../assets/imagens/consultas.png'),
    titulo: 'Consulta', 
    icone: 'stethoscope', 
    params: { 
        servico: 'Consulta' 
    } 
},

  { imagem: require('../../assets/imagens/produtos.png'),
    titulo: 'Produtos', 
    icone: 'shopping', 
    params: {} 
},

];

export default function Home({ navigation }) {
  return (
    <SafeAreaView style={s.tela} edges={['top']}>
      <ScrollView contentContainerStyle={s.conteudo} showsVerticalScrollIndicator={false}>
        {/* Banner */}
        <View style={s.banner}>
          <Image source={require('../../assets/images/banner.jpg')} style={s.bannerImg} />
          <View style={s.escurecer} />
          <View style={s.bannerTextos}>
            <Text style={s.bannerTitulo}>PawCenter</Text>
            <Text style={s.bannerSub}>Tudo o que seu pet precisa.</Text>
          </View>
        </View>
 
        <Text style={s.pergunta}>Como posso ajudá-lo(a)?</Text>
 
        {/* Cards 2x2 */}
        <View style={s.grade}>
          {opcoes.map((o) => (
            <TouchableOpacity
              key={o.titulo}
              style={s.card}
              onPress={() => navigation.navigate(o.tela, o.params)}
            >
              <Image source={o.imagem} style={s.cardImg} resizeMode="contain" />
              <Text style={s.cardTxt}>{o.titulo}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
 
const s = StyleSheet.create({
  tela: { 
    flex: 1, 
    backgroundColor: '#F6F8FF' 
  },
  // paddingBottom: espaço para a barra de abas flutuante não cobrir os cards
  conteudo: { 
    padding: 20, 
    paddingBottom: 110 
  },
 
  banner: { 
    height: 190, 
    borderRadius: 24, 
    overflow: 'hidden' 
  },

  bannerImg: { 
    width: '100%', 
    height: '100%' 
  },

  escurecer: { 
    ...StyleSheet.absoluteFillObject, 
    backgroundColor: 'rgba(0,0,0,0.3)'
   },

  bannerTextos: { 
    position: 'absolute', 
    left: 16, 
    bottom: 16 
  },

  bannerTitulo: { 
    color: '#fff',
    fontSize: 24, 
    fontWeight: '800' 
  },

  bannerSub: { 
    color: '#fff', 
    fontSize: 14 
  },
 
  pergunta: { 
    textAlign: 'center', 
    fontSize: 18, 
    fontWeight: '700', 
    color: '#222B38', 
    marginVertical: 28 
  },
 
  grade: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
    rowGap: 18 
  },

  card: {
    width: '48%',
    aspectRatio: 0.96,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },

  cardImg: { 
    flex: 1, 
    width: '100%' 
  },

  cardTxt: { 
    marginTop: 6, 
    fontSize: 15, 
    fontWeight: '700',
     color: '#222B38' 
    },
});