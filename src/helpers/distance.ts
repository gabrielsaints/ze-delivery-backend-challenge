interface GeoLocalizer {
  latitude: number;
  longitude: number;
}

interface DistanceCalculator {
  from: GeoLocalizer;
  to: GeoLocalizer;
}

export function calculateDistance({
  from: { latitude: latitudeFrom, longitude: longitudeFrom },
  to: { latitude: latitudeTo, longitude: longitudeTo }
}: DistanceCalculator): number {
  const toRad = (value: number): number => {
    return (value * Math.PI) / 180;
  };
  const radius = 6371; // km
  const dLat = toRad(latitudeTo - latitudeFrom);
  const dLon = toRad(longitudeTo - longitudeFrom);
  const latitudeFromRad = toRad(latitudeFrom);
  const latitudeToRad = toRad(latitudeTo);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) *
      Math.sin(dLon / 2) *
      Math.cos(latitudeFromRad) *
      Math.cos(latitudeToRad);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return radius * c;
}
