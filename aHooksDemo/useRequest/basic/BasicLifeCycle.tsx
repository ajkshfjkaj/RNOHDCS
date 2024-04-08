import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { useRequest } from 'ahooks';

function editUsername(username: string): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve();
      } else {
        reject(new Error('Failed to modify username'));
      }
    }, 1000);
  });
}

export function BasicLifeCycle() {
  const [state, setState] = useState('');

  const { loading, run } = useRequest(editUsername, {
    manual: true,
    onBefore: (params) => {
      Alert.alert("Start Request", `Start Request: ${params[0]}`);
    },
    onSuccess: (result, params) => {
      setState('');
      Alert.alert("Success", `The username was changed to "${params[0]}" !`);
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
    onFinally: () => {
      Alert.alert("Info", "Request finish");
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={text => setState(text)}
        value={state}
        placeholder="Please enter username"
        style={styles.input}
      />
      {loading ? (
        <ActivityIndicator style={styles.loader} />
      ) : (
        <Button
          onPress={() => run(state)}
          title="Edit"
          color="#007bff"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '100%',
  },
  loader: {
    marginVertical: 12,
  },
});
