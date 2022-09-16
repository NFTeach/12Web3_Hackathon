import { useState } from "react";
import {
    MenuButton,
    Menu,
    Button,
    MenuList,
    MenuItem,
    Input,
    Select
  } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import stylesFirstBlock from "../styles/Course_Page/FirstBlock.module.css";

export const getServerSideProps = (context) => {
    
    return {
        props: {
            courseObjectId: context.query.courseObjectId,
        },
    };
};

const course = (props) => {

    const [selectedSection, setSelectedSection] = useState(1);
    console.log(props.courseObjectId);
    return (
        <>
          <div className={stylesFirstBlock.courseDiv}>
            <div className={stylesFirstBlock.frameDiv}>
                <input
                className={stylesFirstBlock.frameInput}
                type="text"
                placeholder={props.courseName}
                />
                <video className={stylesFirstBlock.frameVideo} controls>
                <source src={props.courseSection1Video} />
                </video>
                <div className={stylesFirstBlock.frameDiv1}>
                {/* <Select placeholder={courseSection1Name} vairant="filled" bg="green" borderColor="green" color="white" onChange={(e) => setSelectedSection(e.target.value)}>
                    <option value="1">Section 1</option>
                    <option value="2">Section 2</option>
                    <option value="3">3</option>
                </Select> */}
                <div className={stylesFirstBlock.frameDiv2}>
                    <Input
                    className={stylesFirstBlock.rectangleInput}
                    variant="outline"
                    textColor="#e4e4e4"
                    backgroundColor="#000"
                    placeholder="Course Description"
                    />
                </div>
                <Button variant="solid" w="272px" colorScheme="green">
                    Attempt Test
                </Button>
                </div>
            </div>
        </div>
        </>
    )
}

export default course
