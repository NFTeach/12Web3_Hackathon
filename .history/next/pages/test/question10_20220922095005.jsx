import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import moralis from "moralis";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
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
  ModalCloseButton,
} from "@chakra-ui/react";
import { SBT_CONTRACT_ADDRESS } from "../../components/consts/vars";
import { NFTEACH_SBT_CONTRACT_ABI } from "../../components/consts/contractABIs";
import stylesHeader from "../../styles/Test_Pages/Question10/Header.module.css";
import stylesFirstBlock from "../../styles/Test_Pages/Question10/FirstBlock.module.css";
import stylesFooter from "../../styles/Test_Pages/Question10/Footer.module.css";

moralis.initialize(process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;

const Question10 = (props) => {
  const router = useRouter();

  const {
    Moralis,
    isAuthenticated,
    web3,
    isWeb3Enabled,
    isWeb3EnableLoading,
    enableWeb3,
  } = useMoralis();

  const {
    data,
    error: executeContractError,
    fetch: executeContractFunction,
    isFetching,
    isLoading,
  } = useWeb3ExecuteFunction();

  const user = moralis.User.current();
  const [courseName, setCourseName] = useState("");
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
  const [passingGrade, setPassingGrade] = useState("");
  const [pass, setPass] = useState(false);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(
    props.correctAnswerCount
  );
  const [correctAnswerSelected, setCorrectAnswerSelected] = useState(false);
  const [SBT, setSBT] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [mintPrice, setMintPrice] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  useEffect(async () => {
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
    setPassingGrade(parseInt(course[0].get("test").passingGrade));
  }, []);

  useEffect(async () => {
    const SBT = Moralis.Object.extend("CreateSBT");
    const query = new Moralis.Query(SBT);
    query.equalTo("courseObjectId", props.courseObjectId);
    const SBTObject = await query.find();
    setSBT(SBTObject);
    setTokenId(SBTObject[0].get("tokenId"));
    setMintPrice(SBTObject[0].get("mintPrice"));
  }, []);
  // console.log("SBT", SBT);
  // console.log("tokenId", tokenId);
  // console.log("mintPrice", mintPrice);

  useEffect(() => {
    const answerArr = [
      question10Answer,
      fakeQuestion10Answer1,
      fakeQuestion10Answer2,
      fakeQuestion10Answer3,
    ];
    const shuffledAnswerArr = answerArr.sort(() => Math.random() - 0.5);
    setShuffledAnswer1(shuffledAnswerArr[0]);
    setShuffledAnswer2(shuffledAnswerArr[1]);
    setShuffledAnswer3(shuffledAnswerArr[2]);
    setShuffledAnswer4(shuffledAnswerArr[3]);
  }, [
    question10Answer,
    fakeQuestion10Answer1,
    fakeQuestion10Answer2,
    fakeQuestion10Answer3,
  ]);

  useEffect(() => {
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

  // console.log(correctAnswerCount, correctAnswerSelected);
  // console.log(passingGrade, grade)

  const calculateIfPassed = async () => {
    if (correctAnswerCount >= passingGrade) {
      setPass(true);
    }
  };

  const validateStudent = async () => {
    let studentAccount = user.attributes.accounts[0];

    const studentParams = {
      to: studentAccount,
      id: tokenId,
    };

    async function callValidateStudent() {
      const _Result = await Moralis.Cloud.run(
        "validateStudentTest",
        studentParams
      );
      console.log(_Result);
    }
    callValidateStudent();
  };

  const claimSBT = async () => {
    // console.log("claiming SBT");
    const ValidateTests = Moralis.Object.extend("ValidateTest");
    const query = new Moralis.Query(ValidateTests);
    query.equalTo("student", user.attributes.accounts[0]);
    query.equalTo("tokenId_decimal", tokenId);
    const validateTestComplete = await query.find();

    if (validateTestComplete) {
      executeContractFunction({
        params: {
          abi: NFTEACH_SBT_CONTRACT_ABI,
          contractAddress: SBT_CONTRACT_ADDRESS,
          functionName: "mintSBT",
          params: {
            _tokenId: tokenId,
          },
          msgValue: mintPrice,
        },
        onSuccess: () => {
          onMintSBTSuccess();
        },
        onError: (error) => {
          console.log("error", error);
        },
      });
    } else {
      console.log("student not validated to mint SBT!");
    }
  };

  const onMintSBTSuccess = useCallback(() => {
    router.push("/studentDashboard");
  }, []);

  const onBackToCourseClick = useCallback(() => {
    router.push(`/course?courseObjectId=${props.courseObjectId}`);
  }, []);

  return (
    <>
      {/* Header */}
      <div className={stylesHeader.frameDiv}>
        <h1 className={stylesHeader.titleH1}>All the best on the test!</h1>
      </div>
      {/* First Block */}
      <div className={stylesFirstBlock.testPageDiv}>
        <div className={stylesFirstBlock.frameDiv}>
          <div className={stylesFirstBlock.frameDiv1}>
            <h1 className={stylesFirstBlock.questionNumberTitle}>{courseName} - Test</h1>
          </div>
          <div className={stylesFirstBlock.frameDiv2}>
            <div className={stylesFirstBlock.frameDiv3}>
              <div className={stylesFirstBlock.frameDiv4}>
                <div className={stylesFirstBlock.frameDiv5}>
                  <Progress
                    className={stylesFirstBlock.progressDefault}
                    value={100}
                    colorScheme="green"
                  />
                  <h2 className={stylesFirstBlock.questionNumberTitle1}>Final Question, Hooray!</h2>
                  <Textarea
                    className={stylesFirstBlock.progressDefault}
                    variant="outline"
                    placeholder={question10}
                    isDisabled
                  />
                </div>
              </div>
              <div className={stylesFirstBlock.lineDiv} />
              <div className={stylesFirstBlock.frameDiv6}>
                <div className={stylesFirstBlock.frameDiv7}>
                  <div className={stylesFirstBlock.frameDiv8}>
                    <Textarea
                      className={stylesFirstBlock.progressDefault}
                      variant="flushed"
                      size="sm"
                      placeholder={shuffledAnswer1}
                      isDisabled
                      isReadOnly
                    />
                    <Textarea
                      className={stylesFirstBlock.progressDefault}
                      variant="flushed"
                      size="sm"
                      placeholder={shuffledAnswer2}
                      isDisabled
                      isReadOnly
                    />
                    <Textarea
                      className={stylesFirstBlock.progressDefault}
                      variant="flushed"
                      size="sm"
                      placeholder={shuffledAnswer3}
                      isDisabled
                      isReadOnly
                    />
                    <Textarea
                      className={stylesFirstBlock.progressDefault}
                      variant="flushed"
                      size="sm"
                      placeholder={shuffledAnswer4}
                      isDisabled
                      isReadOnly
                    />
                  </div>
                  <RadioGroup onChange={setSelectedAnswer} value={selectedAnswer} >
                    <div className={stylesFirstBlock.frameDiv9}>
                      <div className={stylesFirstBlock.frameDiv10}>
                        <Radio colorScheme="green" value={shuffledAnswer1} />
                        <Radio colorScheme="green" value={shuffledAnswer2} />
                        <Radio colorScheme="green" value={shuffledAnswer3} />
                        <Radio colorScheme="green" value={shuffledAnswer4} />
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
            <div className={stylesFirstBlock.frameDiv11}>
              <Link
                href={{
                  pathname: "/test/question9",
                  query: {
                    courseObjectId: props.courseObjectId,
                  },
                }}
                passHref
              >
                <Button
                  variant="solid"
                  w="162px"
                  colorScheme="green"
                  as="a"
                  href="/test/question9"
                >
                  Back
                </Button>
              </Link>
              <Button
                variant='solid'
                w='162px'
                colorScheme='blue'
                onClick={async () => {
                  await calculateIfPassed();
                  onOpen();
                }}
              >
                Submit Test
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className={stylesFooter.frameDiv}>
        <h4 className={stylesFooter.nFTeachH4}>© 2022 NFTeach</h4>
      </div>
      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Test Results</ModalHeader>
          <ModalCloseButton />
          {pass ? (
            <ModalBody>
              Congrats! You passed the test with a grade of {correctAnswerCount}
              /10!
              <br />
              <br />
              <Button
                colorScheme='green'
                mr={3}
                onClick={async () => {
                  await validateStudent();
                  setTimeout(claimSBT, 1000);
                }}
              >
                Claim SBT
              </Button>
            </ModalBody>
          ) : (
            <ModalBody>
              Sorry, you did not pass the test with a grade of{" "}
              {correctAnswerCount}/10!
              <br />
              <br />
              <Button colorScheme='green' mr={3} onClick={onBackToCourseClick}>
                Back to Course
              </Button>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Question10;

// Recieve props from next/pages/question9.jsx
export const getServerSideProps = (context) => {
  const Moralis = require('moralis/node');
  Moralis.initialize(process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID);
  Moralis.serverURL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;
  return {
    props: {
      courseObjectId: context.query.courseObjectId,
      correctAnswerCount: context.query.correctAnswerCount,
    },
  };
};
