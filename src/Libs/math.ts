interface PointProps {
  x: number;
  y: number;
}
/**
 * 极坐标转笛卡尔坐标
 * @param radius 半径
 * @param radian 弧度
 */
export function polarToCartesian(radius: number, radian: number): PointProps {
  return {
    x: Math.cos(radian) * radius,
    y: Math.sin(radian) * radius,
  };
}

/**
 * 等比数列
 * @param n 数列长度
 * @param q 前后项比值
 */
export const progression = (n: number, q: number): number[] => {
  const result = [];
  result[0] = 1; // 首项
  for (let i = 1; i < n; i++) {
    result[i] = result[i - 1] * q; // 根据倍数计算下一项
  }
  return result;
};
