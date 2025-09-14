const gridSizes1 = [
  [1, 1],
  [21600, 14400],
  [1800, 1800],
  [900, 600],
  [60, 60],
  [4, 4],
  [2, 2],
  [0.25, 0.25],
  [0.03125, 0.03125],
  [0.00390625, 0.00390625],
  [0.00048828125, 0.00048828125]
];

const gridCount1 = [
  [1, 1],
  [60, 22],
  [12, 8],
  [2, 3],
  [15, 10],
  [15, 15],
  [2, 2],
  [8, 8],
  [8, 8],
  [8, 8],
  [8, 8]
];

const gridCountPole: [number, number][] = [
  [1, 1],
  [1, 1],
  [4, 4],
  [2, 2],
  [15, 15],
  [15, 15],
  [2, 2],
  [8, 8],
  [8, 8],
  [8, 8],
  [8, 8]
];

// 二维编码的长度
const codeLengthAtLevel = [1, 4, 6, 7, 9, 11, 12, 14, 16, 18, 20];
// 高程编码的长度
export const elevationCodeLengthAtLevel = [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

// level=index时的[位数, 进制]
const elevationParams = [
  [1, 2],
  // 十进制即可得到目标结果
  [6, 10],
  [3, 8],
  [1, 2],
  [4, 16],
  [4, 16],
  [1, 2],
  [3, 8],
  [3, 8],
  [3, 8],
  [3, 8]
];

export {
  gridSizes1,
  gridCount1,
  codeLengthAtLevel,
  elevationParams,
  gridCountPole
};
