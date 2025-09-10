import { ScrollView, Text, StyleSheet, Image } from "react-native";

export default function About() {
    return (
        <ScrollView style={styles.container}>
            <Image style={styles.image}
                source={require("./assets/fuks.png")}
            />
            <Text style={styles.title}>PARCIAL CORTE 1{"\n"}APLICACIONES MOVILES </Text>
            <Text style={styles.title}> Presentado por:</Text>
            <Text style={styles.text}>Marlon Gomez Segura</Text>
            <Text style={styles.text}>Cod. 506231010</Text>
            <Text style={styles.text}> Email: marlonr.gomezs@konradlorenz.edu.co</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,              // hace que el ScrollView use todo el espacio disponible
        padding: 20,
        backgroundColor: "#ffa41bff",
    },

    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 40,
        marginBottom: 20,
        textAlign: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 20,
        textAlign: "center",
        alignItems: "center",
        paddingHorizontal: 20
    },
    image: {
        width: 150,
        height: 150,
        resizeMode: "contain",
        marginBottom: 20,
        alignContent: "center"
    },
});
