import { useState, useEffect } from "react";
import Link from "next/link";
import moralis from "moralis";
import { useMoralis } from "react-moralis";
import {
  Textarea,
  Progress,
  Radio,
  RadioGroup,
  Button,
} from "@chakra-ui/react";
import stylesHeader from "../../styles/Test_Pages/Question8/Header.module.css";
import stylesFirstBlock from "../../styles/Test_Pages/Question8/FirstBlock.module.css";
import stylesFooter from "../../styles/Test_Pages/Question8/Footer.module.css";

moralis.initialize(process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;

const Question8 = (props) => {
  const { Moralis } = useMoralis();
  const [courseName, setCourseName] = useState();
  const [question8, setQuestion8] = useState("");
  const [question8Answer, setQuestion8Answer] = useState("");
  const [fakeQuestion8Answer1, setFakeQuestion8Answer1] = useState("");
  const [fakeQuestion8Answer2, setFakeQuestion8Answer2] = useState("");
  const [fakeQuestion8Answer3, setFakeQuestion8Answer3] = useState("");
  const [shuffledAnswer1, setShuffledAnswer1] = useState("");
  const [shuffledAnswer2, setShuffledAnswer2] = useState("");
  const [shuffledAnswer3, setShuffledAnswer3] = useState("");
  const [shuffledAnswer4, setShuffledAnswer4] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState("placeholder");
  const [correctAnswerCount, setCorrectAnswerCount] = useState(
    props.correctAnswerCount
  );
  const [correctAnswerSelected, setCorrectAnswerSelected] = useState(false);

  useEffect(async () => {
    const Courses = Moralis.Object.extend("Courses");
    const query = new Moralis.Query(Courses);
    query.equalTo("objectId", props.courseObjectId);
    const course = await query.find();
    setCourseName(course[0].get("courseName"));
    setQuestion8(course[0].get("test").question8);
    setQuestion8Answer(course[0].get("test").question8Answer);
    setFakeQuestion8Answer1(course[0].get("test").fakeQuestion8Answer1);
    setFakeQuestion8Answer2(course[0].get("test").fakeQuestion8Answer2);
    setFakeQuestion8Answer3(course[0].get("test").fakeQuestion8Answer3);
  }, []);

  useEffect(() => {
    const answerArr = [
      question8Answer,
      fakeQuestion8Answer1,
      fakeQuestion8Answer2,
      fakeQuestion8Answer3,
    ];
    const shuffledAnswerArr = answerArr.sort(() => Math.random() - 0.5);
    setShuffledAnswer1(shuffledAnswerArr[0]);
    setShuffledAnswer2(shuffledAnswerArr[1]);
    setShuffledAnswer3(shuffledAnswerArr[2]);
    setShuffledAnswer4(shuffledAnswerArr[3]);
  }, [
    question8Answer,
    fakeQuestion8Answer1,
    fakeQuestion8Answer2,
    fakeQuestion8Answer3,
  ]);

  useEffect(() => {
    if (selectedAnswer === question8Answer) {
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
                    value={80}
                    colorScheme="green"
                  />
                  <h2 className={stylesFirstBlock.questionNumberTitle1}>Question 8:</h2>
                  <Textarea
                    className={stylesFirstBlock.progressDefault}
                    variant="outline"
                    placeholder={question8}
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
                  pathname: "/test/question7",
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
                  href="/test/question7"
                >
                  Back
                </Button>
              </Link>
              <Link
                href={{
                  pathname: "/test/question9",
                  query: {
                    courseObjectId: props.courseObjectId,
                    correctAnswerCount: correctAnswerCount,
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
                  Next
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className={stylesFooter.frameDiv}>
        <h4 className={stylesFooter.nFTeachH4}>?? 2022 NFTeach</h4>
      </div>
    </>
  );
};

export default Question8;

// Recieve props from next/pages/question7.jsx
export const getServerSideProps = (context) => {
  return {
    props: {
      courseObjectId: context.query.courseObjectId,
      correctAnswerCount: context.query.correctAnswerCount,
    },
  };
};
