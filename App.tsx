import React, { useState } from 'react';
import { StyleSheet, Button, TouchableOpacity, Text, ScrollView, StatusBar, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

// Define positive and negative GST rates
const positivegstRates = [5, 12, 18, 28];
const negativegstRates = [-5, -12, -18, -28];

const App = () => {
  const [input, setInput] = useState('');
  const [selectedGST, setSelectedGST] = useState(5);
  const [totalPrice, setTotalPrice] = useState(0);
  const [negativeGST, setNegativeGST] = useState<number | undefined>(undefined);
  const [gstAmount, setGstAmount] = useState(0);
  const [mode, setMode] = useState('GST');  // Toggle between 'GST' and 'Arithmetic'

  // Function to handle number pad button press
  const handleNumberPress = (value: string | number) => {
    setInput(input + value);
  };

  const handleArithmeticOperation = (value: string) => {
    setInput(input + value);
  };

  const deleteLastInput = () => {
    setInput(input.slice(0, -1));
  };

  // Function to clear input
  const clearInput = () => {
    setInput('');
    setTotalPrice(0);
    setGstAmount(0);
  };

  // Function to calculate GST
  const calculateGST = () => {
    if (!input || isNaN(Number(input))) {
      return;
    }
    const basePrice = parseFloat(input);

    let gstAmount = 0;
    let negativeGSTAmount = 0;

    // Calculate GST for positive rate
    if (selectedGST) {
      gstAmount = (basePrice * selectedGST) / 100;
      setGstAmount(gstAmount);
    }

    // Calculate GST for negative rate (if selected)
    if (negativeGST) {
      negativeGSTAmount = basePrice - (basePrice * (100 / (100 + Math.abs(negativeGST))));
      console.log(negativeGSTAmount);
      setGstAmount(negativeGSTAmount);
    }

    // Calculate total price based on GST type
    const finalPrice = basePrice + gstAmount;
    const FinalPRICE = basePrice - negativeGSTAmount;

    // Set the final price based on positive/negative GST
    if (selectedGST) {
      setTotalPrice(finalPrice);
    } else {
      setTotalPrice(FinalPRICE);
    }
  };

  // Function to calculate arithmetic operations
  const calculateArithmetic = () => {
    try {
      const result = eval(input);  // Use eval for simplicity; be careful with eval
      setInput(result.toString());
    } catch (error) {
      setInput('Error');
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.maincontainer} edges={['top']}>
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.title}>{mode === 'GST' ? 'GST Calculator' : 'Arithmetic Calculator'}</Text>

            {mode === 'GST' ? (<View style={styles.inputContainer}>
              <Text style={styles.input}>₹{input || 0}</Text>
            </View>) : (<View style={styles.inputContainer}>
              <Text style={styles.input}>{input || 0}</Text>
            </View>)}

            {mode === 'GST' ? (
              <View style={styles.resultbox}>
                <Text style={styles.result}>Total Price (GST Exclusive): <Text style={styles.result_text}>₹{totalPrice.toFixed(2)}</Text> </Text>
                <Text style={styles.result}>GST Amount: <Text style={styles.result_text}>₹{gstAmount.toFixed(2)} </Text></Text>
                <Text style={styles.result}>CGST: <Text style={styles.result_text}>₹{(gstAmount / 2).toFixed(2)} </Text></Text>
                <Text style={styles.result}>SGST: <Text style={styles.result_text}>₹{(gstAmount / 2).toFixed(2)} </Text></Text>
              </View>
            ) : (
               <View> hi</View>
            )}

            {/* Toggle button to switch between modes */}
            <TouchableOpacity
              style={styles.modeButton}
              onPress={() => setMode(mode === 'GST' ? 'Arithmetic' : 'GST')}
            >
              <Text style={styles.modeButtonText}>Switch to {mode === 'GST' ? 'Arithmetic' : 'GST'}</Text>
            </TouchableOpacity>

            {/* Arithmetic operations or GST rate options */}
            {mode === 'GST' ? (
              <>
                <View style={styles.gstContainer}>
                  {positivegstRates.map((rate) => (
                    <TouchableOpacity
                      key={rate}
                      style={[styles.gstButton, selectedGST === rate && styles.selectedGST]}
                      onPress={() => {
                        setSelectedGST(rate);
                        setNegativeGST(0); // Reset negative GST if a positive rate is selected
                      }}
                    >
                      <Text style={styles.gstButtonText}>{rate}%</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <View style={styles.gstContainer}>
                  {negativegstRates.map((rate) => (
                    <TouchableOpacity
                      key={rate}
                      style={[styles.gstButton, negativeGST === rate && styles.selectedGST]}
                      onPress={() => {
                        setNegativeGST(rate);
                        setSelectedGST(0); // Reset positive GST if a negative rate is selected
                      }}
                    >
                      <Text style={styles.gstButtonText}>{rate}%</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            ) : (
              <View style={styles.arthContainer}>
                {['+', '-', '*', '/'].map((operation) => (
                  <TouchableOpacity
                    key={operation}
                    style={styles.arthButton}
                    onPress={() => handleArithmeticOperation(operation)}
                  >
                    <Text style={styles.arthButtonText}>{operation}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <View style={styles.numberPadContainer}>
              {/* Number pad */}
              <View style={styles.numberPadRow}>
                {['1', '2', '3'].map((num) => (
                  <TouchableOpacity
                    key={num}
                    style={styles.numberPadButton}
                    onPress={() => handleNumberPress(num)}
                  >
                    <Text style={styles.numberPadButtonText}>{num}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.numberPadRow}>
                {['4', '5', '6'].map((num) => (
                  <TouchableOpacity
                    key={num}
                    style={styles.numberPadButton}
                    onPress={() => handleNumberPress(num)}
                  >
                    <Text style={styles.numberPadButtonText}>{num}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.numberPadRow}>
                {['7', '8', '9'].map((num) => (
                  <TouchableOpacity
                    key={num}
                    style={styles.numberPadButton}
                    onPress={() => handleNumberPress(num)}
                  >
                    <Text style={styles.numberPadButtonText}>{num}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.numberPadRow}>
                <TouchableOpacity
                  style={styles.numberPadButton}
                  onPress={() => handleNumberPress('.')}
                >
                  <Text style={styles.numberPadButtonText}>.</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.numberPadButton}
                  onPress={() => handleNumberPress(0)}
                >
                  <Text style={styles.numberPadButtonText}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.numberPadButton, styles.clearButton]}
                  onPress={deleteLastInput}
                >
                  <Text style={styles.numberPadButtonText}>D</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.calculateContainer}>
              <Button title={mode === 'GST' ? 'Calculate GST' : 'Calculate'} onPress={mode === 'GST' ? calculateGST : calculateArithmetic} />
              <Button title="Clear" onPress={clearInput} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#f4f6f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 1,
  },
  inputContainer: {
    marginBottom: 2,
  },
  input: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  resultbox: {
    marginBottom: 1,
    marginTop: 5,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'column',
  },
  result: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  result_text: {
    color: '#4caf50',
    fontWeight: 'bold',
  },
  gstContainer: {
    marginBottom: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  arthContainer:{
    marginBottom: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },

  arthButton: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderRadius: 50,
    margin: 5,
  },
  arthButtonText: {
    fontSize: 18,
  },
  gstButton: {
    padding: 10,
    margin: 4,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  gstButtonText: {
    fontSize: 18,
  },
  selectedGST: {
    backgroundColor: '#4caf50',
  },
  modeButton: {
    backgroundColor: '#4caf50',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  modeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  numberPadContainer: {
    marginBottom: 4,
    marginTop: 5,
    justifyContent: 'center',
  },
  numberPadRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 7,
  },
  numberPadButton: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderRadius: 50,
    margin: 5,
  },
  numberPadButtonText: {
    fontSize: 24,
    color: '#333',
  },
  clearButton: {
    backgroundColor: '#f44336', // Red color for the 'D' button
  },
  calculateContainer: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 10,
  },
});

export default App;
