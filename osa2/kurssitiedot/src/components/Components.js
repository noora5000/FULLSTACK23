const Course = (props) => {
    const { name, parts } = props.course;
    return (
      <>
        <Header courseName={name} />
        <Content parts={parts} />
        <Total parts={parts} />
      </>
    );
};
const Header = (props) => {
    const { courseName } = props
    return (
      <>
        <h1>{courseName}</h1>
      </>
    );
};
  
const Content = (props) => {
  const { parts } = props;
  const partsMap = parts.map((part) => (
    <Part key={part.id} name={part.name} exercises={part.exercises} />
  ))
  return (
    <>
      {partsMap}
    </>
  );
};

const Part = (props) => {
  const { name, exercises } = props;
  return (
    <>
      <p>{name} {exercises}</p>
    </>
  );
};

const Total = (props) => {
  const { parts } = props;
  const sum = parts.reduce((total, part) => total + part.exercises, 0);

  return (
    <>
      <b>Total of {sum} exercises</b>
    </>
  );
};
  
export default Course;