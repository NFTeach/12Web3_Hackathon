import { useState } from 'react';

const question2 = (props) => {
    const [correctAnswerCount, setCorrectAnswerCount] = useState(props.correctAnswerCount);
    console.log(props.courseObjectId);
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