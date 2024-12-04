import React, { useState } from 'react'; 
import {StyleSheet,Button, TouchableOpacity,Text, ScrollView, StatusBar, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
// Define positive and negative GST rates
const positivegstRates = [5, 12, 18, 28];
const negativegstRates = [-5, -12, -18, -28];

const App = () => {
  const [input, setInput] = useState('');
  const [selectedGST, setSelectedGST] = useState(5);
  const [totalPrice, setTotalPrice] = useState(0);
  const [negativeGST, setNegativeGST] = useState<number | undefined>(undefined); // Stores negative GST rate (if selected)
   const [gstAmount, setGstAmount] = useState(0);
  // Function to handle number pad button press
  const handleNumberPress = (value) => {
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
      negativeGSTAmount =  basePrice - (basePrice * (100 / (100 + Math.abs(negativeGST))));
      console.log(negativeGSTAmount);
      setGstAmount(negativeGSTAmount);
    }

    // Calculate total price based on GST type
    const finalPrice = basePrice + gstAmount;
    const FinalPRICE = basePrice - negativeGSTAmount;


 // Set the final price based on positive/negative GST
 if(selectedGST){
  setTotalPrice(finalPrice);
 }
  else{
    setTotalPrice(FinalPRICE);
  }
  };

  return (
    <SafeAreaProvider>
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
    backgroundColor: 'pink',
    height: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  gstContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  gstButton: {
    padding: 10,
    margin: 5,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  gstButtonText: {
    fontSize: 18,
  },
  selectedGST: {
    backgroundColor: '#4caf50',
  },
  numberPadContainer: {
    marginBottom: 15,
    marginTop: 10,
    justifyContent: 'center',
  },
  numberPadRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  numberPadButton: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderRadius: 10,
    margin: 5,
  },
  clearButton: {
    backgroundColor: '#f44336', // Red color for the 'C' button
  },
  numberPadButtonText: {
    fontSize: 24,
    color: '#333',
  },
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
  },
});

export default App;
