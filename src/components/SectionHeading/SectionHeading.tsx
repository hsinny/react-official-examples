import Section from './Section';
import Heading from './Heading';

const SectionHeading = () => {
  return (
    <Section>
      <Heading>Heading 1</Heading>
      <Section>
        <Heading>Heading 2</Heading>
        <Heading>Heading 2</Heading>
        <Section>
          <Heading>Heading 3</Heading>
          <Heading>Heading 3</Heading>
          <Heading>Heading 3</Heading>
        </Section>
      </Section>
    </Section>
  );
};

export default SectionHeading;
