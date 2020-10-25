export class Vector {
  x: number;
  y: number;
  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  // 复制
  copy(): Vector {
    return new Vector(this.x, this.y);
  }

  // 大小 || 设置大小
  mag(): number;
  mag(size: number): Vector;
  mag(size?: number) {
    if (size === undefined) {
      return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
    return this.normalize().multi(size);
  }

  // 方向，弧度制
  heading(): number {
    return Math.atan2(this.y, this.x);
  }

  // 加
  add(v: Vector): Vector {
    this.x += v.x;
    this.y += v.y;
    return new Vector(this.x, this.y);
  }

  // 减
  sub(v: Vector): Vector {
    this.x -= v.x;
    this.y -= v.y;
    return new Vector(this.x, this.y);
  }

  // 数乘
  multi(a: number): Vector {
    this.x *= a;
    this.y *= a;
    return new Vector(this.x, this.y);
  }

  // 数除
  div(a: number): Vector {
    if (a === 0) throw new Error('cannot divide zero');
    this.x /= a;
    this.y /= a;
    return new Vector(this.x, this.y);
  }

  // 点乘
  dot(v: Vector): number {
    return this.x * v.x + this.y * v.y;
  }

  // 叉乘
  cross(v: Vector): number {
    return this.x * v.y - this.y * v.x;
  }

  // 标准化
  normalize(): Vector {
    const mag = this.mag();
    if (mag !== 0 && mag !== 1) return this.div(mag);
    return this.copy();
  }

  // 限制大小
  limit(size: number): Vector {
    return this.mag(Math.min(this.mag(), size));
  }

  // 旋转
  rotate(a: number): Vector {
    this.x = Math.cos(a) * this.x - Math.sin(a) * this.y;
    this.y = Math.sin(a) * this.x + Math.cos(a) * this.y;
    return new Vector(this.x, this.y);
  }

  // 垂直
  perpendicular(): Vector {
    return new Vector(-this.y, this.x);
  }

  // 两向量的距离
  distance(v: Vector): number {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx ** 2 + dy ** 2);
  }

  // 两个向量之间的夹角
  angleBetween(v: Vector): number {
    const a = this.copy().normalize();
    const b = v.copy().normalize();
    return Math.acos(a.dot(b));
  }
}
