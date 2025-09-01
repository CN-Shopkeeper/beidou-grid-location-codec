/**
 * 根据GBT+39409-2020附录C.5开发
 */
export declare const elevationCodeLengthAtLevel: number[];
export default function getElevationNeighbor(
  codeElevation: string,
  offset: -1 | 1,
  level?: number
): string | null;
export type Parts = {
  a0: number;
  a1: number;
  a2: number;
  a3: number;
  a4: number;
  a5: number;
  a6: number;
  a7: number;
  a8: number;
  a9: number;
  a10: number;
  a11: number;
};
