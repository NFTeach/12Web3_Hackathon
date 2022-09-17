import { useState, useEffect } from "react";
import {
    Button,
    Input,
    Select
  } from "@chakra-ui/react";
import moralis from "moralis";
import { useMoralis } from "react-moralis";
import stylesFirstBlock from "../styles/Course_Page/FirstBlock.module.css";

moralis.initialize(process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;

const course = (props) => {

    const [selectedSection, setSelectedSection] = useState("1");
    const [course, setCourse] = useState();
    const { Moralis } = useMoralis();
    const [courseName, setCourseName] = useState();
    const [courseDescription, setCourseDescription] = useState();
    const [courseSection1, setCourseSection1] = useState();
    const [courseSection2, setCourseSection2] = useState();
    const [courseSection3, setCourseSection3] = useState();
    const [selectedSectionName, setSelectedSectionName] = useState();
    const [selectedSectionDescription, setSelectedSectionDescription] = useState();
    const [selectedSectionVideo, setSelectedSectionVideo] = useState();
    
    useEffect (async () => {
        const Courses = Moralis.Object.extend("Courses");
        const query = new Moralis.Query(Courses);
        query.equalTo("objectId", props.courseObjectId);
        const course = await query.find();
        setCourse(course);
        setCourseName(course[0].get("courseName"));
        setCourseDescription(course[0].get("description"));
        setCourseSection1(course[0].get("courseSection1"));
        setCourseSection2(course[0].get("courseSection2"));
        setCourseSection3(course[0].get("courseSection3"));
    }, []);

    // const courseSection1Name = courseSection1?.sectionName;
    // const courseSection1Description = courseSection1?.sectionDescription;
    // const courseSection1Video = courseSection1?.vid;
    // const courseSection2Name = courseSection2?.sectionName;
    // const courseSection2Description = courseSection2?.sectionDescription;
    // const courseSection2Video = courseSection2?.vid;
    // const courseSection3Name = courseSection3?.sectionName;
    // const courseSection3Description = courseSection3?.sectionDescription;
    // const courseSection3Video = courseSection3?.vid;

    console.log(course);
    useEffect (() => {
        const handleSectionChange = () => {
            console.log(selectedSection);
            if(selectedSection === "1") {
                setSelectedSectionName(courseSection1?.sectionName);
                setSelectedSectionDescription(courseSection1Description);
                setSelectedSectionVideo(courseSection1Video);
            } else if(selectedSection === "2") {
                setSelectedSectionName(courseSection2Name);
                setSelectedSectionDescription(courseSection2Description);
                setSelectedSectionVideo(courseSection2Video);
            } else if(selectedSection === "3") {
                setSelectedSectionName(courseSection3Name);
                setSelectedSectionDescription(courseSection3Description);
                setSelectedSectionVideo(courseSection3Video);
            }
        };
        handleSectionChange();
    }, []);

    // console.log(selectedSectionName);

    return (
        <>
          <div className={stylesFirstBlock.courseDiv}>
            <div className={stylesFirstBlock.frameDiv}>
                <input
                className={stylesFirstBlock.frameInput}
                type="text"
                placeholder={courseName}
                />
                <video className={stylesFirstBlock.frameVideo} src={courseSection1Video} controls>
                </video>
                <div className={stylesFirstBlock.frameDiv1}>
                <Select color="white" onChange={(e) => setSelectedSection(e.target.value)}>
                    <option value="1">{courseSection1Name}</option>
                    <option value="2">{courseSection2Name}</option>
                    <option value="3">{courseSection3Name}</option>
                </Select>
                <div className={stylesFirstBlock.frameDiv2}>
                    <Input
                    className={stylesFirstBlock.rectangleInput}
                    variant="outline"
                    textColor="#e4e4e4"
                    backgroundColor="#000"
                    placeholder={selectedSectionDescription}
                    />
                </div>
                <Button variant="solid" w="272px" colorScheme="green">
                    Attempt Test
                </Button>
                </div>
            </div>
        </div>
        </>
    )
}

export default course

// Recieve props from next/pages/explore.jsx
export const getServerSideProps = (context) => {
    
    return {
        props: {
            courseObjectId: context.query.courseObjectId,
        },
    };
};