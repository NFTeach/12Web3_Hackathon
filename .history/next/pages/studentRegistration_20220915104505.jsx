// UN-COMMENT THE BELOW CODE 

import { Input, Button, } from "@chakra-ui/react";
import { useMoralis } from "react-moralis";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import moralis, {Moralis} from "moralis";
import stylesFirstBlock from "../styles/StudentRegistration_Page/FirstBlock.module.css";

let appId = process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID;
let serverUrl = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;
moralis.initialize(process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;
Moralis.start({ serverUrl, appId });

const studentRegistration = () => {

    const { Moralis, authenticate, isAuthenticated, isWeb3Enabled, isWeb3EnableLoading, enableWeb3 } = useMoralis();
    const router = useRouter();
    const [username, setUsername] = useState();
    const [bio, setBio] = useState();

    useEffect(() => {
        if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, isWeb3Enabled]);

    // Check user on proper chain and connect
    useEffect(() => {
        async function checkChain() {
          const web3 = await Moralis.Web3.enableWeb3()
          const chain = web3.currentProvider;
          const chainId = chain.chainId;
        //   console.log(chainId)
          if (chainId !== "0x5") { 
            alert("Please switch to Goerli network!") // Goerli is 0x5
            window.location.reload();
            return 
          }
        }
        checkChain();
    },[])

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

        if (username){
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
            const _Result = await Moralis.Cloud.run(
              "registerStudent",
              studentParams
            );
            console.log(_Result)
          }
        callAddStudent();
    }

    return (
        <>
            {/* First Block */}
            <div className={stylesFirstBlock.studentRegistrationDiv}>
                <img className={stylesFirstBlock.dude1Icon} alt="" src="/studentRegistration_imgs/dude.png" />
                <div className={stylesFirstBlock.rightColumnElements}>
                    <div className={stylesFirstBlock.titleDiv}>
                    <div className={stylesFirstBlock.titleDiv1}>Input your information</div>
                    </div>
                    <form className={stylesFirstBlock.inputsForm}>
                    <div className={stylesFirstBlock.frameDiv}>
                        <b
                        className={stylesFirstBlock.createAnAccountToEarnCryp}
                        >{`Create an account to earn crypto and learn from the world’s top minds `}</b>
                    </div>
                    <Input
                        className={stylesFirstBlock.inputOutline}
                        label="Username"
                        name="NameChange"
                        variant="outline"
                        textColor="#e4e4e4"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input
                        className={stylesFirstBlock.inputOutline}
                        label="Bio"
                        name="BioChange"
                        variant="outline"
                        textColor="#e4e4e4"
                        placeholder="Bio"
                        onChange={(e) => setBio(e.target.value)}
                    />
                    <Button
                        className={stylesFirstBlock.buttonSolidTextAndIcon}
                        variant="solid"
                        colorScheme="green"
                        onClick={async () => {
                            await saveInfo();
                            onContinueButtonClick();
                        }}
                    >
                        Continue
                    </Button>
                    </form>
                    <h3 className={stylesFirstBlock.logoH3}>© 2022 NFTeach</h3>
                </div>
            </div>
        </>
    )
}

export default studentRegistration
