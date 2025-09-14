import { LngLatEle, DecodeOption } from "./type";
declare class Codec3D {
  /**
   * 对大地坐标进行编码
   * @param lngLatEle 大地坐标，类型为 LngLat & number
   * @param r 地球长半轴，默认取6378137m
   * @param level 编码等级
   * @returns 32位的北斗三维网格位置码
   */
  static encode(lngLatEle: LngLatEle, r?: number, level?: number): string;
  /**
   * 对高程进行编码
   * @param elevation 高程，单位米
   * @param r 地球长半轴，默认取6378137m
   * @param level 编码层级，默认10
   * @returns 高程方向编码
   */
  static encodeElevation(elevation: number, r?: number, level?: number): string;
  /**
   * 对32位北斗三维网格位置码解码
   * @param code 32位北斗三位网格位置码
   * @param decodeOption 解码选项
   * @param r 地球长半轴，默认取6378137m
   * @returns 大地坐标
   */
  static decode(
    code: string,
    decodeOption?: DecodeOption,
    r?: number,
    level?: number
  ): LngLatEle;
  /**
   * 对高程方向编码解码
   * @param codeEle 高程方向编码
   * @param r 地球长半轴，默认取6378137m
   * @returns 高程，单位米
   */
  static decodeElevation(codeEle: string, r?: number): number;
  /**
   * 根据高度编码计算上（下）一个高度编码
   * @param codeEle 高程方向编码
   * @param offset 高度网格偏移量
   * @param level 可选、层级
   * @returns 新的高度编码
   */
  static getNeighbor(
    codeEle: string,
    offset: -1 | 1,
    level?: number
  ): string | null;
}
export default Codec3D;
