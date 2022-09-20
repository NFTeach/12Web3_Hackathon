import { useState, useEffect } from 'react';
import Link from 'next/link';
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
    const [question1, setQuestion1] = useState("");
    const [question1Answer, setQuestion1Answer] = useState("");
    const [fakeQuestion1Answer1, setFakeQuestion1Answer1] = useState("");
    const [fakeQuestion1Answer2, setFakeQuestion1Answer2] = useState("");
    const [fakeQuestion1Answer3, setFakeQuestion1Answer3] = useState("");
    const [shuffledAnswer1, setShuffledAnswer1] = useState("");
    const [shuffledAnswer2, setShuffledAnswer2] = useState("");
    const [shuffledAnswer3, setShuffledAnswer3] = useState("");
    const [shuffledAnswer4, setShuffledAnswer4] = useState("");
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [correctAnswerCount, setCorrectAnswerCount] = useState(0);

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

    useEffect (async () => {
        const answerArr = [
            question1Answer,
            fakeQuestion1Answer1,
            fakeQuestion1Answer2,
            fakeQuestion1Answer3
        ];
        const shuffledAnswerArr = answerArr.sort(() => Math.random() - 0.5);
        setShuffledAnswer1(shuffledAnswerArr[0]);
        setShuffledAnswer2(shuffledAnswerArr[1]);
        setShuffledAnswer3(shuffledAnswerArr[2]);
        setShuffledAnswer4(shuffledAnswerArr[3]);
    }, [question1Answer, fakeQuestion1Answer1, fakeQuestion1Answer2, fakeQuestion1Answer3]);

    console.log(selectedAnswer, question1Answer, correctAnswerCount);
    const handleCorrectAnswerCount = async () => {
        if (selectedAnswer != question1Answer) {
            return null
        } else {
            setCorrectAnswerCount(correctAnswerCount + 1);
        }
    }
    
    // console.log(shuffledAnswer1, shuffledAnswer2, shuffledAnswer3, shuffledAnswer4);
    // console.log(correctAnswerCount);

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
                        placeholder={shuffledAnswer1}
                        isReadOnly
                        />
                        <Textarea
                        className={stylesFirstBlock.progressDefault}
                        variant="flushed"
                        size="sm"
                        placeholder={shuffledAnswer2}
                        isReadOnly
                        />
                        <Textarea
                        className={stylesFirstBlock.progressDefault}
                        variant="flushed"
                        size="sm"
                        placeholder={shuffledAnswer3}
                        isReadOnly
                        />
                        <Textarea
                        className={stylesFirstBlock.progressDefault}
                        variant="flushed"
                        size="sm"
                        placeholder={shuffledAnswer4}
                        isReadOnly
                        />
                    </div>
                    <RadioGroup onChange={setSelectedAnswer} value={selectedAnswer} >
                        <div className={stylesFirstBlock.frameDiv8}>
                            <div className={stylesFirstBlock.frameDiv9}>
                            <Radio colorScheme="green" value={shuffledAnswer1}/>
                            <Radio colorScheme="green" value={shuffledAnswer2}/>
                            <Radio colorScheme="green" value={shuffledAnswer3}/>
                            <Radio colorScheme="green" value={shuffledAnswer4}/>
                            </div>
                        </div>
                    </RadioGroup>
                    </div>
                </div>
                
                <div className={stylesFirstBlock.frameDiv10}>
                    <Link href={{ pathname: "/course",
                        query: { 
                            courseObjectId: props.courseObjectId 
                        }}} passHref>
                        <Button
                        variant="solid"
                        w="162px"
                        colorScheme="green"
                        >
                        Back
                        </Button>
                    </Link>
                    <Link href={{ pathname: "/test/question2",
                        query: {
                            courseObjectId: props.courseObjectId,
                            correctAnswerCount: correctAnswerCount
                        }}} passHref>
                        <Button
                        variant="solid"
                        w="162px"
                        colorScheme="green"
                        onClick={async () => {
                            await handleCorrectAnswerCount();
                        }}
                        >
                        Next
                        </Button>
                    </Link>
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