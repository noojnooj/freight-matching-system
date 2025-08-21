import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

type WeatherResponse = {
  name: string;
  main: { temp: number };
  weather: { description: string }[];
};

export default function Home() {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const displayCity = '대전광역시'; // 한국어로 도시 이름 표시

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = process.env.EXPO_PUBLIC_WEATHER_API_KEY;
        const city = 'Daejeon'; // 예시로 대전시를 사용
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=kr&appid=${apiKey}`;
        const res = await fetch(url);
        const data = await res.json();
        setWeather(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!weather) {
    return (
      <View style={styles.container}>
        <Text>날씨 정보를 불러올 수 없습니다.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.city}>{displayCity}</Text>
      <Text style={styles.temp}>{weather.main.temp}°C</Text>
      <Text style={styles.desc}>{weather.weather[0].description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  city: { fontSize: 24, fontWeight: 'bold' },
  temp: { fontSize: 20 },
  desc: { fontSize: 16, color: 'gray' },
});
