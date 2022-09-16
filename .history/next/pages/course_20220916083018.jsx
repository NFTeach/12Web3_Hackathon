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
            courseName: context.query.courseName,
            courseDescription: context.query.courseDescription,
            courseSection1Name: context.query.courseSection1Name,
            courseSection1Description: context.query.courseSection1Description,
            courseSection1Video: context.query.courseSection1Video,
            courseSection2Name: context.query.courseSection2Name,
            courseSection2Description: context.query.courseSection2Description,
            courseSection2Video: context.query.courseSection2Video,
            courseSection3Name: context.query.courseSection3Name,
            courseSection3Description: context.query.courseSection3Description,
            courseSection3Video: context.query.courseSection3Video,
            image: context.query.image,
        },
    };
};

const course = (props) => {

    const [selectedSection, setSelectedSection] = useState(1);

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
                <Select placeholder="Select section number" vairant="filled" borderColor="green" onChange={(e) => setSelectedSection(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </Select>
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
