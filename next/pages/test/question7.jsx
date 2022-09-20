import { useState, useEffect } from 'react';
import Link from 'next/link';
import moralis from "moralis";
import { useMoralis } from "react-moralis";
import { Textarea, Progress, Radio, RadioGroup, Button } from "@chakra-ui/react";
import stylesFirstBlock from "../../styles/Test_Pages/Question7/FirstBlock.module.css";

moralis.initialize(process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;

const question7 = (props) => {

    const { Moralis } = useMoralis();
    const [courseName, setCourseName] = useState();
    const [question7, setQuestion7] = useState("");
    const [question7Answer, setQuestion7Answer] = useState("");
    const [fakeQuestion7Answer1, setFakeQuestion7Answer1] = useState("");
    const [fakeQuestion7Answer2, setFakeQuestion7Answer2] = useState("");
    const [fakeQuestion7Answer3, setFakeQuestion7Answer3] = useState("");
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
        setQuestion7(course[0].get("test").question7);
        setQuestion7Answer(course[0].get("test").question7Answer);
        setFakeQuestion7Answer1(course[0].get("test").fakeQuestion7Answer1);
        setFakeQuestion7Answer2(course[0].get("test").fakeQuestion7Answer2);
        setFakeQuestion7Answer3(course[0].get("test").fakeQuestion7Answer3);
    }, []);

    useEffect (() => {
        const answerArr = [
            question7Answer,
            fakeQuestion7Answer1,
            fakeQuestion7Answer2,
            fakeQuestion7Answer3
        ];
        const shuffledAnswerArr = answerArr.sort(() => Math.random() - 0.5);
        setShuffledAnswer1(shuffledAnswerArr[0]);
        setShuffledAnswer2(shuffledAnswerArr[1]);
        setShuffledAnswer3(shuffledAnswerArr[2]);
        setShuffledAnswer4(shuffledAnswerArr[3]);
    }, [question7Answer, fakeQuestion7Answer1, fakeQuestion7Answer2, fakeQuestion7Answer3]);

    useEffect (() => {
        if (selectedAnswer === question7Answer) {
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
                            value={70}
                            colorScheme="green"
                        />
                        <div className={stylesFirstBlock.questionNumberTitle}>Question 7:</div>
                        <Textarea
                            className={stylesFirstBlock.progressDefault}
                            variant="outline"
                            placeholder={question7}
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
                            Back
                            </Button>
                        </Link>
                        <Link href={{ pathname: "/test/question8",
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

export default question7

// Recieve props from next/pages/question6.jsx
export const getServerSideProps = (context) => {
    
    return {
        props: {
            courseObjectId: context.query.courseObjectId,
            correctAnswerCount: context.query.correctAnswerCount
        },
    };
};