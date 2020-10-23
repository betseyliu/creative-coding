import React, { Fragment } from 'react';
import Page from './Page.tsx';
import p5 from 'p5';
import { VisualPoint } from '../Libs/point.ts';
const POINT_NUM = 1000;

const RandomPoints = {
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

const RandomPoints2 = {
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

const blocks = [RandomPoints, RandomPoints2];

export default () => <Page blocks={blocks} />;
