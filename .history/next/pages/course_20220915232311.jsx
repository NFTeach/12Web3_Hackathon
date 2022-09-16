import { useState } from "react";
import {
    MenuButton,
    Menu,
    Button,
    MenuList,
    MenuItem,
    Input,
  } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import stylesFirstBlock from "../styles/Course_Page/FirstBlock.module.css";
import { withRouter } from "next/router";

export const getServerSideProps = (context) => {
    console.log(context.query);
    return {
        props: {
            courseName: context.query.courseName,
            courseDescription: context.query.courseDescription,
            courseSection1: context.query.courseSection1,
            courseSection2: context.query.courseSection2,
            courseSection3: context.query.courseSection3,
            image: context.query.image,
        },
    };
};

const course = (props) => {
    console.log(props.courseName)
    return (
        <>
        <div className={stylesFirstBlock.courseDiv}>
            <div className={stylesFirstBlock.frameDiv}>
                <video className={stylesFirstBlock.frameVideo} controls>
                <source />
                </video>
                <div className={stylesFirstBlock.frameDiv1}>
                <Menu>
                    <MenuButton
                    w="336px"
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    colorScheme="green"
                    >
                    Section Title
                    </MenuButton>
                    <MenuList>
                    <MenuItem value="Option 1">Option 1</MenuItem>
                    <MenuItem value="Option 2">Option 2</MenuItem>
                    <MenuItem value="Option 3">Option 3</MenuItem>
                    </MenuList>
                </Menu>
                <div className={stylesFirstBlock.frameDiv2}>
                    <Input
                    className={stylesFirstBlock.rectangleInput}
                    variant="outline"
                    textColor="#e4e4e4"
                    backgroundColor="#000"
                    placeholder="Course Description"
                    />
                </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default course
