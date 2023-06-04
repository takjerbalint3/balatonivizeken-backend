export interface BoatDto {
  _id?: string;
  userId: string;
  boatType: string;
  displayName: string;
  gpsEnabled: boolean;
  longitude: number;
  latitude: number;
}
