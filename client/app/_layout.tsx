import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* 필요 시 전역 스크린 옵션 추가 */}
    </Stack>
  );
}
