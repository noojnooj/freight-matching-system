import { View, Text, StyleSheet } from 'react-native';
import Login from './(auth)/Login';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, world</Text>
      <Login />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 20, fontWeight: '600' },
});
