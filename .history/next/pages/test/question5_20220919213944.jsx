import { useState, useEffect } from 'react';
import Link from 'next/link';
import moralis from "moralis";
import { useMoralis } from "react-moralis";
import { Textarea, Progress, Radio, RadioGroup, Button } from "@chakra-ui/react";
import stylesFirstBlock from "../../styles/Test_Pages/Question5/FirstBlock.module.css";

moralis.initialize(process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;

const question5 = (props) => {

    const { Moralis } = useMoralis();
    const [courseName, setCourseName] = useState();
    const [question5, setQuestion5] = useState("");
    const [question5Answer, setQuestion5Answer] = useState("");
    const [fakeQuestion5Answer1, setFakeQuestion5Answer1] = useState("");
    const [fakeQuestion5Answer2, setFakeQuestion5Answer2] = useState("");
    const [fakeQuestion5Answer3, setFakeQuestion5Answer3] = useState("");
    const [shuffledAnswer1, setShuffledAnswer1] = useState("");
    const [shuffledAnswer2, setShuffledAnswer2] = useState("");
    const [shuffledAnswer3, setShuffledAnswer3] = useState("");
    const [shuffledAnswer4, setShuffledAnswer4] = useState("");
    const [selectedAnswer, setSelectedAnswer] = useState("placeholder");
    const [correctAnswerCount, setCorrectAnswerCount] = useState(props.correctAnswerCount);
    const [correctAnswerSelected, setCorrectAnswerSelected] = useState(false);

    useEffect (async () => {
        const Courses = Moralis.Object.extend("Courses");
        const query = new Moralis.Query(Courses);
        query.equalTo("objectId", props.courseObjectId);
        const course = await query.find();
        setCourseName(course[0].get("courseName"));
        setQuestion5(course[0].get("test").question5);
        setQuestion5Answer(course[0].get("test").question5Answer);
        setFakeQuestion5Answer1(course[0].get("test").fakeQuestion5Answer1);
        setFakeQuestion5Answer2(course[0].get("test").fakeQuestion5Answer2);
        setFakeQuestion5Answer3(course[0].get("test").fakeQuestion5Answer3);
    }, []);

    useEffect (() => {
        const answerArr = [
            question5Answer,
            fakeQuestion5Answer1,
            fakeQuestion5Answer2,
            fakeQuestion5Answer3
        ];
        const shuffledAnswerArr = answerArr.sort(() => Math.random() - 0.5);
        setShuffledAnswer1(shuffledAnswerArr[0]);
        setShuffledAnswer2(shuffledAnswerArr[1]);
        setShuffledAnswer3(shuffledAnswerArr[2]);
        setShuffledAnswer4(shuffledAnswerArr[3]);
    }, [question5Answer, fakeQuestion5Answer1, fakeQuestion5Answer2, fakeQuestion5Answer3]);

    useEffect (() => {
        if (selectedAnswer === question5Answer) {
            setCorrectAnswerSelected(true);
            setCorrectAnswerCount(parseInt(correctAnswerCount) + 1);
        } else {
            if (correctAnswerSelected === true) {
                setCorrectAnswerSelected(false);
                setCorrectAnswerCount(parseInt(correctAnswerCount) - 1);
            } else {
                setCorrectAnswerCount(parseInt(correctAnswerCount));
            }
        }
    }, [selectedAnswer]);
    console.log(correctAnswerCount, correctAnswerSelected);

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
                            value={50}
                            colorScheme="green"
                        />
                        <div className={stylesFirstBlock.questionNumberTitle}>Question 5:</div>
                        <Textarea
                            className={stylesFirstBlock.progressDefault}
                            variant="outline"
                            placeholder={question5}
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
                        <Link href={{ pathname: "/test/question4",
                            query: { 
                                courseObjectId: props.courseObjectId,
                                correctAnswerCount: correctAnswerCount 
                            }}} passHref>
                            <Button
                            variant="solid"
                            w="162px"
                            colorScheme="green"
                            >
                            Back
                            </Button>
                        </Link>
                        <Link href={{ pathname: "/test/question6",
                            query: {
                                courseObjectId: props.courseObjectId,
                                correctAnswerCount: correctAnswerCount
                            }}} passHref>
                            <Button
                            variant="solid"
                            w="162px"
                            colorScheme="green"
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

export default question5

// Recieve props from next/pages/question4.jsx
export const getServerSideProps = (context) => {
    
    return {
        props: {
            courseObjectId: context.query.courseObjectId,
            correctAnswerCount: context.query.correctAnswerCount
        },
    };
};