import React, { FC, useRef, useEffect } from 'react';
import styles from './index.module.scss';
import p5 from 'p5/lib/p5';

interface BlockProps {
  name: string;
  sketch: (p: p5) => void;
}
const Block: FC<BlockProps> = ({ name = '', sketch = () => {} }) => {
  const $box = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    new p5(sketch, $box.current);
  }, []);
  return (
    <div>
      <h3 className={styles.title}>{name}</h3>
      <div className={styles.block} ref={$box}></div>
    </div>
  );
};

export default Block;
