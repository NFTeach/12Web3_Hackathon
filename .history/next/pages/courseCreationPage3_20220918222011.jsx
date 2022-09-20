// Toast the save button completion for each section or display the section data in table once saved?

import React, { useEffect, useState, useRef } from "react";
import {
    Input, 
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Select,
    useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import moralis from "moralis";
import { useMoralis } from "react-moralis";
import stylesHeader from "../styles/CourseCreation_Pages/3/Header.module.css";
import stylesFirstBlock from "../styles/CourseCreation_Pages/3/FirstBlock.module.css";

moralis.initialize(process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;

const courseCreationPage3 = () => {
    const router = useRouter();
    const toast = useToast();
    const inputVideoFile = useRef(null);
    const [sectionName, setSectionName] = useState();
    const [sectionDescription, setSectionDescription] = useState();
    const [uploadedVideoFile, setUploadedVideoFile] = useState(null);
    const { Moralis } = useMoralis();
    const [selectedSection, setSelectedSection] = useState("");
    const [isUploadInProgress, setIsUploadInProgress] = useState(false);
    const [isSectionCreationCompleted, setIsSectionCreationCompleted] = useState(false);
    const { isOpen: isSectionOpen, onOpen: onSectionOpen, onClose: onSectionClose } = useDisclosure();
    const [scrollBehavior, setScrollBehavior] = React.useState('inside');
    const user = moralis.User.current();

    const saveSection = async () => {

        let vid;
        // let sectionObject;
        if(uploadedVideoFile) {
            const video = uploadedVideoFile;
            const videoFile = new Moralis.File(video.name, video);
            await videoFile.saveIPFS();
            vid = videoFile.ipfs();
        } else {
            setIsUploadInProgress(false);
            console.log("No video file uploaded");
            return
        };

        const Courses = Moralis.Object.extend("Courses");
        const query = new Moralis.Query(Courses);
        const account = user.attributes.accounts[0];
        query.equalTo("educatorAddress", account);
        query.descending("createdAt")
        const Course = await query.first();

        Course.set(`courseSection${selectedSection}`, {sectionName, sectionDescription, vid});

        await Course.save();
        setIsUploadInProgress(false);
        console.log("Course saved");
    };

    const handleVideoUpload = (e) => {
        const video = e.target.files[0];
        if (video != null) {
            setUploadedVideoFile(video);
            return (
                toast({
                    title: "Video uploaded",
                    description: "Your video has been uploaded",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                })
            )
        } else {
            return (
                toast({
                    title: "No video uploaded",
                    description: "Please upload a video",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                })
            )
        }
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

    const nextPage = () => {
        setIsSectionCreationCompleted(false);
        router.push("/courseCreationPage4");
    };

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
                        src="/courseCreationPages_imgs/3/discord.svg"
                    />
                    </button>
                </div>
                <div className={stylesHeader.rightDiv}>
                    <img className={stylesHeader.icon} alt="" src="/courseCreationPages_imgs/3/lang.svg" />
                    <h5 className={stylesHeader.englishH5}>English</h5>
                </div>
                </header>
            </div>
            {/* First Block */}
            <div className={stylesFirstBlock.courseCreationPage3}>
                <div className={stylesFirstBlock.frameDiv}>
                    <div className={stylesFirstBlock.frameDiv1}>
                    <div className={stylesFirstBlock.frameDiv2}>
                        <div className={stylesFirstBlock.frameDiv3}>
                        <div className={stylesFirstBlock.titleDiv}>Create your course (3/4)</div>
                        </div>
                        <div className={stylesFirstBlock.frameDiv4}>
                        <div className={stylesFirstBlock.titleDiv1}>
                            Add up to 3 sections. Each section should have a
                            video element with a title of what will be learned and a
                            description with notes and next steps (we don’t suggest homework
                            but...)
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className={stylesFirstBlock.frameDiv5}>
                    <Button 
                        variant="solid" 
                        w="606px" 
                        colorScheme="green"
                        onClick={onSectionOpen}
                    >
                        Add Section
                    </Button>
                    <Button 
                        variant="solid" 
                        w="357px" 
                        colorScheme="green"
                        isLoading={isSectionCreationCompleted}
                        onClick={() => {
                            setIsSectionCreationCompleted(true);
                            nextPage();
                        }}
                    >
                        Continue
                    </Button>
                    </div>
                </div>
            </div>
            {/* Section Modal */}
            <Modal isOpen={isSectionOpen} onClose={onSectionClose} size={"xl"} scrollBehavior={scrollBehavior}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Section</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                    <Input
                        label="Section Name"
                        name="Name"
                        variant="outline"
                        textColor="#000000"
                        placeholder="Section Name"
                        onChange={(e) => setSectionName(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Input
                        label="Section Description"
                        name="Description"
                        variant="outline"
                        textColor="#000000"
                        placeholder="Description"
                        onChange={(e) => setSectionDescription(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Select placeholder="Select section number" onChange={(e) => setSelectedSection(e.target.value)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </Select>
                    &nbsp;
                    <br />
                    <br />
                    <Button
                        variant="solid"  
                        colorScheme="green"
                        >
                        <Input
                            name="video"
                            type="file"
                            multiple={false}
                            height="100%"
                            width="100%"
                            position="absolute"
                            top="0"
                            left="0"
                            opacity="0"
                            aria-hidden="true"
                            accept="video/*"
                            ref={inputVideoFile}
                            onChange={handleVideoUpload}
                        />
                        Upload Section Video (10mb or less)
                    </Button>
                    </ModalBody>
                    <ModalFooter>
                        <Button 
                            variant='ghost'
                            isLoading={isUploadInProgress} 
                            onClick={async () => {
                                setIsUploadInProgress(true);
                                await saveSection();
                                onSectionClose();
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

export default courseCreationPage3