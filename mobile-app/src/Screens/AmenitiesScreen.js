import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
  Button,
  FlatList,
  ImageBackground,
} from 'react-native';

const CoinSelector = ({ selectedCoin, coins, onSelect }) => {
  const [modalVisible, setModalVisible] = useState(false);
  

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.coinSelectButton}>
        <Text style={styles.coinSelectButtonText}>{selectedCoin}</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContent}>
          <FlatList
            data={coins}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.coinOption}
                onPress={() => {
                  onSelect(item);
                  setModalVisible(false);
                }}
              >
                <Text style={styles.coinOptionText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </>
  );
};

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const SwapScreen = () => {
  const [coin1, setCoin1] = useState('BTC');
  const [coin2, setCoin2] = useState('ETH');
  const [coinAmount1, setCoinAmount1] = useState('');
  const [coinAmount2, setCoinAmount2] = useState('');

  const handleSwap = () => {
    // Handle the swap logic here
  }

  

return (
  <DismissKeyboard>
    <SafeAreaView style={styles.container}>
    <Text style={styles.title}>Swap</Text>
      <View style={styles.inputContainer}>
        <CoinSelector 
          selectedCoin={coin1} 
          coins={['BTC', 'ETH', 'USDC', 'USDT', 'SOL', 'BNB', 'ADA']}
                    onSelect={(selected) => setCoin1(selected)} 
        />
        <View style={styles.inputBox}>
        <TextInput
            style={styles.input}
            value={coinAmount1}
            onChangeText={setCoinAmount1}
            placeholder="Amount to swap"
            placeholderTextColor="#555"
            keyboardType="numeric"
          />
        </View>
        <CoinSelector 
          selectedCoin={coin2} 
          coins={['BTC', 'ETH', 'USDC', 'USDT', 'SOL', 'BNB', 'ADA']}
                    onSelect={(selected) => setCoin2(selected)} 
        />
        <View style={styles.inputBox}>
        <TextInput
            style={styles.input}
            value={coinAmount2}
            onChangeText={setCoinAmount2}
            placeholder="Amount to receive"
            placeholderTextColor="#555"
            keyboardType="numeric"
          />
             </View>
        <TouchableOpacity style={styles.swapButton} onPress={handleSwap}>
            <Text style={styles.swapButtonText}>Swap</Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  </DismissKeyboard>
);
};




const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#151515',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  inputContainer: {
    width: '80%',
    backgroundColor: 'lightgray',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  inputBox: {
    width: '100%',
    marginBottom: 15,
  },
  input: {
    backgroundColor: 'white',
    color: '#fff',
    fontSize: 20,
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    textAlign: 'center',
  },
  selectButton: {
    backgroundColor: '#2172E5',
    paddingVertical: 10,
    borderRadius: 5,
    width: '100%',
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  swapButton: {
    backgroundColor: 'darkgrey',
    paddingVertical: 10,
    width: '100%',
    borderRadius: 5,
    marginTop: 20, 
  },
  swapButtonText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  coinSelectButton: {
    backgroundColor: 'black', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '100%',
    marginVertical: 5,
    alignItems: 'center', 
    justifyContent: 'center',
  },
  coinSelectButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end', 
    backgroundColor: 'rgba(0, 0, 0, 0.7)', 
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  coinOption: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2', 
  },
  coinOptionText: {
    fontSize: 18,
    color: '#333', 
  },
});

export default SwapScreen;
