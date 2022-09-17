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

const course = () => {
  return (
    <>
       <div className={styles.courseDiv}>
        <div className={styles.frameDiv}>
            <video className={styles.frameVideo} controls>
            <source />
            </video>
            <div className={styles.frameDiv1}>
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
            <div className={styles.frameDiv2}>
                <Input
                className={styles.rectangleInput}
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
