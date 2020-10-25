import React from 'react';
import Page from './Page';
import p5 from 'p5';
import { VisualParticle, Attractor } from '../libs/particle';
import { Vector } from '../libs/vector';
const P_NUM = 800;

const blocks = [
  {
    name: 'Random Particles',
    renderFunction: (p: p5) => {
      const particles = [];
      for (let i = 0; i < P_NUM; i++) {
        const x = p.random(p.width);
        const y = p.random(p.height);
        particles[i] = new VisualParticle(x, y, p.color('#ddd'), 1);
      }
      for (let time = 0; time < 100; time++) {
        particles.forEach((particle) => {
          const x = p.random(-1, 1);
          const y = p.random(-1, 1);
          const force = new Vector(x, y);
          particle.apply(force);
          particle.update();
          particle.display(p);
        });
      }
    },
  },
  {
    name: 'Gravitation at center',
    renderFunction: (p: p5) => {
      const particles = [];
      for (let i = 0; i < P_NUM; i++) {
        const x = p.random(p.width);
        const y = p.random(p.height);
        particles[i] = new VisualParticle(x, y, p.color('#ddd'), 1);
      }
      const acctractor = new Attractor(p.width / 2, p.height / 2, 1); // mag is positive means the acctraction is gravitation
      for (let time = 0; time < 100; time++) {
        particles.forEach((particle) => {
          const force = acctractor.force(particle.position);
          particle.apply(force);
          particle.update();
          particle.display(p);
        });
      }
    },
  },
  {
    name: 'Repulsion at center',
    renderFunction: (p: p5) => {
      const particles = [];
      for (let i = 0; i < P_NUM; i++) {
        const x = p.random(p.width);
        const y = p.random(p.height);
        particles[i] = new VisualParticle(x, y, p.color('#ddd'), 1);
      }
      const acctractor = new Attractor(p.width / 2, p.height / 2, -1); // mag is negative means the acctraction is repulsion
      for (let time = 0; time < 100; time++) {
        particles.forEach((particle) => {
          const force = acctractor.force(particle.position);
          particle.apply(force);
          particle.update();
          particle.display(p);
        });
      }
    },
  },
  {
    name: 'Random repulsion and gravitation',
    renderFunction: (p: p5) => {
      const particles = [];
      for (let i = 0; i < P_NUM; i++) {
        const x = p.random(p.width);
        const y = p.random(p.height);
        particles[i] = new VisualParticle(x, y, p.color('#ddd'), 1);
      }
      const attractors: Attractor[] = [];
      for (let i = 0; i < 4; i++) {
        const x = p.random(p.width);
        const y = p.random(p.height);
        const mag = p.random(1, -1);
        attractors[i] = new Attractor(x, y, mag);
      }

      for (let time = 0; time < 100; time++) {
        particles.forEach((particle) => {
          attractors.forEach((attractor) => {
            const force = attractor.force(particle.position);
            particle.apply(force);
          });
          particle.update();
          particle.display(p);
        });
      }
    },
  },
  {
    name: 'Random repulsion and gravitation 2',
    renderFunction: (p: p5) => {
      const particles = [];
      for (let i = 0; i < P_NUM; i++) {
        const x = p.random(p.width);
        const y = p.height / 2;
        particles[i] = new VisualParticle(x, y, p.color('#ddd'), 1);
      }
      const attractors: Attractor[] = [];
      for (let i = 0; i < 10; i++) {
        const x = p.random(p.width);
        const y = p.random(p.height);
        const mag = p.random(1, -1);
        attractors[i] = new Attractor(x, y, mag);
      }

      for (let time = 0; time < 200; time++) {
        particles.forEach((particle) => {
          const attractor = attractors[~~p.random(0, attractors.length - 1)];
          const force = attractor.force(particle.position);
          particle.apply(force);
          particle.update();
          particle.display(p);
        });
      }
    },
    width: 1000,
    height: 500,
  },
];

export default () => <Page blocks={blocks} />;
