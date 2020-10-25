import p5 from 'p5';
export const setup = (p: p5, width: number = 400, height: number = 400) => {
  p.createCanvas(width, height);
  p.ellipseMode(p.RADIUS);
  p.rectMode(p.CORNERS);
  p.background('#111111');
  p.stroke(255);
  p.noFill();
};
