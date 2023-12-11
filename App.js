import React, { useState, useRef } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  const [age, setAge] = useState('');
  const [stressLevel, setStressLevel] = useState('');
  const [sleepQuality, setSleepQuality] = useState('');
  const [diet, setDiet] = useState('');
  const [hydration, setHydration] = useState('');
  const [severity, setSeverity] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const assessMigraine = () => {
    if (age && stressLevel && sleepQuality && diet && hydration) {
      let severityScore = 0;
  
      if (parseInt(age) >= 40 && stressLevel.toLowerCase() === 'high') {
        severityScore += 3;
      }
      if (sleepQuality.toLowerCase() === 'poor') {
        severityScore += 1;
      }
      if (diet.toLowerCase() === 'high') {
        severityScore += 1;
      }
      if (hydration.toLowerCase() === 'low') {
        severityScore += 1;
      }
  
      let migraineSeverity = '';
      if (severityScore >= 5) {
        migraineSeverity = 'Severe Migraine';
      } else if (severityScore >= 3) {
        migraineSeverity = 'Moderate Migraine';
      } else if (severityScore > 0) {
        migraineSeverity = 'Mild Migraine';
      } else {
        migraineSeverity = 'No Migraine';
      }

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
  
      setSeverity(migraineSeverity);
    } else {
      setSeverity('Please fill in all fields.');
    }
  
  };
  
  return (
    <LinearGradient
      colors={['#E6E6FA', '#9370DB']}
      style={styles.container}
    >
      <Text style={styles.heading}>Migraine Severity Assessment</Text>
      <View style={styles.form}>
      <TextInput
          style={styles.input}
          placeholder="Age"
          keyboardType="numeric"
          value={age}
          onChangeText={(text) => setAge(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Stress Level (Low/Medium/High)"
          value={stressLevel}
          onChangeText={(text) => setStressLevel(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Sleep Quality (Good/Fair/Poor)"
          value={sleepQuality}
          onChangeText={(text) => setSleepQuality(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Diet-Sodium content(Low/High)"
          value={diet}
          onChangeText={(text) => setDiet(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Hydration (Low/Adequate/High)"
          value={hydration}
          onChangeText={(text) => setHydration(text)}
        />
      </View>
      <Button title="Assess Severity" onPress={assessMigraine} />
      <Animated.Text style={[styles.resultText, { opacity: fadeAnim }]}>
        {severity}
      </Animated.Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF',
    textShadowColor: '#000000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  form: {
    width: '100%',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#777',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#FFDFE3',
  },
  resultText: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: 'bold',
    color: '#002366',
  },
});
