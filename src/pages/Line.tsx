import React from 'react';
import Page from './Page';
import p5 from 'p5';
import { Point } from '../libs/point';
import { VisualLine } from '../libs/line';
import { progression } from '../libs/math';
const LINE_NUM = 100;

const blocks = [
  {
    name: 'Random lines',
    renderFunction: (p: p5) => {
      const gap = p.width / LINE_NUM;
      const lines = [];
      for (let i = 0; i < LINE_NUM; i++) {
        const p1 = new Point(i * gap, p.random(p.height));
        const p2 = new Point(i * gap, p.random(p.height));
        const line = new VisualLine(p1, p2, p.color('#ddd'), 1);
        line.setWeight(p.map(line.length(), 0, p.height, 0, 3));
        line.setColor(p.color(p.map(line.length(), 0, p.height, 30, 230)));
        lines.push(line);
      }
      lines.forEach((line) => line.display(p));
    },
    height: 500,
    width: 500,
  },
  {
    name: 'Perlin lines',
    renderFunction(p: p5) {
      const lines = [];
      for (let i = 0; i < LINE_NUM; i++) {
        const x = p.map(i, 0, LINE_NUM - 1, 0, p.width);
        const y = p.noise(i / 100) * p.height;
        const len = p.height / 3;
        const p1 = new Point(x, y - len / 2);
        const p2 = new Point(x, y + len / 2);
        lines.push(new VisualLine(p1, p2, p.color('#ddd'), 1));
      }

      lines.forEach((line) => line.display(p));
    },
  },
  {
    name: 'progression lines',
    renderFunction(p: p5) {
      const lines = [];
      const progressionArr = progression(30, 1.1);
      const min = p.min(progressionArr);
      const max = p.max(progressionArr);
      for (let i = 0; i < progressionArr.length; i++) {
        const x = p.map(progressionArr[i], min, max, 0, p.width);
        const c = p.color('#ddd');
        const w = 1;
        lines.push(
          new VisualLine(new Point(x, 0), new Point(x, p.height), c, w)
        );
      }
      lines.forEach((line) => line.display(p));
    },
  },
  {
    name: 'rotate around edge',
    renderFunction(p: p5) {
      const lines = [];
      for (let i = 0; i < LINE_NUM; i++) {
        const x = p.map(i, 0, LINE_NUM - 1, 0, p.width);
        const p1 = new Point(x, p.random(p.height));
        const p2 = new Point(x, p.random(p.height));
        const line = new VisualLine(p1, p2, p.color('#ddd'), 1);
        line.setColor(
          p.color(
            `rgba(150, 150, 150, ${p.map(line.length(), 0, p.height, 0, 0.2)})`
          )
        );
        lines.push(line);
      }

      for (let time = 0; time < 30; time++) {
        lines.forEach((line) => {
          line.p1.rotate(line.p2, 0.012);
          line.display(p);
        });
      }
    },
  },
  {
    name: 'rotate around next line edge',
    renderFunction(p: p5) {
      const lines = [];
      for (let i = 0; i < LINE_NUM; i++) {
        const x = p.map(i, 0, LINE_NUM - 1, 0, p.width);
        const p1 = new Point(x, p.random(p.height));
        const p2 = new Point(x, p.random(p.height));
        const line = new VisualLine(p1, p2, p.color('#ddd'), 1);
        line.setColor(
          p.color(
            `rgba(150, 150, 150, ${p.map(line.length(), 0, p.height, 0, 0.2)})`
          )
        );
        lines.push(line);
      }

      for (let time = 0; time < 80; time++) {
        for (let i = 0; i < lines.length; i++) {
          const l1 = lines[i];
          const l2 = lines[(i + 1) % lines.length];
          l1.p1.rotate(l1.p2, 0.01);
          l1.p2.rotate(l2.p1, 0.01);
          l1.display(p);
        }
      }
    },
  },
  {
    name: 'rotate around center',
    renderFunction(p: p5) {
      const lines = [];
      for (let i = 0; i < 10; i++) {
        const p1 = new Point(p.random(p.width), p.random(p.height));
        const p2 = new Point(p.random(p.width), p.random(p.height));
        lines.push(new VisualLine(p1, p2, p.color(200, 20), 1));
      }

      const center = new Point(p.width / 2, p.height / 2);

      for (let time = 0; time < 500; time++) {
        lines.forEach((line) => {
          line.rotate(center, 0.02);
          line.display(p);
        });
      }
    },
  },
  {
    name: 'rotate around center and next line edge',
    renderFunction(p: p5) {
      const lines = [];
      for (let i = 0; i < 10; i++) {
        const p1 = new Point(p.random(p.width), p.random(p.height));
        const p2 = new Point(p.random(p.width), p.random(p.height));
        lines.push(new VisualLine(p1, p2, p.color(200, 20), 1));
      }

      const center = new Point(p.width / 2, p.height / 2);

      for (let time = 0; time < 500; time++) {
        for (let i = 0; i < lines.length; i++) {
          const l1 = lines[i];
          const l2 = lines[(i + 1) % lines.length];
          l1.rotate(center, 0.01);
          l1.p2.rotate(l2.p1, 0.01);
          l1.display(p);
        }
      }
    },
  },
  {
    name: 'Lerp lines',
    renderFunction(p: p5) {
      const lines = [];
      for (let i = 0; i < 10; i++) {
        const p1 = new Point(p.random(p.width), p.random(p.height));
        const p2 = new Point(p.random(p.width), p.random(p.height));
        lines.push(new VisualLine(p1, p2, p.color(200, 20), 1));
      }
      for (let time = 0; time < 1000; time++) {
        const t = p.map(time, 0, 1000, 0, 1);
        for (let i = 0; i < lines.length - 1; i++) {
          const l1 = lines[i];
          const l2 = lines[i + 1];
          const p1 = l1.lerp(t);
          const p2 = l2.lerp(t);
          const d = p1.distance(p2);
          const alpha = p.map(d, 0, p.width, 10, 0);
          p.stroke(p.color(200, alpha));
          p.line(p1.x, p1.y, p2.x, p2.y);
        }
      }
    },
  },
  {
    name: 'Intersections',
    renderFunction(p: p5) {
      const lines = [];
      for (let i = 0; i < 10; i++) {
        const p1 = new Point(p.random(p.width), p.random(p.height));
        const p2 = new Point(p.random(p.width), p.random(p.height));
        lines.push(new VisualLine(p1, p2, p.color(200, 200), 1));
      }
      for (let i = 0; i < lines.length; i++) {
        const cur = lines[i];
        cur.display(p);
        for (let j = 0; j < lines.length; j++) {
          if (lines[j] === cur) continue;
          const pp = cur.intersect(lines[j]);
          if (pp) {
            p.stroke(255);
            p.strokeWeight(5);
            p.point(pp.x, pp.y);
          }
        }
      }
    },
  },
];

export default () => <Page blocks={blocks} />;
