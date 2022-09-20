import { useState, useEffect } from 'react';
import moralis from "moralis";
import { useMoralis } from "react-moralis";
import { Textarea, Progress, Radio } from "@chakra-ui/react";
import stylesFirstBlock from "../../styles/Test_Pages/Question1/FirstBlock.module.css"

moralis.initialize(process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;

const question1 = (props) => {
    
    const { Moralis } = useMoralis();
    const [course, setCourse] = useState();
    const [question1, setQuestion1] = useState();
    const [question1Answer, setQuestion1Answer] = useState();

    useEffect (async () => {
        const Courses = Moralis.Object.extend("Courses");
        const query = new Moralis.Query(Courses);
        query.equalTo("objectId", props.courseObjectId);
        const course = await query.find();
        setCourse(course);
        setQuestion1(course[0].get("question1"));
        setQuestion1Answer(course[0].get("question1Answer").answer);
    }, []);

    console.log(question1, question1Answer);

    return (
        <>
        {/* First Block */}
            <div className={stylesFirstBlock.testPageDiv}>
                <div className={stylesFirstBlock.frameDiv}>
                    <div className={stylesFirstBlock.frameDiv1}>
                    <div className={stylesFirstBlock.frameDiv2}>
                        <Textarea
                        className={stylesFirstBlock.textAreaOutlineTextarea}
                        variant="outline"
                        placeholder="Text Area"
                        />
                        <div className={stylesFirstBlock.byDiv}>By:</div>
                        <img className={stylesFirstBlock.nFT1Icon} alt="" src="../nft-1@2x.png" />
                    </div>
                    </div>
                    <Progress
                    className={stylesFirstBlock.progressDefault}
                    value={10}
                    colorScheme="green"
                    />
                    <div className={stylesFirstBlock.frameDiv3}>
                    <div className={stylesFirstBlock.frameDiv4}>
                        <div className={stylesFirstBlock.frameDiv5}>
                        <div className={stylesFirstBlock.questionNumberTitle}>Question 1:</div>
                        <Textarea
                            className={stylesFirstBlock.progressDefault}
                            variant="outline"
                            placeholder="Question"
                        />
                        </div>
                        <div className={stylesFirstBlock.lineDiv} />
                        <div className={stylesFirstBlock.frameDiv6}>
                        <Textarea
                            className={stylesFirstBlock.textAreaOutlineTextarea}
                            variant="outline"
                            size="xs"
                            placeholder="Answer 1"
                            isReadOnly
                        />
                        <Radio colorScheme="green" />
                        </div>
                        <div className={stylesFirstBlock.frameDiv6}>
                        <Textarea
                            className={stylesFirstBlock.textAreaOutlineTextarea}
                            variant="outline"
                            placeholder="Answer 2"
                        />
                        <Radio colorScheme="green" />
                        </div>
                        <div className={stylesFirstBlock.frameDiv6}>
                        <Textarea
                            className={stylesFirstBlock.textAreaOutlineTextarea}
                            variant="outline"
                            placeholder="Answer 3"
                        />
                        <Radio colorScheme="green" />
                        </div>
                        <div className={stylesFirstBlock.frameDiv6}>
                        <Textarea
                            className={stylesFirstBlock.textAreaOutlineTextarea}
                            variant="outline"
                            placeholder="Answer 4"
                        />
                        <Radio colorScheme="green" />
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default question1

// Recieve props from next/pages/course.jsx
export const getServerSideProps = (context) => {
    
    return {
        props: {
            courseObjectId: context.query.courseObjectId,
        },
    };
};