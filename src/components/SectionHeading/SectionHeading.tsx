import Section from './Section';
import Heading from './Heading';

const SectionHeading = () => {
  return (
    <Section level={1}>
      <Heading>Heading 1</Heading>
      <Section level={2}>
        <Heading>Heading 2</Heading>
        <Heading>Heading 2</Heading>
        <Section level={3}>
          <Heading>Heading 3</Heading>
          <Heading>Heading 3</Heading>
          <Heading>Heading 3</Heading>
        </Section>
      </Section>
    </Section>
  );
};

export default SectionHeading;
