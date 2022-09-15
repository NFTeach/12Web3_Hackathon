import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import moralis from "moralis";
import { useMoralis } from "react-moralis";
import stylesHeader from "../styles/Welcome_Page/Header.module.css";
import stylesFirstBlock from "../styles/Welcome_Page/FirstBlock.module.css";
import stylesSecondBlock from "../styles/Welcome_Page/SecondBlock.module.css";
import stylesThirdBlock from "../styles/Welcome_Page/ThirdBlock.module.css";
import stylesFourthBlock from "../styles/Welcome_Page/FourthBlock.module.css";
import stylesFooter from "../styles/Welcome_Page/Footer.module.css";

moralis.initialize(process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;

const Welcome = () => {
  const router = useRouter();
  const { Moralis } = useMoralis();
  const [student, setStudent] = useState();
  const user = moralis.User.current();
  console.log(user)

  useEffect(async () => {
    if (user) {
      const Students = Moralis.Object.extend("Students");
      const query = new Moralis.Query(Students);
      const account = user.attributes.accounts[0];
      query.equalTo("student", account);
      const student = await query.find();
      setStudent(student[0]);
    }
  }, []);

  const onButtonClick = useCallback(() => {
    router.push("/tutorial");
  }, [router]);

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
                alt=""
                src="/welcome_imgs/discord.svg"
              />
            </button>
          </div>
          <div className={stylesHeader.rightDiv}>
            <img className={stylesHeader.icon} alt="" src="/welcome_imgs/lang.svg" />
            <h5 className={stylesHeader.englishH5}>English</h5>
          </div>
        </div>
      </div>
      {/* First Block */}
      <div className={stylesFirstBlock.gamifyLearningDiv}>
      <div className={stylesFirstBlock.frameDiv}>
        <div className={stylesFirstBlock.frameDiv1}>
          <h1 className={stylesFirstBlock.titleH1} data-animate-on-scroll-first-block>
            <p className={stylesFirstBlock.gamifyThe}>{`Gamify the `}</p>
            <p className={stylesFirstBlock.learningProcess}>Learning Process</p>
          </h1>
          <h3
            className={stylesFirstBlock.textH3}
            data-animate-on-scroll-first-block
          >{`Online education is getting an upgrade. Using crypto to revamp your online course experience. `}</h3>
          <button 
            className={stylesFirstBlock.button} 
            onClick={student ? () => router.push("/explore") : () => router.push("/tutorial")}
          >
            <div className={stylesFirstBlock.buttonOutlineDiv} />
            <h2 className={stylesFirstBlock.getStartedH2}>Get Started</h2>
          </button>
        </div>
        <div className={stylesFirstBlock.frameDiv2}>
          <img
            className={stylesFirstBlock.firstBlockImage}
            alt=""
            src="/welcome_imgs/cool_kids_study.png"
          />
        </div>
      </div>
    </div>  
    {/* Second Block */}
    <div className={stylesSecondBlock.educationDiv}>
      <div className={stylesSecondBlock.secondBlockDiv}>
        <div className={stylesSecondBlock.frameDiv}>
          <img className={stylesSecondBlock.imageIcon} alt="" src="/welcome_imgs/education_dash.png" />
        </div>
        <div className={stylesSecondBlock.frameDiv1}>
          <h2 className={stylesSecondBlock.titleH2}>
            <span>{`Crypto Meets `}</span>
            <span className={stylesSecondBlock.educationSpan}>Education</span>
          </h2>
          <h4 className={stylesSecondBlock.textH4}>
            <p
              className={stylesSecondBlock.weThoughtOnline}
            >{`We thought online courses could use some freshening up. Utilizing SBTs, we found a modern way to revitalize learning on the Internet. `}</p>
            <p className={stylesSecondBlock.weThoughtOnline}>&nbsp;</p>
            <p className={stylesSecondBlock.dontBelieveUs}>
              Don’t believe us? Try it out for yourself. We guarantee you’ll
              come back for more.
            </p>
          </h4>
        </div>
      </div>
    </div>
    {/* Third Block */}
    <div className={stylesThirdBlock.polygonDiv}>
      <div className={stylesThirdBlock.thirdBlockDiv}>
        <div className={stylesThirdBlock.frameDiv}>
          <img
            className={stylesThirdBlock.polygonMaticLogo1Icon}
            alt=""
            src="/welcome_imgs/polygon_logo.png"
          />
        </div>
        <div className={stylesThirdBlock.frameDiv1}>
          <h2 className={stylesThirdBlock.titleH2}>
            <span className={stylesThirdBlock.titleTxtSpan}>
              <p className={stylesThirdBlock.poweredBy}>
                <span>{`Powered By `}</span>
              </p>
              <p className={stylesThirdBlock.polygon}>
                <span>Polygon</span>
              </p>
            </span>
          </h2>
          <h4 className={stylesThirdBlock.textH4}>
            Thanks to Polygon’s Layer 2 blockchain, our users enjoy the comfort
            of fast and cheap transactions, with the added security of
            Ethereum’s Layer 1.
          </h4>
        </div>
      </div>
    </div>
    {/* Fourth Block */}
    <div className={stylesFourthBlock.featuresDiv}>
      <div className={stylesFourthBlock.fourthBlockDiv}>
        <h2 className={stylesFourthBlock.titleH2}>Supercharged Features</h2>
        <div className={stylesFourthBlock.frameDiv}>
          <div className={stylesFourthBlock.frameDiv1}>
            <div className={stylesFourthBlock.frameDiv2}>
              <div className={stylesFourthBlock.blockADiv}>
                <img className={stylesFourthBlock.areaIcon} alt="" src="/welcome_imgs/area.svg" />
                <h2 className={stylesFourthBlock.titleH21}>Learn and Earn</h2>
                <h3
                  className={stylesFourthBlock.textH3}
                >{`You get to learn whatever your heart desires, and get paid for it. What could be better? `}</h3>
                <img
                  className={stylesFourthBlock.imageIcon}
                  alt=""
                  src="/welcome_imgs/money.png"
                />
              </div>
            </div>
            <div className={stylesFourthBlock.frameDiv3}>
              <div className={stylesFourthBlock.blockADiv}>
                <h3 className={stylesFourthBlock.textH31}>
                  Join our Discord server to engage with other students and
                  educators. Share your ideas for new courses, and start
                  learning!
                </h3>
                <h2 className={stylesFourthBlock.titleH22}>Our Community</h2>
                <img className={stylesFourthBlock.areaIcon1} alt="" src="/welcome_imgs/area.svg" />
                <img
                  className={stylesFourthBlock.imageIcon1}
                  alt=""
                  src="/welcome_imgs/community.png"
                />
              </div>
            </div>
          </div>
          <div className={stylesFourthBlock.frameDiv4}>
            <div className={stylesFourthBlock.frameDiv2}>
              <div className={stylesFourthBlock.blockADiv}>
                <img className={stylesFourthBlock.areaIcon2} alt="" src="/welcome_imgs/area.svg" />
                <h2 className={stylesFourthBlock.titleH23}>Simple Setups</h2>
                <h3 className={stylesFourthBlock.textH32}>
                  We’ve made becoming an educator as easy as possible. Register
                  as an educator and start teaching the world!
                </h3>
                <img
                  className={stylesFourthBlock.imageIcon2}
                  alt=""
                  src="/welcome_imgs/lightbulb.png"
                />
              </div>
            </div>
            <div className={stylesFourthBlock.frameDiv3}>
              <div className={stylesFourthBlock.blockADiv}>
                <img className={stylesFourthBlock.areaIcon3} alt="" src="/welcome_imgs/area.svg" />
                <img
                  className={stylesFourthBlock.imageIcon3}
                  alt=""
                  src="/welcome_imgs/star.png"
                />
                <h3 className={stylesFourthBlock.textH33}>
                  We take pride in programming our platform. Check out our
                  GitHub below, and feel free to contribute!
                </h3>
                <h2 className={stylesFourthBlock.titleH24}>Our Code</h2>
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
      {/* <div className={stylesFooter.frameDiv1}>
        <button className={stylesFooter.titleButton}>Dashboard</button>
        <button className={stylesFooter.titleButton1}>Our Team</button>
        <button className={stylesFooter.titleButton2}>Buy us coffee</button>
        <button className={stylesFooter.titleButton3}>Explore</button>
        <button className={stylesFooter.titleButton4}>Teach</button>
      </div> */}
    </div>
    </>
  );
};

export default Welcome;
