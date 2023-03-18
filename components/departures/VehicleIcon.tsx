import AirplaneIcon from "../../assets/vehicle-icons/airplane.svg";
import BusIcon from "../../assets/vehicle-icons/bus.svg";
import ChairliftIcon from "../../assets/vehicle-icons/chairlift.svg";
import FerryIcon from "../../assets/vehicle-icons/ferry.svg";
import MavIcon from "../../assets/vehicle-icons/mav.svg";
import NightBusIcon from "../../assets/vehicle-icons/night-bus.svg";
import SikloIcon from "../../assets/vehicle-icons/siklo.svg";
import SuburbanRailwayIcon from "../../assets/vehicle-icons/suburban-railway.svg";
import SubwayIcon from "../../assets/vehicle-icons/subway.svg";
import TramIcon from "../../assets/vehicle-icons/tram.svg";
import TrolleybusIcon from "../../assets/vehicle-icons/trolleybus.svg";
import { VehicleIcons } from "../../types/departures.type";

export function VehicleIcon({ name }: { name: string }) {
  const width = 30;
  switch (name) {
    case VehicleIcons.BUS:
      return <BusIcon width={width} />;
    case VehicleIcons.TRAM:
      return <TramIcon width={width} />;
    case VehicleIcons.SUBWAY:
      return <SubwayIcon width={width} />;
    case VehicleIcons.SUBURBAN_RAILWAY:
      return <SuburbanRailwayIcon width={width} />;
    case VehicleIcons.NIGHT_BUS:
      return <NightBusIcon width={width} />;
    case VehicleIcons.TROLLEYBUS:
      return <TrolleybusIcon width={width} />;
    case VehicleIcons.FERRY:
      return <FerryIcon width={width} />;
    case VehicleIcons.AIRPLANE:
      return <AirplaneIcon width={width} />;
    case VehicleIcons.CHAIRLIFT:
      return <ChairliftIcon width={width} />;
    case VehicleIcons.SIKLO:
      return <SikloIcon width={width} />;
    case VehicleIcons.RAIL:
      return <MavIcon width={width} />;
    default:
      return <BusIcon width={width} />;
  }
}
