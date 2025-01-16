import React, { useEffect } from "react";
import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import { Redirect, Stack } from "expo-router";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import LogoutIconButton from "@/presentation/auth/components/LogoutIconButton";
import ThemedActivityIndicator from "@/presentation/theme/components/ThemedActivityIndicator";

const CheckAuthenticationLayout = () => {
  const { status, checkStatus } = useAuthStore();
  const backgroundColor = useThemeColor({}, "background");

  useEffect(() => {
    checkStatus();
  }, []);

  if (status === "checking") {
    return <ThemedActivityIndicator />;
  }

  if (status === "unauthenticated") {
    return <Redirect href="/auth/login" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: backgroundColor,
        },
        contentStyle: {
          backgroundColor: backgroundColor,
        },
      }}
    >
      <Stack.Screen
        name="(home)/index"
        options={{
          title: "Productos",
          headerLeft: () => <LogoutIconButton />,
        }}
      />

      <Stack.Screen
        name="product/[id]"
        options={{
          title: "Producto",
        }}
      />
    </Stack>
  );
};

export default CheckAuthenticationLayout;
