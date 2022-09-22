import { useState, useEffect } from "react";
import {
  Button,
  Input,
  Select,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Textarea,
} from "@chakra-ui/react";
import Link from "next/link";
import moralis from "moralis";
import { useMoralis } from "react-moralis";
import stylesHeader from "../styles/Course_Page/Header.module.css";
import stylesFirstBlock from "../styles/Course_Page/FirstBlock.module.css";
import stylesFooter from "../styles/Course_Page/Footer.module.css";

moralis.initialize(process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;

const course = (props) => {
  const [selectedSection, setSelectedSection] = useState("1");
  const [course, setCourse] = useState();
  const { Moralis } = useMoralis();
  const [courseName, setCourseName] = useState();
  const [courseObjectId, setCourseObjectId] = useState();
  const [courseDescription, setCourseDescription] = useState();
  const [courseSection1, setCourseSection1] = useState();
  const [courseSection2, setCourseSection2] = useState();
  const [courseSection3, setCourseSection3] = useState();
  const [selectedSectionName, setSelectedSectionName] = useState();
  const [selectedSectionDescription, setSelectedSectionDescription] =
    useState();
  const [selectedSectionVideo, setSelectedSectionVideo] = useState();

  useEffect(async () => {
    const Courses = Moralis.Object.extend("Courses");
    const query = new Moralis.Query(Courses);
    query.equalTo("objectId", props.courseObjectId);
    const course = await query.find();
    setCourse(course);
    setCourseObjectId(props.courseObjectId);
    setCourseName(course[0].get("courseName"));
    setCourseDescription(course[0].get("description"));
    setCourseSection1(course[0].get("courseSection1"));
    setCourseSection2(course[0].get("courseSection2"));
    setCourseSection3(course[0].get("courseSection3"));
    setSelectedSectionDescription(
      course[0].get("courseSection1").sectionDescription
    );
    setSelectedSectionVideo(course[0].get("courseSection1").vid);
  }, []);

  // console.log(props.courseObjectId);
  useEffect(async () => {
    const courseSection1Name = courseSection1?.sectionName;
    const courseSection1Description = courseSection1?.sectionDescription;
    const courseSection1Video = courseSection1?.vid;
    const courseSection2Name = courseSection2?.sectionName;
    const courseSection2Description = courseSection2?.sectionDescription;
    const courseSection2Video = courseSection2?.vid;
    const courseSection3Name = courseSection3?.sectionName;
    const courseSection3Description = courseSection3?.sectionDescription;
    const courseSection3Video = courseSection3?.vid;

    const handleSectionChange = () => {
      // console.log(selectedSection);
      if (selectedSection === "1") {
        setSelectedSectionName(courseSection1Name);
        setSelectedSectionDescription(courseSection1Description);
        setSelectedSectionVideo(courseSection1Video);
      } else if (selectedSection === "2") {
        setSelectedSectionName(courseSection2Name);
        setSelectedSectionDescription(courseSection2Description);
        setSelectedSectionVideo(courseSection2Video);
      } else if (selectedSection === "3") {
        setSelectedSectionName(courseSection3Name);
        setSelectedSectionDescription(courseSection3Description);
        setSelectedSectionVideo(courseSection3Video);
      }
    };
    handleSectionChange();
  }, [selectedSection]);

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
          <div className={stylesHeader.logoDiv}>Knowledge is unlimited!</div>
        </div>
      </div>
      {/* First Block */}
      <div className={stylesFirstBlock.courseDiv}>
        <div className={stylesFirstBlock.frameDiv}>
          <div className={stylesFirstBlock.frameDiv1}>
            <Menu className={stylesFirstBlock.dropdownDefaultMenu}>
              <MenuButton as={Button} colorScheme='green' >
                Change Section
              </MenuButton>
              <Select color="white" onChange={(e) => setSelectedSection(e.target.value)}>
                    <option value="1">{courseSection1?.sectionName}</option>
                    <option value="2">{courseSection2?.sectionName}</option>
                    <option value="3">{courseSection3?.sectionName}</option>
                </Select>
              {/* <MenuList>
                <MenuItem value='1' onChange={() => setSelectedSection("1")}>{courseSection1?.sectionName}</MenuItem>
                <MenuItem value='2' onChange={() => setSelectedSection("2")}>{courseSection2?.sectionName}</MenuItem>
                <MenuItem value='3' onChange={() => setSelectedSection("3")}>{courseSection3?.sectionName}</MenuItem>
              </MenuList> */}
            </Menu>
            <video className={stylesFirstBlock.frameVideo} src={selectedSectionVideo} controls>
              <source />
            </video>
            <div className={stylesFirstBlock.frameDiv2}>
              <div className={stylesFirstBlock.frameDiv3}>
                <Textarea
                  className={stylesFirstBlock.rectangleTextarea}
                  variant='outline'
                  placeholder={selectedSectionDescription}
                  isDisabled
                  isReadOnly
                />
              </div>
            </div>
          </div>
          <Link href={{ pathname: "/test/question1",
            query: {  
                courseObjectId: courseObjectId, 
                }}} passHref>
            <Button variant="solid" w="272px" colorScheme="green">
                Attempt Test
            </Button>
          </Link>
        </div>
      </div>
      {/* Footer */}
      <div className={stylesFooter.frameDiv}>
        <h4 className={stylesFooter.nFTeachH4}>© 2022 NFTeach</h4>
      </div>
    </>
  );
};

export default course;

// Recieve props from next/pages/explore.jsx
export const getServerSideProps = (context) => {
  return {
    props: {
      courseObjectId: context.query.courseObjectId,
    },
  };
};
