"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.elevationParams =
  exports.codeLengthAtLevel =
  exports.gridCount1 =
  exports.gridSizes1 =
    void 0;
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
exports.gridSizes1 = gridSizes1;
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
exports.gridCount1 = gridCount1;
const codeLengthAtLevel = [1, 4, 6, 7, 9, 11, 12, 14, 16, 18, 20];
exports.codeLengthAtLevel = codeLengthAtLevel;
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
exports.elevationParams = elevationParams;
//# sourceMappingURL=data.js.map
