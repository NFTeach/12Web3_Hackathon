import { useState, useEffect } from 'react';
import moralis from "moralis";
import { useMoralis } from "react-moralis";
import { Textarea, Progress, Radio, RadioGroup, Button, Stack } from "@chakra-ui/react";
import stylesFirstBlock from "../../styles/Test_Pages/Question1/FirstBlock.module.css"

moralis.initialize(process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;

const question1 = (props) => {
    
    const { Moralis } = useMoralis();
    const [course, setCourse] = useState();
    const [courseName, setCourseName] = useState();
    const [test, setTest] = useState();
    const [question1, setQuestion1] = useState();
    const [question1Answer, setQuestion1Answer] = useState();
    const [fakeQuestion1Answer1, setFakeQuestion1Answer1] = useState();
    const [fakeQuestion1Answer2, setFakeQuestion1Answer2] = useState();
    const [fakeQuestion1Answer3, setFakeQuestion1Answer3] = useState();
    const [selctedAnswer, setSelectedAnswer] = useState();

    useEffect (async () => {
        const Courses = Moralis.Object.extend("Courses");
        const query = new Moralis.Query(Courses);
        query.equalTo("objectId", props.courseObjectId);
        const course = await query.find();
        setCourse(course);
        setCourseName(course[0].get("courseName"));
        setTest(course[0].get("test"));
        setQuestion1(course[0].get("test").question1);
        setQuestion1Answer(course[0].get("test").question1Answer);
        setFakeQuestion1Answer1(course[0].get("test").fakeQuestion1Answer1);
        setFakeQuestion1Answer2(course[0].get("test").fakeQuestion1Answer2);
        setFakeQuestion1Answer3(course[0].get("test").fakeQuestion1Answer3);
    }, []);

    const answerArr = [
        question1Answer,
        fakeQuestion1Answer1,
        fakeQuestion1Answer2,
        fakeQuestion1Answer3
    ];
    const shuffledAnswerArr = answerArr.sort(() => Math.random() - 0.5);

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
                    placeholder={courseName}
                    />
                    <div className={stylesFirstBlock.byDiv}>By:</div>
                    <img className={stylesFirstBlock.nFT1Icon} alt="" src="../nft-1@2x.png" />
                </div>
                </div>
                <div className={stylesFirstBlock.frameDiv3}>
                <div className={stylesFirstBlock.frameDiv4}>
                    <div className={stylesFirstBlock.frameDiv5}>
                    <Progress
                        className={stylesFirstBlock.progressDefault}
                        value={10}
                        colorScheme="green"
                    />
                    <div className={stylesFirstBlock.questionNumberTitle}>Question 1:</div>
                    <Textarea
                        className={stylesFirstBlock.progressDefault}
                        variant="outline"
                        placeholder={question1}
                    />
                    </div>
                    <div className={stylesFirstBlock.lineDiv} />
                    <div className={stylesFirstBlock.frameDiv6}>
                    <div className={stylesFirstBlock.frameDiv7}>
                        <Textarea
                        className={stylesFirstBlock.progressDefault}
                        variant="flushed"
                        size="sm"
                        placeholder={shuffledAnswerArr[0]}
                        isReadOnly
                        />
                        <Textarea
                        className={stylesFirstBlock.progressDefault}
                        variant="flushed"
                        size="sm"
                        placeholder={shuffledAnswerArr[1]}
                        isReadOnly
                        />
                        <Textarea
                        className={stylesFirstBlock.progressDefault}
                        variant="flushed"
                        size="sm"
                        placeholder={shuffledAnswerArr[2]}
                        isReadOnly
                        />
                        <Textarea
                        className={stylesFirstBlock.progressDefault}
                        variant="flushed"
                        size="sm"
                        placeholder={shuffledAnswerArr[3]}
                        isReadOnly
                        />
                    </div>
                    <RadioGroup onChange={setSelectedAnswer} value={value}>
                        <Stack direction="row">
                        <div className={stylesFirstBlock.frameDiv8}>
                            <div className={stylesFirstBlock.frameDiv9}>
                            <Radio colorScheme="green" value={shuffledAnswerArr[0]}/>
                            <Radio colorScheme="green" value={shuffledAnswerArr[1]}/>
                            <Radio colorScheme="green" value={shuffledAnswerArr[2]}/>
                            <Radio colorScheme="green" value={shuffledAnswerArr[3]}/>
                            </div>
                        </div>
                        </Stack>
                    </RadioGroup>
                    </div>
                </div>
                <div className={stylesFirstBlock.frameDiv10}>
                    <Button
                    variant="solid"
                    w="162px"
                    colorScheme="green"
                    as="a"
                    href="/course"
                    >
                    Back
                    </Button>
                    <Button
                    variant="solid"
                    w="162px"
                    colorScheme="green"
                    as="a"
                    href="/question2"
                    >
                    Next
                    </Button>
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