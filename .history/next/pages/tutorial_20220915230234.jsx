import { useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import stylesFirstBlock from "../styles/Tutorial_Page/FirstBlock.module.css";
import { Button } from "@chakra-ui/react";

const Header = () => {
  const router = useRouter();
  
  return (
    <>
      {/* First Block */}
      <div className={stylesFirstBlock.tutorialDiv}>
        <div className={stylesFirstBlock.frameDiv}>
          <img
            className={stylesFirstBlock.pNGImage10}
            alt=''
            src='/tutorial_imgs/Ape.png'
          />
          <div className={stylesFirstBlock.frameDiv1}>
            <div className={stylesFirstBlock.frameDiv2}>
              <b className={stylesFirstBlock.titleB}>
                Why does learning need to be gamified?
              </b>
              <h4 className={stylesFirstBlock.weCraftedATutorialToHelp}>
                <p className={stylesFirstBlock.ourResponseWhyShouldntIt}>
                  <span className={stylesFirstBlock.ourResponseWhy}>
                    Our response: Why shouldn’t it be?
                  </span>
                </p>
                <p className={stylesFirstBlock.ourResponseWhyShouldntIt}>
                  <span>&nbsp;</span>
                </p>
                <p className={stylesFirstBlock.gamingIsFunAndMostOfThe}>
                  <span>{`Gaming is fun, and most of the time, learning isn’t fun. No one wants to sit through course after course with little reward, especially with all the fun distractions the Internet has to offer. Gamifying learning does two things: it makes receiving education super fun, and it rewards the best students. `}</span>
                  <span
                    className={stylesFirstBlock.nowAnyoneIs}
                  >{`Now, anyone is incentivized (cha-ching!) to do well and learn more. `}</span>
                </p>
              </h4>
            </div>
          </div>
        </div>
        <div className={stylesFirstBlock.frameDiv3}>
          <div className={stylesFirstBlock.frameDiv4}>
            <div className={stylesFirstBlock.frameDiv5}>
              <div className={stylesFirstBlock.frameDiv6}>
                <h2 className={stylesFirstBlock.titleH2}>
                  Congratulations! 🎉
                </h2>
                <h4
                  className={stylesFirstBlock.titleH4}
                >{`You’ve completed your first course on NFTeach! We hope you get the most out of our platform, and learn as much as possible. Please click the button below to gain access to the full website experience. `}</h4>
                <Button 
                  variant='solid' 
                  w='126px' 
                  colorScheme='orange'
                  onClick={
                    history.push('/course', {course: 'Chemistry 101'})
                  }
                >
                  Enter
                </Button>
              </div>
            </div>
            <img
              className={stylesFirstBlock.pNGImage6}
              alt=''
              src='/tutorial_imgs/Hands.png'
            />
          </div>
        </div>
        <div className={stylesFirstBlock.frameDiv7}>
          <div className={stylesFirstBlock.frameDiv8}>
            <h1 className={stylesFirstBlock.textH1}>
              Thanks for choosing NFTeach!
            </h1>
            <h3 className={stylesFirstBlock.weCraftedATutorialToHelp}>
              <span>{`We crafted a tutorial to help anyone get up to speed with how the platform works. `}</span>
              <b>{`Don’t worry, its not technical. `}</b>
            </h3>
          </div>
          <img
            className={stylesFirstBlock.whatIsEthereum1Icon}
            alt=''
            src='/tutorial_imgs/what.png'
          />
        </div>
        <div className={stylesFirstBlock.frameDiv9}>
          <div className={stylesFirstBlock.frameDiv10}>
            <img
              className={stylesFirstBlock.pNGImage12}
              alt=''
              src='/tutorial_imgs/Student.png'
            />
            <div className={stylesFirstBlock.frameDiv11}>
              <h2 className={stylesFirstBlock.titleH2}>What are “SBTs?”</h2>
              <h4 className={stylesFirstBlock.textH41}>
                They stand for “Soulbound Tokens.” They’re basically NFTs
                (Non-Fungible Tokens), so they are stored on the blockchain, but
                you can't trade them. SBTs are used on our platform as a
                proof-of-completion certificate. When you complete a course, you
                are issued a Soulbound Token to progress to the next course.
              </h4>
            </div>
          </div>
        </div>
        <div className={stylesFirstBlock.frameDiv12}>
          <div className={stylesFirstBlock.frameDiv13}>
            <b className={stylesFirstBlock.titleB}>
              What is “token-gated content?”
            </b>
            <h4 className={stylesFirstBlock.weCraftedATutorialToHelp}>
              <p className={stylesFirstBlock.ourResponseWhyShouldntIt}>
                <b className={stylesFirstBlock.weveSegmentedCourses}>
                  We’ve segmented courses into stages,
                </b>
                <span
                  className={stylesFirstBlock.weveSegmentedCourses}
                >{` similar to levels in a game. Each SBT `}</span>
                <b className={stylesFirstBlock.weveSegmentedCourses}>
                  unlocks the next stage
                </b>
                <span>{` of that respective course. For example, after taking Math 101 and passing the test, `}</span>
                <b className={stylesFirstBlock.weveSegmentedCourses}>
                  you will get the Math 101 SBT, and unlock the Math 102 course
                </b>
                <span>{`. `}</span>
              </p>
              <p className={stylesFirstBlock.ourResponseWhyShouldntIt}>
                <span>&nbsp;</span>
              </p>
              <p className={stylesFirstBlock.ourResponseWhyShouldntIt}>
                <span>{`However, say you wanted to check out the Science 102 course instead. `}</span>
                <b>{`You cannot use the Math 101 SBT to unlock Science 102. `}</b>
              </p>
              <p className={stylesFirstBlock.ourResponseWhyShouldntIt}>
                <b>You must take (and pass)</b>
                <span>{` Science 101 to obtain that respective SBT, and then proceed. `}</span>
              </p>
              <p className={stylesFirstBlock.gamingIsFunAndMostOfThe}>
                <span>&nbsp;</span>
              </p>
            </h4>
          </div>
          <img
            className={stylesFirstBlock.pNGImage121}
            alt=''
            src='/tutorial_imgs/Path.png'
          />
        </div>
        <div className={stylesFirstBlock.frameDiv12}>
          <div className={stylesFirstBlock.frameDiv15}>
            <b className={stylesFirstBlock.titleB}>
              What is “token-gated content?”
            </b>
            <h4 className={stylesFirstBlock.weCraftedATutorialToHelp}>
              <p className={stylesFirstBlock.ourResponseWhyShouldntIt}>
                <b className={stylesFirstBlock.weveSegmentedCourses}>
                  We’ve segmented courses into stages,
                </b>
                <span
                  className={stylesFirstBlock.weveSegmentedCourses}
                >{` similar to levels in a game. Each SBT `}</span>
                <b className={stylesFirstBlock.weveSegmentedCourses}>
                  unlocks the next stage
                </b>
                <span>{` of that respective course. For example, after taking Math 101 and passing the test, `}</span>
                <b className={stylesFirstBlock.weveSegmentedCourses}>
                  you will get the Math 101 SBT, and unlock the Math 102 course
                </b>
                <span>{`. `}</span>
              </p>
              <p className={stylesFirstBlock.ourResponseWhyShouldntIt}>
                <span>&nbsp;</span>
              </p>
              <p className={stylesFirstBlock.ourResponseWhyShouldntIt}>
                <span>{`However, say you wanted to check out the Science 102 course instead. `}</span>
                <b>{`You cannot use the Math 101 SBT to unlock Science 102. `}</b>
              </p>
              <p className={stylesFirstBlock.ourResponseWhyShouldntIt}>
                <b>You must take (and pass)</b>
                <span>{` Science 101 to obtain that respective SBT, and then proceed. `}</span>
              </p>
              <p className={stylesFirstBlock.gamingIsFunAndMostOfThe}>
                <span>&nbsp;</span>
              </p>
            </h4>
          </div>
          <img
            className={stylesFirstBlock.pNGImage14}
            alt=''
            src='/tutorial_imgs/Path.png'
          />
        </div>
        <div className={stylesFirstBlock.frameDiv16}>
          <h4 className={stylesFirstBlock.nFTeachH4}>© 2022 NFTeach</h4>
        </div>
        <div className={stylesFirstBlock.frameDiv17}>
          <div className={stylesFirstBlock.logoDiv}>
            The Education Platform of the Future
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

