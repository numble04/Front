import { SearchAddressType } from "types/local";

export const getDistance = ({
  lat1,
  lng1,
  lat2,
  lng2,
}: {
  lat1: number;
  lng1: number;
  lat2: number;
  lng2: number;
}) => {
  if (lat1 == lat2 && lng1 == lng2) return 0;

  var radLat1 = (Math.PI * lat1) / 180;
  var radLat2 = (Math.PI * lat2) / 180;
  var theta = lng1 - lng2;
  var radTheta = (Math.PI * theta) / 180;
  var dist =
    Math.sin(radLat1) * Math.sin(radLat2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
  if (dist > 1) dist = 1;

  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515 * 1.609344 * 1000;
  if (dist < 100) dist = Math.round(dist / 10) * 10;
  else dist = Math.round(dist / 100) * 100;

  return dist;
};

export const getCityName = (localInfo: SearchAddressType) => {
  if (localInfo.address) {
    return localInfo.address.region_1depth_name;
  } else if (localInfo.road_address) {
    return localInfo.road_address.region_1depth_name;
  }

  return localInfo.address_name.split(' ')[0];
};

export const getDongName = (localInfo: SearchAddressType) => {
  if (localInfo.address) {
    return (
      localInfo.address.region_3depth_h_name ||
      localInfo.address.region_3depth_name
    );
  } else if (localInfo.road_address) {
    return (
      localInfo.road_address.region_3depth_h_name ||
      localInfo.road_address.region_3depth_name
    );
  }

  const splitAddressName = localInfo.address_name.split(' ');
  return splitAddressName[splitAddressName.length - 1];
};
