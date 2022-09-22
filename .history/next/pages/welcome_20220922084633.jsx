import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@chakra-ui/react";
import moralis from "moralis";
import { useMoralis } from "react-moralis";
import stylesHeader from "../styles/Welcome_Page/Header.module.css";
import stylesFirstBlock from "../styles/Welcome_Page/FirstBlock.module.css";
import stylesFooter from "../styles/Welcome_Page/Footer.module.css";

moralis.initialize(process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;

const Welcome = () => {
  const router = useRouter();
  const { Moralis } = useMoralis();
  const [student, setStudent] = useState();
  const user = moralis.User.current();

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

  return (
    <>
      {/* Header */}
      <div className={stylesHeader.frameDiv}>
        <img className={stylesHeader.nFTeach1Icon} alt="" src="/welcome_imgs/NFTeach.png" />
      </div>
      {/* First Block */}
      <div className={stylesFirstBlock.welcomePageDiv}>
        <div className={stylesFirstBlock.frameDiv}>
          <div className={stylesFirstBlock.frameDiv1}>
            <div className={stylesFirstBlock.frameDiv2}>
              <img
                className={stylesFirstBlock.pNGImage9}
                alt=''
                src='welcome_imgs/Edu.png'
              />
              <div className={stylesFirstBlock.frameDiv3}>
                <b className={stylesFirstBlock.titleB}>
                  <span>{`Learning Becomes `}</span>
                  <span className={stylesFirstBlock.funSpan}>Fun</span>
                </b>
                <h4 className={stylesFirstBlock.textH4}>
                  <p
                    className={stylesFirstBlock.weThoughtOnline}
                  >{`We thought online courses could use some freshening up. Utilizing SBTs, we found a modern way to revitalize (and incentivize) learning on the Internet. `}</p>
                  <p className={stylesFirstBlock.weThoughtOnline}>&nbsp;</p>
                  <p className={stylesFirstBlock.dontBelieveUs}>
                    Don’t believe us? Try it out for yourself. We guarantee
                    you’ll come back for more.
                  </p>
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className={stylesFirstBlock.frameDiv4}>
          <div className={stylesFirstBlock.frameDiv5}>
            <h1 className={stylesFirstBlock.titleH1}>
              We’re Gamifying Education.
            </h1>
            <h3 className={stylesFirstBlock.textH3}>
              Use the new wave of NFTs to kickstart your online learning career.
            </h3>
          </div>
          <Button
            variant='solid'
            w='334px'
            colorScheme='teal'
            onClick={student ? () => router.push("/explore") : () => router.push("/tutorial")}
          >
            Get Started
          </Button>
        </div>
        <div className={stylesFirstBlock.frameDiv6}>
          <div className={stylesFirstBlock.frameDiv7}>
            <b className={stylesFirstBlock.titleB1}>
              <span>{`Powered By `}</span>
              <span className={stylesFirstBlock.polygonSpan}>Polygon</span>
            </b>
            <h4 className={stylesFirstBlock.textH41}>
              Thanks to Polygon’s Layer 2 blockchain, our users enjoy the
              comfort of fast and cheap transactions, with the added security of
              Ethereum’s Layer 1.
            </h4>
          </div>
          <img
            className={stylesFirstBlock.pNGImage8}
            alt=''
            src='welcome_imgs/polygon.png'
          />
        </div>
        <b className={stylesFirstBlock.titleB2}>Our Devs</b>
        <div className={stylesFirstBlock.frameDiv8}>
          <div className={stylesFirstBlock.frameDiv9}>
            <img
              className={stylesFirstBlock.picture21Icon}
              alt=''
              src='welcome_imgs/olivier.jpg'
            />
            <h2 className={stylesFirstBlock.titleH2}>Olivier D.</h2>
          </div>
          <div className={stylesFirstBlock.frameDiv9}>
            <img
              className={stylesFirstBlock.picture21Icon}
              alt=''
              src='welcome_imgs/bryce.jpg'
            />
            <h2 className={stylesFirstBlock.titleH2}>Bryce P.</h2>
          </div>
          <div className={stylesFirstBlock.frameDiv9}>
            <img
              className={stylesFirstBlock.picture21Icon}
              alt=''
              src='welcome_imgs/ayush.png'
            />
            <h2 className={stylesFirstBlock.titleH2}>Ayush P.</h2>
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

export default Welcome;
