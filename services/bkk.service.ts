import axios from 'axios';
import { decode } from 'html-entities';

import { API_KEY, API_URL } from '../config/configuration';
import { BkkApiDto, DeparturesData, TripDetailsData } from '../types/bkk.type';
import { Departure, DepartureDto } from '../types/departures.type';

export class BkkService {
  async getDepartures(lat: string, lon: string, radius: number, limit: number) {
    const apiData = await this.getDeparturesApiData(lat, lon, radius, limit);

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

  async getTripDetails(tripId: string) {
    const apiData = await this.getTripDetailsApiData(tripId);
    return apiData.data;
  }

  private async getDeparturesApiData(lat: string, lon: string, radius: number, limit: number) {
    const url = this.getDeparturesApiUrl(lat, lon, radius, limit).toString();

    try {
      const response = await axios.get<BkkApiDto<DeparturesData>>(url);
      return response.data;
    } catch (e) {
      throw e;
    }
  }

  private async getTripDetailsApiData(tripId: string) {
    const url = this.getTripDetailsApiUrl(tripId).toString();

    try {
      const response = await axios.get<BkkApiDto<TripDetailsData>>(url);
      return response.data;
    } catch (e) {
      throw e;
    }
  }

  private getDeparturesApiUrl(lat: string, lon: string, radius: number, limit: number) {
    const url = new URL(API_URL + '/arrivals-and-departures-for-location');
    url.searchParams.append('key', API_KEY);
    url.searchParams.append('radius', radius.toString());
    url.searchParams.append('lon', lon);
    url.searchParams.append('lat', lat);
    url.searchParams.append('clientLon', lon);
    url.searchParams.append('clientLat', lat);
    url.searchParams.append('minutesBefore', '0');
    url.searchParams.append('limit', limit.toString());
    url.searchParams.append('groupLimit', '1');
    url.searchParams.append('onlyDepartures', 'true');
    return url.toString();
  }

  private getTripDetailsApiUrl(tripId: string) {
    const url = new URL(API_URL + '/trip-details');
    url.searchParams.append('key', API_KEY);
    url.searchParams.append('tripId', tripId);
    return url.toString();
  }
}
