import { useEffect, useCallback, useState } from "react";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
    useMoralis,
    useMoralisFile,
    useWeb3ExecuteFunction,
    useMoralisWeb3Api,
} from "react-moralis";
import moralis from "moralis";
import { SBT_CONTRACT_ADDRESS } from "../components/consts/vars";
import { GOVERNOR_CONTRACT_ADDRESS } from "../components/consts/vars";
import { WETH_ADDRESS } from "../components/consts/vars";
import { AWETH_ADDRESS } from "../components/consts/vars";
import { NFTEACH_SBT_CONTRACT_ABI } from "../components/consts/contractABIs";
import { NFTEACH_GOVERNOR_CONTRACT_ABI } from "../components/consts/contractABIs";
import { NFTEACH_ERC20_CONTRACT_ABI } from "../components/consts/contractABIs";
import stylesHeader from "../styles/CourseCreation_Pages/Staking/Header.module.css";
import stylesFirstBlock from "../styles/CourseCreation_Pages/Staking/FirstBlock.module.css";

moralis.initialize(process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;

const courseStaking = () => {
    const router = useRouter();
    const [courseCost, setCourseCost] = useState("");
    const [address, setAddress] = useState("");
    const [isUploadInProgress, setIsUploadInProgress] = useState(false);
    const [courseObjectId, setCourseObjectId] = useState("");
    const { Moralis, isAuthenticated, web3, isWeb3Enabled, isWeb3EnableLoading, enableWeb3 } = useMoralis();
    const Web3Api = useMoralisWeb3Api();
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

    useEffect (async () => {
        if (!user) {
            window.alert("Please connect wallet");
        } else {
            const Courses = Moralis.Object.extend("Courses");
            const query = new Moralis.Query(Courses);
            const account = user.attributes.accounts[0];
            setAddress(account);
            query.equalTo("educatorAddress", account);
            query.descending("createdAt")
            const Course = await query.first();
            setCourseObjectId(Course.id);
            setCourseCost(Course.attributes.cost);
        }
    }, [user]);

    const approveERC20 = async () => {

        const contract = new web3.eth.Contract(NFTEACH_ERC20_CONTRACT_ABI, WETH_ADDRESS);
        const approve = await contract.methods.approve(GOVERNOR_CONTRACT_ADDRESS, Moralis.Units.ETH(100)).send({ from: address });
        console.log("approve", approve);
        
    };
    // console.log(NFTEACH_ERC20_CONTRACT_ABI);
    
    const createSBTandStake = async () => {

        const contract = new web3.eth.Contract(NFTEACH_SBT_CONTRACT_ABI, SBT_CONTRACT_ADDRESS);
        const createSBTandStake = await contract.methods.createSBT(Moralis.Units.ETH(courseCost), courseObjectId).send({ from: address });
        console.log(createSBTandStake);

    };

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

    // const onRegisterButtonClick = useCallback(() => {
    //     router.push("/educatorDashboard");
    // }, [router]);

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
                            src="/courseCreationPages_imgs/staking/discord.svg"
                        />
                        </button>
                    </div>
                    <div className={stylesHeader.rightDiv}>
                        <img className={stylesHeader.icon} alt="" src="/courseCreationPages_imgs/staking/lang.svg" />
                        <h5 className={stylesHeader.englishH5}>English</h5>
                    </div>
                    </header>
                </div>
            {/* First Block */}
            <div className={stylesFirstBlock.stakingPageDiv}>
                <div className={stylesFirstBlock.frameDiv}>
                    <div className={stylesFirstBlock.frameDiv1}>
                    <div className={stylesFirstBlock.frameDiv2}>
                        <div className={stylesFirstBlock.titleDiv}>Final Step</div>
                    </div>
                    <div className={stylesFirstBlock.titleDiv1}>
                        <span>{`To prevent `}</span>
                        <b>
                        Sybil Attacks
                        </b>
                        <a href="https://academy.binance.com/en/articles/sybil-attacks-explained" target="_blank" style={{ color: 'blue'}}> (Link)</a>
                        <span>
                        , we require educators to stake some funds (1 Matic).
                        This prevents bad actors and content on our platform. 
                        </span>
                    </div>
                    </div>
                    <Button
                    className={stylesFirstBlock.registerButton}
                    variant="solid"
                    colorScheme="green"
                    onClick={async () => {
                        setIsUploadInProgress(true);
                        await approveERC20();
                        await createSBTandStake();
                      }}
                    >
                    Stake and Complete Course/Test Creation
                    </Button>
                </div>
            </div>
        </>
    );
}

export default courseStaking
