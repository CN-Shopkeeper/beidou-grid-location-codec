type LngLat = {
  lngDegree: number;
  lngMinute?: number;
  lngSecond?: number;
  lngDirection?: LngDirection;
  latDegree: number;
  latMinute?: number;
  latSecond?: number;
  latDirection?: LatDirection;
};

type LngLatEle = LngLat & { elevation: number };

type DecodeOption = {
  form: "decimal" | "dms";
};

type LngDirection = "W" | "E";

type LatDirection = "S" | "N";

export { LngLat, DecodeOption, LngDirection, LatDirection, LngLatEle };
