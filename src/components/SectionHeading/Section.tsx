import { useContext } from 'react';
import { LevelContext } from './LevelContext';

const Section = ({ children }: { children: React.ReactNode }) => {
  const level = useContext(LevelContext);
  return (
    <LevelContext.Provider value={level + 1}>
      <section style={{ border: '1px solid gray', padding: '16px' }}>{children}</section>
    </LevelContext.Provider>
  );
};

export default Section;
