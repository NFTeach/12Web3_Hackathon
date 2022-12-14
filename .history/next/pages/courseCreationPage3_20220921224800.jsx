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
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Tfoot
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import moralis from "moralis";
import { useMoralis } from "react-moralis";
import stylesHeader from "../styles/CourseCreation_Pages/3/Header.module.css";
import stylesFirstBlock from "../styles/CourseCreation_Pages/3/FirstBlock.module.css";
import stylesFooter from "../styles/CourseCreation_Pages/3/Footer.module.css";

moralis.initialize(process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;

const courseCreationPage3 = () => {
  const router = useRouter();
  const toast = useToast();
  const inputVideoFile = useRef(null);
  const [sectionName, setSectionName] = useState();
  const [sectionDescription, setSectionDescription] = useState();
  const [uploadedVideoFile, setUploadedVideoFile] = useState(null);
  const [section1Name, setSection1Name] = useState();
  const [section1Description, setSection1Description] = useState();
  const [section1Video, setSection1Video] = useState();
  const [section2Name, setSection2Name] = useState();
  const [section2Description, setSection2Description] = useState();
  const [section2Video, setSection2Video] = useState();
  const [section3Name, setSection3Name] = useState();
  const [section3Description, setSection3Description] = useState();
  const [section3Video, setSection3Video] = useState();
  const { Moralis } = useMoralis();
  const [selectedSection, setSelectedSection] = useState("");
  const [isUploadInProgress, setIsUploadInProgress] = useState(false);
  const [isSectionCreationCompleted, setIsSectionCreationCompleted] =
    useState(false);
  const {
    isOpen: isSectionOpen,
    onOpen: onSectionOpen,
    onClose: onSectionClose,
  } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = React.useState("inside");
  const user = moralis.User.current();

  const saveSection = async () => {
    let vid;
    // let sectionObject;
    if (uploadedVideoFile) {
      const video = uploadedVideoFile;
      const videoFile = new Moralis.File(video.name, video);
      await videoFile.saveIPFS();
      vid = videoFile.ipfs();
    } else {
      setIsUploadInProgress(false);
      console.log("No video file uploaded");
      return;
    }

    const Courses = Moralis.Object.extend("Courses");
    const query = new Moralis.Query(Courses);
    const account = user.attributes.accounts[0];
    query.equalTo("educatorAddress", account);
    query.descending("createdAt");
    const Course = await query.first();

    Course.set(`courseSection${selectedSection}`, {
      sectionName,
      sectionDescription,
      vid,
    });

    await Course.save();
    setIsUploadInProgress(false);
    // console.log("Course saved");
    window.location.reload();
  };

  useEffect (async () => {
    const Courses = Moralis.Object.extend("Courses");
    const query = new Moralis.Query(Courses);
    const account = user.attributes.accounts[0];
    query.equalTo("educatorAddress", account);
    query.descending("createdAt");
    const Course = await query.first();
    const section1 = Course.get("courseSection1");
    const section2 = Course.get("courseSection2");
    const section3 = Course.get("courseSection3");
    setSection1Name(section1?.sectionName);
    setSection1Description(section1?.sectionDescription);
    setSection1Video(section1?.vid);
    setSection2Name(section2?.sectionName);
    setSection2Description(section2?.sectionDescription);
    setSection2Video(section2?.vid);
    setSection3Name(section3?.sectionName);
    setSection3Description(section3?.sectionDescription);
    setSection3Video(section3?.vid);
  }, []);

  console.log("section1Name", section1Name);
  console.log("section1Description", section1Description);
  console.log("section1Video", section1Video);

  const handleVideoUpload = (e) => {
    const video = e.target.files[0];
    if (video != null) {
      setUploadedVideoFile(video);
      return toast({
        title: "Video uploaded",
        description: "Your video has been uploaded",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      return toast({
        title: "No video uploaded",
        description: "Please upload a video",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const nextPage = () => {
    setIsSectionCreationCompleted(false);
    router.push("/courseCreationPage4");
  };

  return (
    <>
      {/* Header */}
      <div className={stylesHeader.frameDiv}>
        <img className={stylesHeader.nFTeach1Icon} alt="" src="/courseCreationPages_imgs/2/NFTeach.png" />
      </div>
      {/* First Block */}
      <div className={stylesFirstBlock.courseCreationPage3}>
        <div className={stylesFirstBlock.frameDiv}>
          <div className={stylesFirstBlock.frameDiv1}>
            <div className={stylesFirstBlock.frameDiv2}>
              <div className={stylesFirstBlock.frameDiv3}>
                <div className={stylesFirstBlock.titleDiv}>
                  Create your course (3/4)
                </div>
              </div>
              <div className={stylesFirstBlock.frameDiv4}>
                <div className={stylesFirstBlock.titleDiv1}>
                  Add up to 3 sections. Each section should have a video element
                  with a title of what will be learned and a description with
                  notes and next steps (we don???t suggest homework but...)
                </div>
              </div>
            </div>
            <TableContainer>
              <Table variant='simple' size='lg'>
                <TableCaption>Imperial to metric conversion factors</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Description</Th>
                    <Th>Video</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>{section1Name}</Td>
                    <Td>{section1Description}</Td>
                    <Td>{section1Video}</Td>
                  </Tr>
                  <Tr>
                    <Td>{section2Name}</Td>
                    <Td>{section2Description}</Td>
                    <Td>{section2Video}</Td>
                  </Tr>
                  <Tr>
                    <Td>{section3Name}</Td>
                    <Td>{section3Description}</Td>
                    <Td>{section3Video}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </div>
          
          <div className={stylesFirstBlock.frameDiv5}>
            <Button
              variant='solid'
              w='606px'
              colorScheme='green'
              onClick={onSectionOpen}
            >
              Add Section
            </Button>
            
            <Button
              variant='solid'
              w='357px'
              colorScheme='green'
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
      <Modal
        isOpen={isSectionOpen}
        onClose={onSectionClose}
        size={"xl"}
        scrollBehavior={scrollBehavior}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Section</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              label='Section Name'
              name='Name'
              variant='outline'
              textColor='#000000'
              placeholder='Section Name'
              onChange={(e) => setSectionName(e.target.value)}
            />
            &nbsp;
            <br />
            <Input
              label='Section Description'
              name='Description'
              variant='outline'
              textColor='#000000'
              placeholder='Description'
              onChange={(e) => setSectionDescription(e.target.value)}
            />
            &nbsp;
            <br />
            <Select
              placeholder='Select section number'
              onChange={(e) => setSelectedSection(e.target.value)}
            >
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
            </Select>
            &nbsp;
            <br />
            <br />
            <Button variant='solid' colorScheme='green'>
              <Input
                name='video'
                type='file'
                multiple={false}
                height='100%'
                width='100%'
                position='absolute'
                top='0'
                left='0'
                opacity='0'
                aria-hidden='true'
                accept='video/*'
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
      {/* Footer */}
      <div className={stylesFooter.frameDiv}>
        <h4 className={stylesFooter.nFTeachH4}>?? 2022 NFTeach</h4>
      </div>
    </>
  );
};

export default courseCreationPage3;
