import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { Style } from "../../types/departures.type";
import { RouteName } from "./RouteName";
import { VehicleIcon } from "./VehicleIcon";

interface RouteProps {
  style: Style;
  alert?: string[];
}

export function Route({ style, alert }: RouteProps) {
  return (
    <View style={styles.route}>
      <VehicleIcon name={style.vehicleIcon.name} />
      <RouteName style={style} />
      {alert && alert.length > 0 && (
        <MaterialIcons
          name="error-outline"
          size={25}
          color="orange"
          style={{ alignSelf: "center" }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  route: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 5,
  },
});
