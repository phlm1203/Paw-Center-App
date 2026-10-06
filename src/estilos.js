import { StyleSheet } from 'react-native';

export const VERMELHO = '#FF0000';

export const e = StyleSheet.create({
    
  tela: {
    flex: 1,
    backgroundColor: '#F6F8FC',
    padding: 24,
  },
  telaVermelha: {
    flex: 1,
    backgroundColor: VERMELHO,
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 16,
    color: '#222B38',
  },
  label: {
    fontWeight: '600',
    marginBottom: 4,
    color: '#222B38',
  },
  input: {
    backgroundColor: '#EDEDED',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  botao: {
    backgroundColor: VERMELHO,
    borderRadius: 20,
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  botaoEscuro: {
    backgroundColor: '#222B38',
  },
  botaoTxt: {
    color: '#fff',
    fontWeight: '700',
  },
  linkTxt: {
    textAlign: 'center',
    marginTop: 16,
    color: '#222B38',
  },
  item: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  itemTitulo: {
    fontWeight: '700',
    color: '#222B38',
  },
});