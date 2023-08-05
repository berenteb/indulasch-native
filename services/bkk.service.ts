import axios from 'axios';
import Constants from 'expo-constants';
import { decode } from 'html-entities';

import { FutarAPI } from '../types/bkk.type';
import { Departure, DepartureDto } from '../types/departures.type';

export class BkkService {
  private readonly apiUrl: URL;
  constructor() {
    this.apiUrl = new URL(Constants.expoConfig?.extra?.apiUrl);
    this.apiUrl.searchParams.append('key', Constants.expoConfig?.extra?.apiKey);
  }

  async getDepartures(lat: string, lon: string, radius: number) {
    const apiData = await this.getDeparturesApiData(lat, lon, radius);

    const apiResponse: DepartureDto = { departures: [] };

    try {
      const { list, references } = apiData.data;
      list?.forEach(({ stopTimes, headsign, routeId }) => {
        stopTimes?.forEach(({ departureTime, predictedDepartureTime, alertIds, tripId }) => {
          const departure: Departure = {
            type: references.routes[routeId].type,
            style: references.routes[routeId].style,
            headsign: headsign,
            scheduled: departureTime,
            predicted: predictedDepartureTime || departureTime,
            alert: alertIds?.map((id) =>
              decode(
                references.alerts[id].description.translations.hu.replace(/(\n)+/g, ' ').replace(/<\/?[^>]+(>|$)/g, '')
              )
            ),
            isDelayed: (predictedDepartureTime || departureTime) - departureTime > 180,
            departureText: '',
            tripId: tripId,
          };
          const minutes = Math.floor((departure.predicted * 1000 - Date.now()) / 60000);

          departure.departureText = minutes < 1 ? 'azonnal indul' : minutes + ' perc';
          apiResponse.departures.push(departure);
        });
      });
    } catch (e) {
      throw e;
    }
    return apiResponse;
  }

  private async getDeparturesApiData(lat: string, lon: string, radius: number) {
    const url = this.getDeparturesApiUrl(lat, lon, radius).toString();

    try {
      const response = await axios.get<FutarAPI>(url);
      return response.data;
    } catch (e) {
      throw e;
    }
  }

  private getDeparturesApiUrl(lat: string, lon: string, radius: number) {
    const searchParams = new URLSearchParams();
    searchParams.append('radius', radius.toString());
    searchParams.append('lon', lon);
    searchParams.append('lat', lat);
    searchParams.append('clientLon', lon);
    searchParams.append('clientLat', lat);
    searchParams.append('minutesBefore', '0');
    searchParams.append('limit', '30');
    searchParams.append('groupLimit', '1');
    searchParams.append('onlyDepartures', 'true');
    return [this.apiUrl, searchParams].join('&');
  }
}
