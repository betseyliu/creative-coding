import React, { useState } from 'react';
import logo from './logo.svg';
import styles from './App.module.scss';
import classNames from 'classnames';
import Point from './pages/Point.tsx';

const PAGES = {
  Point: <Point />,
  // Vector: undefined,
  // Line: undefined,
  // Circle: undefined,
  // Triangle: undefined,
  // Rectangle: undefined,
  // Number: undefined,
  // Tree: undefined,
  // Graph: undefined,
  // Sound: undefined,
};

function App() {
  const [activePage, setActivePage] = useState('Point');
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <a className={styles.homeLink} href="//betsey.win">
            Betsey
          </a>
          <a className={styles.link} href="/">
            Creative Coding
          </a>
        </div>
      </header>
      <ul className={styles.menu}>
        {Object.keys(PAGES).map((page) => (
          <li
            className={classNames(styles.menuItem, {
              [styles['menuItem--active']]: page === activePage,
            })}
            key={page}
            onClick={() => setActivePage(page)}
          >
            {page}
          </li>
        ))}
      </ul>
      <div className={styles.content}>{PAGES[activePage]}</div>
    </div>
  );
}

export default App;
