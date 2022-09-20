import { useState, useEffect } from 'react';
import Link from 'next/link';
import moralis from "moralis";
import { useMoralis } from "react-moralis";
import { 
    Textarea, 
    Progress, 
    Radio, 
    RadioGroup, 
    Button,
    useDisclosure,
    Modal, 
    ModalOverlay, 
    ModalContent, 
    ModalHeader, 
    ModalFooter, 
    ModalBody, 
    ModalCloseButton 
} from "@chakra-ui/react";
import stylesFirstBlock from "../../styles/Test_Pages/Question10/FirstBlock.module.css";

moralis.initialize(process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;

const question10 = (props) => {

    const { Moralis } = useMoralis();
    const [courseName, setCourseName] = useState();
    const [question10, setQuestion10] = useState("");
    const [question10Answer, setQuestion10Answer] = useState("");
    const [fakeQuestion10Answer1, setFakeQuestion10Answer1] = useState("");
    const [fakeQuestion10Answer2, setFakeQuestion10Answer2] = useState("");
    const [fakeQuestion10Answer3, setFakeQuestion10Answer3] = useState("");
    const [shuffledAnswer1, setShuffledAnswer1] = useState("");
    const [shuffledAnswer2, setShuffledAnswer2] = useState("");
    const [shuffledAnswer3, setShuffledAnswer3] = useState("");
    const [shuffledAnswer4, setShuffledAnswer4] = useState("");
    const [selectedAnswer, setSelectedAnswer] = useState("placeholder");
    const [grade, setGrade] = useState(0);
    const [passingGrade, setPassingGrade] = useState("");
    const [pass, setPass] = useState(false);
    const [correctAnswerCount, setCorrectAnswerCount] = useState(props.correctAnswerCount);
    const [correctAnswerSelected, setCorrectAnswerSelected] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect (async () => {
        const Courses = Moralis.Object.extend("Courses");
        const query = new Moralis.Query(Courses);
        query.equalTo("objectId", props.courseObjectId);
        const course = await query.find();
        setCourseName(course[0].get("courseName"));
        setQuestion10(course[0].get("test").question10);
        setQuestion10Answer(course[0].get("test").question10Answer);
        setFakeQuestion10Answer1(course[0].get("test").fakeQuestion10Answer1);
        setFakeQuestion10Answer2(course[0].get("test").fakeQuestion10Answer2);
        setFakeQuestion10Answer3(course[0].get("test").fakeQuestion10Answer3);
        setPassingGrade(course[0].get("test").passingGrade);
    }, []);

    useEffect (() => {
        const answerArr = [
            question10Answer,
            fakeQuestion10Answer1,
            fakeQuestion10Answer2,
            fakeQuestion10Answer3
        ];
        const shuffledAnswerArr = answerArr.sort(() => Math.random() - 0.5);
        setShuffledAnswer1(shuffledAnswerArr[0]);
        setShuffledAnswer2(shuffledAnswerArr[1]);
        setShuffledAnswer3(shuffledAnswerArr[2]);
        setShuffledAnswer4(shuffledAnswerArr[3]);
    }, [question10Answer, fakeQuestion10Answer1, fakeQuestion10Answer2, fakeQuestion10Answer3]);

    useEffect (() => {
        if (selectedAnswer === question10Answer) {
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

    const calculateGrade = async () => {
        const grade = (parseInt(correctAnswerCount) / 10);
        setGrade(grade);

        if (grade >= passingGrade) {
            setPass(true);
        };
    }
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
                            value={100}
                            colorScheme="green"
                        />
                        <div className={stylesFirstBlock.questionNumberTitle}>Question 10:</div>
                        <Textarea
                            className={stylesFirstBlock.progressDefault}
                            variant="outline"
                            placeholder={question10}
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
                        <Link href={{ pathname: "/test/question9",
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
                        <Button
                        variant="solid"
                        w="162px"
                        colorScheme="green"
                        onClick={ () => {
                            await calculateGrade();
                            onOpen
                        }}
                        >
                        Submit Answers
                        </Button>
                    </div>
                    </div>
                </div>
            </div>
            {/* Modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Test Results</ModalHeader>
                    <ModalCloseButton />
                    {pass ? (
                        <ModalBody>
                            Congrats! You passed the test with a grade of {grade}!
                        </ModalBody>
                    ) : (
                        <ModalBody>
                            Sorry, you did not pass the test with a grade of {grade}!
                        </ModalBody>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default question10

// Recieve props from next/pages/question9.jsx
export const getServerSideProps = (context) => {
    
    return {
        props: {
            courseObjectId: context.query.courseObjectId,
            correctAnswerCount: context.query.correctAnswerCount
        },
    };
};