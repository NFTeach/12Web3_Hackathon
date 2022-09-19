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
      <div className={stylesHeader.header4Div}>
        <div className={stylesHeader.frameDiv}>
          <div className={stylesHeader.frameDiv1}>
            <h2 className={stylesHeader.textH2}>NFTeach.</h2>
            <img
              className={stylesHeader.discordIcon}
              alt=""
              src="/studentDashboard_imgs/discord.svg"
            />
          </div>
          <div className={stylesHeader.tabsDiv}>
            <button className={stylesHeader.studentDashboardButton}>
              Student Dashboard
            </button>
            <button
              className={stylesHeader.exploreButton}
              onClick={onExploreButtonClick}
            >
              Explore
            </button>
            <button
              className={stylesHeader.educatorDashboardButton}
              onClick={onEducatorDashboardButtonClick}
            >
              Educator Dashboard
            </button>
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
      <div className={stylesFirstBlock.frameDiv}>
        <div className={stylesFirstBlock.frameDiv1}>
          <div className={stylesFirstBlock.frameDiv2}>
            <div className={stylesFirstBlock.completedDiv}>
              <div className={stylesFirstBlock.cardsDefault}>
                <div className={stylesFirstBlock.sheetDiv} />
              </div>
              <b
                className={stylesFirstBlock.yourCompletedCourses}
              >{`Your Completed Courses `}</b>
              <b className={stylesFirstBlock.b}>{nbClassesCompleted}</b>
            </div>
            <div className={stylesFirstBlock.completedDiv}>
              <div className={stylesFirstBlock.cardsHover}>
                <div className={stylesFirstBlock.sheetDiv} />
              </div>
              <b className={stylesFirstBlock.yourCompletedCourses}>
                Your Courses in Progress
              </b>
              <b className={stylesFirstBlock.b}>2</b>
            </div>
            <div className={stylesFirstBlock.yourSBTsDiv}>
              <div className={stylesFirstBlock.cardsHover}>
                <div className={stylesFirstBlock.sheetDiv2} />
              </div>
              <b className={stylesFirstBlock.yourCompletedCourses}>Your SBTS</b>
              <b className={stylesFirstBlock.b}>{nbMinted}</b>
            </div>
          </div>
          <div className={stylesFirstBlock.frameDiv3}>
            <div className={stylesFirstBlock.frameDiv4}>
              <div className={stylesFirstBlock.frameDiv5}>
                <b className={stylesFirstBlock.goodMorningB}>Good Morning</b>
                <b className={stylesFirstBlock.dateB}>
                  1 September 2022, 09:41 PM
                </b>
                <b
                  className={stylesFirstBlock.youveCompleted65OfYourL}
                >{`You’ve completed 65% of your learning goal. `}</b>
              </div>
              <div className={stylesFirstBlock.frameDiv6}>
                <div className={stylesFirstBlock.frameDiv7}>
                  <div className={stylesFirstBlock.math101Div}>Math 101</div>
                  <div className={stylesFirstBlock.completedDiv1}>
                    76% Completed
                  </div>
                  <img
                    className={stylesFirstBlock.courseImageIcon}
                    alt="Math 101"
                    src="/studentDashboard_imgs/math101.svg"
                  />
                </div>
                <div className={stylesFirstBlock.frameDiv8}>
                  <div className={stylesFirstBlock.completedDiv2}>
                    29% Completed
                  </div>
                  <div className={stylesFirstBlock.blockchainBasicsDiv}>
                    Blockchain Basics
                  </div>
                  <div className={stylesFirstBlock.courseImageIcon}>
                    <div className={stylesFirstBlock.rectangleDiv} />
                    <img
                      className={stylesFirstBlock.vectorIcon}
                      alt="Blockchain"
                      src="/studentDashboard_imgs/blockchain.svg"
                    />
                  </div>
                </div>
                <img
                  className={stylesFirstBlock.dividerLineHorizontal}
                  alt="Horizontal Line"
                  src="/studentDashboard_imgs/line.svg"
                />

                <div className={stylesFirstBlock.dividerLineHorizontal1} />
                <div className={stylesFirstBlock.frameDiv9}>
                  <img
                    className={stylesFirstBlock.nFT2Icon}
                    alt="Best Student 1"
                    src="/studentDashboard_imgs/bestStudent1.png"
                  />
                  <div className={stylesFirstBlock.bestStudentDiv}>
                    Best Student
                  </div>
                </div>
                <div className={stylesFirstBlock.frameDiv10}>
                  <img
                    className={stylesFirstBlock.nFT2Icon}
                    alt="Best Student 2"
                    src="/studentDashboard_imgs/bestStudent2.png"
                  />
                  <div className={stylesFirstBlock.bestStudentDiv}>
                    Best Student
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={stylesFirstBlock.frameDiv11}>
            <div className={stylesFirstBlock.suggestedDiv}>
              <div className={stylesFirstBlock.areaDiv}>
                <div className={stylesFirstBlock.sheetDiv3} />
              </div>
              <b className={stylesFirstBlock.titleB}>Suggested Courses</b>
              <div className={stylesFirstBlock.basedOnYourPrevious3}>
                Based on your previous 3
              </div>
              <div className={stylesFirstBlock.math102Div}>
                <div className={stylesFirstBlock.understandingBitcoinDiv}>
                  Math 102
                </div>
                <div className={stylesFirstBlock.eTHDiv}>0.01 ETH</div>
                <img
                  className={stylesFirstBlock.dividerLineHorizontal2}
                  alt=""
                  src="/studentDashboard_imgs/line.svg"
                />
              </div>
              <div className={stylesFirstBlock.bitcoinDiv}>
                <div className={stylesFirstBlock.understandingBitcoinDiv}>
                  Understanding Bitcoin
                </div>
                <div className={stylesFirstBlock.eTHDiv1}>0.02 ETH</div>
                <img
                  className={stylesFirstBlock.dividerLineHorizontal2}
                  alt=""
                  src="/studentDashboard_imgs/line.svg"
                />
              </div>
              <div className={stylesFirstBlock.tokenomicsDiv}>
                <div className={stylesFirstBlock.understandingBitcoinDiv}>
                  Tokenomics 101
                </div>
                <div className={stylesFirstBlock.eTHDiv1}>0.008 ETH</div>
                <img
                  className={stylesFirstBlock.dividerLineHorizontal2}
                  alt=""
                  src="/studentDashboard_imgs/line.svg"
                />
              </div>
              <div className={stylesFirstBlock.aIDiv}>
                <div
                  className={stylesFirstBlock.understandingBitcoinDiv}
                >{`Artificial Intelligence & Algorithms`}</div>
                <div className={stylesFirstBlock.eTHDiv1}>0.0354 ETH</div>
              </div>
            </div>
            <div className={stylesFirstBlock.leaderboardsDiv}>
              <img
                className={stylesFirstBlock.areaIcon}
                alt=""
                src="/studentDashboard_imgs/area.svg"
              />
              <b className={stylesFirstBlock.titleB1}>Leaderboards</b>
              <div className={stylesFirstBlock.thisWeekDiv}>This Week</div>
              <div className={stylesFirstBlock.topDiv}>
                <div className={stylesFirstBlock.topStudentsDiv}>
                  Top Students
                </div>
                <img
                  className={stylesFirstBlock.dividerLineHorizontal2}
                  alt=""
                  src="/studentDashboard_imgs/line.svg"
                />
              </div>
              <div className={stylesFirstBlock.name2Div}>
                <div className={stylesFirstBlock.charlesHDiv}>Charles H.</div>
                <img
                  className={stylesFirstBlock.dividerLineHorizontal2}
                  alt=""
                  src="/studentDashboard_imgs/line.svg"
                />
                <div className={stylesFirstBlock.chipDefaultSuccess}>
                  <div className={stylesFirstBlock.sheetDiv4} />
                  <div className={stylesFirstBlock.titleDiv}>View</div>
                </div>
                <div className={stylesFirstBlock.controlsCheckboxActive}>
                  <img
                    className={stylesFirstBlock.circleIcon}
                    alt=""
                    src="/studentDashboard_imgs/circle.svg"
                  />
                  <div className={stylesFirstBlock.controlsCheckboxActive1}>
                    <img
                      className={stylesFirstBlock.circleIcon}
                      alt=""
                      src="/studentDashboard_imgs/circle.svg"
                    />
                    <div className={stylesFirstBlock.titleDiv1}>2</div>
                  </div>
                </div>
              </div>
              <div className={stylesFirstBlock.name1Div}>
                <div className={stylesFirstBlock.satoshiNDiv}>Satoshi N.</div>
                <img
                  className={stylesFirstBlock.dividerLineHorizontal2}
                  alt=""
                  src="/studentDashboard_imgs/line.svg"
                />
                <div className={stylesFirstBlock.chipDefaultSuccess}>
                  <div className={stylesFirstBlock.sheetDiv4} />
                  <div className={stylesFirstBlock.titleDiv}>View</div>
                </div>
                <div className={stylesFirstBlock.controlsCheckboxActive}>
                  <img
                    className={stylesFirstBlock.circleIcon}
                    alt=""
                    src="/studentDashboard_imgs/circle.svg"
                  />
                  <div className={stylesFirstBlock.titleDiv3}>1</div>
                </div>
              </div>
              <div className={stylesFirstBlock.name3Div}>
                <div className={stylesFirstBlock.charlesHDiv}>Silvio M.</div>
                <div className={stylesFirstBlock.controlsCheckboxActive3} />
                <div className={stylesFirstBlock.chipDefaultSuccess}>
                  <div className={stylesFirstBlock.sheetDiv4} />
                  <div className={stylesFirstBlock.titleDiv}>View</div>
                </div>
                <div className={stylesFirstBlock.controlsCheckboxActive}>
                  <img
                    className={stylesFirstBlock.circleIcon}
                    alt=""
                    src="/studentDashboard_imgs/circle.svg"
                  />
                  <div className={stylesFirstBlock.titleDiv5}>3</div>
                </div>
              </div>
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

export default studentDashboard;
