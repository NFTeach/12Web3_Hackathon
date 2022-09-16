import { useCallback, useEffect, useState } from "react";
import moralis from "moralis";
import { useMoralis } from "react-moralis";
import { useRouter } from "next/router";
import { defaultImgs } from "../public/defaultImgs";
import stylesHeader from "../styles/Explore_Page/Header.module.css";
import stylesFirstBlock from "../styles/Explore_Page/FirstBlock.module.css";
import stylesFooter from "../styles/Explore_Page/Footer.module.css";

moralis.initialize(process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;

const explore = () => {
    const router = useRouter();
    const [pfp, setPfp] = useState();
    const { Moralis } = useMoralis();
    const [educator, setEducator] = useState();
    const user = moralis.User.current();

    useEffect(() => {
        if(!user) return null;
        setPfp(user.get("pfp"))
    }, [user]);

    useEffect(async () => {
        if(!user) {
            window.alert("Please connect wallet")
        } else {
            const Educators = Moralis.Object.extend("Educators");
            const query = new Moralis.Query(Educators);
            const account = user.attributes.accounts[0];
            query.equalTo("educator", account);
            const educator = await query.find();
            setEducator(educator[0]);
        }
    }, []);

    const onStudentDashboardButtonClick = useCallback(() => {
        router.push("/studentDashboard");
    }, [router]);

    const onProfileButtonClick = useCallback(() => {
        router.push("/profileSettings");
    }, []);

    return (
        <>
            {/* Header */}
            <div className={stylesHeader.header2Div}>
                <div className={stylesHeader.frameDiv}>
                    <div className={stylesHeader.frameDiv1}>
                    <h2 className={stylesHeader.textH2}>NFTeach</h2>
                    </div>
                    <div className={stylesHeader.tabsDiv}>
                    <button className={stylesHeader.studentDashboardButton} onClick={onStudentDashboardButtonClick}>
                        Student Dashboard
                    </button>
                    <div className={stylesHeader.exploreDiv}>
                        Explore
                    </div>

                    <button
                        className={stylesHeader.educatorDashboardButton}
                        onClick={(educator ?  () => router.push("/educatorDashboard")  : () => router.push("/educatorRegistration"))}
                    >
                        Educator Dashboard
                    </button>
                    </div>
                    <div className={stylesHeader.profilePictureDiv}>
                    <img
                        className={stylesHeader.image1Icon}
                        alt="profilePFP"
                        src={pfp ? pfp : defaultImgs[0]}
                        data-animate-on-scroll-header
                    />
                    <button
                        className={stylesHeader.vitalikBButton}
                        onClick={onProfileButtonClick}
                    >
                        {user?.attributes.username.slice(0, 15)}
                    </button>
                    </div>
                </div>
            </div>
            {/* First Block */}
            <div className={stylesFirstBlock.frameDiv}>
                <div className={stylesFirstBlock.frameDiv1}>
                    <img className={stylesFirstBlock.imageIcon} alt="Space Man" src="/explore_imgs/space_man.png" />
                    <div className={stylesFirstBlock.frameDiv2}>
                    <h1 className={stylesFirstBlock.educationThatsOutOfThisW}>
                        <span>{`Education That’s `}</span>
                        <span className={stylesFirstBlock.outOfThis}>Out Of This World</span>
                    </h1>
                    <h3 className={stylesFirstBlock.chooseACourseBelowToStart}>
                        Choose a course below to start learning and earning
                    </h3>
                    </div>
                </div>
                <h2 className={stylesFirstBlock.mostPopularH2}>Most Popular</h2>
                <div className={stylesFirstBlock.frameDiv3}>
                    <div className={stylesFirstBlock.chem101Div}>
                    <img className={stylesFirstBlock.chem101Icon} alt="Chem 101" src="/explore_imgs/chem101.png" />
                    <h2 className={stylesFirstBlock.chemistry101H2}>Chemistry 101</h2>
                    </div>
                    <div className={stylesFirstBlock.chem101Div}>
                    <img className={stylesFirstBlock.chem101Icon} alt="Chem 102" src="/explore_imgs/chem102.png" />
                    <h2 className={stylesFirstBlock.chemistry101H2}>Chemistry 102</h2>
                    </div>
                    <div className={stylesFirstBlock.chem101Div}>
                    <img
                        className={stylesFirstBlock.chem101Icon}
                        alt="Blockchain"
                        src="/explore_imgs/blockchain.png"
                    />
                    <h2 className={stylesFirstBlock.blockchainBasicsH2}>Blockchain Basics</h2>
                    </div>
                    <div className={stylesFirstBlock.chem101Div}>
                    <img className={stylesFirstBlock.chem101Icon} alt="Math 101" src="/explore_imgs/math101.png" />
                    <h2 className={stylesFirstBlock.blockchainBasicsH2}>Math 101</h2>
                    </div>
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
    )
}

export default explore
