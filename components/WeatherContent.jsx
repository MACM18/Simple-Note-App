import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";

const API_KEY = "910c4c3a7e949a9954a256e8551abf2f"; // Replace with your OpenWeather API key

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [locationInput, setLocationInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeatherData = async (latitude, longitude) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      setWeatherData(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch weather data");
      setLoading(false);
    }
  };

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      fetchWeatherData(location.coords.latitude, location.coords.longitude);
    } catch (err) {
      setError("Error getting location");
    }
  };

  const handleLocationInput = () => {
    if (locationInput) {
      fetchWeatherDataByCity(locationInput);
    }
  };

  const fetchWeatherDataByCity = async (city) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      //   console.log(data);
      setWeatherData(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch weather data");
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather App</Text>
      <TextInput
        style={styles.input}
        placeholder='Enter location'
        value={locationInput}
        onChangeText={setLocationInput}
      />
      <Button title='Get Weather' onPress={handleLocationInput} />
      {loading && <ActivityIndicator size='large' color='#0000ff' />}
      {error && <Text style={styles.error}>{error}</Text>}
      {weatherData && (
        <View style={styles.weatherContainer}>
          <Text style={styles.weatherText}>
            {/* {weatherData} */}
            {weatherData.name}: {weatherData.main.temp}°C
          </Text>
          <Text style={styles.weatherText}>
            {weatherData.weather[0].description}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  weatherContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  weatherText: {
    fontSize: 18,
  },
  error: {
    color: "red",
    textAlign: "center",
  },
});
