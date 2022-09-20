import { useState, useEffect } from 'react';
import moralis from "moralis";
import { useMoralis } from "react-moralis";
import { Textarea, Progress, Radio } from "@chakra-ui/react";
import stylesFirstBlock from "../../styles/Test_Pages/Question1/FirstBlock.module.css"

moralis.initialize(process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;

const question1 = (props) => {
    
    const { Moralis } = useMoralis();
    const [course, setCourse] = useState();
    const [courseName, setCourseName] = useState();
    const [test, setTest] = useState();
    const [question1, setQuestion1] = useState();
    // const [question1Answer, setQuestion1Answer] = useState();
    // const [fakeQuestion1Answer1, setFakeQuestion1Answer1] = useState();
    // const [fakeQuestion1Answer2, setFakeQuestion1Answer2] = useState();
    // const [fakeQuestion1Answer3, setFakeQuestion1Answer3] = useState();

    useEffect (async () => {
        const Courses = Moralis.Object.extend("Courses");
        const query = new Moralis.Query(Courses);
        query.equalTo("objectId", props.courseObjectId);
        const course = await query.find();
        setCourse(course);
        setCourseName(course[0].get("courseName"));
        setTest(course[0].get("test"));
    }, []);

    const question1Answer = question1?.question1Answer;
    const fakeQuestion1Answer1 = question1?.fakeQuestion1Answer1;
    const fakeQuestion1Answer2 = question1?.fakeQuestion1Answer2;
    const fakeQuestion1Answer3 = question1?.fakeQuestion1Answer3;

    useEffect (async () => {
        const question1 = test?.question1;
        

        const setAnswerArr = () => {
            const answerArr = [question1Answer, fakeQuestion1Answer1, fakeQuestion1Answer2, fakeQuestion1Answer3];
            const shuffledAnswerArr = answerArr.sort(() => Math.random() - 0.5);
            console.log(shuffledAnswerArr);
        };
        setAnswerArr();
    }, []);

    // console.log(question1);
    // const answerArr = [
    //     test?.question1Answer,
    //     test?.fakeQuestion1Answer1,
    //     test?.fakeQuestion1Answer2,
    //     test?.fakeQuestion1Answer3
    // ];
    // const shuffledAnswerArr = answerArr.sort(() => Math.random() - 0.5);
    // console.log(test);
    return (
        <>
        {/* First Block */}
            <div className={stylesFirstBlock.testPageDiv}>
                <div className={stylesFirstBlock.frameDiv}>
                    <div className={stylesFirstBlock.frameDiv1}>
                    <div className={stylesFirstBlock.frameDiv2}>
                        <Textarea
                        className={stylesFirstBlock.textAreaOutlineTextarea}
                        variant="outline"
                        isDisabled={true}
                        placeholder={courseName}
                        />
                        <div className={stylesFirstBlock.byDiv}>By:</div>
                        <img className={stylesFirstBlock.nFT1Icon} alt="" src="../nft-1@2x.png" />
                    </div>
                    </div>
                    <Progress
                    className={stylesFirstBlock.progressDefault}
                    value={10}
                    colorScheme="green"
                    />
                    <div className={stylesFirstBlock.frameDiv3}>
                    <div className={stylesFirstBlock.frameDiv4}>
                        <div className={stylesFirstBlock.frameDiv5}>
                        <div className={stylesFirstBlock.questionNumberTitle}>Question 1:</div>
                        <Textarea
                            className={stylesFirstBlock.progressDefault}
                            variant="outline"
                            isDisabled={true}
                            placeholder={test?.question1}
                        />
                        </div>
                        <div className={stylesFirstBlock.lineDiv} />
                        <div className={stylesFirstBlock.frameDiv6}>
                        <Textarea
                            className={stylesFirstBlock.textAreaOutlineTextarea}
                            variant="outline"
                            size="xs"
                            placeholder="Answer 1"
                            isReadOnly
                        />
                        <Radio colorScheme="green" />
                        </div>
                        <div className={stylesFirstBlock.frameDiv6}>
                        <Textarea
                            className={stylesFirstBlock.textAreaOutlineTextarea}
                            variant="outline"
                            placeholder="Answer 2"
                        />
                        <Radio colorScheme="green" />
                        </div>
                        <div className={stylesFirstBlock.frameDiv6}>
                        <Textarea
                            className={stylesFirstBlock.textAreaOutlineTextarea}
                            variant="outline"
                            placeholder="Answer 3"
                        />
                        <Radio colorScheme="green" />
                        </div>
                        <div className={stylesFirstBlock.frameDiv6}>
                        <Textarea
                            className={stylesFirstBlock.textAreaOutlineTextarea}
                            variant="outline"
                            placeholder="Answer 4"
                        />
                        <Radio colorScheme="green" />
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default question1

// Recieve props from next/pages/course.jsx
export const getServerSideProps = (context) => {
    
    return {
        props: {
            courseObjectId: context.query.courseObjectId,
        },
    };
};