import { LevelContext } from './LevelContext';

const Section = ({ level, children }: { level: number; children: React.ReactNode }) => {
  return (
    <LevelContext.Provider value={level}>
      <section style={{ border: '1px solid gray', padding: '16px' }}>{children}</section>
    </LevelContext.Provider>
  );
};

export default Section;
