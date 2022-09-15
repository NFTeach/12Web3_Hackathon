import { useCallback, useEffect, useRef, useState } from "react";
import { 
    Button,
    Box,
    Heading,
    Input,
    Stack,
    Text,
    useToast
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import moralis from "moralis";
import { useMoralis } from "react-moralis";
import stylesHeader from "../styles/CourseCreation_Pages/2/Header.module.css";
import stylesFirstBlock from "../styles/CourseCreation_Pages/2/FirstBlock.module.css";

moralis.initialize(process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;

const courseCreationPage2 = () => {
    const router = useRouter();
    const toast = useToast();
    const inputImageFile = useRef(null);
    const [uploadedImageFile, setUploadedImageFile] = useState(null);
    const [isUploadInProgress, setIsUploadInProgress] = useState(false);
    const { Moralis } = useMoralis();
    const user = moralis.User.current();

    const saveImage = async () => {
        
        let img;
        let imgObject;
        if(uploadedImageFile) {
            const image = uploadedImageFile;
            const imageFile = new Moralis.File(image.name, image);
            await imageFile.saveIPFS();
            img = imageFile.ipfs();
            imgObject = {img};
            // console.log(imgObject);
        } else {
            setIsUploadInProgress(false);
            console.log("No image file uploaded");
            return
        };

        const Courses = Moralis.Object.extend("Courses");
        const query = new Moralis.Query(Courses);
        const account = user.attributes.accounts[0];
        query.equalTo("educatorAddress", account);
        query.descending("createdAt")
        const Course = await query.first();
        
        Course.set("imageFile", imgObject);

        await Course.save();
        setIsUploadInProgress(false);
        console.log("Course saved");
    };

    const handleImageUpload = (e) => {
        const image = e.target.files[0];
        if (image != null) {
            setUploadedImageFile(image);
            return (
               toast({
                    title: "Image uploaded",
                    description: "Your image has been uploaded",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
               })
            )
        } else {
            return (
                toast({
                    title: "No image uploaded",
                    description: "Please upload an image",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                })
            )
        }
    };

    console.log(uploadedImageFile);

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

    const onContinueButtonClick = useCallback(() => {
        router.push("/courseCreationPage3");
    }, [router]);

    // console.log(uploadedImageFile, selectedImageFile)
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
                    src="/courseCreationPages_imgs/2/discord.svg"
                />
                </button>
            </div>
            <div className={stylesHeader.rightDiv}>
                <img className={stylesHeader.icon} alt="" src="/courseCreationPages_imgs/2/lang.svg" />
                <h5 className={stylesHeader.englishH5}>English</h5>
            </div>
            </header>
        </div>
        {/* First Block */}
        <div className={stylesFirstBlock.courseCreationPage4}>
            <div className={stylesFirstBlock.frameDiv}>
                <div className={stylesFirstBlock.frameDiv1}>
                <div className={stylesFirstBlock.titleDiv}>Create your course (2/4)</div>
                </div>
                <div className={stylesFirstBlock.frameDiv2}>
                <div className={stylesFirstBlock.titleDiv1}>
                    Please choose high quality images and videos for your course. We
                    personally veto every course, and low-quality/effort courses will be
                    scrapped and stake fees slashed. Ask yourself the question, “Would I
                    pay for this course?”
                </div>
                </div>
            </div>
            <div className={stylesFirstBlock.frameDiv3}>
                <div className={stylesFirstBlock.frameDiv4}>
                <div className={stylesFirstBlock.frameDiv5}>
                    <div className={stylesFirstBlock.titleDiv2}>
                    Upload a course image (<b>PNG/JPEG, 500px X 500px, 5mb or less</b>)
                    </div>
                    <div className={stylesFirstBlock.titleDiv3}>
                    This image will be shown around NFTeach and suggested to other
                    students. Make sure it’s appropriate to the course!
                    </div>
                </div>
                <div className={stylesFirstBlock.uploadFormDiv}>
                    <Box position="relative" height="100%" width="100%">
                        <Box
                            position="absolute"
                            top="0"
                            left="0"
                            height="100%"
                            width="100%"
                            display="flex"
                            flexDirection="column"
                            >
                           <Stack p="8" textAlign="center" spacing="1">
                                <Heading fontSize="xl"  fontWeight="bold">
                                    Drop image here (only 1)
                                </Heading>
                                <Text fontSize="lg" fontWeight="light">or click to upload</Text>
                            </Stack> 
                        </Box>
                        <Input
                            name="image"
                            type="file"
                            multiple={false}
                            height="100%"
                            width="100%"
                            position="absolute"
                            top="0"
                            left="0"
                            opacity="0"
                            aria-hidden="true"
                            accept="image/*"
                            ref={inputImageFile}
                            onChange={handleImageUpload}
                        />
                    </Box>
                </div>
                <Button 
                    variant="solid" 
                    w="357px"
                    isLoading={isUploadInProgress}
                    colorScheme="green"
                    onClick={async () => {
                        setIsUploadInProgress(true);
                        await saveImage();
                        onContinueButtonClick();
                    }}
                >
                    Continue
                </Button>
                </div>
            </div>
            </div>
        </>
    )
}

export default courseCreationPage2
