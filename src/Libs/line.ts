import { Point } from './point';
import p5, { Color } from 'p5';
import { Vector } from './vector';

export class Line {
  p1: Point;
  p2: Point;
  constructor(p1: Point, p2: Point) {
    this.p1 = p1;
    this.p2 = p2;
  }

  // 线段长度
  length(): number {
    return this.p1.distance(this.p2);
  }

  // 绕着某点旋转
  rotate(p: Point, rad: number): Line {
    this.p1.rotate(p, rad);
    this.p2.rotate(p, rad);
    return this;
  }
  lerp(f: number): Point {
    return this.p1.lerp(this.p2, f);
  }
  intersect(l: Line): Point | null {
    const a = new Vector(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
    const b = new Vector(l.p2.x - l.p1.x, l.p2.y - l.p1.y);
    const c = new Vector(l.p1.x - this.p1.x, l.p1.y - this.p1.y);

    const v1 = a.perpendicular();
    const v2 = b.perpendicular();
    const t = c.dot(v2) / a.dot(v2);
    const u = -c.dot(v1) / b.dot(v1);

    if (t > 0 && t < 1 && u > 0 && u < 1) {
      let v = new Vector(this.p1.x, this.p1.y);
      v = v.add(a.multi(t));
      return new Point(v.x, v.y);
    } else {
      return null;
    }
  }
}

export class VisualLine extends Line {
  w: number;
  c: Color;
  constructor(p1: Point, p2: Point, c: Color, w: number) {
    super(p1, p2);
    this.c = c;
    this.w = w;
  }
  // 设置宽度
  setWeight(w: number): Line {
    this.w = w;
    return this;
  }

  // 设置颜色
  setColor(c: Color): Line {
    this.c = c;
    return this;
  }

  // 展示线段
  display(p: p5): void {
    p.strokeWeight(this.w);
    p.stroke(this.c);
    p.line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
  }
}
