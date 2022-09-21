import { Input, Button } from "@chakra-ui/react";
import { useMoralis } from "react-moralis";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CHAIN } from "../components/consts/vars";
import { CHAIN_ID } from "../components/consts/vars";
import moralis, { Moralis } from "moralis";
import stylesHeader from "../styles/StudentRegistration_Page/Header.module.css";
import stylesFirstBlock from "../styles/StudentRegistration_Page/FirstBlock.module.css";
import stylesFooter from "../styles/StudentRegistration_Page/Footer.module.css";

let appId = process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID;
let serverUrl = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;
moralis.initialize(process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;
Moralis.start({ serverUrl, appId });

const studentRegistration = () => {
  const {
    Moralis,
    authenticate,
    isAuthenticated,
    isWeb3Enabled,
    isWeb3EnableLoading,
    enableWeb3,
  } = useMoralis();
  const router = useRouter();
  const [username, setUsername] = useState();
  const [bio, setBio] = useState();

  // console.log(CHAIN)
  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  // Check user on proper chain and connect
  useEffect(() => {
    async function checkChain() {
      const web3 = await Moralis.Web3.enableWeb3();
      const chain = web3.currentProvider;
      console.log(chain);
      const chainId = chain.networkVersion;
      //   console.log(chainId)
      if (chainId !== CHAIN_ID) {
        alert(`Please switch to the ${CHAIN} network!`);
        window.location.reload();
        return;
      }
    }
    checkChain();
  }, []);

  const onContinueButtonClick = useCallback(() => {
    router.push("/explore");
  }, [router]);

  // Save user info to db
  const saveInfo = async () => {
    await authenticate();
    const User = Moralis.Object.extend("_User");
    const query = new Moralis.Query(User);
    const myDetails = await query.first();
    // console.log(myDetails)

    if (username) {
      myDetails.set("username", username);
    }

    if (bio) {
      myDetails.set("bio", bio);
    }

    await myDetails.save();

    let studentAddressTo = myDetails.attributes.ethAddress;

    const studentParams = {
      to: studentAddressTo,
    };

    async function callAddStudent() {
      const _Result = await Moralis.Cloud.run("registerStudent", studentParams);
      console.log(_Result);
    }
    callAddStudent();
  };

  return (
    <>
      {/* Header */}
      <div className={stylesHeader.frameDiv}>
        <h1 className={stylesHeader.titleH1}>
          Welcome To The Future Of Education
        </h1>
      </div>
      {/* First Block */}
      <div className={stylesFirstBlock.studentRegistrationDiv}>
        <div className={stylesFirstBlock.rightColumnElements}>
          <form className={stylesFirstBlock.inputsForm}>
            <div className={stylesFirstBlock.frameDiv}>
              <div className={stylesFirstBlock.frameDiv1}>
                <div className={stylesFirstBlock.createAnAccount}>
                  Create an account
                </div>
              </div>
              <div className={stylesFirstBlock.frameDiv2}>
                <div className={stylesFirstBlock.frameDiv3}>
                  <div className={stylesFirstBlock.frameDiv4}>
                    <div className={stylesFirstBlock.usernameDiv}>Username</div>
                    <Input
                      className={stylesFirstBlock.inputOutline}
                      variant='outline'
                      textColor='#e4e4e4'
                      placeholder='Username'
                    />
                  </div>
                  <div className={stylesFirstBlock.frameDiv5}>
                    <div className={stylesFirstBlock.interestsDiv}>
                      Interests
                    </div>
                    <Input
                      className={stylesFirstBlock.inputOutline}
                      variant='outline'
                      textColor='#e4e4e4'
                      placeholder='Education Interests'
                    />
                  </div>
                </div>
                <Button
                  className={stylesFirstBlock.buttonSolidTextAndIcon}
                  variant='solid'
                  colorScheme='green'
                >
                  Connect Wallet
                </Button>
              </div>
            </div>
          </form>
        </div>
        <div className={stylesFirstBlock.titleDiv}>
          <div className={stylesFirstBlock.frameDiv6}>
            <div className={stylesFirstBlock.frameDiv7}>
              <div className={stylesFirstBlock.frameDiv8}>
                <b className={stylesFirstBlock.titleB}>
                  <p
                    className={stylesFirstBlock.learnMoreWith}
                  >{`Learn more with `}</p>
                  <p
                    className={stylesFirstBlock.learnMoreWith}
                  >{`crypto, only on `}</p>
                  <p className={stylesFirstBlock.nFTeachP}>NFTeach</p>
                </b>
              </div>
              <div className={stylesFirstBlock.frameDiv9}>
                <div className={stylesFirstBlock.titleB}>
                  <p
                    className={stylesFirstBlock.learnMoreWith}
                  >{`Set up an account to start learning `}</p>
                  <p className={stylesFirstBlock.nFTeachP}>
                    from the world’s top minds
                  </p>
                </div>
              </div>
              <div className={stylesFirstBlock.frameDiv10}>
                <img
                  className={stylesFirstBlock.cultureCryptocurrency1Icon}
                  alt=''
                  src='/studentRegistration_imgs/coin.png'
                />
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

export default studentRegistration;
