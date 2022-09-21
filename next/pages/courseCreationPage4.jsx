import { useCallback, useEffect, useState } from "react";
import { Input, Button, NumberInput, NumberInputField } from "@chakra-ui/react";
import { useRouter } from "next/router";
import moralis from "moralis";
import { useMoralis } from "react-moralis";
import stylesHeader from "../styles/CourseCreation_Pages/4/Header.module.css";
import stylesFirstBlock from "../styles/CourseCreation_Pages/4/FirstBlock.module.css";
import stylesFooter from "../styles/CourseCreation_Pages/4/Footer.module.css";

moralis.initialize(process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;

const courseCreationPage4 = () => {
  const router = useRouter();
  const { Moralis } = useMoralis();
  const user = moralis.User.current();
  const [isUploadInProgress, setIsUploadInProgress] = useState(false);
  const [question1, setQuestion1] = useState();
  const [question1Answer, setQuestion1Answer] = useState();
  const [fakeQuestion1Answer1, setFakeQuestion1Answer1] = useState();
  const [fakeQuestion1Answer2, setFakeQuestion1Answer2] = useState();
  const [fakeQuestion1Answer3, setFakeQuestion1Answer3] = useState();
  const [question2, setQuestion2] = useState();
  const [question2Answer, setQuestion2Answer] = useState();
  const [fakeQuestion2Answer1, setFakeQuestion2Answer1] = useState();
  const [fakeQuestion2Answer2, setFakeQuestion2Answer2] = useState();
  const [fakeQuestion2Answer3, setFakeQuestion2Answer3] = useState();
  const [question3, setQuestion3] = useState();
  const [question3Answer, setQuestion3Answer] = useState();
  const [fakeQuestion3Answer1, setFakeQuestion3Answer1] = useState();
  const [fakeQuestion3Answer2, setFakeQuestion3Answer2] = useState();
  const [fakeQuestion3Answer3, setFakeQuestion3Answer3] = useState();
  const [question4, setQuestion4] = useState();
  const [question4Answer, setQuestion4Answer] = useState();
  const [fakeQuestion4Answer1, setFakeQuestion4Answer1] = useState();
  const [fakeQuestion4Answer2, setFakeQuestion4Answer2] = useState();
  const [fakeQuestion4Answer3, setFakeQuestion4Answer3] = useState();
  const [question5, setQuestion5] = useState();
  const [question5Answer, setQuestion5Answer] = useState();
  const [fakeQuestion5Answer1, setFakeQuestion5Answer1] = useState();
  const [fakeQuestion5Answer2, setFakeQuestion5Answer2] = useState();
  const [fakeQuestion5Answer3, setFakeQuestion5Answer3] = useState();
  const [question6, setQuestion6] = useState();
  const [question6Answer, setQuestion6Answer] = useState();
  const [fakeQuestion6Answer1, setFakeQuestion6Answer1] = useState();
  const [fakeQuestion6Answer2, setFakeQuestion6Answer2] = useState();
  const [fakeQuestion6Answer3, setFakeQuestion6Answer3] = useState();
  const [question7, setQuestion7] = useState();
  const [question7Answer, setQuestion7Answer] = useState();
  const [fakeQuestion7Answer1, setFakeQuestion7Answer1] = useState();
  const [fakeQuestion7Answer2, setFakeQuestion7Answer2] = useState();
  const [fakeQuestion7Answer3, setFakeQuestion7Answer3] = useState();
  const [question8, setQuestion8] = useState();
  const [question8Answer, setQuestion8Answer] = useState();
  const [fakeQuestion8Answer1, setFakeQuestion8Answer1] = useState();
  const [fakeQuestion8Answer2, setFakeQuestion8Answer2] = useState();
  const [fakeQuestion8Answer3, setFakeQuestion8Answer3] = useState();
  const [question9, setQuestion9] = useState();
  const [question9Answer, setQuestion9Answer] = useState();
  const [fakeQuestion9Answer1, setFakeQuestion9Answer1] = useState();
  const [fakeQuestion9Answer2, setFakeQuestion9Answer2] = useState();
  const [fakeQuestion9Answer3, setFakeQuestion9Answer3] = useState();
  const [question10, setQuestion10] = useState();
  const [question10Answer, setQuestion10Answer] = useState();
  const [fakeQuestion10Answer1, setFakeQuestion10Answer1] = useState();
  const [fakeQuestion10Answer2, setFakeQuestion10Answer2] = useState();
  const [fakeQuestion10Answer3, setFakeQuestion10Answer3] = useState();
  const [passingGrade, setPassingGrade] = useState();

  const saveTest = async () => {
    const Courses = Moralis.Object.extend("Courses");
    const query = new Moralis.Query(Courses);
    const account = user.attributes.accounts[0];
    query.equalTo("educatorAddress", account);
    query.descending("createdAt");
    const Course = await query.first();

    Course.set("test", {
      question1,
      question1Answer,
      fakeQuestion1Answer1,
      fakeQuestion1Answer2,
      fakeQuestion1Answer3,
      question2,
      question2Answer,
      fakeQuestion2Answer1,
      fakeQuestion2Answer2,
      fakeQuestion2Answer3,
      question3,
      question3Answer,
      fakeQuestion3Answer1,
      fakeQuestion3Answer2,
      fakeQuestion3Answer3,
      question4,
      question4Answer,
      fakeQuestion4Answer1,
      fakeQuestion4Answer2,
      fakeQuestion4Answer3,
      question5,
      question5Answer,
      fakeQuestion5Answer1,
      fakeQuestion5Answer2,
      fakeQuestion5Answer3,
      question6,
      question6Answer,
      fakeQuestion6Answer1,
      fakeQuestion6Answer2,
      fakeQuestion6Answer3,
      question7,
      question7Answer,
      fakeQuestion7Answer1,
      fakeQuestion7Answer2,
      fakeQuestion7Answer3,
      question8,
      question8Answer,
      fakeQuestion8Answer1,
      fakeQuestion8Answer2,
      fakeQuestion8Answer3,
      question9,
      question9Answer,
      fakeQuestion9Answer1,
      fakeQuestion9Answer2,
      fakeQuestion9Answer3,
      question10,
      question10Answer,
      fakeQuestion10Answer1,
      fakeQuestion10Answer2,
      fakeQuestion10Answer3,
      passingGrade,
    });

    await Course.save();
    setIsUploadInProgress(false);
    console.log("Test saved");
  };

  // Header effects
  useEffect(() => {
    const scrollAnimElements = document.querySelectorAll(
      "[data-animate-on-scroll-header]"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target;
            targetElement.classList.add(stylesHeader.animate);
            observer.unobserve(targetElement);
          }
        }
      },
      {
        threshold: 0.15,
      }
    );

    for (let i = 0; i < scrollAnimElements.length; i++) {
      observer.observe(scrollAnimElements[i]);
    }

    return () => {
      for (let i = 0; i < scrollAnimElements.length; i++) {
        observer.unobserve(scrollAnimElements[i]);
      }
    };
  }, []);

  const onContinueButtonClick = useCallback(() => {
    router.push("/courseReview");
  }, [router]);

  return (
    <>
      {/* Header */}
      <div className={stylesHeader.frameDiv}>
        <h1 className={stylesHeader.titleH1}>Build The Future</h1>
      </div>
      {/* First Block */}
      <div className={stylesFirstBlock.desktop1}>
        <div className={stylesFirstBlock.frameDiv}>
          <h1 className={stylesFirstBlock.titleH1}>
            Create a test for the course (4/4)
          </h1>
          <div className={stylesFirstBlock.frameDiv1}>
            <div className={stylesFirstBlock.qUESTION1Div}>
              <Input
                className={stylesFirstBlock.inputOutline}
                variant="outline"
                textColor="#e4e4e4"
                placeholder="Question 1"
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant="outline"
                textColor="#e4e4e4"
                placeholder="Answer"
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant="outline"
                textColor="#e4e4e4"
                placeholder="Fake Answer 1"
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant="outline"
                textColor="#e4e4e4"
                placeholder="Fake Answer 2"
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant="outline"
                textColor="#e4e4e4"
                placeholder="Fake Answer 3"
              />
            </div>
            <div className={stylesFirstBlock.qUESTION1Div}>
              <Input
                className={stylesFirstBlock.inputOutline}
                variant="outline"
                textColor="#e4e4e4"
                placeholder="Question 2"
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant="outline"
                textColor="#e4e4e4"
                placeholder="Answer"
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant="outline"
                textColor="#e4e4e4"
                placeholder="Fake Answer 1"
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant="outline"
                textColor="#e4e4e4"
                placeholder="Fake Answer 2"
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant="outline"
                textColor="#e4e4e4"
                placeholder="Fake Answer 3"
              />
            </div>
            <div className={stylesFirstBlock.qUESTION1Div}>
              <Input
                className={stylesFirstBlock.inputOutline}
                variant="outline"
                textColor="#e4e4e4"
                placeholder="Question 3"
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant="outline"
                textColor="#e4e4e4"
                placeholder="Answer"
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant="outline"
                textColor="#e4e4e4"
                placeholder="Fake Answer 1"
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant="outline"
                textColor="#e4e4e4"
                placeholder="Fake Answer 2"
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant="outline"
                textColor="#e4e4e4"
                placeholder="Fake Answer 3"
              />
            </div>
            <div className={stylesFirstBlock.qUESTION1Div}>
              <Input
                className={stylesFirstBlock.inputOutline}
                variant="outline"
                textColor="#e4e4e4"
                placeholder="Question 4"
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant="outline"
                textColor="#e4e4e4"
                placeholder="Answer"
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant="outline"
                textColor="#e4e4e4"
                placeholder="Fake Answer 1"
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant="outline"
                textColor="#e4e4e4"
                placeholder="Fake Answer 2"
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant="outline"
                textColor="#e4e4e4"
                placeholder="Fake Answer 3"
              />
            </div>
            <div className={stylesFirstBlock.qUESTION1Div}>
              <Input
                className={stylesFirstBlock.inputOutline}
                variant="outline"
                textColor="#e4e4e4"
                placeholder="Question 5"
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant="outline"
                textColor="#e4e4e4"
                placeholder="Answer"
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant="outline"
                textColor="#e4e4e4"
                placeholder="Fake Answer 1"
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant="outline"
                textColor="#e4e4e4"
                placeholder="Fake Answer 2"
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant="outline"
                textColor="#e4e4e4"
                placeholder="Fake Answer 3"
              />
            </div>
            <div className={stylesFirstBlock.qUESTION1Div}>
              <Input
                className={stylesFirstBlock.inputOutline}
                variant="outline"
                textColor="#e4e4e4"
                placeholder="Question 6"
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant="outline"
                textColor="#e4e4e4"
                placeholder="Answer"
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant="outline"
                textColor="#e4e4e4"
                placeholder="Fake Answer 1"
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant="outline"
                textColor="#e4e4e4"
                placeholder="Fake Answer 2"
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant="outline"
                textColor="#e4e4e4"
                placeholder="Fake Answer 3"
              />
            </div>
            <div className={stylesFirstBlock.qUESTION1Div}>
              <Input
                className={stylesFirstBlock.inputOutline}
                variant="outline"
                textColor="#e4e4e4"
                placeholder="Question 7"
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant="outline"
                textColor="#e4e4e4"
                placeholder="Answer"
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant="outline"
                textColor="#e4e4e4"
                placeholder="Fake Answer 1"
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant="outline"
                textColor="#e4e4e4"
                placeholder="Fake Answer 2"
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant="outline"
                textColor="#e4e4e4"
                placeholder="Fake Answer 3"
              />
            </div>
            <div className={stylesFirstBlock.qUESTION1Div}>
              <Input
                className={stylesFirstBlock.inputOutline}
                variant="outline"
                textColor="#e4e4e4"
                placeholder="Question 8"
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant="outline"
                textColor="#e4e4e4"
                placeholder="Answer"
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant="outline"
                textColor="#e4e4e4"
                placeholder="Fake Answer 1"
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant="outline"
                textColor="#e4e4e4"
                placeholder="Fake Answer 2"
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant="outline"
                textColor="#e4e4e4"
                placeholder="Fake Answer 3"
              />
            </div>
            <div className={stylesFirstBlock.qUESTION1Div}>
              <Input
                className={stylesFirstBlock.inputOutline}
                variant="outline"
                textColor="#e4e4e4"
                placeholder="Question 9"
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant="outline"
                textColor="#e4e4e4"
                placeholder="Answer"
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant="outline"
                textColor="#e4e4e4"
                placeholder="Fake Answer 1"
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant="outline"
                textColor="#e4e4e4"
                placeholder="Fake Answer 2"
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant="outline"
                textColor="#e4e4e4"
                placeholder="Fake Answer 3"
              />
            </div>
            <div className={stylesFirstBlock.qUESTION1Div}>
              <Input
                className={stylesFirstBlock.inputOutline}
                variant="outline"
                textColor="#e4e4e4"
                placeholder="Question 10"
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant="outline"
                textColor="#e4e4e4"
                placeholder="Answer"
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant="outline"
                textColor="#e4e4e4"
                placeholder="Fake Answer 1"
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant="outline"
                textColor="#e4e4e4"
                placeholder="Fake Answer 2"
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant="outline"
                textColor="#e4e4e4"
                placeholder="Fake Answer 3"
              />
            </div>
            <div className={stylesFirstBlock.passingGradeDiv}>
              <div className={stylesFirstBlock.courseNameDiv}>
                Passing Grade
              </div>
              <NumberInput
                className={stylesFirstBlock.inputOutline}
                variant="outline"
                textColor="#e4e4e4"
                placeholder="What will the passing grade be for your test out of 10?"
                defaultValue={7}
                min={1}
                max={10}
                precision={0}
                step={1}
                onChange={(valueString) => setPassingGrade(valueString)}
              >
                <NumberInputField />
              </NumberInput>
            </div>
            <Button
              variant="solid"
              w="357px"
              colorScheme="green"
              isLoading={isUploadInProgress}
              onClick={async () => {
                setIsUploadInProgress(true);
                await saveTest();
                onContinueButtonClick();
              }}
            >
              Review Course and Test
            </Button>
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

export default courseCreationPage4;
