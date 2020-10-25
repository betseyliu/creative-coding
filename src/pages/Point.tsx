import React from 'react';
import Page from './Page';
import p5 from 'p5';
import { VisualPoint, Point } from '../libs/point';
import { polarToCartesian } from '../libs/math';
const POINT_NUM = 1000;

const randomPoints = {
  name: 'Random Points',
  renderFunction: (p: p5) => {
    const points: VisualPoint[] = [];
    for (let i = 0; i < POINT_NUM; i++) {
      const x = p.random(p.width);
      const y = p.random(p.height);
      const w = p.random(1, 5);
      const c = p.color(p.random(200));
      points[i] = new VisualPoint(x, y, w, c);
    }

    points.forEach((point) => point.display(p));
  },
};

const randomPoints2 = {
  name: 'Random Points 2',
  renderFunction: (p: p5) => {
    const points: VisualPoint[] = [];
    for (let i = 0; i < POINT_NUM; i++) {
      const x = p.random(p.width);
      const random = p.random(1) ** 0.2;
      const y = p.map(random, 0, 1, 0, p.height);
      const w = p.random(1, 5);
      const c = p.color(p.random(200));
      points[i] = new VisualPoint(x, y, w, c);
    }
    points.forEach((point) => point.display(p));
  },
};

const randomPointsInCircle = {
  name: 'Random Points in Circle',
  renderFunction: (p: p5) => {
    const points: VisualPoint[] = [];
    for (let i = 0; i < POINT_NUM; i++) {
      const radian = p.random(p.TAU);
      const radius = p.random(0.4 * p.width);
      const { x, y } = polarToCartesian(radius, radian);
      const w = p.random(1, 5);
      const c = p.color(p.random(200));

      points[i] = new VisualPoint(x, y, w, c);
    }

    p.translate(p.width / 2, p.height / 2);
    points.forEach((point) => point.display(p));
  },
};

const randomPointsInCircle2 = {
  name: 'Random Points in Circle 2',
  renderFunction: (p: p5) => {
    const points: VisualPoint[] = [];
    for (let i = 0; i < POINT_NUM; i++) {
      const radian = p.random(p.TAU);
      const radius = p.random(1) ** 0.5 * 0.4 * p.width; // 对生成半径的随机数开方可以解决中间密，外边疏的情况
      const { x, y } = polarToCartesian(radius, radian);
      const w = p.random(1, 5);
      const c = p.color(p.random(200));

      points[i] = new VisualPoint(x, y, w, c);
    }

    p.translate(p.width / 2, p.height / 2);
    points.forEach((point) => point.display(p));
  },
};

const randomPointsInCircle3 = {
  name: 'Random Points in Circle 3',
  renderFunction: (p: p5) => {
    const points: VisualPoint[] = [];
    for (let i = 0; i < POINT_NUM; i++) {
      const radian = p.random(p.TAU);
      const radius = p.random(1) ** 0.1 * 0.4 * p.width; // 对生成半径的随机数开方可以解决中间密，外边疏的情况
      const { x, y } = polarToCartesian(radius, radian);
      const w = p.random(1, 5);
      const c = p.color(p.random(200));

      points[i] = new VisualPoint(x, y, w, c);
    }

    p.translate(p.width / 2, p.height / 2);
    points.forEach((point) => point.display(p));
  },
};

const equidistributionPointsInCircle = {
  name: 'Equidistribution Points in Circle',
  renderFunction: (p: p5) => {
    const points: VisualPoint[] = [];
    let radius = 10; // 初始半径
    let radian = 0; // 初始弧度
    const arc = 10; // 弧长间距
    let count = 0;

    while (radius < p.width / 2) {
      const { x, y } = polarToCartesian(radius, radian);
      const w = p.random(1, 5);
      const c = p.color(p.random(200));
      points.push(new VisualPoint(x, y, w, c));

      const num = ~~((p.TAU * radius) / arc);
      radian += p.TAU / num;
      count++;
      if (count === num) {
        count = 0;
        radian = 0;
        radius += 10;
      }
    }

    p.translate(p.width / 2, p.height / 2);
    points.forEach((point) => point.display(p));
  },
};

const randomLinks = {
  name: 'Random links',
  renderFunction: (p: p5) => {
    const points: Point[] = [];

    for (let i = 0; i < POINT_NUM / 10; i++) {
      const x = p.random(p.width);
      const y = p.random(p.height);
      points[i] = new Point(x, y);
    }

    for (let i = 0; i < points.length; i++) {
      const pa = points[i];
      for (let j = i; j < points.length; j++) {
        const pb = points[j];
        const dist = pa.distance(pb);

        if (dist < p.width / 2) {
          const alpha = p.map(dist, 0, p.width / 2, 0, 40);
          const weight = p.map(dist, 0, p.width / 2, 2, 0);

          p.stroke(p.color(255, alpha));
          p.strokeWeight(weight);
          p.line(pa.x, pa.y, pb.x, pb.y);
        }
      }
    }
  },
};

const pointsCircle = {
  name: 'Points circle',
  renderFunction(p: p5) {
    const points: VisualPoint[] = [];
    for (let i = 0; i < POINT_NUM / 2; i++) {
      const x = p.random(p.width);
      const y = p.random(p.height);
      const w = 1;
      const c = p.color(p.random(200));

      points[i] = new VisualPoint(x, y, w, c);
    }

    const center = new Point(p.width / 2, p.height / 2);

    for (let time = 0; time < 100; time++) {
      points.forEach((point) => {
        point.rotate(center, 0.01);
        point.display(p);
      });
    }
  },
};

const pointsRotateAroundPrevious = {
  name: 'Points rotate around previous',
  renderFunction(p: p5) {
    const points: VisualPoint[] = [];
    for (let i = 0; i < POINT_NUM / 2; i++) {
      const x = p.random(p.width);
      const y = p.random(p.height);
      const w = 1;
      const c = p.color(p.random(200));

      points[i] = new VisualPoint(x, y, w, c);
    }

    for (let time = 0; time < 100; time++) {
      points.forEach((point, index) => {
        const next = (index + 1) % points.length;
        point.rotate(points[next], 0.01);
        point.display(p);
      });
    }
  },
};
const linksRotateAroundPrevious = {
  name: 'links rotate around previous',
  renderFunction(p: p5) {
    const points: Point[] = [];
    for (let i = 0; i < POINT_NUM / 10; i++) {
      const x = p.random(p.width);
      const y = p.random(p.height);

      points[i] = new Point(x, y);
    }

    // 旋转规则
    for (let time = 0; time < 20; time++) {
      points.forEach((point, index) => {
        const next = (index + 1) % points.length;
        point.rotate(points[next], 0.01);
      });
      // 距离规则
      for (let i = 0; i < points.length; i++) {
        const pa = points[i];
        for (let j = i; j < points.length; j++) {
          const pb = points[j];
          const dist = pa.distance(pb);
          if (dist < p.width / 5) {
            const alpha = p.map(dist, 0, p.width / 2, 0, 40);
            const weight = p.map(dist, 0, p.width / 2, 2, 0);

            p.stroke(p.color(255, alpha));
            p.strokeWeight(weight);
            p.line(pa.x, pa.y, pb.x, pb.y);
          }
        }
      }
    }
  },
};
const blocks = [
  randomPoints,
  randomPoints2,
  randomPointsInCircle,
  randomPointsInCircle2,
  randomPointsInCircle3,
  equidistributionPointsInCircle,
  randomLinks,
  pointsCircle,
  pointsRotateAroundPrevious,
  linksRotateAroundPrevious,
];

export default () => <Page blocks={blocks} />;
