import { Button } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useMoralis, useWeb3ExecuteFunction, useMoralisWeb3Api, useMoralisWeb3ApiCall } from "react-moralis";
import moralis from "moralis";
import { defaultImgs } from "../public/defaultImgs";
import stylesHeader from "../styles/EducatorDashboard_Page/Header.module.css";
import stylesFirstBlock from "../styles/EducatorDashboard_Page/FirstBlock.module.css";
import stylesFooter from "../styles/EducatorDashboard_Page/Footer.module.css";
import { CHAIN } from "../components/consts/vars";
import { SBT_CONTRACT_ADDRESS } from "../components/consts/vars";
import { NFTEACH_SBT_CONTRACT_ABI } from "../components/consts/contractABIs";

moralis.initialize(process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;

const educatorDashboard = () => {
  const router = useRouter();
  const { native } = useMoralisWeb3Api();
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
  const [pfp, setPfp] = useState();
  const user = moralis.User.current();
  const address = user?.attributes.accounts[0];

  const {
    Moralis,
    isAuthenticated,
    web3,
    isWeb3Enabled,
    isWeb3EnableLoading,
    enableWeb3,
  } = useMoralis();

  const options = {
    chain: CHAIN,
    address: SBT_CONTRACT_ADDRESS,
    function_name: "getEducatorCurrentPayout",
    abi: NFTEACH_SBT_CONTRACT_ABI,
    params: {
      _educator: address,
    }
  }

  const {
    data,
    error,
    fetch,
    isLoading
  } = useMoralisWeb3ApiCall(
    native.runContractFunction,
    {...options}
  );

  const {
    data: educatorData,
    error: executeContractError,
    fetch: executeContractFunction,
    isFetching,
    isLoading: executeContractLoading
  } = useWeb3ExecuteFunction();

  const withdrawFunds = async () => {
    

    executeContractFunction({
      params: {
        abi: NFTEACH_SBT_CONTRACT_ABI,
        contractAddress: SBT_CONTRACT_ADDRESS,
        functionName: "withdrawCoursesPayoff",
      },
      onSuccess: () => {
        console.log("success");
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const nbClasses = 0;
  const nbMinted = 0;
  const lifeTimePayout = 0;

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);


  useEffect(() => {
    if (!user) return null;
    setPfp(user.get("pfp"));
  }, [user]);

  useEffect(() => {
    getIfUserIsEducator();
    getNumberCourse();
    getLifeTimePayout();
    getEducatorNbMinted();
  }, [user]);

  async function getIfUserIsEducator() {
    const web3 = await Moralis.enableWeb3();
    const options = {
      contractAddress: SBT_CONTRACT_ADDRESS,
      functionName: "isEducator",
      abi: NFTEACH_SBT_CONTRACT_ABI,
      params: { _address: user.attributes.accounts[0] },
    };
    const isEdu = await Moralis.executeFunction(options);
  }

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

  async function getNumberCourse() {
    const web3 = await Moralis.enableWeb3();
    const options = {
      contractAddress: SBT_CONTRACT_ADDRESS,
      functionName: "nbClassesCreated",
      abi: NFTEACH_SBT_CONTRACT_ABI,
      params: { _educator: user.attributes.accounts[0] },
    };
    nbClasses = await Moralis.executeFunction(options);
  }

  //Doesn't work right now since deployed version of Smart Contract do not have this function on them
  async function getEducatorNbMinted() {
    const web3 = await Moralis.enableWeb3();
    const options = {
      contractAddress: SBT_CONTRACT_ADDRESS,
      functionName: "getEducatorNbMinted",
      abi: NFTEACH_SBT_CONTRACT_ABI,
      params: { _educator: user.attributes.accounts[0] },
    };
    nbMinted = await Moralis.executeFunction(options);
  }

  //Doesn't work right now since deployed version of Smart Contract do not have this function on them
  async function getLifeTimePayout() {
    const web3 = await Moralis.enableWeb3();
    const options = {
      contractAddress: SBT_CONTRACT_ADDRESS,
      functionName: "getEducatorLifetimePayout",
      abi: NFTEACH_SBT_CONTRACT_ABI,
      params: { _educator: user.attributes.accounts[0] },
    };
    lifeTimePayout = await Moralis.executeFunction(options);
  }

  // Header effects
  const onExploreButtonClick = useCallback(() => {
    router.push("/explore");
  }, [router]);

  const onStudentDashboardButtonClick = useCallback(() => {
    router.push("/studentDashboard");
  }, [router]);

  const onProfileButtonClick = useCallback(() => {
    router.push("/profileSettings");
  }, []);

  const onAddCourseButtonClick = useCallback(() => {
    router.push("/courseCreationPage1");
  }, []);

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
              <button
                className={stylesHeader.exploreButton}
                onClick={() => router.push("/explore")}
              >
                Explore
              </button>
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
      </div>
      {/* First Block */}
      <div className={stylesFirstBlock.educatorDashboardDiv}>
        <div className={stylesFirstBlock.frameDiv}>
          <div className={stylesFirstBlock.groupDiv}>
            <div className={stylesFirstBlock.cardsDefault}>
              <div className={stylesFirstBlock.sheetDiv} />
            </div>
            <div className={stylesFirstBlock.frameDiv1}>
              <h3 className={stylesFirstBlock.sBTsIssuedH3}>SBTs Issued</h3>
              <b className={stylesFirstBlock.b}>23</b>
            </div>
          </div>
          <div className={stylesFirstBlock.groupDiv1}>
            <div className={stylesFirstBlock.cardsDefault1}>
              <div className={stylesFirstBlock.sheetDiv1} />
            </div>
            <div className={stylesFirstBlock.frameDiv2}>
              <div className={stylesFirstBlock.frameDiv3}>
                {/* <div className={stylesFirstBlock.overviewDiv}>Overview</div> */}
                {/* <Button 
                  variant="solid" 
                  w="133px" 
                  colorScheme="green"
                  onClick={async () => {
                    await withdrawFunds();
                  }}
                >
                  Withdraw Funds
                </Button> */}
              </div>
              <div className={stylesFirstBlock.frameDiv4}>
                <div className={stylesFirstBlock.incomeInfoDiv}>
                  <div className={stylesFirstBlock.frameDiv5}>
                    <div className={stylesFirstBlock.rectangleDiv} />
                  </div>
                  <div className={stylesFirstBlock.frameDiv6}>
                    <div className={stylesFirstBlock.overviewDiv}>Students</div>
                    <div className={stylesFirstBlock.div}>209</div>
                  </div>
                  <div className={stylesFirstBlock.frameDiv7}>
                    <div className={stylesFirstBlock.overviewDiv}>
                      <Button
                        variant="solid"
                        w="133px"
                        colorScheme="green"
                        onClick={() => {
                          fetch({ params: options });
                        }}
                      >
                        Check Balance
                      </Button>
                    </div>
                    <div className={stylesFirstBlock.div}>
                      {data && <pre>{Moralis.Units.FromWei(data)}</pre>} 
                    </div>
                  </div>
                  <div className={stylesFirstBlock.frameDiv8}>
                    <img
                      className={stylesFirstBlock.polygonIcon}
                      alt=""
                      src="/educatorDashboard_imgs/triangle.svg"
                    />
                    <div className={stylesFirstBlock.overviewDiv}>46%</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={stylesFirstBlock.frameDiv2}>
              <h3 className={stylesFirstBlock.sBTsIssuedH3}>
                Enrolled Students
              </h3>
              <b className={stylesFirstBlock.b}>19</b>
            </div>
          </div>
        </div>
        <div className={stylesFirstBlock.frameDiv4}>
          <div className={stylesFirstBlock.frameDiv5}>
            <h2 className={stylesFirstBlock.helpH2}>Actions</h2>
            <div className={stylesFirstBlock.frameDiv6}>
              <Button
                className={stylesFirstBlock.buttonSolidTextAndIcon}
                variant='solid'
                colorScheme='green'
              >
                Add Courses
              </Button>
              <Button
              className={stylesFirstBlock.buttonSolidTextAndIcon}
                variant="solid"
                colorScheme="green"
                onClick={() => {
                  fetch({ params: options });
                }}
              >
                Check Balance
              </Button>
              <Button
                className={stylesFirstBlock.buttonSolidTextAndIcon}
                variant='solid'
                colorScheme='cyan'
              >
                Withdraw
              </Button>
            </div>
          </div>
        </div>
        <div className={stylesFirstBlock.frameDiv7}>
          <div className={stylesFirstBlock.frameDiv8}>
            <div className={stylesFirstBlock.frameDiv9}>
              <h3 className={stylesFirstBlock.frameH3}>
                <div className={stylesFirstBlock.yourCoursesDiv}>
                  Your Courses
                </div>
              </h3>
            </div>
            <div className={stylesFirstBlock.frameDiv10}>
              <div className={stylesFirstBlock.frameDiv11}>
                <h4 className={stylesFirstBlock.chemistry101H4}>
                  Chemistry 101
                </h4>
                <h4 className={stylesFirstBlock.math101H4}>Math 101</h4>
                <h4 className={stylesFirstBlock.blockchainBasicsH4}>
                  Blockchain Basics
                </h4>
              </div>
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

export default educatorDashboard;
