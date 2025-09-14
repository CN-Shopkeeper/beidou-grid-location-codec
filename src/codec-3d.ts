import { LngLatEle, DecodeOption } from "./type";
import Codec2D from "./codec-2d";
import {
  codeLengthAtLevel,
  elevationCodeLengthAtLevel,
  elevationParams
} from "./data";
import getElevationNeighbor from "./getElevationNeighbor";

class Codec3D {
  /**
   * 对大地坐标进行编码
   * @param lngLatEle 大地坐标，类型为 LngLat & number
   * @param r 地球长半轴，默认取6378137m
   * @param level 编码等级
   * @returns 32位的北斗三维网格位置码
   */
  static encode(lngLatEle: LngLatEle, r = 6378137, level = 10): string {
    if (level < 1 || level > 10) {
      throw new Error("Codec3D.encode: 等级应该在1~10之间");
    }
    // 计算二维网格位置码，20位
    const code2D = Codec2D.encode(lngLatEle, level);
    // 计算高程方向编码，12位
    const codeEle = this.encodeElevation(lngLatEle.elevation, r, level);
    let codeResult = code2D[0] + codeEle[0];
    for (let i = 1; i <= level; i++) {
      // 拼接二维
      codeResult += code2D.substring(
        codeLengthAtLevel[i - 1],
        codeLengthAtLevel[i]
      );
      // 拼接高程
      codeResult += codeEle.substring(
        elevationCodeLengthAtLevel[i - 1],
        elevationCodeLengthAtLevel[i]
      );
    }
    return codeResult;
  }

  /**
   * 对高程进行编码
   * @param elevation 高程，单位米
   * @param r 地球长半轴，默认取6378137m
   * @param level 编码层级，默认10
   * @returns 高程方向编码
   */
  static encodeElevation(elevation: number, r = 6378137, level = 10) {
    // 计算θ=1/2048″时的大地方向网格计数
    const theta = 1 / 2048 / 3600;
    const theta0 = 1;
    const n = Math.floor(
      (theta0 / theta) *
        (Math.log((elevation + r) / r) / Math.log(1 + theta0 * (Math.PI / 180)))
    );
    // js/ts的二进制是有正负号的。console.log((-10).toString(2)); => -1010
    // 单独处理符号位
    const signCode = n < 0 ? "1" : "0";
    // 补位31位
    let nb = Math.abs(n).toString(2).padStart(31, "0");
    nb = signCode + nb;
    // 高程方向编码结果
    let codeEle = "";
    // 二进制位数下标
    let index = 0;
    for (let i = 0; i <= level; i++) {
      // 截取字符串
      const str = nb.substring(index, (index += elevationParams[i][0]));
      let codeI = parseInt(str, 2)
        // 进制转化
        .toString(elevationParams[i][1])
        // 转换为大写(如果是字母)
        .toUpperCase();
      if (i === 1) {
        // 如果是第一级，需要补位
        codeI = codeI.padStart(2, "0");
      }
      codeEle += codeI;
    }
    return codeEle;
  }

  /**
   * 对32位北斗三维网格位置码解码
   * @param code 32位北斗三位网格位置码
   * @param decodeOption 解码选项
   * @param r 地球长半轴，默认取6378137m
   * @returns 大地坐标
   */
  static decode(
    code: string,
    decodeOption: DecodeOption = { form: "decimal" },
    r = 6378137,
    level = 10
  ): LngLatEle {
    if (level < 1 || level > 10) {
      throw new Error("Codec3D.decode: 等级应该在1~10之间");
    }
    const expectedCodeLength =
      codeLengthAtLevel[level] + elevationCodeLengthAtLevel[level];
    if (code.length !== expectedCodeLength) {
      throw new Error("Codec3D.decode: 编码长度不符合");
    }
    // 截取字符串
    let code2D = code[0];
    let codeEle = code[1];
    for (let i = 1; i <= level; i++) {
      code2D += code.substring(
        codeLengthAtLevel[i - 1] + elevationCodeLengthAtLevel[i - 1],
        codeLengthAtLevel[i] + elevationCodeLengthAtLevel[i - 1]
      );
      codeEle += code.substring(
        codeLengthAtLevel[i] + elevationCodeLengthAtLevel[i - 1],
        codeLengthAtLevel[i] + elevationCodeLengthAtLevel[i]
      );
    }
    // 分别解码
    const lngLat = Codec2D.decode(code2D, decodeOption);
    const elevation = this.decodeElevation(codeEle, r);
    return { ...lngLat, elevation };
  }

  /**
   * 对高程方向编码解码
   * @param codeEle 高程方向编码
   * @param r 地球长半轴，默认取6378137m
   * @returns 高程，单位米
   */
  static decodeElevation(codeEle: string, r = 6378137): number {
    // 补充长度
    if (codeEle.length < 12) {
      codeEle = codeEle.padEnd(12, "0");
    }
    // 如果长度不等于12即错误
    if (codeEle.length !== 12) {
      throw new Error("高程方向编码长度错误");
    }
    // 处理符号
    const sign = codeEle.charAt(0) === "0" ? 1 : -1;
    let elevationStr = "";
    // 单独处理第一级
    const code1st = codeEle.substring(1, 3);
    elevationStr += parseInt(code1st, elevationParams[1][1])
      .toString(2)
      .padStart(elevationParams[1][0], "0");
    for (let n = 2; n <= 10; n++) {
      // 处理第2级到第10级
      const codeN = codeEle.charAt(n + 1);
      elevationStr += parseInt(codeN, elevationParams[n][1])
        .toString(2)
        .padStart(elevationParams[n][0], "0");
    }
    // 计算高程方向网格数量
    const n = sign * parseInt(elevationStr, 2);
    const theta = 1 / 2048 / 3600;
    const theta0 = 1;
    // 计算高度
    const h =
      Math.pow(1 + theta0 * (Math.PI / 180), n * (theta / theta0)) * r - r;
    return h;
  }

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
  ): string | null {
    return getElevationNeighbor(codeEle, offset, level);
  }
}

export default Codec3D;
