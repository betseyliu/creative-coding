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
