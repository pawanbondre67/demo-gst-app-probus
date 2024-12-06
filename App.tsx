<<<<<<< HEAD
import React, { useState } from 'react';
import { StyleSheet, Button, TouchableOpacity, Text, ScrollView, StatusBar, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

=======
import React, { useState } from 'react'; 
import {StyleSheet,Button, TouchableOpacity,Text, ScrollView, StatusBar, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
>>>>>>> fe4fc8b9a26af7fcab695734903554a9d5837e94
// Define positive and negative GST rates
const positivegstRates = [5, 12, 18, 28];
const negativegstRates = [-5, -12, -18, -28];

const App = () => {
  const [input, setInput] = useState('');
  const [selectedGST, setSelectedGST] = useState(5);
  const [totalPrice, setTotalPrice] = useState(0);
<<<<<<< HEAD
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

=======
  const [negativeGST, setNegativeGST] = useState<number | undefined>(undefined); // Stores negative GST rate (if selected)
   const [gstAmount, setGstAmount] = useState(0);
  // Function to handle number pad button press
  const handleNumberPress = (value) => {
    setInput(input + value);
  };
>>>>>>> fe4fc8b9a26af7fcab695734903554a9d5837e94
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
<<<<<<< HEAD

=======
    
>>>>>>> fe4fc8b9a26af7fcab695734903554a9d5837e94
    let gstAmount = 0;
    let negativeGSTAmount = 0;

    // Calculate GST for positive rate
    if (selectedGST) {
      gstAmount = (basePrice * selectedGST) / 100;
      setGstAmount(gstAmount);
    }

    // Calculate GST for negative rate (if selected)
    if (negativeGST) {
<<<<<<< HEAD
      negativeGSTAmount = basePrice - (basePrice * (100 / (100 + Math.abs(negativeGST))));
=======
      negativeGSTAmount =  basePrice - (basePrice * (100 / (100 + Math.abs(negativeGST))));
>>>>>>> fe4fc8b9a26af7fcab695734903554a9d5837e94
      console.log(negativeGSTAmount);
      setGstAmount(negativeGSTAmount);
    }

    // Calculate total price based on GST type
    const finalPrice = basePrice + gstAmount;
    const FinalPRICE = basePrice - negativeGSTAmount;

<<<<<<< HEAD
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
=======

 // Set the final price based on positive/negative GST
 if(selectedGST){
  setTotalPrice(finalPrice);
 }
  else{
    setTotalPrice(FinalPRICE);
  }
>>>>>>> fe4fc8b9a26af7fcab695734903554a9d5837e94
  };

  return (
    <SafeAreaProvider>
<<<<<<< HEAD
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
=======
    <SafeAreaView style={styles.maincontainer} edges={['top']}>
      <ScrollView >
      <View style={styles.container} >
      <Text style={styles.title}>GST Calculator</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.input}>₹{input || 0}</Text>
      </View>

      {/* Display positive GST options */}
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

      {/* Display negative GST options */}
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
      <View style={styles.numberPadContainer}>
  {/* Row 1 */}
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

  {/* Row 2 */}
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

  {/* Row 3 */}
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

  {/* Row 4 */}
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
      <Text style={styles.numberPadButtonText}>C</Text>
    </TouchableOpacity>
  </View>


</View>

<View style={styles.calculateContainer}>

  <Button title="Calculate" onPress={calculateGST} />
  <Button title="Clear" onPress={clearInput} />
</View>

{totalPrice !== 0 && (
  selectedGST ? (
    <View style={styles.resultbox}>
      <Text style={styles.result}>Total Price (GST Exclusive): ₹{totalPrice.toFixed(2)} </Text>
      <Text style={styles.result}>GST Amount: ₹{gstAmount.toFixed(2)}</Text>
      <Text style={styles.result}>CGST: ₹{(gstAmount / 2).toFixed(2)}</Text>
      <Text style={styles.result}>SGST: ₹{(gstAmount / 2).toFixed(2)}</Text>
    </View>
  ) : (
    <View style={styles.resultbox}>
      <Text style={styles.result}>Total Price (GST Inclusive): ₹{totalPrice.toFixed(2)} </Text>
      <Text style={styles.result}>GST Amount: ₹{gstAmount.toFixed(2)}</Text>
      <Text style={styles.result}>CGST: ₹{(gstAmount / 2).toFixed(2)}</Text>
      <Text style={styles.result}>SGST: ₹{(gstAmount / 2).toFixed(2)}</Text>
    </View>
  )
)}
  </View>
    </ScrollView>
    </SafeAreaView>
  </SafeAreaProvider>

>>>>>>> fe4fc8b9a26af7fcab695734903554a9d5837e94
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
<<<<<<< HEAD
    backgroundColor: '#f4f6f9',
=======
    backgroundColor: 'pink',
    height: '100%',
>>>>>>> fe4fc8b9a26af7fcab695734903554a9d5837e94
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
<<<<<<< HEAD
    marginBottom: 1,
  },
  inputContainer: {
    marginBottom: 2,
=======
    marginBottom: 20,
    marginTop: 20,
  },
  inputContainer: {
    marginBottom: 20,
>>>>>>> fe4fc8b9a26af7fcab695734903554a9d5837e94
  },
  input: {
    fontSize: 30,
    fontWeight: 'bold',
  },
<<<<<<< HEAD
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
=======
  gstContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  gstButton: {
    padding: 10,
    margin: 5,
>>>>>>> fe4fc8b9a26af7fcab695734903554a9d5837e94
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  gstButtonText: {
    fontSize: 18,
  },
  selectedGST: {
    backgroundColor: '#4caf50',
  },
<<<<<<< HEAD
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
=======
  numberPadContainer: {
    marginBottom: 15,
    marginTop: 10,
>>>>>>> fe4fc8b9a26af7fcab695734903554a9d5837e94
    justifyContent: 'center',
  },
  numberPadRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
<<<<<<< HEAD
    marginBottom: 7,
=======
    marginBottom: 10,
>>>>>>> fe4fc8b9a26af7fcab695734903554a9d5837e94
  },
  numberPadButton: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
<<<<<<< HEAD
    borderRadius: 50,
    margin: 5,
  },
=======
    borderRadius: 10,
    margin: 5,
  },
  clearButton: {
    backgroundColor: '#f44336', // Red color for the 'C' button
  },
>>>>>>> fe4fc8b9a26af7fcab695734903554a9d5837e94
  numberPadButtonText: {
    fontSize: 24,
    color: '#333',
  },
<<<<<<< HEAD
  clearButton: {
    backgroundColor: '#f44336', // Red color for the 'D' button
  },
  calculateContainer: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 10,
=======
  calculateContainer: {
    flex:1,
    gap: 20,
    flexDirection: 'row',
    marginBottom: 20,
  },
  result: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultbox: {
    marginBottom: 20,
    marginTop: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'column',
>>>>>>> fe4fc8b9a26af7fcab695734903554a9d5837e94
  },
});

export default App;
