import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useState } from "react";
import { ThemedText } from "@/presentation/theme/components/ThemedText";
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import ThemedButton from "@/presentation/theme/components/ThemedButton";
import ThemedLink from "@/presentation/theme/components/ThemedLink";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import { router } from "expo-router";
import { useAuthStore } from "@/presentation/auth/store/useAuthStore";

const RegisterScreen = () => {
  const { height } = useWindowDimensions();
  const backgroundColor = useThemeColor({}, "background");
  const { register } = useAuthStore();

  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const onRegister = async () => {
    const { email, password, fullname } = form;
    if (email.length === 0 || password.length === 0 || fullname.length === 0)
      return;

    setIsRegistering(true);
    const wasSuccessful = await register(email, password, fullname);
    setIsRegistering(false);

    if (wasSuccessful) {
      
      setForm({
        fullname: "",
        email: "",
        password: "",
      });

      Alert.alert(
        "Éxito",
        "Cuenta registrada con éxito",
        [
          {
            text: "OK",
            onPress: () => {
              router.push("/auth/login");
            },
          },
        ],
        { cancelable: false } 
      );
      return;
    }

    Alert.alert("Error", "Intente de nuevo");
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView
        style={{
          paddingHorizontal: 40,
          backgroundColor: backgroundColor,
        }}
      >
        <View
          style={{
            paddingTop: height * 0.35,
          }}
        >
          <ThemedText type="title">Crear cuenta</ThemedText>
          <ThemedText style={{ color: "grey" }}>
            Por favor crear una cuenta para continuar
          </ThemedText>
        </View>

        {/* Formulario de registrar */}

        <View style={{ marginTop: 20 }}>
          <ThemedTextInput
            placeholder="Nombre completo"
            autoCapitalize="words"
            icon="person-outline"
            value={form.fullname}
            onChangeText={(value) => setForm({ ...form, fullname: value })}
          />
          <ThemedTextInput
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            icon="mail-outline"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <ThemedTextInput
            placeholder="Contraseña"
            secureTextEntry
            autoCapitalize="none"
            icon="lock-closed-outline"
            rightIcon={showPassword ? "eye-off-outline" : "eye-outline"}
            onRightIconPress={() => setShowPassword(!showPassword)}
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />
        </View>

        {/* Spacer */}
        <View style={{ marginTop: 10 }} />

        {/* Botón de login */}
        <ThemedButton
          icon="arrow-forward-outline"
          onPress={onRegister}
          disabled={isRegistering}
        >
          Crear cuenta
        </ThemedButton>

        <View style={{ marginTop: 50 }} />

        {/* Enlace de registro */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Spacer */}
          <View style={{ marginTop: 30 }} />

          <ThemedText>¿Ya tienes cuenta?</ThemedText>
          <ThemedLink href="/auth/login" style={{ marginLeft: 5 }}>
            Ingresar
          </ThemedLink>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
