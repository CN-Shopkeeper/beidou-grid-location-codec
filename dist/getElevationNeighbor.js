"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getElevationNeighbor;
/**
 * 根据GBT+39409-2020附录C.5开发
 */
const data_1 = require("./data");
function getElevationNeighbor(codeElevation, offset, level) {
  if (/^10+$/.test(codeElevation) && offset === -1) {
    return "0".padEnd(codeElevation.length, "0");
  }
  if (/^0+$/.test(codeElevation) && offset === -1) {
    return "1".padEnd(codeElevation.length, "0");
  }
  if (!level) {
    level = data_1.elevationCodeLengthAtLevel.indexOf(codeElevation.length);
    if (level === -1) {
      throw new Error("编码长度错误！");
    }
  }
  const parts = parseGridCode(codeElevation);
  switch (level) {
    case 0:
      handleA0(parts, offset);
      break;
    case 1:
      handleA1A2(parts, offset);
      break;
    case 2:
      handleA3(parts, offset);
      break;
    case 3:
      handleA4(parts, offset);
      break;
    case 4:
      handleA5(parts, offset);
      break;
    case 5:
      handleA6(parts, offset);
      break;
    case 6:
      handleA7(parts, offset);
      break;
    case 7:
    case 8:
    case 9:
    case 10:
      handleA8to11(parts, level + 1, offset);
      break;
    default:
      throw new Error("Invalid m");
  }
  if (parts.a0 < 0 || parts.a0 > 1) return null;
  return encodeGridCode(parts, level);
}
// 解析网格码字符串为数值对象
function parseGridCode(G) {
  if (G.length < 12) {
    G = G.padEnd(12, "0");
  }
  const a12 = parseInt(G.substring(1, 3), 10);
  const a1 = Math.floor(a12 / 10);
  const a2 = a12 % 10;
  return {
    a0: parseInt(G[0], 10),
    a1: a1,
    a2: a2,
    a3: parseInt(G[3], 8),
    a4: parseInt(G[4], 2),
    a5: parseInt(G[5], 16),
    a6: parseInt(G[6], 16),
    a7: parseInt(G[7], 2),
    a8: parseInt(G[8], 8),
    a9: parseInt(G[9], 8),
    a10: parseInt(G[10], 8),
    a11: parseInt(G[11], 8)
  };
}
// 将数值对象编码回网格码字符串
function encodeGridCode(parts, level) {
  const res = [
    parts.a0.toString(10),
    parts.a1.toString(10),
    parts.a2.toString(10),
    parts.a3.toString(8),
    parts.a4.toString(2),
    parts.a5.toString(16).toUpperCase(),
    parts.a6.toString(16).toUpperCase(),
    parts.a7.toString(2),
    parts.a8.toString(8),
    parts.a9.toString(8),
    parts.a10.toString(8),
    parts.a11.toString(8)
  ];
  return res.join("").substring(0, data_1.elevationCodeLengthAtLevel[level]);
}
// 各层级处理函数
function handleA0(parts, delta) {
  parts.a0 += delta;
  if (parts.a0 > 1 || parts.a0 < 0) {
    throw new Error("网格不存在！");
  }
}
function handleA1A2(parts, delta) {
  let value = parts.a1 * 10 + parts.a2;
  value += delta;
  if (value > 63) {
    parts.a0++;
    value = 0;
  } else if (value < 0) {
    parts.a0--;
    value = 63;
  }
  parts.a1 = Math.floor(value / 10);
  parts.a2 = value % 10;
}
function handleA3(parts, delta) {
  parts.a3 += delta;
  if (parts.a3 > 7) {
    parts.a3 = 0;
    handleA1A2(parts, 1);
  } else if (parts.a3 < 0) {
    parts.a3 = 7;
    handleA1A2(parts, -1);
  }
}
function handleA4(parts, delta) {
  parts.a4 += delta;
  if (parts.a4 > 1) {
    parts.a4 = 0;
    handleA3(parts, 1);
  } else if (parts.a4 < 0) {
    parts.a4 = 1;
    handleA3(parts, -1);
  }
}
function handleA5(parts, delta) {
  parts.a5 += delta;
  if (parts.a5 > 15) {
    parts.a5 = 0;
    handleA4(parts, 1);
  } else if (parts.a5 < 0) {
    parts.a5 = 15;
    handleA4(parts, -1);
  }
}
function handleA6(parts, delta) {
  parts.a6 += delta;
  if (parts.a6 > 15) {
    parts.a6 = 0;
    handleA5(parts, 1);
  } else if (parts.a6 < 0) {
    parts.a6 = 15;
    handleA5(parts, -1);
  }
}
function handleA7(parts, delta) {
  parts.a7 += delta;
  if (parts.a7 > 1) {
    parts.a7 = 0;
    handleA6(parts, 1);
  } else if (parts.a7 < 0) {
    parts.a7 = 1;
    handleA6(parts, -1);
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleA8to11(parts, m, delta) {
  const idx = m;
  const value = parts[`a${idx}`] + delta;
  if (value > 7) {
    parts[`a${idx}`] = 0;
    carry(parts, idx - 1, 1);
  } else if (value < 0) {
    parts[`a${idx}`] = 7;
    carry(parts, idx - 1, -1);
  } else {
    parts[`a${idx}`] = value;
  }
}
// 通用进位处理
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function carry(parts, m, delta) {
  if (m < 0) return;
  switch (m) {
    case 7:
      handleA7(parts, delta);
      break;
    case 6:
      handleA6(parts, delta);
      break;
    case 5:
      handleA5(parts, delta);
      break;
    case 4:
      handleA4(parts, delta);
      break;
    case 3:
      handleA3(parts, delta);
      break;
    case 2:
      handleA1A2(parts, delta);
      break;
    case 1:
      handleA0(parts, delta);
      break;
    default:
      parts[`a${m}`] += delta;
      if (parts[`a${m}`] > 7) {
        parts[`a${m}`] = 0;
        carry(parts, m - 1, 1);
      } else if (parts[`a${m}`] < 0) {
        parts[`a${m}`] = 7;
        carry(parts, m - 1, -1);
      }
  }
}
//# sourceMappingURL=getElevationNeighbor.js.map
