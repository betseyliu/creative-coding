import { Vector } from './vector';
import p5, { Color } from 'p5';

export class Particle {
  position: Vector; // 位置
  velocity: Vector; // 速度
  acceleration: Vector; // 加速度
  mass: number; // 质量
  maxSpeed: number; // 最大速率

  constructor(
    x: number,
    y: number,
    { mass = 1, maxSpeed = 1 }: { mass: number; maxSpeed: number }
  ) {
    this.position = new Vector(x, y);
    this.velocity = new Vector();
    this.mass = mass;
    this.maxSpeed = maxSpeed;
    this.acceleration = new Vector();
  }

  // 施加力 f = ma;
  apply(force: Vector) {
    this.acceleration = this.acceleration.add(force.div(this.mass));
  }

  // 更新
  update() {
    this.velocity = this.velocity.add(this.acceleration).limit(this.maxSpeed); // 更新速度， 限制最大速度
    this.position = this.position.add(this.velocity); // 更新位置
    this.acceleration = this.acceleration.multi(0); // 加速度清零
  }
}

// 影响力
export class Attractor {
  position: Vector;
  magnitude: number;

  constructor(x: number, y: number, mag: number) {
    this.position = new Vector(x, y);
    this.magnitude = mag;
  }

  // 对点v的影响力
  force(v: Vector): Vector {
    const f = this.position.copy().sub(v); // 计算力的方向
    f.normalize().multi(this.magnitude);
    return f;
  }
}

export class VisualParticle extends Particle {
  color: Color;
  weight: number;
  constructor(
    x: number,
    y: number,
    c: Color,
    w: number,
    {
      mass = 1,
      maxSpeed = 1,
    }: {
      mass?: number;
      maxSpeed?: number;
    } = {}
  ) {
    super(x, y, { mass, maxSpeed });
    this.color = c;
    this.weight = w;
  }

  display(p: p5) {
    p.stroke(p.color(this.color));
    p.strokeWeight(this.weight);
    p.point(this.position.x, this.position.y);
  }
}
