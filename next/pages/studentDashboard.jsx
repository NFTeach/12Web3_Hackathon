import { useCallback, useEffect, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import moralis from "moralis";
import { useRouter } from "next/router";
import { defaultImgs } from "../public/defaultImgs";
import stylesHeader from "../styles/StudentDashboard_Page/Header.module.css";
import stylesFirstBlock from "../styles/StudentDashboard_Page/FirstBlock.module.css";
import stylesFooter from "../styles/StudentDashboard_Page/Footer.module.css";

import { SBT_CONTRACT_ADDRESS } from "../components/consts/vars";
import { NFTEACH_SBT_CONTRACT_ABI } from "../components/consts/contractABIs";

moralis.initialize(process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;

const studentDashboard = () => {
  const router = useRouter();
  const [pfp, setPfp] = useState();
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

  const {
    Moralis,
    isAuthenticated,
    web3,
    isWeb3Enabled,
    isWeb3EnableLoading,
    enableWeb3,
  } = useMoralis();

  const user = moralis.User.current();
  const nbClassesCompleted = 0;
  const nbMinted = 0;
  // console.log(user)

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  useEffect(() => {
    if (!user) return null;
    setPfp(user.get("pfp"));
    getNumberCourseCompleted();
    getNumberMinted();
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

  async function getNumberCourseCompleted() {
    const web3 = await Moralis.enableWeb3();
    const options = {
      contractAddress: SBT_CONTRACT_ADDRESS,
      functionName: "nbClassesCompleted",
      abi: NFTEACH_SBT_CONTRACT_ABI,
      params: { _student: user.attributes.accounts[0] },
    };
    nbClassesCompleted = await Moralis.executeFunction(options);
  }

  async function getNumberMinted() {
    const web3 = await Moralis.enableWeb3();
    const options = {
      contractAddress: SBT_CONTRACT_ADDRESS,
      functionName: "nbMinted",
      abi: NFTEACH_SBT_CONTRACT_ABI,
      params: { _student: user.attributes.accounts[0] },
    };
    nbMinted = await Moralis.executeFunction(options);
  }

  // Header effects
  const onExploreButtonClick = useCallback(() => {
    router.push("/explore");
  }, [router]);

  const onEducatorDashboardButtonClick = useCallback(() => {
    router.push("/educatorDashboard");
  }, [router]);

  const onProfileButtonClick = useCallback(() => {
    router.push("/profileSettings");
  }, []);

  const onStudentDashboardButtonClick = useCallback(() => {
    router.push("/studentDashboard");
  }, [router]);

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
            <button
              className={stylesHeader.exploreButton}
              onClick={onExploreButtonClick}
            >
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

      {/* First Block */}
      <div className={stylesFirstBlock.desktop1}>
        <div className={stylesFirstBlock.frameDiv}>
          <div className={stylesFirstBlock.frameDiv1}>
            <div className={stylesFirstBlock.completedDiv}>
              <div className={stylesFirstBlock.cardsDefault}>
                <div className={stylesFirstBlock.sheetDiv} />
              </div>
              <div className={stylesFirstBlock.frameDiv2}>
                <b
                  className={stylesFirstBlock.yourCompletedCourses}
                >{`Your Completed Courses `}</b>
                <b className={stylesFirstBlock.b}>3</b>
              </div>
            </div>
            <div className={stylesFirstBlock.completedDiv}>
              <div className={stylesFirstBlock.cardsHover}>
                <div className={stylesFirstBlock.sheetDiv} />
              </div>
              <div className={stylesFirstBlock.frameDiv2}>
                <b className={stylesFirstBlock.yourCompletedCourses}>
                  Your Courses in Progress
                </b>
                <b className={stylesFirstBlock.b}>2</b>
              </div>
            </div>
            <div className={stylesFirstBlock.yourSBTsDiv}>
              <div className={stylesFirstBlock.cardsHover}>
                <div className={stylesFirstBlock.sheetDiv2} />
              </div>
              <div className={stylesFirstBlock.frameDiv2}>
                <b className={stylesFirstBlock.yourCompletedCourses}>
                  Your SBTS
                </b>
                <b className={stylesFirstBlock.b}>2</b>
              </div>
            </div>
          </div>
          <div className={stylesFirstBlock.frameDiv5}>
            <div className={stylesFirstBlock.frameDiv6}>
              <div className={stylesFirstBlock.frameDiv7}>
                <b className={stylesFirstBlock.yourCompletedCourses}>
                  Good Morning
                </b>
                <b className={stylesFirstBlock.dateB}>
                  1 September 2022, 09:41 PM
                </b>
                <b className={stylesFirstBlock.youveCompleted65OfYourL}>
                  <span>{`You’ve completed 65% of your learning goal. `}</span>
                  <span className={stylesFirstBlock.comingSoonSpan}>
                    (Coming Soon)
                  </span>
                </b>
              </div>
              <div className={stylesFirstBlock.frameDiv8}>
                <div className={stylesFirstBlock.frameDiv9}>
                  <div className={stylesFirstBlock.frameDiv10}>
                    <div className={stylesFirstBlock.inProgressDiv1}>
                      In Progress:
                    </div>
                  </div>
                  <div className={stylesFirstBlock.math101Div}>Math 101</div>
                  <div className={stylesFirstBlock.math101Div}>
                    Chemistry 101
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={stylesFirstBlock.groupDiv}>
          <div className={stylesFirstBlock.suggestedDiv}>
            <div className={stylesFirstBlock.areaDiv}>
              <div className={stylesFirstBlock.sheetDiv3} />
            </div>
            <div className={stylesFirstBlock.frameDiv11}>
              <b className={stylesFirstBlock.titleB}>
                Suggested Courses (Coming Soon)
              </b>
              <div className={stylesFirstBlock.math102Div}>
                <div className={stylesFirstBlock.understandingBitcoinDiv}>
                  Math 102
                </div>
                <div className={stylesFirstBlock.eTHDiv}>0.01 ETH</div>
                <img
                  className={stylesFirstBlock.dividerLineHorizontal}
                  alt=''
                  src='../divider--line--horizontal.svg'
                />
              </div>
              <div className={stylesFirstBlock.math102Div}>
                <div className={stylesFirstBlock.understandingBitcoinDiv}>
                  Understanding Bitcoin
                </div>
                <div className={stylesFirstBlock.eTHDiv1}>0.02 ETH</div>
                <img
                  className={stylesFirstBlock.dividerLineHorizontal}
                  alt=''
                  src='../divider--line--horizontal.svg'
                />
              </div>
              <div className={stylesFirstBlock.math102Div}>
                <div className={stylesFirstBlock.understandingBitcoinDiv}>
                  Tokenomics 101
                </div>
                <div className={stylesFirstBlock.eTHDiv1}>0.008 ETH</div>
                <img
                  className={stylesFirstBlock.dividerLineHorizontal}
                  alt=''
                  src='../divider--line--horizontal.svg'
                />
              </div>
              <div className={stylesFirstBlock.math102Div}>
                <div
                  className={stylesFirstBlock.understandingBitcoinDiv}
                >{`Artificial Intelligence & Algorithms`}</div>
                <div className={stylesFirstBlock.eTHDiv1}>0.0354 ETH</div>
              </div>
            </div>
          </div>
        </div>
        <div className={stylesFirstBlock.areaDiv1}>
          <div className={stylesFirstBlock.sheetDiv3} />
          <div className={stylesFirstBlock.groupDiv1}>
            <div className={stylesFirstBlock.frameDiv12}>
              <div className={stylesFirstBlock.frameDiv13}>
                <b className={stylesFirstBlock.titleB1}>
                  Leaderboards (Coming Soon)
                </b>
                <div className={stylesFirstBlock.thisWeekDiv}>This Week</div>
              </div>
              <div className={stylesFirstBlock.frameDiv14}>
                <div className={stylesFirstBlock.math102Div}>
                  <div className={stylesFirstBlock.topStudentsDiv}>
                    Top Students
                  </div>
                  <img
                    className={stylesFirstBlock.dividerLineHorizontal}
                    alt=''
                    src='../divider--line--horizontal.svg'
                  />
                </div>
                <div className={stylesFirstBlock.name1Div}>
                  <div className={stylesFirstBlock.satoshiNDiv}>Satoshi N.</div>
                  <img
                    className={stylesFirstBlock.dividerLineHorizontal4}
                    alt=''
                    src='../divider--line--horizontal.svg'
                  />
                </div>
                <div className={stylesFirstBlock.name2Div}>
                  <div className={stylesFirstBlock.satoshiNDiv}>Charles H.</div>
                  <img
                    className={stylesFirstBlock.dividerLineHorizontal4}
                    alt=''
                    src='../divider--line--horizontal.svg'
                  />
                </div>
                <div className={stylesFirstBlock.name3Div}>
                  <div className={stylesFirstBlock.silvioMDiv}>Silvio M.</div>
                </div>
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

export default studentDashboard;
