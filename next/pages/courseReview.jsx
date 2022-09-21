// NEED TO FIX THE ACCORDIAN RESPONSIVENESS ISSUES
// MAKE MODALS FOR ALL EDIT BUTTONS
// MAKE COURSE INFO BUTTON A SAVE BUTTON A MODAL INSTEAD OF RE-DIRECT TO DIFFERENT PAGE
// DISABLE THE ABILITY TO CLICK ON INPUT FIELD OUTSIDE OF MODAL

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Input,
  Button,
  Image,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Accordion,
  Box,
  AspectRatio,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  NumberInput,
  NumberInputField,
  Text,
  useToast,
} from "@chakra-ui/react";
import moralis from "moralis";
import { useMoralis } from "react-moralis";
import stylesHeader from "../styles/CourseCreation_Pages/Review/Header.module.css";
import stylesFirstBlock from "../styles/CourseCreation_Pages/Review/FirstBlock.module.css";
import stylesFooter from "../styles/CourseCreation_Pages/Review/Footer.module.css";

moralis.initialize(process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;

const courseReview = () => {
  const router = useRouter();
  const { Moralis } = useMoralis();
  const user = moralis.User.current();
  const toast = useToast();
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseCost, setCourseCost] = useState("");
  const [coursePrerequisite, setCoursePrerequisite] = useState("");
  const [coursePrerequisiteName, setCoursePrerequisiteName] = useState("");
  const [courseImage, setCourseImage] = useState("");
  const [section1Title, setSection1Title] = useState("");
  const [section1Description, setSection1Description] = useState("");
  const [section1Video, setSection1Video] = useState("");
  const [section2Title, setSection2Title] = useState("");
  const [section2Description, setSection2Description] = useState("");
  const [section2Video, setSection2Video] = useState("");
  const [section3Title, setSection3Title] = useState("");
  const [section3Description, setSection3Description] = useState("");
  const [section3Video, setSection3Video] = useState("");
  const [question1, setQuestion1] = useState("");
  const [question1Answer, setQuestion1Answer] = useState("");
  const [fakeQuestion1Answer1, setFakeQuestion1Answer1] = useState("");
  const [fakeQuestion1Answer2, setFakeQuestion1Answer2] = useState("");
  const [fakeQuestion1Answer3, setFakeQuestion1Answer3] = useState("");
  const [question2, setQuestion2] = useState("");
  const [question2Answer, setQuestion2Answer] = useState("");
  const [fakeQuestion2Answer1, setFakeQuestion2Answer1] = useState("");
  const [fakeQuestion2Answer2, setFakeQuestion2Answer2] = useState("");
  const [fakeQuestion2Answer3, setFakeQuestion2Answer3] = useState("");
  const [question3, setQuestion3] = useState("");
  const [question3Answer, setQuestion3Answer] = useState("");
  const [fakeQuestion3Answer1, setFakeQuestion3Answer1] = useState("");
  const [fakeQuestion3Answer2, setFakeQuestion3Answer2] = useState("");
  const [fakeQuestion3Answer3, setFakeQuestion3Answer3] = useState("");
  const [question4, setQuestion4] = useState("");
  const [question4Answer, setQuestion4Answer] = useState("");
  const [fakeQuestion4Answer1, setFakeQuestion4Answer1] = useState("");
  const [fakeQuestion4Answer2, setFakeQuestion4Answer2] = useState("");
  const [fakeQuestion4Answer3, setFakeQuestion4Answer3] = useState("");
  const [question5, setQuestion5] = useState("");
  const [question5Answer, setQuestion5Answer] = useState("");
  const [fakeQuestion5Answer1, setFakeQuestion5Answer1] = useState("");
  const [fakeQuestion5Answer2, setFakeQuestion5Answer2] = useState("");
  const [fakeQuestion5Answer3, setFakeQuestion5Answer3] = useState("");
  const [question6, setQuestion6] = useState("");
  const [question6Answer, setQuestion6Answer] = useState("");
  const [fakeQuestion6Answer1, setFakeQuestion6Answer1] = useState("");
  const [fakeQuestion6Answer2, setFakeQuestion6Answer2] = useState("");
  const [fakeQuestion6Answer3, setFakeQuestion6Answer3] = useState("");
  const [question7, setQuestion7] = useState("");
  const [question7Answer, setQuestion7Answer] = useState("");
  const [fakeQuestion7Answer1, setFakeQuestion7Answer1] = useState("");
  const [fakeQuestion7Answer2, setFakeQuestion7Answer2] = useState("");
  const [fakeQuestion7Answer3, setFakeQuestion7Answer3] = useState("");
  const [question8, setQuestion8] = useState("");
  const [question8Answer, setQuestion8Answer] = useState("");
  const [fakeQuestion8Answer1, setFakeQuestion8Answer1] = useState("");
  const [fakeQuestion8Answer2, setFakeQuestion8Answer2] = useState("");
  const [fakeQuestion8Answer3, setFakeQuestion8Answer3] = useState("");
  const [question9, setQuestion9] = useState("");
  const [question9Answer, setQuestion9Answer] = useState("");
  const [fakeQuestion9Answer1, setFakeQuestion9Answer1] = useState("");
  const [fakeQuestion9Answer2, setFakeQuestion9Answer2] = useState("");
  const [fakeQuestion9Answer3, setFakeQuestion9Answer3] = useState("");
  const [question10, setQuestion10] = useState("");
  const [question10Answer, setQuestion10Answer] = useState("");
  const [fakeQuestion10Answer1, setFakeQuestion10Answer1] = useState("");
  const [fakeQuestion10Answer2, setFakeQuestion10Answer2] = useState("");
  const [fakeQuestion10Answer3, setFakeQuestion10Answer3] = useState("");
  const [passingGrade, setPassingGrade] = useState("");
  const {
    isOpen: isCourseInfoOpen,
    onOpen: onCourseInfoOpen,
    onClose: onCourseInfoClose,
  } = useDisclosure();
  const {
    isOpen: isTestEditOpen,
    onOpen: onTestEditOpen,
    onClose: onTestEditClose,
  } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = React.useState("inside");
  const [isSaveInProgress, setIsSaveInProgress] = useState(false);

  useEffect(async () => {
    if (!user) {
      window.alert("Please connect wallet");
    } else {
      const Courses = Moralis.Object.extend("Courses");
      const query = new Moralis.Query(Courses);
      const account = user.attributes.accounts[0];
      query.equalTo("educatorAddress", account);
      query.descending("createdAt");
      const Course = await query.first();

      const courseName = Course.get("courseName");
      const courseDescription = Course.get("description");
      const courseCost = Course.get("cost");
      const coursePrerequisite = Course.get("prerequisite");
      const courseImage = Course.attributes.imageFile?.img;
      const section1Title = Course.attributes.courseSection1?.sectionName;
      const section1Description =
        Course.attributes.courseSection1?.sectionDescription;
      const section1Video = Course.attributes.courseSection1?.vid;
      const section2Title = Course.attributes.courseSection2?.sectionName;
      const section2Description =
        Course.attributes.courseSection2?.sectionDescription;
      const section2Video = Course.attributes.courseSection2?.vid;
      const section3Title = Course.attributes.courseSection3?.sectionName;
      const section3Description =
        Course.attributes.courseSection3?.sectionDescription;
      const section3Video = Course.attributes.courseSection3?.vid;
      const question1 = Course.attributes.test?.question1;
      const question1Answer = Course.attributes.test?.question1Answer;
      const fakeQuestion1Answer1 = Course.attributes.test?.fakeQuestion1Answer1;
      const fakeQuestion1Answer2 = Course.attributes.test?.fakeQuestion1Answer2;
      const fakeQuestion1Answer3 = Course.attributes.test?.fakeQuestion1Answer3;
      const question2 = Course.attributes.test?.question2;
      const question2Answer = Course.attributes.test?.question2Answer;
      const fakeQuestion2Answer1 = Course.attributes.test?.fakeQuestion2Answer1;
      const fakeQuestion2Answer2 = Course.attributes.test?.fakeQuestion2Answer2;
      const fakeQuestion2Answer3 = Course.attributes.test?.fakeQuestion2Answer3;
      const question3 = Course.attributes.test?.question3;
      const question3Answer = Course.attributes.test?.question3Answer;
      const fakeQuestion3Answer1 = Course.attributes.test?.fakeQuestion3Answer1;
      const fakeQuestion3Answer2 = Course.attributes.test?.fakeQuestion3Answer2;
      const fakeQuestion3Answer3 = Course.attributes.test?.fakeQuestion3Answer3;
      const question4 = Course.attributes.test?.question4;
      const question4Answer = Course.attributes.test?.question4Answer;
      const fakeQuestion4Answer1 = Course.attributes.test?.fakeQuestion4Answer1;
      const fakeQuestion4Answer2 = Course.attributes.test?.fakeQuestion4Answer2;
      const fakeQuestion4Answer3 = Course.attributes.test?.fakeQuestion4Answer3;
      const question5 = Course.attributes.test?.question5;
      const question5Answer = Course.attributes.test?.question5Answer;
      const fakeQuestion5Answer1 = Course.attributes.test?.fakeQuestion5Answer1;
      const fakeQuestion5Answer2 = Course.attributes.test?.fakeQuestion5Answer2;
      const fakeQuestion5Answer3 = Course.attributes.test?.fakeQuestion5Answer3;
      const question6 = Course.attributes.test?.question6;
      const question6Answer = Course.attributes.test?.question6Answer;
      const fakeQuestion6Answer1 = Course.attributes.test?.fakeQuestion6Answer1;
      const fakeQuestion6Answer2 = Course.attributes.test?.fakeQuestion6Answer2;
      const fakeQuestion6Answer3 = Course.attributes.test?.fakeQuestion6Answer3;
      const question7 = Course.attributes.test?.question7;
      const question7Answer = Course.attributes.test?.question7Answer;
      const fakeQuestion7Answer1 = Course.attributes.test?.fakeQuestion7Answer1;
      const fakeQuestion7Answer2 = Course.attributes.test?.fakeQuestion7Answer2;
      const fakeQuestion7Answer3 = Course.attributes.test?.fakeQuestion7Answer3;
      const question8 = Course.attributes.test?.question8;
      const question8Answer = Course.attributes.test?.question8Answer;
      const fakeQuestion8Answer1 = Course.attributes.test?.fakeQuestion8Answer1;
      const fakeQuestion8Answer2 = Course.attributes.test?.fakeQuestion8Answer2;
      const fakeQuestion8Answer3 = Course.attributes.test?.fakeQuestion8Answer3;
      const question9 = Course.attributes.test?.question9;
      const question9Answer = Course.attributes.test?.question9Answer;
      const fakeQuestion9Answer1 = Course.attributes.test?.fakeQuestion9Answer1;
      const fakeQuestion9Answer2 = Course.attributes.test?.fakeQuestion9Answer2;
      const fakeQuestion9Answer3 = Course.attributes.test?.fakeQuestion9Answer3;
      const question10 = Course.attributes.test?.question10;
      const question10Answer = Course.attributes.test?.question10Answer;
      const fakeQuestion10Answer1 =
        Course.attributes.test?.fakeQuestion10Answer1;
      const fakeQuestion10Answer2 =
        Course.attributes.test?.fakeQuestion10Answer2;
      const fakeQuestion10Answer3 =
        Course.attributes.test?.fakeQuestion10Answer3;
      const passingGrade = Course.attributes.test?.passingGrade;

      setCourseName(courseName);
      setCourseDescription(courseDescription);
      setCourseCost(courseCost);
      setCoursePrerequisite(coursePrerequisite);
      setCourseImage(courseImage);
      setSection1Title(section1Title);
      setSection1Description(section1Description);
      setSection1Video(section1Video);
      setSection2Title(section2Title);
      setSection2Description(section2Description);
      setSection2Video(section2Video);
      setSection3Title(section3Title);
      setSection3Description(section3Description);
      setSection3Video(section3Video);
      setQuestion1(question1);
      setQuestion1Answer(question1Answer);
      setFakeQuestion1Answer1(fakeQuestion1Answer1);
      setFakeQuestion1Answer2(fakeQuestion1Answer2);
      setFakeQuestion1Answer3(fakeQuestion1Answer3);
      setQuestion2(question2);
      setQuestion2Answer(question2Answer);
      setFakeQuestion2Answer1(fakeQuestion2Answer1);
      setFakeQuestion2Answer2(fakeQuestion2Answer2);
      setFakeQuestion2Answer3(fakeQuestion2Answer3);
      setQuestion3(question3);
      setQuestion3Answer(question3Answer);
      setFakeQuestion3Answer1(fakeQuestion3Answer1);
      setFakeQuestion3Answer2(fakeQuestion3Answer2);
      setFakeQuestion3Answer3(fakeQuestion3Answer3);
      setQuestion4(question4);
      setQuestion4Answer(question4Answer);
      setFakeQuestion4Answer1(fakeQuestion4Answer1);
      setFakeQuestion4Answer2(fakeQuestion4Answer2);
      setFakeQuestion4Answer3(fakeQuestion4Answer3);
      setQuestion5(question5);
      setQuestion5Answer(question5Answer);
      setFakeQuestion5Answer1(fakeQuestion5Answer1);
      setFakeQuestion5Answer2(fakeQuestion5Answer2);
      setFakeQuestion5Answer3(fakeQuestion5Answer3);
      setQuestion6(question6);
      setQuestion6Answer(question6Answer);
      setFakeQuestion6Answer1(fakeQuestion6Answer1);
      setFakeQuestion6Answer2(fakeQuestion6Answer2);
      setFakeQuestion6Answer3(fakeQuestion6Answer3);
      setQuestion7(question7);
      setQuestion7Answer(question7Answer);
      setFakeQuestion7Answer1(fakeQuestion7Answer1);
      setFakeQuestion7Answer2(fakeQuestion7Answer2);
      setFakeQuestion7Answer3(fakeQuestion7Answer3);
      setQuestion8(question8);
      setQuestion8Answer(question8Answer);
      setFakeQuestion8Answer1(fakeQuestion8Answer1);
      setFakeQuestion8Answer2(fakeQuestion8Answer2);
      setFakeQuestion8Answer3(fakeQuestion8Answer3);
      setQuestion9(question9);
      setQuestion9Answer(question9Answer);
      setFakeQuestion9Answer1(fakeQuestion9Answer1);
      setFakeQuestion9Answer2(fakeQuestion9Answer2);
      setFakeQuestion9Answer3(fakeQuestion9Answer3);
      setQuestion10(question10);
      setQuestion10Answer(question10Answer);
      setFakeQuestion10Answer1(fakeQuestion10Answer1);
      setFakeQuestion10Answer2(fakeQuestion10Answer2);
      setFakeQuestion10Answer3(fakeQuestion10Answer3);
      setPassingGrade(passingGrade);
    }
  }, []);

  useEffect(async () => {
    if (coursePrerequisite) {
      const Courses = Moralis.Object.extend("Courses");
      const query = new Moralis.Query(Courses);
      const account = user.attributes.accounts[0];
      query.equalTo("educatorAddress", account);
      query.equalTo("objectId", coursePrerequisite);
      const results = await query.find();
      // console.log(results);
      setCoursePrerequisiteName(results[0].attributes.courseName);
    }
  }, [coursePrerequisite]);

  const saveTestEdits = async () => {
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
    setIsSaveInProgress(false);
    console.log("Test saved");
  };

  const alertSaveSuccess = () => {
    return toast({
      title: "Test saved",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <>
      {/* Header */}
      <div className={stylesHeader.frameDiv}>
        <div className={stylesHeader.frameDiv1}>
          <img
            className={stylesHeader.nFTeach1Icon}
            alt=''
            src='/welcome_imgs/NFTeach.png'
          />
          <div className={stylesHeader.logoDiv}>Build the Future</div>
        </div>
      </div>
      {/* First Block */}
      <div className={stylesFirstBlock.reviewPageDiv}>
        <div className={stylesFirstBlock.frameDiv}>
          <div className={stylesFirstBlock.frameDiv1}>
            <div className={stylesFirstBlock.titleDiv}>
              Review your course before you submit
            </div>
          </div>
        </div>
        <div className={stylesFirstBlock.frameDiv2}>
          <div className={stylesFirstBlock.frameDiv3}>
            <div className={stylesFirstBlock.frameDiv4}>
              <div className={stylesFirstBlock.courseTitleDiv}>Course Name</div>
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder={courseName}
              />
            </div>
            <div className={stylesFirstBlock.frameDiv4}>
              <div className={stylesFirstBlock.courseTitleDiv}>
                Course Description
              </div>
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder={courseDescription}
              />
            </div>
            <div className={stylesFirstBlock.frameDiv4}>
              <div className={stylesFirstBlock.courseTitleDiv}>
                How much will your course cost? (Specify in Matic)
              </div>
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder={courseCost}
              />
            </div>
            <div className={stylesFirstBlock.frameDiv4}>
              <div className={stylesFirstBlock.courseTitleDiv}>
                Course Prerequisites
              </div>
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder={coursePrerequisiteName}
              />
            </div>
          </div>
          <Button
            variant='solid'
            w='357px'
            colorScheme='green'
            onClick={onCourseInfoOpen}
          >
            Edit Course Info
          </Button>
        </div>
        <div className={stylesFirstBlock.frameDiv8}>
          <div className={stylesFirstBlock.frameDiv9}>
            <div className={stylesFirstBlock.frameDiv10}>
              <div className={stylesFirstBlock.titleDiv1}>Course image</div>
            </div>
            <Image
              borderRadius='full'
              boxSize='150px'
              src={courseImage}
              alt='course image'
            />
          </div>
          <Button
            variant='solid'
            w='357px'
            colorScheme='green'
            onClick={() => router.push("/courseCreationPage2")}
          >
            Edit Course Image
          </Button>
        </div>
        <div className={stylesFirstBlock.frameDiv11}>
          <Accordion className={stylesFirstBlock.accordionDefault} allowToggle>
            <AccordionItem>
              <AccordionButton>
                <Box flex='1' textAlign='left'>
                  {section1Title}
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel textAlign='middle'>
                <AspectRatio maxW='560px' ratio={16 / 9}>
                  <iframe
                    title='section1Video'
                    src={section1Video}
                    allowFullScreen
                  />
                </AspectRatio>
                {section1Description}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          <Accordion className={stylesFirstBlock.accordionDefault} allowToggle>
            <AccordionItem>
              <AccordionButton>
                <Box flex='1' textAlign='left'>
                  {section2Title}
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel textAlign='middle'>
                <AspectRatio maxW='560px' ratio={16 / 9}>
                  <iframe
                    title='section1Video'
                    src={section2Video}
                    allowFullScreen
                  />
                </AspectRatio>
                {section2Description}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          <Accordion className={stylesFirstBlock.accordionDefault} allowToggle>
            <AccordionItem>
              <AccordionButton>
                <Box flex='1' textAlign='left'>
                  {section3Title}
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel textAlign='middle'>
                <AspectRatio maxW='560px' ratio={16 / 9}>
                  <iframe
                    title='section1Video'
                    src={section3Video}
                    allowFullScreen
                  />
                </AspectRatio>
                {section3Description}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          <Button
            variant='solid'
            w='357px'
            colorScheme='green'
            onClick={() => router.push("/courseCreationPage3")}
          >
            Edit Course Sections
          </Button>
        </div>
        <Button
          className={stylesFirstBlock.accordionDefault}
          variant='solid'
          colorScheme='green'
          onClick={onTestEditOpen}
        >
          Review Test
        </Button>
        <Button
          variant='solid'
          w='357px'
          colorScheme='green'
          onClick={() => router.push("/courseStaking")}
        >
          Last Step!
        </Button>
      </div>
      {/* Course Info Modal */}
      <Modal isOpen={isCourseInfoOpen} onClose={onCourseInfoClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Course Info</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Course Name</Text>
            <Input
              label='Course Name'
              variant='outline'
              textColor='#000000'
              placeholder={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
            &nbsp;
            <br />
            <Text>Course Description</Text>
            <Input
              label='Course Description'
              variant='outline'
              textColor='#000000'
              placeholder={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
            />
            &nbsp;
            <br />
            <Text>Course Cost</Text>
            <NumberInput
              label='Course Cost'
              variant='outline'
              textColor='#000000'
              placeholder={courseCost}
              precision={2}
              step={0.01}
              onChange={(valueString) => setCourseCost(valueString)}
            >
              <NumberInputField />
            </NumberInput>
            &nbsp;
            <br />
            <Text>Course Prerequisites</Text>
            {/* GRAB CODE FOR PAGE 1 FOR PREREQUISITE COURSES AND ADD HERE */}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='green' mr={3} onClick={onCourseInfoClose}>
              Save and Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Test Edit Modal */}
      <Modal
        isOpen={isTestEditOpen}
        onClose={onTestEditClose}
        size={"xl"}
        scrollBehavior={scrollBehavior}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Review Test</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Question 1</Text>
            <Input
              label='Question 1'
              variant='outline'
              textColor='#000000'
              placeholder={question1}
              onChange={(e) => setQuestion1(e.target.value)}
            />
            &nbsp;
            <br />
            <Text>Question 1 Answer</Text>
            <Input
              label='Question 1 Answer'
              variant='outline'
              textColor='#000000'
              placeholder={question1Answer}
              onChange={(e) => setQuestion1Answer(e.target.value)}
            />
            &nbsp;
            <br />
            <Text>Question 1 Fake Answer 1</Text>
            <Input
              label='Question 1 Fake Answer 1'
              variant='outline'
              textColor='#000000'
              placeholder={fakeQuestion1Answer1}
              onChange={(e) => setFakeQuestion1Answer1(e.target.value)}
            />
            &nbsp;
            <br />
            <Text>Question 1 Fake Answer 2</Text>
            <Input
              label='Question 1 Fake Answer 2'
              variant='outline'
              textColor='#000000'
              placeholder={fakeQuestion1Answer2}
              onChange={(e) => setFakeQuestion1Answer2(e.target.value)}
            />
            &nbsp;
            <br />
            <Text>Question 1 Fake Answer 3</Text>
            <Input
              label='Question 1 Fake Answer 3'
              variant='outline'
              textColor='#000000'
              placeholder={fakeQuestion1Answer3}
              onChange={(e) => setFakeQuestion1Answer3(e.target.value)}
            />
            &nbsp;
            <br />
            <Text>Question 2</Text>
            <Input
              label='Question 2'
              variant='outline'
              textColor='#000000'
              placeholder={question2}
              onChange={(e) => setQuestion2(e.target.value)}
            />
            &nbsp;
            <br />
            <Text>Question 2 Answer</Text>
            <Input
              label='Question 2 Answer'
              variant='outline'
              textColor='#000000'
              placeholder={question2Answer}
              onChange={(e) => setQuestion2Answer(e.target.value)}
            />
            &nbsp;
            <br />
            <Text>Question 2 Fake Answer 1</Text>
            <Input
              label='Question 2 Fake Answer 1'
              variant='outline'
              textColor='#000000'
              placeholder={fakeQuestion2Answer1}
              onChange={(e) => setFakeQuestion2Answer1(e.target.value)}
            />
            &nbsp;
            <br />
            <Text>Question 2 Fake Answer 2</Text>
            <Input
              label='Question 2 Fake Answer 2'
              variant='outline'
              textColor='#000000'
              placeholder={fakeQuestion2Answer2}
              onChange={(e) => setFakeQuestion2Answer2(e.target.value)}
            />
            &nbsp;
            <br />
            <Text>Question 2 Fake Answer 3</Text>
            <Input
              label='Question 2 Fake Answer 3'
              variant='outline'
              textColor='#000000'
              placeholder={fakeQuestion2Answer3}
              onChange={(e) => setFakeQuestion2Answer3(e.target.value)}
            />
            &nbsp;
            <br />
            <Text>Question 3</Text>
            <Input
              label='Question 3'
              variant='outline'
              textColor='#000000'
              placeholder={question3}
              onChange={(e) => setQuestion3(e.target.value)}
            />
            &nbsp;
            <br />
            <Text>Question 3 Answer</Text>
            <Input
              label='Question 3 Answer'
              variant='outline'
              textColor='#000000'
              placeholder={question3Answer}
              onChange={(e) => setQuestion3Answer(e.target.value)}
            />
            &nbsp;
            <br />
            <Text>Question 3 Fake Answer 1</Text>
            <Input
              label='Question 3 Fake Answer 1'
              variant='outline'
              textColor='#000000'
              placeholder={fakeQuestion3Answer1}
              onChange={(e) => setFakeQuestion3Answer1(e.target.value)}
            />
            &nbsp;
            <br />
            <Text>Question 3 Fake Answer 2</Text>
            <Input
              label='Question 3 Fake Answer 2'
              variant='outline'
              textColor='#000000'
              placeholder={fakeQuestion3Answer2}
              onChange={(e) => setFakeQuestion3Answer2(e.target.value)}
            />
            &nbsp;
            <br />
            <Text>Question 3 Fake Answer 3</Text>
            <Input
              label='Question 3 Fake Answer 3'
              variant='outline'
              textColor='#000000'
              placeholder={fakeQuestion3Answer3}
              onChange={(e) => setFakeQuestion3Answer3(e.target.value)}
            />
            &nbsp;
            <br />
            <Text>Question 4</Text>
            <Input
              label='Question 4'
              variant='outline'
              textColor='#000000'
              placeholder={question4}
              onChange={(e) => setQuestion4(e.target.value)}
            />
            &nbsp;
            <br />
            <Text>Question 4 Answer</Text>
            <Input
              label='Question 4 Answer'
              variant='outline'
              textColor='#000000'
              placeholder={question4Answer}
              onChange={(e) => setQuestion4Answer(e.target.value)}
            />
            &nbsp;
            <br />
            <Text>Question 4 Fake Answer 1</Text>
            <Input
              label='Question 4 Fake Answer 1'
              variant='outline'
              textColor='#000000'
              placeholder={fakeQuestion4Answer1}
              onChange={(e) => setFakeQuestion4Answer1(e.target.value)}
            />
            &nbsp;
            <br />
            <Text>Question 4 Fake Answer 2</Text>
            <Input
              label='Question 4 Fake Answer 2'
              variant='outline'
              textColor='#000000'
              placeholder={fakeQuestion4Answer2}
              onChange={(e) => setFakeQuestion4Answer2(e.target.value)}
            />
            &nbsp;
            <br />
            <Text>Question 4 Fake Answer 3</Text>
            <Input
              label='Question 4 Fake Answer 3'
              variant='outline'
              textColor='#000000'
              placeholder={fakeQuestion4Answer3}
              onChange={(e) => setFakeQuestion4Answer3(e.target.value)}
            />
            &nbsp;
            <br />
            <Text>Question 5</Text>
            <Input
              label='Question 5'
              variant='outline'
              textColor='#000000'
              placeholder={question5}
              onChange={(e) => setQuestion5(e.target.value)}
            />
            &nbsp;
            <br />
            <Text>Question 5 Answer</Text>
            <Input
              label='Question 5 Answer'
              variant='outline'
              textColor='#000000'
              placeholder={question5Answer}
              onChange={(e) => setQuestion5Answer(e.target.value)}
            />
            &nbsp;
            <br />
            <Text>Question 5 Fake Answer 1</Text>
            <Input
              label='Question 5 Fake Answer 1'
              variant='outline'
              textColor='#000000'
              placeholder={fakeQuestion5Answer1}
              onChange={(e) => setFakeQuestion5Answer1(e.target.value)}
            />
            &nbsp;
            <br />
            <Text>Question 5 Fake Answer 2</Text>
            <Input
              label='Question 5 Fake Answer 2'
              variant='outline'
              textColor='#000000'
              placeholder={fakeQuestion5Answer2}
              onChange={(e) => setFakeQuestion5Answer2(e.target.value)}
            />
            &nbsp;
            <br />
            <Text>Question 5 Fake Answer 3</Text>
            <Input
              label='Question 5 Fake Answer 3'
              variant='outline'
              textColor='#000000'
              placeholder={fakeQuestion5Answer3}
              onChange={(e) => setFakeQuestion5Answer3(e.target.value)}
            />
            &nbsp;
            <br />
            <Text>Question 6</Text>
            <Input
              label='Question 6'
              variant='outline'
              textColor='#000000'
              placeholder={question6}
              onChange={(e) => setQuestion6(e.target.value)}
            />
            &nbsp;
            <br />
            <Text>Question 6 Answer</Text>
            <Input
              label='Question 6 Answer'
              variant='outline'
              textColor='#000000'
              placeholder={question6Answer}
              onChange={(e) => setQuestion6Answer(e.target.value)}
            />
            &nbsp;
            <br />
            <Text>Question 6 Fake Answer 1</Text>
            <Input
              label='Question 6 Fake Answer 1'
              variant='outline'
              textColor='#000000'
              placeholder={fakeQuestion6Answer1}
              onChange={(e) => setFakeQuestion6Answer1(e.target.value)}
            />
            &nbsp;
            <br />
            <Text>Question 6 Fake Answer 2</Text>
            <Input
              label='Question 6 Fake Answer 2'
              variant='outline'
              textColor='#000000'
              placeholder={fakeQuestion6Answer2}
              onChange={(e) => setFakeQuestion6Answer2(e.target.value)}
            />
            &nbsp;
            <br />
            <Text>Question 6 Fake Answer 3</Text>
            <Input
              label='Question 6 Fake Answer 3'
              variant='outline'
              textColor='#000000'
              placeholder={fakeQuestion6Answer3}
              onChange={(e) => setFakeQuestion6Answer3(e.target.value)}
            />
            &nbsp;
            <br />
            <Text>Question 7</Text>
            <Input
              label='Question 7'
              variant='outline'
              textColor='#000000'
              placeholder={question7}
              onChange={(e) => setQuestion7(e.target.value)}
            />
            &nbsp;
            <br />
            <Text>Question 7 Answer</Text>
            <Input
              label='Question 7 Answer'
              variant='outline'
              textColor='#000000'
              placeholder={question7Answer}
              onChange={(e) => setQuestion7Answer(e.target.value)}
            />
            &nbsp;
            <br />
            <Text>Question 7 Fake Answer 1</Text>
            <Input
              label='Question 7 Fake Answer 1'
              variant='outline'
              textColor='#000000'
              placeholder={fakeQuestion7Answer1}
              onChange={(e) => setFakeQuestion7Answer1(e.target.value)}
            />
            &nbsp;
            <br />
            <Text>Question 7 Fake Answer 2</Text>
            <Input
              label='Question 7 Fake Answer 2'
              variant='outline'
              textColor='#000000'
              placeholder={fakeQuestion7Answer2}
              onChange={(e) => setFakeQuestion7Answer2(e.target.value)}
            />
            &nbsp;
            <br />
            <Text>Question 7 Fake Answer 3</Text>
            <Input
              label='Question 7 Fake Answer 3'
              variant='outline'
              textColor='#000000'
              placeholder={fakeQuestion7Answer3}
              onChange={(e) => setFakeQuestion7Answer3(e.target.value)}
            />
            &nbsp;
            <br />
            <Text>Question 8</Text>
            <Input
              label='Question 8'
              variant='outline'
              textColor='#000000'
              placeholder={question8}
              onChange={(e) => setQuestion8(e.target.value)}
            />
            &nbsp;
            <br />
            <Text>Question 8 Answer</Text>
            <Input
              label='Question 8 Answer'
              variant='outline'
              textColor='#000000'
              placeholder={question8Answer}
              onChange={(e) => setQuestion8Answer(e.target.value)}
            />
            &nbsp;
            <br />
            <Text>Question 8 Fake Answer 1</Text>
            <Input
              label='Question 8 Fake Answer 1'
              variant='outline'
              textColor='#000000'
              placeholder={fakeQuestion8Answer1}
              onChange={(e) => setFakeQuestion8Answer1(e.target.value)}
            />
            &nbsp;
            <br />
            <Text>Question 8 Fake Answer 2</Text>
            <Input
              label='Question 8 Fake Answer 2'
              variant='outline'
              textColor='#000000'
              placeholder={fakeQuestion8Answer2}
              onChange={(e) => setFakeQuestion8Answer2(e.target.value)}
            />
            &nbsp;
            <br />
            <Text>Question 8 Fake Answer 3</Text>
            <Input
              label='Question 8 Fake Answer 3'
              variant='outline'
              textColor='#000000'
              placeholder={fakeQuestion8Answer3}
              onChange={(e) => setFakeQuestion8Answer3(e.target.value)}
            />
            &nbsp;
            <br />
            <Text>Question 9</Text>
            <Input
              label='Question 9'
              variant='outline'
              textColor='#000000'
              placeholder={question9}
              onChange={(e) => setQuestion9(e.target.value)}
            />
            &nbsp;
            <br />
            <Text>Question 9 Answer</Text>
            <Input
              label='Question 9 Answer'
              variant='outline'
              textColor='#000000'
              placeholder={question9Answer}
              onChange={(e) => setQuestion9Answer(e.target.value)}
            />
            &nbsp;
            <br />
            <Text>Question 9 Fake Answer 1</Text>
            <Input
              label='Question 9 Fake Answer 1'
              variant='outline'
              textColor='#000000'
              placeholder={fakeQuestion9Answer1}
              onChange={(e) => setFakeQuestion9Answer1(e.target.value)}
            />
            &nbsp;
            <br />
            <Text>Question 9 Fake Answer 2</Text>
            <Input
              label='Question 9 Fake Answer 2'
              variant='outline'
              textColor='#000000'
              placeholder={fakeQuestion9Answer2}
              onChange={(e) => setFakeQuestion9Answer2(e.target.value)}
            />
            &nbsp;
            <br />
            <Text>Question 9 Fake Answer 3</Text>
            <Input
              label='Question 9 Fake Answer 3'
              variant='outline'
              textColor='#000000'
              placeholder={fakeQuestion9Answer3}
              onChange={(e) => setFakeQuestion9Answer3(e.target.value)}
            />
            &nbsp;
            <br />
            <Text>Question 10</Text>
            <Input
              label='Question 10'
              variant='outline'
              textColor='#000000'
              placeholder={question10}
              onChange={(e) => setQuestion10(e.target.value)}
            />
            &nbsp;
            <br />
            <Text>Question 10 Answer</Text>
            <Input
              label='Question 10 Answer'
              variant='outline'
              textColor='#000000'
              placeholder={question10Answer}
              onChange={(e) => setQuestion10Answer(e.target.value)}
            />
            &nbsp;
            <br />
            <Text>Question 10 Fake Answer 1</Text>
            <Input
              label='Question 10 Fake Answer 1'
              variant='outline'
              textColor='#000000'
              placeholder={fakeQuestion10Answer1}
              onChange={(e) => setFakeQuestion10Answer1(e.target.value)}
            />
            &nbsp;
            <br />
            <Text>Question 10 Fake Answer 2</Text>
            <Input
              label='Question 10 Fake Answer 2'
              variant='outline'
              textColor='#000000'
              placeholder={fakeQuestion10Answer2}
              onChange={(e) => setFakeQuestion10Answer2(e.target.value)}
            />
            &nbsp;
            <br />
            <Text>Question 10 Fake Answer 3</Text>
            <Input
              label='Question 10 Fake Answer 3'
              variant='outline'
              textColor='#000000'
              placeholder={fakeQuestion10Answer3}
              onChange={(e) => setFakeQuestion10Answer3(e.target.value)}
            />
            &nbsp;
            <br />
            <Text>Passing Grade</Text>
            <Input
              label='Passing Grade'
              variant='outline'
              textColor='#000000'
              placeholder={passingGrade}
              onChange={(e) => setPassingGrade(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              variant='ghost'
              // onLoading={isSaveInProgress}
              onClick={async () => {
                setIsSaveInProgress(true);
                await saveTestEdits();
                onTestEditClose();
                alertSaveSuccess();
              }}
            >
              Save and Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Footer */}
      <div className={stylesFooter.frameDiv}>
        <h4 className={stylesFooter.nFTeachH4}>© 2022 NFTeach</h4>
      </div>
    </>
  );
};

export default courseReview;
