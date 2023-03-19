import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "./Button";
import { Content } from "./Content";
import { Screen } from "./Screen";
import { ScreenTitle } from "./ScreenTitle";
import { Text, useThemeColor } from "./Themed";

interface ErrorBoundaryProps {
  error: Error;
  retry: () => Promise<void>;
}

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  const red = useThemeColor({}, "red");
  const { bottom } = useSafeAreaInsets();
  return (
    <Screen style={{ paddingBottom: bottom }}>
      <ScreenTitle>Hiba történt</ScreenTitle>
      <Content style={styles.content}>
        <MaterialIcons name="error" color={red} size={50} />
        <Text style={styles.text}>
          Erre a hibára fel is készültünk, meg nem is.
        </Text>
        <Text style={styles.subText}>{error.message}</Text>
      </Content>
      <View style={styles.buttonContainer}>
        <Button onPress={retry} leftIcon="autorenew">
          Újrapróbálás
        </Button>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "OpenSansBold",
  },
  subText: {
    color: "gray",
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    padding: 10,
    flex: 1,
    justifyContent: "flex-end",
  },
});
