import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from "react-native";

export default function Login() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인</Text>
      
      <TextInput
        style={styles.input}
        placeholder="전화번호"
      />
      
      <Button title="로그인" onPress={() => {}} />
      
      <TouchableOpacity onPress={() => {}}>
        <Text style={styles.link}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 15, borderRadius: 5 },
  link: { color: "blue", marginTop: 10, textAlign: "center" }
});