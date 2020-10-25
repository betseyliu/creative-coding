import React, { FC, useRef, useEffect, useState } from 'react';
import styles from './index.module.scss';
import p5 from 'p5';
import classNames from 'classnames';

interface BlockProps {
  name: string;
  codes?: string;
  sketch: (p: p5) => void;
  width?: number;
  height?: number;
}
const Block: FC<BlockProps> = ({
  name = '',
  sketch = () => {},
  codes,
  width = 400,
  height = 400,
}) => {
  const $box = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    new p5(sketch, $box.current as HTMLElement);
  }, [sketch]);

  const [
    isCodeVisible,
    // setCodeVisibility
  ] = useState(false);
  return (
    <div>
      <h3 className={styles.title}>{name}</h3>
      <div
        className={styles.container}
        style={{ width: `${width}px`, height: `${height}px` }}
        // onClick={() => {
        //   setCodeVisibility(!isCodeVisible);
        // }}
      >
        <div
          className={classNames(styles.canvas, {
            [styles.isHidden]: isCodeVisible,
          })}
          ref={$box}
        ></div>
        <p className={styles.codes}>{codes}</p>
      </div>
    </div>
  );
};

export default Block;
