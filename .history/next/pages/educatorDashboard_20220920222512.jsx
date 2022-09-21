import { Button } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useMoralis, useWeb3ExecuteFunction, useMoralisWeb3Api } from "react-moralis";
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
  const [pfp, setPfp] = useState();
  const [educatorFunds, setEducatorFunds] = useState();
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


  const nbClasses = 0;
  const nbMinted = 0;
  const lifeTimePayout = 0;

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  // console.log(user)

  useEffect(() => {
    if (!user) return null;
    setPfp(user.get("pfp"));
  }, [user]);

  useEffect(async () => {
    setEducatorFunds(fetch({ params: options}))
  }, [fetch, options]);

  useEffect(() => {
    getIfUserIsEducator();
    getNumberCourse();
    // getLifeTimePayout();
    // getEducatorNbMinted();
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
    console.log(lifeTimePayout);
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
      <div className={stylesHeader.header6Div}>
        <div className={stylesHeader.frameDiv}>
          <div className={stylesHeader.frameDiv1}>
            <h2 className={stylesHeader.textH2}>NFTeach</h2>
            <img
              className={stylesHeader.discordIcon}
              alt=""
              src="/educatorDashboard_imgs/discord.svg"
            />
          </div>
          <div className={stylesHeader.tabsDiv}>
            <button
              className={stylesHeader.studentDashboardButton}
              onClick={onStudentDashboardButtonClick}
            >
              Student Dashboard
            </button>
            <button
              className={stylesHeader.exploreButton}
              onClick={onExploreButtonClick}
            >
              Explore
            </button>
            <div className={stylesHeader.educatorDashboardDiv}>
              Educator Dashboard
            </div>
          </div>
          <div className={stylesHeader.profilePictureDiv}>
            <img
              className={stylesHeader.image1Icon}
              alt="profilePFP"
              src={pfp ? pfp : defaultImgs[0]}
              data-animate-on-scroll-header
            />
            <button
              className={stylesHeader.vitalikBButton}
              onClick={onProfileButtonClick}
            >
              {user?.attributes.username.slice(0, 15)}
            </button>
          </div>
        </div>
      </div>
      {/* First Block */}
      <div className={stylesFirstBlock.educatorDashboardDiv}>
        <div className={stylesFirstBlock.frameDiv}>
          <div className={stylesFirstBlock.frameDiv1}>
            <div className={stylesFirstBlock.frameDiv2}>
              <div className={stylesFirstBlock.frameDiv3}>
                <div className={stylesFirstBlock.overviewDiv}>Overview</div>
                <Button 
                  variant="solid" 
                  w="133px" 
                  colorScheme="green"
                  
                >
                  Withdraw Funds
                </Button>
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
                    <div className={stylesFirstBlock.overviewDiv}>Income</div>
                    <div className={stylesFirstBlock.div}>8.35 ETH</div>
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
            <div className={stylesFirstBlock.frameDiv9}>
              <div className={stylesFirstBlock.frameDiv10}>
                <div className={stylesFirstBlock.yourCoursesDiv}>
                  Your Courses
                </div>
                <Button
                  variant="solid"
                  w="117px"
                  colorScheme="green"
                  onClick={onAddCourseButtonClick}
                >
                  Add Course
                </Button>
                <Button variant="solid" w="133px" colorScheme="green">
                  View All
                </Button>
              </div>
              <div />
            </div>
          </div>
          <div className={stylesFirstBlock.sideInformationDiv}>
            <div className={stylesFirstBlock.groupDiv}>
              <div className={stylesFirstBlock.cardsDefault}>
                <div className={stylesFirstBlock.sheetDiv} />
              </div>
              <b className={stylesFirstBlock.sBTsIssued}>SBTs Issued</b>
              <b className={stylesFirstBlock.b}>{nbMinted}</b>
            </div>
            <div className={stylesFirstBlock.groupDiv1}>
              <div className={stylesFirstBlock.cardsDefault}>
                <div className={stylesFirstBlock.sheetDiv1} />
              </div>
              <b className={stylesFirstBlock.sBTsIssued}>Enrolled Students</b>
              <b className={stylesFirstBlock.b1}>25</b>
            </div>
            <div className={stylesFirstBlock.groupDiv1}>
              <div className={stylesFirstBlock.cardsDefault1}>
                <div className={stylesFirstBlock.sheetDiv1} />
              </div>
              <b className={stylesFirstBlock.sBTsIssued1}>Classes Created</b>
              <b className={stylesFirstBlock.b2}>{nbClasses}</b>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className={stylesFooter.footerDiv}>
        <div className={stylesFooter.frameDiv}>
          <h3 className={stylesFooter.logoH3}>© 2022 NFTeach</h3>
          <h3 className={stylesFooter.titleH3}>NFTeach</h3>
        </div>
      </div>
    </>
  );
};

export default educatorDashboard;
