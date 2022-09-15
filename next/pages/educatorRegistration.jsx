import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "@chakra-ui/react";
import moralis, {Moralis} from "moralis";
import stylesHeader from "../styles/EducatorRegistration_Page/Header.module.css";
import stylesFirstBlock from "../styles/EducatorRegistration_Page/FirstBlock.module.css";

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

    // Header effects
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
            <header className={stylesHeader.objectsHeader} id="Header">
              <div className={stylesHeader.leftDiv}>
                <h3 className={stylesHeader.logoH3}>NFTeach</h3>
                <button className={stylesHeader.discordButton} data-animate-on-scroll-header>
                  <img
                    className={stylesHeader.symbolRounded}
                    alt=""
                    src="/educatorRegistration_imgs/discord.svg"
                  />
                </button>
              </div>
              <div className={stylesHeader.rightDiv}>
                <img className={stylesHeader.icon} alt="" src="/educatorRegistration_imgs/lang.svg" />
                <h5 className={stylesHeader.englishH5}>English</h5>
              </div>
            </header>
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
                variant="solid"
                colorScheme="green"
                onClick={async () => {
                  await registerEducator();
                  onRegisterButtonClick();
                }}
              >
                Register
              </Button>
            </div>
          </div>
        </>
    )
}

export default educatorRegistration
