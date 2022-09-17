// NEED TO MAKE THE COURSES DYNAMIC MAPPING

import { useCallback, useEffect, useState } from "react";
import moralis from "moralis";
import { useMoralis } from "react-moralis";
import Link from "next/link";
import { useRouter } from "next/router";
import { defaultImgs } from "../public/defaultImgs";
import { HStack, Box, Image, Text } from "@chakra-ui/react";
import stylesHeader from "../styles/Explore_Page/Header.module.css";
import stylesFirstBlock from "../styles/Explore_Page/FirstBlock.module.css";
import stylesFooter from "../styles/Explore_Page/Footer.module.css";

moralis.initialize(process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;

const explore = () => {
    const router = useRouter();
    const [pfp, setPfp] = useState();
    const { Moralis } = useMoralis();
    const [educator, setEducator] = useState();
    const [courses, setCourses] = useState([]);
    const [courseObjectId, setCourseObjectId] = useState();
    const [images, setImages] = useState([]);
    const [courseName, setCourseName] = useState([]);
    const [courseDescription, setCourseDescription] = useState([]);
    const [courseSection1, setCourseSection1] = useState([]);
    const [courseSection2, setCourseSection2] = useState([]);
    const [courseSection3, setCourseSection3] = useState([]);
    const [courseTest, setCourseTest] = useState([]);
    const user = moralis.User.current();

    useEffect(() => {
        if(!user) return null;
        setPfp(user.get("pfp"))
    }, [user]);

    useEffect(async () => {
        if(!user) {
            window.alert("Please connect wallet")
        } else {
            const Educators = Moralis.Object.extend("Educators");
            const query = new Moralis.Query(Educators);
            const account = user.attributes.accounts[0];
            query.equalTo("educator", account);
            const educator = await query.find();
            setEducator(educator[0]);
        }
    }, []);

    useEffect(async() => {
        if(!user) {
            window.alert("Please connect wallet")
        } else {
            const Courses = Moralis.Object.extend("Courses");
            const query = new Moralis.Query(Courses);
            const course = await query.find();
            setCourses(course);
            setCourseObjectId(course.map((course) => course.get("objectId")));
            setImages(course.map((course) => course.get("imageFile")));
            setCourseName(course.map((course) => course.get("courseName")));
            setCourseDescription(course.map((course) => course.get("courseDescription")));
            setCourseSection1(course.map((course) => course.get("courseSection1")));
            setCourseSection2(course.map((course) => course.get("courseSection2")));
            setCourseSection3(course.map((course) => course.get("courseSection3")));
            setCourseTest(course.map((course) => course.get("test")));
        }
    }, []);

    console.log(courses);
    console.log(courseObjectId);

    const onStudentDashboardButtonClick = useCallback(() => {
        router.push("/studentDashboard");
    }, [router]);

    const onProfileButtonClick = useCallback(() => {
        router.push("/profileSettings");
    }, []);

    return (
        <>
            {/* Header */}
            <div className={stylesHeader.headerDiv}>
                <div className={stylesHeader.frameDiv}>
                    <h2 className={stylesHeader.nFTeachH2}>NFTeach</h2>
                    <div className={stylesHeader.tabsDiv}>
                    <button 
                        className={stylesHeader.studentDashboardButton}
                        onClick={onStudentDashboardButtonClick}
                    >
                        Student Dashboard
                    </button>
                    <button className={stylesHeader.exploreButton}>Explore</button>
                    <button 
                        className={stylesHeader.studentDashboardButton}
                        onClick={(educator ?  () => router.push("/educatorDashboard")  : () => router.push("/educatorRegistration"))}
                    >
                        Educator Dashboard
                    </button>
                    </div>
                    <div className={stylesHeader.profilePictureDiv}>
                    <img
                        className={stylesHeader.displayedNFTIcon}
                        alt="profilePFP"
                        src={pfp ? pfp : defaultImgs[0]}
                    />
                    <button 
                    className={stylesHeader.nameButton}
                    onClick={onProfileButtonClick}
                    >
                        {user?.attributes.username.slice(0, 15)}
                    </button>
                    </div>
                </div>
            </div>
            {/* First Block */}
            <div className={stylesFirstBlock.explorePageDiv}>
                <div className={stylesFirstBlock.frameDiv}>
                <div className={stylesFirstBlock.frameDiv1}>
                    <img
                    className={stylesFirstBlock.imageIcon}
                    alt=''
                    src='/explore_imgs/space_man.png'
                    />
                    <div className={stylesFirstBlock.chem101Div}>
                    <h1 className={stylesFirstBlock.educationThatsOutOfThisW}>
                        <p className={stylesFirstBlock.educationThats}>
                        <span>{`Education That’s `}</span>
                        </p>
                        <p className={stylesFirstBlock.outOfThisWorld}>
                        <span>Out Of This World</span>
                        </p>
                    </h1>
                    <h3 className={stylesFirstBlock.chooseACourseBelowToStart}>
                        Choose a course below to start learning and earning
                    </h3>
                    </div>
                </div>
                <div className={stylesFirstBlock.frameDiv3}>
                <HStack spacing='100px'>
                    <Box w='250px' h='250px'>
                        <Link href={{pathname: "/course", 
                            query: {
                                courseName: courseName[0], 
                                courseDescription: courseDescription[0], 
                                courseSection1Name: courseSection1[0]?.sectionName,
                                courseSection1Description: courseSection1[0]?.sectionDescription,
                                courseSection1Video: courseSection1[0]?.vid,
                                courseSection2Name: courseSection2[0]?.sectionName,
                                courseSection2Description: courseSection2[0]?.sectionDescription,
                                courseSection2Video: courseSection2[0]?.vid,
                                courseSection3Name: courseSection3[0]?.sectionName,
                                courseSection3Description: courseSection3[0]?.sectionDescription,
                                courseSection3Video: courseSection3[0]?.vid,
                                image: images[0]?.img}}}>
                            <Image 
                                borderRadius='full' 
                                boxSize='250px' 
                                src={images[0]?.img} 
                                alt={courseName[0]}
                            />
                        </Link>
                        <br/>
                        <Text>{courseName[0]}</Text>
                    </Box>
                    <Box w='250px' h='250px' >
                        <Image borderRadius='full' boxSize='250px' src={images[1]?.img} alt={courseName[1]} />
                        <br/>
                        <Text>{courseName[1]}</Text>
                    </Box>
                    <Box w='250px' h='250px'>
                        <Image borderRadius='full' boxSize='250px' src={images[2]?.img} alt={courseName[2]} />
                        <br/>
                        <Text>{courseName[2]}</Text>
                    </Box>
                    <Box w='250px' h='250px'>
                        <Image borderRadius='full' boxSize='250px' src={images[3]?.img} alt={courseName[3]} />
                        <br/>
                        <Text>{courseName[3]}</Text>
                    </Box>
                </HStack>  
                </div>
                </div>
            </div>           
            {/* Footer Block */}
            <div className={stylesFooter.frameDiv}>
                <h4 className={stylesFooter.nFTeachH4}>© 2022 NFTeach</h4>
            </div>
        </>
    )
}

export default explore
