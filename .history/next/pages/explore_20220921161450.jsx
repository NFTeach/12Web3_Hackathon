import { Fragment, useCallback, useEffect, useState } from "react";
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
    const [chosenIndex, setChosenIndex] = useState();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const user = moralis.User.current();

    const [showPopup, setShowPopup] = useState(undefined);

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
        const course = await query.find();
        setCourses(course);
        setCourseObjectId(course.map((course) => course.id));
        setImages(course.map((course) => course.get("imageFile")));
        setCourseName(course.map((course) => course.get("courseName")));
        setCourseDescription(course.map((course) => course.get("description")));
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

    const checkPrerequisite = async (index) => {
        setChosenIndex(index);
        // console.log(index)
        if (userSBTs.length === 0) {
            return;
        } else {
            const createSBTs = Moralis.Object.extend("CreateSBT");
            const query = new Moralis.Query(createSBTs);
            // console.log(courseprerequisite[index]);
            query.equalTo("courseObjectId", courseprerequisite[index]);
            const createSBT = await query.find();
            // console.log(createSBT);
            const courseSBT = createSBT.map((createSBT) => createSBT.get("tokenId"));
            // console.log(courseSBT);
            const prerequisiteSBT = userSBTs.filter((userSBT) => courseSBT.includes(userSBT.get("tokenId")));
            console.log(prerequisiteSBT);
            if (courseprerequisite[index] === undefined) {
                setPrerequisitePass(true);
            } else if (prerequisiteSBT.length === 0) {
                setPrerequisitePass(false);
            } else {
                setPrerequisitePass(true);
            }
          }
        }
    }

    const handleOnClick = async (index) => {
        checkPrerequisite(index);
        onOpen();
    }

    const handleEnroll = async () => {
        const Courses = Moralis.Object.extend("Courses");
        const query = new Moralis.Query(Courses);
        const course = await query.get(courseObjectId[chosenIndex]);
        const relation = course.relation("students");
        relation.add(user);
        await course.save();
        router.push("/dashboard");
    }

    return (
        <Fragment>
            <div className={stylesHeader.header}>
                <div className={stylesHeader.header__left}>
                    <Link href="/">
                        <a>
                            <Image src="/logo.png" alt="logo" />
                        </a>
                    </Link>
                </div>
                <div className={stylesHeader.header__right}>
                    <Link href="/dashboard">
                        <a>
                            <Image src="/dashboard.png" alt="dashboard" />
                        </a>
                    </Link>
                    <Link href="/explore">
                        <a>
                            <Image src="/explore.png" alt="explore" />
                        </a>
                    </Link>
                    <Link href="/profile">
                        <a>
                            <Image src="/profile.png" alt="profile" />
                        </a>
                    </Link>
                    <Link href="/wallet">
                        <a>
                            <Image src="/wallet.png" alt="wallet" />
                        </a>
                    </Link>
                </div>
            </div>
            <div className={stylesFirstBlock.firstBlock}>
                <div className={stylesFirstBlock.firstBlock__left}>
                    <div className={stylesFirstBlock.firstBlock__left__top}>
                        <Image src={pfp ? pfp._url : defaultImgs[0]} alt="pfp" />
                        <div className={stylesFirstBlock.firstBlock__left__top__text}>
                            <Text fontSize="2xl" fontWeight="bold" color="white">
                                {user ? user.get("username") : "Username"}
                            </Text>
                            <Text fontSize="md" color="white">
                                {user ? user.get("email") : "Email"}
                            </Text>
                        </div>
                    </div>
                    <div className={styles
                
        }
    }

    const onStudentDashboardButtonClick = useCallback(() => {
        router.push("/studentDashboard");
    }, [router]);

    const onProfileButtonClick = useCallback(() => {
        router.push("/profileSettings");
    }, []);

  const onCourseClick = (element) => {
    setShowPopup(element);
    console.log(element);
  };

  return (
    <>
      {/* Header */}
      <div className={stylesHeader.headerExploreDiv}>
        <div className={stylesHeader.frameDiv}>
          <img
            className={stylesHeader.nFTeach1Icon}
            alt=''
            src='/welcome_imgs/NFTeach.png'
          />
          <div className={stylesHeader.frameDiv1}>
            <div className={stylesHeader.tabsDiv}>
              <button
                className={stylesHeader.exploreButton}
                onClick={onStudentDashboardButtonClick}
              >
                Student Dashboard
              </button>
              <button className={stylesHeader.studentDashboardButton}>
                Explore
              </button>
              <button
                className={stylesHeader.exploreButton}
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
      </div>
      {/* First Block */}
      <div className={stylesFirstBlock.explorePageDiv}>
        <div className={stylesFirstBlock.frameDiv}>
          <div className={stylesFirstBlock.frameDiv1}>
            <img
              className={stylesFirstBlock.imageIcon}
              alt=""
              src="/explore_imgs/space_man.png"
            />
            <div className={stylesFirstBlock.frameDiv2}>
              <div className={stylesFirstBlock.frameDiv3}>
                <h1
                  className={stylesFirstBlock.educationThatsH1}
                >{`Education That’s `}</h1>
                <h1 className={stylesFirstBlock.outOfThisWorld}>
                  Out Of This World
                </h1>
              </div>
              <h3 className={stylesFirstBlock.chooseACourseBelowToStart}>
                Choose a course below to start learning
              </h3>
            </div>
          </div>
          <div className={stylesFirstBlock.frameDiv3}>
            <HStack spacing="100px">
              {courses?.map((e, index) => (
                <Box key={index} w='250px' h='250px'>
                  
                    <Image
                      borderRadius='full'
                      boxSize='250px'
                      src={images[index]?.img}
                      alt={courseName?.[index]}
                      onClick={async () => {
                        await checkPrerequisite(index);
                        onOpen();
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
      {/* Course Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>  
          <ModalHeader>{courseName?.[chosenIndex]}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{courseDescription?.[chosenIndex]}</Text>
          </ModalBody>
          <ModalFooter>
            { !prerequisitePass ? (
              <Link
                href={{
                  pathname: "/course",
                  query: {
                    courseObjectId: courseObjectId?.[chosenIndex],
                  },
                }}
              > 
                <Button
                variant='ghost'
                colorScheme='green'
                mr={3}
                >
                  Start Course
                </Button>
              </Link>
              ) : (
                <Text>To access course, obtain previos course SBT</Text>
              )}
            </ModalFooter>
        </ModalContent>
      </Modal>


      {/* {!showPopup ? (
        <></>
      ) : (
        <div className={stylesFirstBlock.popupClassDescription}>
          <div>{showPopup.attributes.courseName}</div>
          <img src={showPopup.attributes.imageFile.img} alt="" />
          <div>Description: {showPopup.attributes.description}</div>
          <div>This course creator: {showPopup.attributes.educatorAddress}</div>
          <div>
            Once completed, you will be able to mint a SBT of this class for{" "}
            {showPopup.attributes.cost} Matic
          </div>
          <button>Register to the Course</button>
        </div>
      )} */}
    </>
  );
};

export default explore;
