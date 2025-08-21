import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image, ScrollView } from 'react-native';

type WeatherResponse = {
  name: string;
  main: { temp: number };
  weather: { description: string; icon: string }[];
  coord: { lon: number; lat: number };
};

type HourlyEntry = {
  dt: number; // unix seconds
  temp: number;
  icon: string;
  description: string;
};

export default function Home() {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [hourly, setHourly] = useState<HourlyEntry[]>([]);
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
        // Fetch 5-day / 3-hour forecast and keep only today's items
        try {
          const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=kr&appid=${apiKey}`;
          const fRes = await fetch(forecastUrl);
          const fData = await fRes.json();
          if (Array.isArray(fData.list)) {
            // Next 24 hours (3-hour step -> 8 items)
            const next24: HourlyEntry[] = fData.list.slice(0, 8).map((item: any) => ({
              dt: item.dt,
              temp: item.main?.temp,
              icon: item.weather?.[0]?.icon,
              description: item.weather?.[0]?.description,
            }));
            setHourly(next24);
          }
        } catch (err) {
          console.warn('Failed to fetch hourly forecast', err);
        }
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
      <Image
        style={styles.icon}
        source={{ uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` }}
      />
      {/* 소수점 자릿수 1자리까지만 표시하기 */}
      <Text style={styles.temp}>{weather.main.temp.toFixed(1)}°C</Text>
      <Text style={styles.desc}>{weather.weather[0].description}</Text>
      {/* 오늘 시간대별 기온 (3시간 간격) */}
      {hourly.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator
          style={styles.hourlyContainer}
          contentContainerStyle={styles.hourlyContent}
        >
          {hourly.map((h) => {
            const date = new Date(h.dt * 1000);
            const hourLabel = `${date.getHours()}시`;
            return (
              <View key={h.dt} style={styles.hourlyItem}>
                <Text style={styles.hourlyHour}>{hourLabel}</Text>
                <Image
                  style={styles.hourlyIcon}
                  source={{ uri: `https://openweathermap.org/img/wn/${h.icon}.png` }}
                />
                <Text style={styles.hourlyTemp}>{h.temp.toFixed(1)}°</Text>
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  city: { fontSize: 24, fontWeight: 'bold' },
  temp: { fontSize: 20 },
  desc: { fontSize: 16, color: 'gray' },
  icon: { width: 80, height: 80 },
  hourlyContainer: { width: '100%', height: 120, marginTop: 16, flexGrow: 0, overflowX: 'scroll' } as any,
  hourlyContent: { paddingHorizontal: 16, alignItems: 'center' },
  hourlyItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
  },
  hourlyHour: { fontSize: 12, marginBottom: 4 },
  hourlyIcon: { width: 40, height: 40, marginBottom: 4 },
  hourlyTemp: { fontSize: 14, fontWeight: '600' },
});
