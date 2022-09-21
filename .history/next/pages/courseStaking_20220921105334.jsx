// NEED TO ADD TOASTS AND SUCCES/ERROR MESSAGES

import { useEffect, useCallback, useState } from "react";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import moralis from "moralis";
import { SBT_CONTRACT_ADDRESS } from "../components/consts/vars";
import { GOVERNOR_CONTRACT_ADDRESS } from "../components/consts/vars";
import { WMATIC_ADDRESS } from "../components/consts/vars";
// import { AWMATIC_ADDRESS } from "../components/consts/vars";
import { NFTEACH_SBT_CONTRACT_ABI } from "../components/consts/contractABIs";
// import { NFTEACH_GOVERNOR_CONTRACT_ABI } from "../components/consts/contractABIs";
import { NFTEACH_ERC20_CONTRACT_ABI } from "../components/consts/contractABIs";
import stylesHeader from "../styles/CourseCreation_Pages/Staking/Header.module.css";
import stylesFirstBlock from "../styles/CourseCreation_Pages/Staking/FirstBlock.module.css";
import stylesFooter from "../styles/CourseCreation_Pages/Staking/Footer.module.css";

moralis.initialize(process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;

const courseStaking = () => {
  const router = useRouter();
  const [courseCost, setCourseCost] = useState("");
  const [address, setAddress] = useState("");
  const [isUploadInProgress, setIsUploadInProgress] = useState(false);
  const [courseObjectId, setCourseObjectId] = useState("");
  const {
    Moralis,
    isAuthenticated,
    web3,
    isWeb3Enabled,
    isWeb3EnableLoading,
    enableWeb3,
  } = useMoralis();
  const user = moralis.User.current();

  const {
    data,
    error: executeContractError,
    fetch: executeContractFunction,
    isFetching,
    isLoading,
  } = useWeb3ExecuteFunction();

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  useEffect(async () => {
    if (!user) {
      window.alert("Please connect wallet");
    } else {
      const Courses = Moralis.Object.extend("Courses");
      const query = new Moralis.Query(Courses);
      const account = user.attributes.accounts[0];
      setAddress(account);
      query.equalTo("educatorAddress", account);
      query.descending("createdAt");
      const Course = await query.first();
      setCourseObjectId(Course.id);
      setCourseCost(Course.attributes.cost);
    }
  }, [user]);

  // console.log("courseObjectId", courseObjectId);
  const approveERC20 = async () => {
    const contract = new web3.eth.Contract(
      NFTEACH_ERC20_CONTRACT_ABI,
      WMATIC_ADDRESS
    );
    const approve = await contract.methods
      .approve(GOVERNOR_CONTRACT_ADDRESS, Moralis.Units.ETH(0.0001))
      .send({ from: address });
    console.log("approve", approve);
  };

  const createSBTandStake = async () => {
    executeContractFunction({
      params: {
        abi: NFTEACH_SBT_CONTRACT_ABI,
        contractAddress: SBT_CONTRACT_ADDRESS,
        functionName: "createSBT",
        params: {
          _price: Moralis.Units.ETH(courseCost),
          _courseObjectId: courseObjectId,
        },
      },
      onSuccess: () => {
        setIsUploadInProgress(false);
        onCreateSBTSuccess();
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const onCreateSBTSuccess = useCallback(() => {
    router.push("/educatorDashboard");
  }, []);

  return (
    <>
      {/* Header */}
      <div className={stylesHeader.frameDiv}>
        <div className={stylesHeader.frameDiv1}>
          <img
            className={stylesHeader.nFTeach1Icon}
            alt=''
            src='/welcome_imgs/NFTeach.png'
          />
          <div className={stylesHeader.logoDiv}>Build the Future</div>
        </div>
      </div>
      {/* First Block */}
      <div className={stylesFirstBlock.stakingPageDiv}>
        <div className={stylesFirstBlock.frameDiv}>
          <div className={stylesFirstBlock.frameDiv1}>
            <div className={stylesFirstBlock.frameDiv2}>
              <div className={stylesFirstBlock.titleDiv}>Final Step</div>
            </div>
            <div className={stylesFirstBlock.titleDiv1}>
              <span className={stylesFirstBlock.titleTxtSpan}>
                <span>
                  
                  To prevent <a href="https://academy.binance.com/en/articles/sybil-attacks-explained" target="_blank">Sybil Attacks </a> 
                  from bad actors, we require educators to stake some funds (0.001wMATIC). Once our platform has confirmed the stake, your course
                  will be uploaded within 24 hours. If you do not have wMATIC, you can vist:
                  <a href="https://uniswap.org/" target="_blank"> Uniswap.</a>
                </span>
              </span>
            </div>
          </div>
          <Button
            className={stylesFirstBlock.registerButton}
            variant='solid'
            colorScheme='green'
            isLoading={isUploadInProgress}
            onClick={async () => {
              setIsUploadInProgress(true);
              await approveERC20();
              await createSBTandStake();
            }}
          >
            Complete Course
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

export default courseStaking;
