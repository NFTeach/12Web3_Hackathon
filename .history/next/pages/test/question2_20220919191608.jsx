

const question2 = (props) => {
    console.log(props.correctAnswerCount);
  return (
    <>
      <h1>Question 2 page</h1>
    </>
  )
}

export default question2

// Recieve props from next/pages/question1.jsx
export const getServerSideProps = (context) => {
    
    return {
        props: {
            courseObjectId: context.query.courseObjectId,
            correctAnswerCount: context.query.correctAnswerCount
        },
    };
};