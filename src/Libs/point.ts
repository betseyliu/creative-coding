import p5, { Color } from 'p5';

export class Point {
  x: number;
  y: number;
  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  // 复制一个点
  copy(): Point {
    return new Point(this.x, this.y);
  }

  // 两点之间的距离
  distance(p: Point): number {
    const dx = p.x - this.x;
    const dy = p.y - this.y;
    return Math.sqrt(dx ** 2 + dy ** 2);
  }

  // 绕着某个点旋转
  rotate(p: Point, radian: number) {
    const dx = this.x - p.x;
    const dy = this.y - p.y;
    this.x = p.x + Math.cos(radian) * dx - Math.sin(radian) * dy;
    this.y = p.y + Math.sin(radian) * dx + Math.cos(radian) * dy;
  }
}

export class VisualPoint extends Point {
  w: number;
  c: Color;
  constructor(x: number = 0, y: number = 0, w: number, c: Color) {
    super(x, y);
    this.w = w;
    this.c = c;
  }

  // 绘制点
  display(p: p5): void {
    p.stroke(this.c);
    p.strokeWeight(this.w);
    p.point(this.x, this.y);
  }
}
