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
        let image = null;
        switch (looklike) {
            case '강아지상':
                image = Dog;
                break;
            case '말상':
                image = Horse;
                break;
            case '토끼상':
                image = Rabbit;
                break;
            case '공룡상':
                image = Dino;
                break;
            case '펭귄상':
                image = Penguin;
                break;
            case '곰상':
                image = Bear;
                break;
            case '사슴상':
                image = Deer;
                break;
            case '고양이상':
                image = Cat;
                break;
            case '물고기상':
                image = Fish;
                break;
            case '호랑이상':
                image = Tiger;
                break;
            case '다람쥐상':
                image = Squirrel;
                break;
            case '여우상':
                image = Fox;
                break;
            case '뱀상':
                image = Snake;
                break;
            case '오리상':
                image = Duck;
                break;
            case '너구리상':
                image = Raccoon;
                break;
            case '늑대상':
                image = Wolf;
                break;
            case '양상':
                image = Sheep;
                break;
            case '개구리상':
                image = Frog;
                break;
            case 'MISSILE':
                image = Frog;
                break;
            default:
                break;
        };
        setImageSrc(image);
    }

    return (
        <ProfileCardWrapper onClick={props.onClick} key={props.id}>
            <Top $selected={props.$selected} />
            <Icon1 />
            <Icon2 />
            <WriteHere $selected={props.$selected}>
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
    width: calc(40vw + 10px);
    max-width: 310px;
    height: auto;
    cursor: pointer;

    @media screen and (max-width: 420px) {
        width: calc(75vw + 10px);
        min-width: 260px;
    }
`

const Top = styled.div`
    box-sizing: border-box;
    position: absolute;
    width: 40vw;
    max-width: 300px;
    height: 30px;

    top: 0px;
    left: 0px;

    background: ${props => props.$selected ? "#F94364" : "#FAA8B1"};
    border: 3px solid #000000;
    border-radius: 20px 20px 0px 0px;
    z-index: 150;

    @media screen and (max-width: 420px) {
        width: 75vw;
        min-width: 250px;
    }
`

const WriteHere = styled.div`
    box-sizing: border-box;
    position: absolute;
    width: 40vw;
    max-width: 300px;
    height: auto;

    top: 0px;
    left: 0px;
    padding: 36px 15px 15px 15px;
    font-size: 13px;
    line-height: 30px;

    background: ${props => props.$selected ? "#FAA8B1" : "#FFFFFF"};
    border: 3px solid #000000;
    border-radius: 20px;
    z-index: 100;

    box-shadow: 10px 10px 0px rgba(0, 0, 0);

    @media screen and (max-width: 420px) {
        width: 75vw;
        min-width: 250px;
    }
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
    right: 25px;
    
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
    right: 48px;
    
    border: 3px solid #000000;
    border-radius: 50%;
    background-color: #F94364;
    z-index: 160;
`

const Data = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 18px 0;
    font-size: 18px;
`

const DataKey = styled.div`
    
`

const DataValue = styled.div`
    
`