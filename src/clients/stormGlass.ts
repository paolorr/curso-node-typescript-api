import { AxiosStatic } from 'axios';

type StormGlassPointSource = {
  [key: string]: number;
}

type StormGlassPoint = {
  readonly time: string;
  readonly waveDirection: StormGlassPointSource;
  readonly waveHeight: StormGlassPointSource;
  readonly swellDirection: StormGlassPointSource;
  readonly swellHeight: StormGlassPointSource;
  readonly swellPeriod: StormGlassPointSource;
  readonly windDirection: StormGlassPointSource;
  readonly windSpeed: StormGlassPointSource;
}

type StormGlassForecastResponse = {
  hours: StormGlassPoint[]
}

type ForecastPoint = {
  readonly time: string;
  readonly waveDirection: number;
  readonly waveHeight: number;
  readonly swellDirection: number;
  readonly swellHeight: number;
  readonly swellPeriod: number;
  readonly windDirection: number;
  readonly windSpeed: number;
}

export default class StormGlass {
  readonly stormGlassAPIParams = 'swellDirection,swellHeight,swellPeriod,waveDirection,waveHeight,windDirection,windSpeed';

  readonly stormGlassAPISource = 'noaa';

  constructor(private readonly request: AxiosStatic) { }

  public async fetchPoints(lat: number, lng: number): Promise<ForecastPoint[]> {
    const response = await this.request.get<StormGlassForecastResponse>(`https://api.stormglass.io/v2/weather/point?params=${this.stormGlassAPIParams}&source=${this.stormGlassAPISource}&end=1592113802lat=${lat}&lng=${lng}`, {
      headers: {
        Authorization: 'fake-token',
      },
    });
    return this.normalizeResponse(response.data);
  }

  private normalizeResponse(points: StormGlassForecastResponse): ForecastPoint[] {
    return points.hours.filter(this.isValidPoint.bind(this)).map((point) => ({
      time: point.time,
      waveDirection: point.waveDirection[this.stormGlassAPISource],
      waveHeight: point.waveHeight[this.stormGlassAPISource],
      swellDirection: point.swellDirection[this.stormGlassAPISource],
      swellHeight: point.swellHeight[this.stormGlassAPISource],
      swellPeriod: point.swellPeriod[this.stormGlassAPISource],
      windDirection: point.windDirection[this.stormGlassAPISource],
      windSpeed: point.windSpeed[this.stormGlassAPISource],
    }));
  }

  private isValidPoint(point: Partial<StormGlassPoint>): boolean {
    return !!(
      point.time
      && point.swellDirection?.[this.stormGlassAPISource]
      && point.swellHeight?.[this.stormGlassAPISource]
      && point.swellPeriod?.[this.stormGlassAPISource]
      && point.waveDirection?.[this.stormGlassAPISource]
      && point.waveHeight?.[this.stormGlassAPISource]
      && point.windDirection?.[this.stormGlassAPISource]
      && point.windSpeed?.[this.stormGlassAPISource]
    );
  }
}
