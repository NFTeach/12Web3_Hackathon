import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "@chakra-ui/react";
import moralis, { Moralis } from "moralis";
import stylesHeader from "../styles/EducatorRegistration_Page/Header.module.css";
import stylesFirstBlock from "../styles/EducatorRegistration_Page/FirstBlock.module.css";
import stylesFooter from "../styles/EducatorRegistration_Page/Footer.module.css";

let appId = process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID;
let serverUrl = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;
moralis.initialize(process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;
Moralis.start({ serverUrl, appId });

const educatorRegistration = () => {
  const router = useRouter();
  const user = moralis.User.current();

  const registerEducator = async () => {
    let educatorAddressTo = user.get("ethAddress");

    const educatorParams = {
      to: educatorAddressTo,
    };

    async function callAddEducator() {
      const _Result = await Moralis.Cloud.run(
        "registerEducator",
        educatorParams
      );
      // console.log(_Result)
    }
    callAddEducator();
  };

  const onRegisterButtonClick = useCallback(() => {
    router.push("/educatorDashboard");
  }, [router]);

  return (
    <>
      {/* Header */}
      <div className={stylesHeader.frameDiv}>
        <h1 className={stylesHeader.titleH1}>Build The Future</h1>
      </div>
      {/* First Block */}
      <div className={stylesFirstBlock.educatorRegistrationDiv}>
        <div className={stylesFirstBlock.frameDiv}>
          <div className={stylesFirstBlock.frameDiv1}>
            <div className={stylesFirstBlock.frameDiv2}>
              <div className={stylesFirstBlock.titleDiv}>
                Register as an educator and start teaching the world
              </div>
            </div>
            <div className={stylesFirstBlock.titleDiv1}>
              You will be directed to the educator dashboard. Click on the “Add
              Course” button when you are ready to upload a course and
              multiple-choice test!
            </div>
          </div>
          <Button
            className={stylesFirstBlock.registerButton}
            variant='solid'
            colorScheme='green'
            onClick={async () => {
              await registerEducator();
              onRegisterButtonClick();
            }}
          >
            Register
          </Button>
        </div>
      </div>
      {/* Footer */}
      <div className={stylesFooter.frameDiv}>
        <h4 className={stylesFooter.nFTeachH4}>© 2022 NFTeach</h4>
      </div>
    </>
  );
};

export default educatorRegistration;
