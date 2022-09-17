// OUTLINE OF SELECTED NFT FOR PROFILE PIC STILL NEEDS TO BE FIXED

import { 
    Input, 
    Button,
    Image,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, 
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import moralis from "moralis";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { useRouter } from "next/router";
import { defaultImgs } from "../public/defaultImgs";
import { CHAIN } from "../components/consts/vars";
import stylesHeader from "../styles/ProfileSettings_Page/Header.module.css";
import stylesFirstBlock from "../styles/ProfileSettings_Page/FirstBlock.module.css";
import stylesFooter from "../styles/ProfileSettings_Page/Footer.module.css";

const appId = process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID;
const serverUrl = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;
const moralisSecert = process.env.NEXT_PUBLIC_MORALIS_SECERT;
moralis.initialize(process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;

const profileSettings = () => {
    const router = useRouter();
    const [pfp, setPfp] = useState();
    const [pfps, setPfps] = useState([]);
    const [selectedPFP, setSelectedPFP] = useState();
    const [username, setUsername] = useState();
    const [bio, setBio] = useState();
    const { Moralis, isAuthenticated, account } = useMoralis();
    const user = moralis.User.current();
    const { isOpen: isUsernameOpen, onOpen: onUsernameOpen, onClose: onUsernameClose } = useDisclosure();
    const { isOpen: isProfilePicOpen, onOpen: onProfilePicOpen, onClose: onProfilePicClose } = useDisclosure();
    const { isOpen: isBioOpen, onOpen: onBioOpen, onClose: onBioClose } = useDisclosure();
    const Web3Api = useMoralisWeb3Api();
    // console.log(user)

    const resolveLink = (url) => {
        if (!url || !url.includes("ipfs://")) return url;
        return url.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");
    };

    useEffect(() => {

        const fetchNFTs = async () => {
            const options = {
                chain: CHAIN,
                address: account
            }
            await Moralis.start({ serverUrl, appId, moralisSecert });
            const NFTs = await Web3Api.account.getNFTs(options);
            // console.log(NFTs)
            const images = NFTs.result.map(
                (e) => resolveLink(JSON.parse(e.metadata)?.image)
            )
            // console.log(images)
            setPfps(images);
        }
        fetchNFTs();
    }, [isAuthenticated, account])

    useEffect(() => {
        if(!user) return null;
        setPfp(user.get("pfp"))
    }, [user]);

    // Edit username and save to db
    const saveUsername = async () => {
        const User = Moralis.Object.extend("_User");
        const query = new Moralis.Query(User);
        const myDetails = await query.first();

        if (username){
            myDetails.set("username", username);
        }

        await myDetails.save();
    }

    // Edit profile pic and save to db
    const saveProfilePic = async () => {
        const User = Moralis.Object.extend("_User");
        const query = new Moralis.Query(User);
        const myDetails = await query.first();

        if (selectedPFP){
            myDetails.set("pfp", selectedPFP);
        }
        
        await myDetails.save();
    }

    // Edit bio and save to db
    const saveBio = async () => {
        const User = Moralis.Object.extend("_User");
        const query = new Moralis.Query(User);
        const myDetails = await query.first();

        if (bio) {
            myDetails.set("bio", bio)
        }

        await myDetails.save();
    }

    // Header effects
    const onStudentDashboardButtonClick = useCallback(() => {
    router.push("/studentDashboard");
    }, [router]);

    const onExploreButtonClick = useCallback(() => {
        router.push("/explore");
    }, [router]);

    const onEducatorDashboardButtonClick = useCallback(() => {
        router.push("/educatorDashboard");
    }, [router]);

    return (
        <>
        {/* Header */}
        <div className={stylesHeader.headerProfileSettings}>
            <div className={stylesHeader.frameDiv}>
                <h2 className={stylesHeader.nFTeachH2}>NFTeach</h2>
                <div className={stylesHeader.tabsDiv}>
                <button className={stylesHeader.studentDashboardButton} onClick={onStudentDashboardButtonClick}>
                    Student Dashboard
                </button>
                <button className={stylesHeader.studentDashboardButton} onClick={onExploreButtonClick}>Explore</button>
                <button className={stylesHeader.studentDashboardButton} onClick={onEducatorDashboardButtonClick}>
                    Educator Dashboard
                </button>
                </div>
                <div className={stylesHeader.profilePictureDiv}>
                <img
                    className={stylesHeader.displayedNFTIcon}
                    alt="profilePFP"
                    src={pfp ? pfp : defaultImgs[0]}
                />
                <button className={stylesHeader.nameButton}>{user?.attributes.username.slice(0, 15)} </button>
                </div>
            </div>
        </div>
        {/* First Block */}
        <div className={stylesFirstBlock.profilePageDiv}>
        <b
          className={stylesFirstBlock.nFTeachProfileSettings}
        >{`NFTeach Profile & Settings`}</b>
        <div className={stylesFirstBlock.frameDiv}>
          <div className={stylesFirstBlock.frameDiv1}>
            <div className={stylesFirstBlock.frameDiv2}>
              <img
                className={stylesFirstBlock.nFTIcon}
                alt=''
                // src='/profileSettings_imgs/Ape.png'
                src={pfp ? pfp : defaultImgs[0]}
                onClick={onProfilePicOpen}
              />
            </div>
            <div className={stylesFirstBlock.aboutDiv}>
              <div className={stylesFirstBlock.frameDiv3}>
                <h2 className={stylesFirstBlock.titleH2}>ABOUT</h2>
                <h4 className={stylesFirstBlock.textH4}>
                  I am the co-founder of Ethereum. #mergehype
                </h4>
              </div>
            </div>
          </div>
          <div className={stylesFirstBlock.frameDiv4}>
            <div className={stylesFirstBlock.aboutDiv}>
              <div className={stylesFirstBlock.frameDiv5}>
                <h2 className={stylesFirstBlock.titleH21}>USER PROFILE</h2>
                <h4 className={stylesFirstBlock.nameH4}>{user?.attributes.username.slice(0, 15)}</h4>
                <h4 className={stylesFirstBlock.addressH4}>{`${user?.attributes.ethAddress.slice(0, 4)}...${user?.attributes.ethAddress.slice(38)}`}</h4>
                <h4 className={stylesFirstBlock.dateJoinedH4}>
                  <span className={stylesFirstBlock.dateJoinedTxt}>
                    <b>Joined</b>
                    <span> {`${user?.attributes.createdAt}`}</span>
                  </span>
                </h4>
                <h4 className={stylesFirstBlock.editButtonH4}>Edit</h4>
              </div>
            </div>
            <div className={stylesFirstBlock.streakDiv}>
              <h2 className={stylesFirstBlock.frameH2}>
                <b className={stylesFirstBlock.titleB}>STREAK</b>
              </h2>
              <h1 className={stylesFirstBlock.numberOfDays}>5</h1>
            </div>
          </div>
        </div>
      </div>

        {/* <div className={stylesFirstBlock.profileAndSettings}>
            <div className={stylesFirstBlock.frameDiv}>
                <div className={stylesFirstBlock.frameDiv1}>
                <b
                    className={stylesFirstBlock.nFTeachProfileSettings}
                >{`NFTeach Profile & Settings`}</b>
                </div>
                <div className={stylesFirstBlock.frameDiv2}>
                <div className={stylesFirstBlock.nFTBlockDiv}>
                    <Button 
                        variant="solid" 
                        w="229px" 
                        colorScheme="green"
                        onClick={onProfilePicOpen}
                    >
                    Edit NFT Profile Pic
                    </Button>
                    <img className={stylesFirstBlock.nFTIcon} alt="profilePFP" src={pfp ? pfp : defaultImgs[0]}  />
                </div>
                <div className={stylesFirstBlock.userProfileBlock}>
                    <b className={stylesFirstBlock.titleB}>USER PROFILE</b>
                    <div className={stylesFirstBlock.nameDiv}>{user?.attributes.username.slice(0, 15)}</div>
                    <Button 
                        variant="solid" 
                        colorScheme="green"
                        onClick={onUsernameOpen}
                    >
                    Edit Username
                    </Button>
                    <div className={stylesFirstBlock.studentEducatorDiv}>Student</div>
                    <div className={stylesFirstBlock.addressDiv}>{`${user?.attributes.ethAddress.slice(0, 4)}...${user?.attributes.ethAddress.slice(38)}`}</div>
                    <div className={stylesFirstBlock.dateJoinedDiv}>
                    <b>Joined</b>
                    &nbsp;
                    <span>{`${user?.attributes.createdAt}`}</span>
                    </div>
                </div>
                </div>
                <div className={stylesFirstBlock.frameDiv3}>
                <div className={stylesFirstBlock.aboutBlockDiv}>
                    <b className={stylesFirstBlock.titleB1}>ABOUT</b>
                    <div className={stylesFirstBlock.textDiv}>
                    {user?.attributes.bio}
                    </div>
                    <Button 
                    variant="solid" 
                    colorScheme="green"
                    onClick={onBioOpen}
                    >
                        Edit Bio
                    </Button>
                </div>
            </div>
            </div>
        </div> */}
        {/* Footer */}
        <div className={stylesFooter.footerDiv}>
            <div className={stylesFooter.frameDiv}>
                <h3 className={stylesFooter.logoH3}>© 2022 NFTeach</h3>
                <h3 className={stylesFooter.titleH3}>NFTeach</h3>
            </div>
        </div>
        {/* Username Modal */}
        <Modal isOpen={isUsernameOpen} onClose={onUsernameClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Username</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                <Input
                    label="Username"
                    name="NameChange"
                    variant="outline"
                    textColor="#000000"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                </ModalBody>
                <ModalFooter>
                    <Button 
                        variant='ghost' 
                        onClick={async () => {
                            await saveUsername();
                            onUsernameClose();
                        }}
                    >
                    Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        {/* Profile Pic Modal */}
        <Modal isOpen={isProfilePicOpen} onClose={onProfilePicClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Choose NFT below as Profile Pic</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
                        {pfps.map((e,i) => {
                            return(
                            <>
                                <Image
                                    src={e}
                                    alt="pfp"
                                    boxSize="100px"
                                    objectFit="cover"
                                    className={
                                        selectedPFP === e ? "pfpOptionSelected" : "pfpOption"
                                    } // Outline of selected image is not working
                                    onClick={() => {setSelectedPFP(pfps[i])}}
                                />
                            </>
                            )  
                        })}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button 
                        variant='ghost' 
                        onClick={async () => {
                            await saveProfilePic();
                            onProfilePicClose();
                            window.location.reload();
                        }}
                    >
                    Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        <Modal isOpen={isBioOpen} onClose={onBioClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Bio</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                <Input
                    label="Bio"
                    name="BioChange"
                    variant="outline"
                    textColor="#000000"
                    placeholder="Bio"
                    onChange={(e) => setBio(e.target.value)}
                />
                </ModalBody>
                <ModalFooter>
                    <Button 
                        variant='ghost' 
                        onClick={async () => {
                            await saveBio();
                            onBioClose();
                        }}
                    >
                    Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    )
}

export default profileSettings
