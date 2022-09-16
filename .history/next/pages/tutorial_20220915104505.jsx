import { useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import stylesHeader from "../styles/Tutorial_Page/Header.module.css";
import stylesFirstBlock from "../styles/Tutorial_Page/FirstBlock.module.css";
import stylesSecondBlock from "../styles/Tutorial_Page/SecondBlock.module.css";
import stylesThirdBlock from "../styles/Tutorial_Page/ThirdBlock.module.css";
import stylesFourthBlock from "../styles/Tutorial_Page/FourthBlock.module.css";
import stylesFifthBlock from "../styles/Tutorial_Page/FifthBlock.module.css";
import stylesFooter from "../styles/Tutorial_Page/Footer.module.css";

const Header = () => {

  // Header effects
  useEffect(() => {
    const scrollAnimElements = document.querySelectorAll(
      "[data-animate-on-scroll-discord]"
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

  //  First block effects
  useEffect(() => {
    const scrollAnimElements = document.querySelectorAll(
      "[data-animate-on-scroll-first-block]"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target;
            targetElement.classList.add(stylesFirstBlock.animate);
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

  // Second block effects
  useEffect(() => {
    const scrollAnimElements = document.querySelectorAll(
      "[data-animate-on-scroll-second-block]"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target;
            targetElement.classList.add(stylesSecondBlock.animate);
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

  // Third block effects
  useEffect(() => {
    const scrollAnimElements = document.querySelectorAll(
      "[data-animate-on-scroll-third-block]"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target;
            targetElement.classList.add(stylesThirdBlock.animate);
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

  // Fourth block effects
  useEffect(() => {
    const scrollAnimElements = document.querySelectorAll(
      "[data-animate-on-scroll-fourth-block]"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target;
            targetElement.classList.add(stylesFourthBlock.animate);
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

  // Fifth block effects
  const router = useRouter();

  const onButtonClick = useCallback(() => {
    router.push("/studentRegistration");
  }, [router]);

  useEffect(() => {
    const scrollAnimElements = document.querySelectorAll(
      "[data-animate-on-scroll-fifth-block]"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target;
            targetElement.classList.add(stylesFifthBlock.animate);
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
      <div className={stylesHeader.objectsDiv}>
        <div className={stylesHeader.leftDiv}>
          <h3 className={stylesHeader.logoH3}>NFTeach</h3>
          <button className={stylesHeader.discordButton} data-animate-on-scroll-discord>
            <img
              className={stylesHeader.symbolRounded}
              alt="Discord"
              src="/tutorial_imgs/discord.svg"
            />
          </button>
        </div>
        <div className={stylesHeader.rightDiv}>
          <img className={stylesHeader.icon} alt="Language" src="/tutorial_imgs/lang.svg" />
          <h5 className={stylesHeader.englishH5}>English</h5>
        </div>
      </div>
    </div>
    {/* First Block */}
    <div className={stylesFirstBlock.frameDiv}>
    <div className={stylesFirstBlock.frameDiv1}>
      <h1 className={stylesFirstBlock.textH1} data-animate-on-scroll-first-block>
        <p className={stylesFirstBlock.thanksForChoosingNFTeach}>
          <span className={stylesFirstBlock.blankLineSpan}>
            <span>Thanks for choosing NFTeach!</span>
          </span>
        </p>
        <p className={stylesFirstBlock.blankLineP}>
          <span className={stylesFirstBlock.blankLineSpan}>
            <span>&nbsp;</span>
          </span>
        </p>
        <p className={stylesFirstBlock.blankLineP1}>
          <span className={stylesFirstBlock.blankLineSpan1}>&nbsp;</span>
        </p>
        <p className={stylesFirstBlock.blankLineP}>
          <span className={stylesFirstBlock.blankLineSpan}>&nbsp;</span>
        </p>
        <p className={stylesFirstBlock.dontWorryIts}>
          <span className={stylesFirstBlock.blankLineSpan}>&nbsp;</span>
        </p>
      </h1>
      <div className={stylesFirstBlock.weCraftedATutorialToHelp}>
        <p className={stylesFirstBlock.blankLineP}>
          We crafted a tutorial to help anyone get up to speed with how the
          platform works.
        </p>
        <p className={stylesFirstBlock.blankLineP}>&nbsp;</p>
        <p
          className={stylesFirstBlock.dontWorryIts}
        >{`Don’t worry, its not technical. `}</p>
      </div>
    </div>
    </div>
    {/* Second Block */}
   <div className={stylesSecondBlock.section5Div}>
      <div className={stylesSecondBlock.frameDiv}>
        <div className={stylesSecondBlock.textDiv}>
          <h2 className={stylesSecondBlock.titleH2} data-animate-on-scroll-second-block>
            What are “SBTs?”
          </h2>
          <h4 className={stylesSecondBlock.textH4} data-animate-on-scroll-second-block>
            <p className={stylesSecondBlock.theyStandFor}>
              They stand for “Soulbound Tokens.” They’re basically NFTs
              (Non-Fungible Tokens), so they are stored on the blockchain, but
              you can't trade them.
            </p>
            <p className={stylesSecondBlock.theyStandFor}>&nbsp;</p>
            <p className={stylesSecondBlock.sBTsAreUsed}>
              SBTs are used on our platform as a proof-of-completion
              certificate. When you complete a course, you are issued a
              Soulbound Token to progress to the next course.
            </p>
          </h4>
        </div>
        <img className={stylesSecondBlock.imageIcon} alt="NFT" src="/tutorial_imgs/NFT.png" />
      </div>
    </div>
    {/* Third Block */}
    <div className={stylesThirdBlock.frameDiv}>
      <div className={stylesThirdBlock.frameDiv1}>
        <h2 className={stylesThirdBlock.titleH2} data-animate-on-scroll-third-block>
          What is “token-gated content?”
        </h2>
        <h4 className={stylesThirdBlock.textH4} data-animate-on-scroll-third-block>
          <p className={stylesThirdBlock.weveSegmentedCoursesIntoS}>
            <b className={stylesThirdBlock.weveSegmentedCourses}>
              We’ve segmented courses into stages,
            </b>
            <span
              className={stylesThirdBlock.weveSegmentedCourses}
            >{` similar to levels in a game. Each SBT `}</span>
            <b className={stylesThirdBlock.weveSegmentedCourses}>
              unlocks the next stage
            </b>
            <span> of that respective course.</span>
          </p>
          <p className={stylesThirdBlock.weveSegmentedCoursesIntoS}>
            <span>&nbsp;</span>
          </p>
          <p className={stylesThirdBlock.weveSegmentedCoursesIntoS}>
            <span>{`For example, after taking Math 101 and passing the test, `}</span>
            <b className={stylesThirdBlock.weveSegmentedCourses}>
              you will get the Math 101 SBT, and unlock the Math 102 course
            </b>
            <span>{`. `}</span>
          </p>
          <p className={stylesThirdBlock.weveSegmentedCoursesIntoS}>
            <span>&nbsp;</span>
          </p>
          <p className={stylesThirdBlock.weveSegmentedCoursesIntoS}>
            <span>{`However, say you wanted to check out the Science 102 course instead. `}</span>
            <b
              className={stylesThirdBlock.weveSegmentedCourses}
            >{`You cannot use the Math 101 SBT to unlock Science 102. `}</b>
          </p>
          <p className={stylesThirdBlock.weveSegmentedCoursesIntoS}>
            <span>&nbsp;</span>
          </p>
          <p className={stylesThirdBlock.weveSegmentedCoursesIntoS}>
            <b className={stylesThirdBlock.weveSegmentedCourses}>
              You must take (and pass)
            </b>
            <span>{` Science 101 to obtain that respective SBT, and then proceed. `}</span>
          </p>
          <p className={stylesThirdBlock.blankLineP3}>
            <span>&nbsp;</span>
          </p>
        </h4>
      </div>
      <img className={stylesThirdBlock.pencilsIcon} alt="pencils" src="/tutorial_imgs/Pencils.png" />
    </div>
    {/* Fourth Block */}
    <div className={stylesFourthBlock.frameDiv}>
      <div className={stylesFourthBlock.textDiv}>
        <h2 className={stylesFourthBlock.titleH2} data-animate-on-scroll-fourth-block>
          Why does learning need to be gamified?
        </h2>
        <h4 className={stylesFourthBlock.textH4} data-animate-on-scroll-fourth-block>
          <p className={stylesFourthBlock.ourResponseWhy}>
            Our response: Why shouldn’t it be?
          </p>
          <p className={stylesFourthBlock.ourResponseWhy}>&nbsp;</p>
          <p className={stylesFourthBlock.ourResponseWhy}>
            Gaming is fun, and most of the time, learning isn’t fun. No one
            wants to sit through course after course with little reward,
            especially with all the fun distractions the Internet has to
            provide.
          </p>
          <p className={stylesFourthBlock.ourResponseWhy}>&nbsp;</p>
          <p
            className={stylesFourthBlock.ourResponseWhy}
          >{`Gamifying learning does two things: it makes  receiving education super fun, and it rewards the best students. `}</p>
          <p className={stylesFourthBlock.ourResponseWhy}>&nbsp;</p>
          <p
            className={stylesFourthBlock.nowAnyoneIs}
          >{`Now, anyone is incentivized (cha-ching!) to do well and learn more. `}</p>
        </h4>
      </div>
    </div>
    {/* Fifth Block */}
     <div className={stylesFifthBlock.frameDiv}>
      <div className={stylesFifthBlock.frameDiv1}>
        <h2 className={stylesFifthBlock.titleH2} data-animate-on-scroll-fifth-block>
          <p className={stylesFifthBlock.thusEndsThe}>{`Thus ends the tutorial. `}</p>
          <p className={stylesFifthBlock.thusEndsThe}>&nbsp;</p>
          <p
            className={stylesFifthBlock.thusEndsThe}
          >{`We hope you get the most out of our platform, and learn as much as possible. `}</p>
          <p className={stylesFifthBlock.thusEndsThe}>&nbsp;</p>
          <p
            className={stylesFifthBlock.pleaseClickThe}
          >{`Please click the button below to explore the available courses and gain access to the full website experience. `}</p>
        </h2>
        <button className={stylesFifthBlock.button} onClick={onButtonClick}>
          <div className={stylesFifthBlock.areaDiv} />
          <div className={stylesFifthBlock.claimSBTDiv}>Enter</div>
        </button>
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

export default Header;

