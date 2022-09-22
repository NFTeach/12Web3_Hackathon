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
import stylesHeader from "../../styles/Test_Pages/Question6/Header.module.css";
import stylesFirstBlock from "../../styles/Test_Pages/Question6/FirstBlock.module.css";
import stylesFooter from "../../styles/Test_Pages/Question6/Footer.module.css";

moralis.initialize(process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;

const question6 = (props) => {
  const { Moralis } = useMoralis();
  const [courseName, setCourseName] = useState();
  const [question6, setQuestion6] = useState("");
  const [question6Answer, setQuestion6Answer] = useState("");
  const [fakeQuestion6Answer1, setFakeQuestion6Answer1] = useState("");
  const [fakeQuestion6Answer2, setFakeQuestion6Answer2] = useState("");
  const [fakeQuestion6Answer3, setFakeQuestion6Answer3] = useState("");
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
    setQuestion6(course[0].get("test").question6);
    setQuestion6Answer(course[0].get("test").question6Answer);
    setFakeQuestion6Answer1(course[0].get("test").fakeQuestion6Answer1);
    setFakeQuestion6Answer2(course[0].get("test").fakeQuestion6Answer2);
    setFakeQuestion6Answer3(course[0].get("test").fakeQuestion6Answer3);
  }, []);

  useEffect(() => {
    const answerArr = [
      question6Answer,
      fakeQuestion6Answer1,
      fakeQuestion6Answer2,
      fakeQuestion6Answer3,
    ];
    const shuffledAnswerArr = answerArr.sort(() => Math.random() - 0.5);
    setShuffledAnswer1(shuffledAnswerArr[0]);
    setShuffledAnswer2(shuffledAnswerArr[1]);
    setShuffledAnswer3(shuffledAnswerArr[2]);
    setShuffledAnswer4(shuffledAnswerArr[3]);
  }, [
    question6Answer,
    fakeQuestion6Answer1,
    fakeQuestion6Answer2,
    fakeQuestion6Answer3,
  ]);

  useEffect(() => {
    if (selectedAnswer === question6Answer) {
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
                    value={60}
                    colorScheme="green"
                  />
                  <h2 className={stylesFirstBlock.questionNumberTitle1}>Question 6:</h2>
                  <Textarea
                    className={stylesFirstBlock.progressDefault}
                    variant="outline"
                    placeholder={question6}
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
                  pathname: "/test/question5",
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
                  href="/test/question5"
                >
                  Back
                </Button>
              </Link>
              <Link
                href={{
                  pathname: "/test/question7",
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
                  href="/test/question7"
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
        <h4 className={stylesFooter.nFTeachH4}>© 2022 NFTeach</h4>
      </div>
    </>
  );
};

export default question6;

// Recieve props from next/pages/question5.jsx
export const getServerSideProps = (context) => {
  return {
    props: {
      courseObjectId: context.query.courseObjectId,
      correctAnswerCount: context.query.correctAnswerCount,
    },
  };
};
