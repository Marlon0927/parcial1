import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Home from "./Home";
import Perfil from "./Perfil";

const Tab = createBottomTabNavigator(); // inicializar menu inferior

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getRecetas = async () => {
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php" // API QUE TRAE LAS RECETAS
      );
      const json = await response.json();
      setData(json.categories);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { // EFECTO PARA TRAER UNA SOLA VEZ LAS RECETAS
    getRecetas();
  }, []);

  if (isLoading) { // SPINNER
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ffa41bff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "Inicio") {
              iconName = "home";
            } else if (route.name === "Perfil") {
              iconName = "person";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
        })}
      >

        <Tab.Screen name="Inicio" options={{ title: "Recetas" }}>
          {(props) => <Home {...props} data={data} isLoading={isLoading} />}
        </Tab.Screen>

        <Tab.Screen name="Perfil">
          {(props) => <Perfil {...props} data={data} isLoading={isLoading} />}
        </Tab.Screen>

      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
