import React, { Fragment, FC } from 'react';
import Block from './Block.tsx';
import { setup } from './common.ts';
import p5 from 'p5';
import { render } from 'react-dom';

type RenderFunction = (p: p5) => void;

interface BlockProps {
  name: string;
  renderFunction: RenderFunction;
}

interface PagesProps {
  blocks: BlockProps[];
}

const Pages: FC<PagesProps> = ({ blocks = [] }) => {
  const sketchFunction = (p: p5, renderFunction: RenderFunction) => {
    p.setup = () => {
      setup(p);
      renderFunction(p);
    };
  };

  return (
    <Fragment>
      {blocks.map(({ name, renderFunction }) => (
        <Block
          key={name}
          name={name}
          sketch={(p) => {
            sketchFunction(p, renderFunction);
          }}
        />
      ))}
    </Fragment>
  );
};

export default Pages;
