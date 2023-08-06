export type BkkApiDto<T> = {
  currentTime: number;
  version: number;
  status: string;
  code: number;
  text: string;
  data: T;
};

export type DeparturesData = {
  list?: ListEntity[] | null;
  outOfRange: boolean;
  limitExceeded: boolean;
  references: References;
  class: string;
};

export type ListEntity = {
  routeId: string;
  headsign: string;
  stopTimes?: StopTimesEntity[] | null;
};

export type StopTimesEntity = {
  stopId: string;
  stopHeadsign: string;
  departureTime: number;
  predictedDepartureTime?: number | null;
  tripId: string;
  serviceDate: string;
  alertIds?: string[] | null;
};

export type References = {
  agencies: Record<string, Agency>;
  routes: Record<string, Route>;
  stops: Record<string, Stop>;
  trips: Record<string, Trip>;
  alerts: Record<string, Alert>;
};

export type Agency = {
  id: string;
  name: string;
  url: string;
  timezone: string;
  lang: string;
  phone: string;
};

export type Alert = {
  id: string;
  start: number;
  end: number;
  timestamp: number;
  modifiedTime: number;
  stopIds?: string[] | null;
  routeIds?: string[] | null;
  url: TranslatedEntity;
  header: TranslatedEntity;
  description: TranslatedEntity;
  routes?: RoutesEntity[] | null;
};

export type TranslatedEntity = {
  translations: Translations;
  someTranslation: string;
};

export type Translations = {
  en: string;
  hu: string;
};

export type RoutesEntity = {
  routeId: string;
  stopIds?: string[] | null;
};

export type Icon = {
  type: string;
  text: string;
  textColor: string;
};
export type VehicleIcon = {
  name: string;
};

export interface Route {
  id: string;
  shortName: string;
  description: string;
  type: string;
  color: string;
  textColor: string;
  agencyId: string;
  iconDisplayType: string;
  iconDisplayText: string;
  bikesAllowed: boolean;
  style: RouteStyle;
  sortOrder: number;
}

export type RouteStyle = {
  color: string;
  icon: Icon;
  vehicleIcon: VehicleIcon;
};

export interface Stop {
  id: string;
  lat: number;
  lon: number;
  name: string;
  code: string;
  direction: string;
  description: string;
  locationType: number;
  parentStationId: string;
  type: string;
  wheelchairBoarding: boolean;
  routeIds?: string[] | null;
  stopColorType: string;
  style: StopStype;
}

export type StopStype = {
  colors?: string[] | null;
};
export type Trip = {
  id: string;
  routeId: string;
  shapeId: string;
  blockId: string;
  tripHeadsign: string;
  serviceId: string;
  directionId: string;
  bikesAllowed: boolean;
  wheelchairAccessible: boolean;
};

export type TripDetailsData = {
  limitExceeded: boolean;
  entry: {
    serviceDate: string;
    vertex: string;
    vehicle: {
      vehicleId: string;
      stopId: string;
      stopSequence: number;
      routeId: string;
      bearing: number;
      location: {
        lat: number;
        lon: number;
      };
      serviceDate: string;
      licensePlate: string;
      label: string;
      model: string;
      deviated: false;
      lastUpdateTime: number;
      status: string;
      congestionLevel: null;
      vehicleRouteType: string;
      stopDistancePercent: number;
      wheelchairAccessible: false;
      capacity: {
        adults: number;
      };
      tripId: string;
      vertex: string;
      style: {
        icon: {
          name: string;
          color: string;
          secondaryColor: string;
        };
      };
    };
    polyline: {
      levels: string;
      points: string;
      length: number;
    };
    alertIds: string[];
    stopTimes: TripStopTime[];
  };
  class: string;
};

export type TripStopTime = {
  stopId: string;
  stopHeadsign: string;
  departureTime: number;
  predictedDepartureTime: number;
  requiresBooking: boolean;
  stopSequence: number;
  shapeDistTraveled: number;
};
