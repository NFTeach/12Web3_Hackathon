import { useCallback, useEffect, useState } from "react";
import {
  Input,
  Button,
  NumberInput,
  NumberInputField,
  Select,
} from "@chakra-ui/react";
import moralis from "moralis";
import { useMoralis } from "react-moralis";
import { useRouter } from "next/router";
import stylesHeader from "../styles/CourseCreation_Pages/1/Header.module.css";
import stylesFirstBlock from "../styles/CourseCreation_Pages/1/FirstBlock.module.css";
import stylesFooter from "../styles/CourseCreation_Pages/1/Footer.module.css";

moralis.initialize(process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;

const CourseCreationPage1 = () => {
  const router = useRouter();
  const { Moralis } = useMoralis();
  const user = moralis.User.current();

  const [courseName, setCourseName] = useState();
  const [description, setDescription] = useState();
  const [cost, setCost] = useState("15.00");
  const [prerequisites, setPrerequisites] = useState([]);
  const [selectedPrerequisite, setSelectedPrerequisite] = useState();
  const [isUploadInProgress, setIsUploadInProgress] = useState(false);

  useEffect(async () => {
    if (!user) {
      window.alert("Please connect wallet");
    } else {
      const Courses = Moralis.Object.extend("Courses");
      const query = new Moralis.Query(Courses);
      const account = user.attributes.accounts[0];
      query.equalTo("educatorAddress", account);
      query.descending("createdAt");
      const coursePrerequisites = await query.find();
      setPrerequisites(coursePrerequisites);
    }
  }, []);

  const saveTestData = async () => {
    const Courses = Moralis.Object.extend("Courses");
    const newCourse = new Courses();

    const educatorAddress = user.get("ethAddress");
    newCourse.set("educatorAddress", educatorAddress);

    if (courseName) {
      newCourse.set("courseName", courseName);
    }

    if (description) {
      newCourse.set("description", description);
    }

    if (cost) {
      newCourse.set("cost", cost);
    }

    if (selectedPrerequisite) {
      newCourse.set("prerequisite", selectedPrerequisite);
    }

    await newCourse.save();
    setIsUploadInProgress(false);
  };

  const onContinueButtonClick = useCallback(() => {
    router.push("/courseCreationPage2");
  }, [router]);

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
      <div className={stylesFirstBlock.courseCreationPage1}>
        <div className={stylesFirstBlock.frameDiv}>
          <div className={stylesFirstBlock.frameDiv1}>
            <div className={stylesFirstBlock.titleDiv}>
              Create your course (1/4)
            </div>
          </div>
        </div>
        <div className={stylesFirstBlock.frameDiv2}>
          <div className={stylesFirstBlock.frameDiv3}>
            <div className={stylesFirstBlock.titleDiv1}>
              This is the beginning of something great! Let???s start with some
              basic information about your course. In the next sections, you???ll
              be uploading your course images and content.
            </div>
          </div>
        </div>
        <div className={stylesFirstBlock.frameDiv4}>
          <div className={stylesFirstBlock.frameDiv5}>
            <div className={stylesFirstBlock.frameDiv6}>
              <div className={stylesFirstBlock.courseNameDiv}>Course Name</div>
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder='What will your course be called?'
                onChange={(e) => setCourseName(e.target.value)}
              />
            </div>
            <div className={stylesFirstBlock.frameDiv6}>
              <div className={stylesFirstBlock.courseNameDiv}>
                Course Description
              </div>
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder='Write a description of what your course teaches.'
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className={stylesFirstBlock.frameDiv6}>
              <div className={stylesFirstBlock.courseNameDiv}>
                How much will your course cost? (Specify in Matic)
              </div>
              <NumberInput
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder='How much will your course cost? (Specify in Matic)'
                defaultValue={1}
                precision={3}
                step={0.001}
                onChange={(valueString) => setCost(valueString)}
              >
                <NumberInputField />
              </NumberInput>
            </div>
            <div className={stylesFirstBlock.courseNameDiv}>
              Any course prerequisites?
            </div>
            <Select
              placeholder='Course Prerequisites'
              key={prerequisites.id}
              onChange={(e) => setSelectedPrerequisite(e.target.value)}
            >
              {prerequisites.map((prerequisite) => (
                <option key={prerequisite.id} value={prerequisite.id}>
                  {prerequisite.get("courseName")}
                </option>
              ))}
            </Select>
          </div>
        </div>
        <div className={stylesFirstBlock.frameDiv9}>
          <div className={stylesFirstBlock.registerButtonDiv}>
            <Button
              className={stylesFirstBlock.dropdownDefaultMenu}
              variant='solid'
              colorScheme='green'
              isLoading={isUploadInProgress}
              onClick={async () => {
                setIsUploadInProgress(true);
                await saveTestData();
                onContinueButtonClick();
              }}
            >
              Continue
            </Button>
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

export default CourseCreationPage1;
