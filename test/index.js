// import Codec2D from "../dist/index";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Codec2D, Codec3D } = require("../dist/index");
console.log("---------------------------------------");
const lngLatNE = {
  lngDegree: 116,
  lngMinute: 18,
  lngSecond: 45.37,
  lngDirection: "E",
  latDegree: 39,
  latMinute: 59,
  latSecond: 35.38,
  latDirection: "N"
};
console.log("坐标: ", lngLatNE);
const codeNE = Codec2D.encode(lngLatNE, 10);
console.log("北斗二维网格位置码: ", codeNE);
console.log("解码 => ", Codec2D.decode(codeNE));
console.log("-------------------");
console.log("参照 N50J47539B82553461");
const referNE1 = Codec2D.refer(codeNE, "N50J47539B82553461");
console.log(referNE1);
console.log("还原");
const deReferNE1 = Codec2D.deRefer(referNE1);
console.log(deReferNE1);
console.log("-------------------");
console.log("参照 N50J47539b82");
const referNE2 = Codec2D.refer(codeNE, "N50J47539b82");
console.log(referNE2);
console.log("还原");
const deReferNE2 = Codec2D.deRefer(referNE2);
console.log(deReferNE2);
console.log("-------------------");
console.log("参照 N50J4754909");
const referNE3 = Codec2D.refer(codeNE, "N50J4754909");
console.log(referNE3);
console.log("还原");
const deReferNE3 = Codec2D.deRefer(referNE3);
console.log(deReferNE3);

console.log("---------------------------------------");
const lngLatSW = {
  lngDegree: 116,
  lngMinute: 18,
  lngSecond: 45.37,
  lngDirection: "W",
  latDegree: 39,
  latMinute: 59,
  latSecond: 35.38,
  latDirection: "S"
};
console.log("坐标: ", lngLatSW);
const codeSW = Codec2D.encode(lngLatSW, 10);
console.log("北斗二维网格位置码: ", codeSW);
console.log("解码 => ", Codec2D.decode(codeSW));
console.log("-------------------");
console.log("参照 S11J47539B82553461");
const referSW1 = Codec2D.refer(codeSW, "S11J47539B82553461");
console.log(referSW1);
console.log("还原");
const deReferSW1 = Codec2D.deRefer(referSW1);
console.log(deReferSW1);
console.log("-------------------");
console.log("参照 S11J47539b82");
const referSW2 = Codec2D.refer(codeSW, "S11J47539b82");
console.log(referSW2);
console.log("还原");
const deReferSW2 = Codec2D.deRefer(referSW2);
console.log(deReferSW2);
console.log("-------------------");
console.log("参照 S11J4754909");
const referSW3 = Codec2D.refer(codeSW, "S11J4754909");
console.log(referSW3);
console.log("还原");
const deReferSW3 = Codec2D.deRefer(referSW3);
console.log(deReferSW3);

console.log("---------------------------------------");
console.log("参考特殊样例1:");
const codeTarget1 = "N50J47539b82";
const codeReference1 = "N50J47539b8";
console.log(`${codeTarget1} 参考 ${codeReference1}`);
const codeRefer1 = Codec2D.refer(codeTarget1, codeReference1);
console.log(codeRefer1);
console.log("-------------------");
console.log("参考特殊样例2:");
const codeTarget2 = "S50J4750908";
const codeReference2 = "S50J474E9E8";
console.log(`${codeTarget2} 参考 ${codeReference2}`);
const codeRefer2 = Codec2D.refer(codeTarget2, codeReference2);
console.log(codeRefer2);

console.log("---------------------------------------");
// 缩短北斗二维网格位置码
const codeToBeShorten = "N50J47539B8255346152";
console.log("需要缩短的编码:", codeToBeShorten);

for (let i = 9; i >= 2; i--) {
  console.log(`缩短到第${i}级的编码是:`, Codec2D.shorten(codeToBeShorten, i));
}

console.log("---------------------------------------");
console.log(
  "测试issue 位置码错误的判断方法 checkCodeFragmentRange 处理第一级网格时，将A60判定为错误位置码",
  Codec2D.decode("N60A")
);

console.log("---------------------------------------");
const code = "000000015";
function offset(codeEle, offset) {
  if (offset == 0) return codeEle;
  const step = offset > 0 ? 1 : -1;
  offset = Math.abs(offset);
  for (let i = 0; i < offset; i++) {
    codeEle = Codec3D.getNeighbor(codeEle, step);
  }
  return codeEle;
}
console.log("000000015 +3:", offset(code, +3) === "000000100");
console.log("000000015 +2:", offset(code, +2) === "000000017");
console.log("000000015 +1:", offset(code, +1, 7) === "000000016");
console.log("000000015 -1:", offset(code, +1, 7) === "000000016");
console.log("000000015 +2:", offset(code, +2) === "000000017");
console.log("000000015 -5:", offset(code, -5) === "000000010");
console.log("000000015 -6:", offset(code, -6) === "000000007");
console.log("000000015 -7:", offset(code, -7) === "000000006");
console.log("000000015 -13:", offset(code, -13) === "000000000");
console.log(
  "000000015 -14:",
  offset(code, -14) === "100000000" //地面之下一个网格
);

const code2 = "012";
console.log("012 +1", offset(code2, +1) == "013");
console.log("012 -1", offset(code2, -1) == "011");
console.log("012 +30", offset(code2, 30) == "042");
console.log("012 -12", offset(code2, -12) == "000");
console.log("012 -13", offset(code2, -13) == "100");

const code3 = "000709F15376";
console.log(
  "000709F15376 +1",
  Codec3D.getNeighbor(code3, +1) == "000709F15377"
);
console.log(
  "000709F15376 -1",
  Codec3D.getNeighbor(code3, -1) == "000709F15375"
);

const code4 = "000301E";
console.log("000301E +1", Codec3D.getNeighbor(code4, +1) == "0003020");

console.log(
  "000301E上方网格编码是0003020: ",
  Codec3D.encodeElevation(Codec3D.decodeElevation("000301E") + 127)
);
console.log(
  Codec3D.decodeElevation("000301E") - Codec3D.decodeElevation("000301D"),
  Codec3D.decodeElevation("0003020") - Codec3D.decodeElevation("000301E")
);

// issue #8 获取含E相邻网格与之前编码逻辑不一致
const neighborCode = Codec3D.getNeighbor("000000E", 1, 5);

console.log("issue #8 获取含E相邻网格与之前编码逻辑不一致 ", neighborCode);
