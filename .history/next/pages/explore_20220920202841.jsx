
import { useCallback, useEffect, useState } from "react";
import moralis from "moralis";
import { useMoralis } from "react-moralis";
import Link from "next/link";
import { useRouter } from "next/router";
import { defaultImgs } from "../public/defaultImgs";
import { 
    HStack, 
    Box, 
    Image, 
    Text,
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
    const [courseprerequisite, setCoursePrerequisite] = useState([]);
    const [prerequisitePass, setPrerequisitePass] = useState(false);
    const [userSBTs, setUserSBTs] = useState([]);
    const [userTokenIds, setUserTokenIds] = useState("");
    const [userCourseObjectIds, setUserCourseObjectIds] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const user = moralis.User.current();

    useEffect(() => {
        if (!user) return null;
        setPfp(user.get("pfp"));
    }, [user]);

    useEffect(async () => {
        if (!user) {
        window.alert("Please connect wallet");
        } else {
        const Educators = Moralis.Object.extend("Educators");
        const query = new Moralis.Query(Educators);
        const account = user.attributes.accounts[0];
        query.equalTo("educator", account);
        const educator = await query.find();
        setEducator(educator[0]);
        }
    }, []);

    useEffect(async () => {
        if (!user) {
        window.alert("Please connect wallet");
        } else {
        const Courses = Moralis.Object.extend("Courses");
        const query = new Moralis.Query(Courses);
        console.log(query)
        const course = await query.find();
        setCourses(course);
        setCourseObjectId(course.map((course) => course.id));
        setImages(course.map((course) => course.get("imageFile")));
        setCourseName(course.map((course) => course.get("courseName")));
        setCourseDescription(course.map((course) => course.get("courseDescription")));
        setCoursePrerequisite(course.map((course) => course.get("prerequisite")));
        }
    }, []);

    // console.log(courseprerequisite);
    useEffect (async () => {
        const MintSBTs = Moralis.Object.extend("MintSBT");
        const query = new Moralis.Query(MintSBTs);
        const account = user.attributes.accounts[0];
        query.equalTo("student", account);
        const mintSBT = await query.find();
        setUserSBTs(mintSBT);
        setUserTokenIds((mintSBT).map((mintSBT) => mintSBT.get("tokenId")));
    }, []);

    // useEffect (async () => {
    //     const createSBTs = Moralis.Object.extend("CreateSBT");
    //     const query = new Moralis.Query(createSBTs);
    //     query.equalTo("tokenId", userTokenIds);
    //     const createSBT = await query.find();
    //     setUserCourseObjectIds(createSBT.map((createSBT) => createSBT.get("courseObjectId")));
    // }, []);

    // const prerequisiteSBT = userSBTs.filter((userSBT) => userSBT.get("id") === courseprerequisite);
    console.log(courseprerequisite[2]);

    const checkPrerequisite = async (index) => {
        
        if (userSBTs.length === 0) {
            return;
        } else {
            // console.log("problem");
            const createSBTs = Moralis.Object.extend("CreateSBT");
            const query = new Moralis.Query(createSBTs);
            query.equalTo("tokenId", userTokenIds);
            // console.log(query)
            // const createSBT = await query.find();
            // const userCourseObjectIds = createSBT.map((createSBT) => createSBT.get("courseObjectId"));
            // console.log(userCourseObjectIds);

            // if (userCourseObjectIds.includes(courseprerequisite[index])) {
            //     setPrerequisitePass(true);
            // } else {
            //     setPrerequisitePass(false);
            // }
        }
        // const prerequisiteSBT = userSBTs.filter((userSBT) => userSBT.get("id") === courseprerequisite[index]);
        // console.log(prerequisiteSBT);
        // if (prerequisiteSBT.length > 0) {
        //     setPrerequisitePass(true);
        // } else {
        //     return;
        // }
    }
    // checkPrerequisite(courseprerequisite);

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
              onClick={
                educator
                  ? () => router.push("/educatorDashboard")
                  : () => router.push("/educatorRegistration")
              }
            >
              Educator Dashboard
            </button>
          </div>
          <div className={stylesHeader.profilePictureDiv}>
            <img
              className={stylesHeader.displayedNFTIcon}
              alt='profilePFP'
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
                  <span>{`Education That’s`}</span>
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
              {courses?.map((e, index) => (
                <Box key={index} w='250px' h='250px'>
                  {/* <Link
                    href={{
                      pathname: "/course",
                      query: {
                        courseObjectId: courseObjectId?.[index],
                      },
                    }}
                  > */}
                    <Image
                      borderRadius='full'
                      boxSize='250px'
                      src={images[index]?.img}
                      alt={courseName?.[index]}
                      onClick={async () => {
                        await checkPrerequisite(index);
                        if (prerequisitePass) {
                            console.log("prerequisite pass");
                        } else {
                            console.log("prerequisite fail");
                        }
                        }}
                    />
                {/*  </Link> */}
                  <br />
                  <Text>{courseName?.[index]}</Text>
                </Box>
              ))}
            </HStack>
          </div>
        </div>
      </div>
      {/* Footer Block */}
      <div className={stylesFooter.frameDiv}>
        <h4 className={stylesFooter.nFTeachH4}>© 2022 NFTeach</h4>
      </div>
    </>
  );
};

export default explore;
