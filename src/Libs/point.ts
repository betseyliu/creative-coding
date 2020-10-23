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
