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

const API_URL = import.meta.env.VITE_API_URL;

export default function ProfileCard(props) {
    const [imageSrc, setImageSrc] = useState(`${API_URL}/profiles/${props.id}/image?size=200`);

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
            'MISSILE': Deer,
        };
    
        const image = looklikeImages[looklike] || null;
        setImageSrc(image);
    }

    return (
        <ProfileCardWrapper key={props.id}>
            <Top/>
            <Icon1 />
            <Icon2 />
            <WriteHere>
                <Image src={imageSrc} onError={() => looklikeHandler(props.data.looklike)}></Image>
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
            </WriteHere>
        </ProfileCardWrapper>
    );
}

const ProfileCardWrapper = styled.div`
    position: relative;
    min-width: 266px;
    width: calc(80vw + 16px);
    max-width: 616px;
    height: auto;
    margin: 20px 0;
`

const Top = styled.div`
    box-sizing: border-box;

    position: absolute;
    top: 0;
    left: 0;

    min-width: 250px;
    width: 80vw;
    max-width: 600px;
    height: 30px;

    background: #FAA8B1;
    border: 3px solid #000000;
    border-radius: 20px 20px 0px 0px;
`

const WriteHere = styled.div`
    box-sizing: border-box;

    min-width: 250px;
    width: 80vw;
    max-width: 600px;
    min-height: 250px;
    height: auto;
    padding: 40px 20px 20px 20px;

    line-height: 25px;

    background: #FFFFFF;
    border: 3px solid #000000;
    border-radius: 20px;
    box-shadow: 16px 12px 0 #000000;
`

const Image = styled.img`
    padding: 5px;
    width: 70px;
    height: 70px;
`

const Icon1 = styled.div`
    position: absolute;
    width: 13px;
    height: 13px;

    top: 7px;
    right: 30px;
    
    border: 3px solid #000000;
    border-radius: 50%;
    background-color: #FFFFFF;
    z-index: 160;
`

const Icon2 = styled.div`
    position: absolute;
    width: 13px;
    height: 13px;

    top: 7px;
    right: 55px;
    
    border: 3px solid #000000;
    border-radius: 50%;
    background-color: #F94364;
    z-index: 160;
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
    word-break: break-word;
    text-align: end;
`