import React, { useState } from 'react';
import styled from "styled-components";

import Bear from "../assets/bear.png";
import Deer from "../assets/deer.png";
import Dino from "../assets/dino.png";
import Dog from "../assets/dog.png";
import Cat from "../assets/cat.png";
import Rabbit from "../assets/rabbit.png";
import Fox from "../assets/fox.png";
import Fish from "../assets/fish.png";
import Penguin from "../assets/penguin.png";
import Squirrel from "../assets/squirrel.png";
import Tiger from "../assets/tiger.png";
import Horse from "../assets/horse.png";
import Snake from "../assets/snake.png";
import Duck from "../assets/duck.png";
import Raccoon from "../assets/raccoon.png";
import Wolf from "../assets/wolf.png";
import Sheep from "../assets/sheep.png";
import Frog from "../assets/frog.png";
import Monkey from "../assets/monkey.png";
import Pig from "../assets/pig.png";
import Turtle from "../assets/turtle.png";

const API_URL = import.meta.env.VITE_API_URL;

export default function MyPageProfileCard(props) {
    const [imageSrc, setImageSrc] = useState(`${API_URL}/profiles/${props.id}/image?size=200`);
    const [border, setBorder] = useState(true);

    function looklikeHandler(looklike) {
        const looklikeImages = {
            '강아지상': Dog,
            '말상': Horse,
            '토끼상': Rabbit,
            '공룡상': Dino,
            '펭귄상': Penguin,
            '곰상': Bear,
            '사슴상': Deer,
            '고양이상': Cat,
            '물고기상': Fish,
            '호랑이상': Tiger,
            '다람쥐상': Squirrel,
            '여우상': Fox,
            '뱀상': Snake,
            '오리상': Duck,
            '너구리상': Raccoon,
            '늑대상': Wolf,
            '양상': Sheep,
            '개구리상': Frog,
            '원숭이상': Monkey,
            '돼지상': Pig,
            '거북이상': Turtle,
            'MISSILE': Deer,
        };

        const image = looklikeImages[looklike] || null;
        setImageSrc(image);
        setBorder(false);
    }

    return (
        <ProfileCardWrapper key={props.id}>
            <Top $delete={props.$delete}/>
            <Icon1 />
            <Icon2 />
            {props.$delete ? <WriteHere $delete={props.$delete}>
                    <DeleteMessage>
                        탈퇴한 사용자입니다.
                    </DeleteMessage>
                </WriteHere>
                :
                <WriteHere>
                    <Image src={imageSrc} $border={border} onError={() => looklikeHandler(props.data.looklike)}></Image>
                    <DataWrapper>
                        {props.data.major ?
                            <Data>
                                <DataKey>학과</DataKey>
                                <DataValue>{props.data.major}</DataValue>
                            </Data> : ""}
                        <Data>
                            <DataKey>나이</DataKey>
                            <DataValue>{props.data.birthyear}년생</DataValue></Data>
                        {props.data.mbti ?
                            <Data>
                                <DataKey>MBTI</DataKey>
                                <DataValue>{props.data.mbti}</DataValue>
                            </Data> : ""}
                        <Data>
                            <DataKey>닮은꼴</DataKey>
                            <DataValue>{props.data.looklike}</DataValue>
                        </Data>
                        <Data>
                            <DataKey>흡연여부</DataKey>
                            <DataValue>{props.data.smoking ? "예" : "아니오"}</DataValue>
                        </Data>
                    </DataWrapper>
                </WriteHere>
            }
        </ProfileCardWrapper>
    );
}

const ProfileCardWrapper = styled.div`
    position: relative;
    min-width: 266px;
    width: 100%;
    height: auto;
    margin-bottom: 20px;
`

const Top = styled.div`
    box-sizing: border-box;

    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 30px;

    background: ${props => props.$delete ? "#5D5D5D" : "#FF7D95"};
    border: 3px solid #000000;
    border-radius: 10px 10px 0px 0px;
`

const WriteHere = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: ${props => props.$delete ? "200px" : "auto"};
    padding: 40px 10px 15px 0;

    line-height: 25px;

    background: ${props => props.$delete ? "#9B9B9B" : "#FFFFFF"};
    border: 3px solid #000000;
    border-radius: 10px;
`

const DeleteMessage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 200px;
    height: 30px;
    background-color: #D9D9D9;
    color: #464646;
    font-size: 16px;
    border-radius: 10px;
`

const Image = styled.img`
    margin: 0 20px;
    width: 70px;
    height: 70px;
    
    border: ${props => props.$border ? "3px solid #000000" : "none"};
    border-radius: ${props => props.$border ? "15px" : "none"};
    box-shadow: ${props => props.$border ? "0px 4px 8px 3px rgba(0, 0, 0, 0.15)" : "none"};
`

const Icon1 = styled.div`
    position: absolute;
    width: 13px;
    height: 13px;

    top: 6px;
    right: 15px;
    
    border: 3px solid #000000;
    border-radius: 50%;
    background-color: #FFFFFF;
    z-index: 160;
`

const Icon2 = styled.div`
    position: absolute;
    width: 13px;
    height: 13px;

    top: 6px;
    right: 40px;
    
    border: 3px solid #000000;
    border-radius: 50%;
    background-color: #F9DBDD;
    z-index: 160;
`

const DataWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    padding: 0 5px;
`

const Data = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 15px;
`

const DataKey = styled.div`
    word-break: keep-all;
    margin-right: 10px;
`

const DataValue = styled.div`
    color: #747474;
    word-break: break-word;
    text-align: end;
`