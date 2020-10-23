import p5 from 'p5';
export const setup = (p: p5) => {
  p.createCanvas(400, 400);
  p.ellipseMode(p.RADIUS);
  p.rectMode(p.CORNERS);
  p.background('#111111');
  p.stroke(255);
  p.noFill();
};
