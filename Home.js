import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ActivityIndicator, ScrollView} from "react-native";

export default function Home() {
  const [categorias, setCategorias] = useState([]);
  const [platosPorCategoria, setPlatosPorCategoria] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlato, setSelectedPlato] = useState(null);

  const getCategorias = async () => {
    try {
      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      const json = await res.json();
      setCategorias(json.categories);

      // Traer plfatos de cada categoría
      json.categories.forEach(async (cat) => {
        const resPlatos = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat.strCategory}`
        );
        const jsonPlatos = await resPlatos.json();
        setPlatosPorCategoria((prev) => ({
          ...prev,
          [cat.strCategory]: jsonPlatos.meals,
        }));
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const verDetallePlato = async (idMeal) => {
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
      );
      const json = await res.json();
      setSelectedPlato(json.meals[0]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCategorias();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ffa41bff" />
      </View>
    );
  }

  return (

    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>RECETAS CULINARIAS{"\n"}DE LA K</Text>
      {selectedPlato ? (
        // Vista detalle de un plato
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, padding: 16 }}
          showsVerticalScrollIndicator
        >
          <Text style={styles.detailTitle}>{selectedPlato.strMeal}</Text>
          <Image
            source={{ uri: selectedPlato.strMealThumb }}
            style={styles.detailImage}
          />
          <Text style={styles.detailInstructions}>
            {selectedPlato.strInstructions}
          </Text>
          <TouchableOpacity
            style={styles.buttonBack}
            onPress={() => setSelectedPlato(null)}
          >
            <Text style={styles.buttonText}>⬅ Volver al inicio</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        // Listado de todas las categorías con scroll horizontal de platos
        <ScrollView showsVerticalScrollIndicator>
          {categorias.map((cat) => (
            <View key={cat.idCategory} style={styles.categoryBlock}>
              <Text style={styles.categoryTitle}>{cat.strCategory}</Text>
              <FlatList
                horizontal
                data={platosPorCategoria[cat.strCategory] || []}
                keyExtractor={(item) => item.idMeal}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.card}
                    onPress={() => verDetallePlato(item.idMeal)}
                  >
                    <Image
                      source={{ uri: item.strMealThumb }}
                      style={styles.cardImg}
                    />
                    <Text style={styles.cardTitle}>{item.strMeal}</Text>
                  </TouchableOpacity>
                )}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffa41bff"
  },

  // Estilo de categorías
  categoryBlock: {
    marginBottom: 24,
    paddingHorizontal: 10
  },

  categoryTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 20,
    textAlign: "center",
  },

  // Estilo de caja de plato
  card: {
    width: 100,
    height: 140,
    marginRight: 4,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 2,
    alignItems: "center",
  },
  cardImg: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 6
  },
  cardTitle: {
    fontSize: 12,
    textAlign: "center"
  },

  // Estilo Detalle plato
  detailTitle: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 12
  },

  detailImage: {
    width: "100%",
    height: 160,
    borderRadius: 8,
    marginBottom: 12,
  },
  detailInstructions: {
    fontSize: 15,
    textAlign: "justify",
    marginBottom: 20
  },

  buttonBack: {
    backgroundColor: "red",
    padding: 12,
    borderRadius: 8,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  },
});
