import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import * as Location from "expo-location";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const API_KEY = "910c4c3a7e949a9954a256e8551abf2f";

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [locationInput, setLocationInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [unit, setUnit] = useState("metric");

  const fetchWeatherData = async (query) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?${query}&appid=${API_KEY}&units=${unit}`
      );
      const data = await response.json();
      if (data.cod === 200) {
        setWeatherData(data);
        setError("");
      } else {
        setError(data.message || "Failed to fetch weather data");
      }
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
      fetchWeatherData(`lat=${location.coords.latitude}&lon=${location.coords.longitude}`);
    } catch (err) {
      setError("Error getting location");
    }
  };

  const handleLocationInput = () => {
    if (locationInput) {
      fetchWeatherData(`q=${locationInput}`);
    }
  };

  useEffect(() => {
    getLocation();
  }, [unit]);

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "metric" ? "imperial" : "metric"));
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter location"
        value={locationInput}
        onChangeText={setLocationInput}
        placeholderTextColor="#666"
      />
      <TouchableOpacity style={styles.button} onPress={handleLocationInput}>
        <Text style={styles.buttonText}>Get Weather</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.unitButton} onPress={toggleUnit}>
        <Text style={styles.unitButtonText}>
          Switch to {unit === "metric" ? "Fahrenheit" : "Celsius"}
        </Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator size="large" color="#3949ab" />}
      {error && <Text style={styles.error}>{error}</Text>}
      {weatherData && (
        <ScrollView contentContainerStyle={styles.weatherContainer}>
          <Text style={styles.city}>{weatherData.name}</Text>
          <MaterialCommunityIcons
            name={`weather-${weatherData.weather[0].main.toLowerCase()}`}
            size={100}
            color="#3949ab"
          />
          <Text style={styles.temp}>
            {weatherData.main.temp}°{unit === "metric" ? "C" : "F"}
          </Text>
          <Text style={styles.description}>{weatherData.weather[0].description}</Text>
          <Text style={styles.details}>Feels like: {weatherData.main.feels_like}°</Text>
          <Text style={styles.details}>Pressure: {weatherData.main.pressure} hPa</Text>
          <Text style={styles.details}>Humidity: {weatherData.main.humidity}%</Text>
          <Text style={styles.details}>Wind: {weatherData.wind.speed} {unit === "metric" ? "m/s" : "mph"}</Text>
          <Text style={styles.details}>Sunrise: {formatTime(weatherData.sys.sunrise)}</Text>
          <Text style={styles.details}>Sunset: {formatTime(weatherData.sys.sunset)}</Text>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#3949ab",
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
    backgroundColor: "#fff",
    color: "#333",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#3949ab",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  unitButton: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  unitButtonText: {
    color: "#333",
    fontSize: 14,
  },
  weatherContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  city: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  temp: {
    fontSize: 64,
    fontWeight: "bold",
    color: "#3949ab",
    marginBottom: 10,
  },
  description: {
    fontSize: 20,
    fontStyle: "italic",
    color: "#666",
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    color: "#333",
    marginBottom: 6,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});
