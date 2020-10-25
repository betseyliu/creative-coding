import React, { Fragment, FC } from 'react';
import Block from './Block';
import { setup } from './common';
import p5 from 'p5';

type RenderFunction = (p: p5) => void;

interface BlockProps {
  name: string;
  renderFunction: RenderFunction;
  width?: number;
  height?: number;
}

interface PagesProps {
  blocks: BlockProps[];
}

const Pages: FC<PagesProps> = ({ blocks = [] }) => {
  const sketchFunction = (
    p: p5,
    renderFunction: RenderFunction,
    width = 500,
    height = 500
  ) => {
    p.setup = () => {
      setup(p, width, height);
      renderFunction(p);
    };
  };
  return (
    <Fragment>
      {blocks.map(({ name, renderFunction, width = 500, height = 500 }) => {
        return (
          <Block
            key={name}
            name={name}
            width={width}
            height={height}
            sketch={(p) => {
              sketchFunction(p, renderFunction, width, height);
            }}
            codes={renderFunction.toString()}
          />
        );
      })}
    </Fragment>
  );
};

export default Pages;
