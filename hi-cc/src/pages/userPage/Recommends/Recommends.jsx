import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";

import Logo from "../../../assets/Logo.png";
import ProfileCard from "../../../components/ProfileCard";
import Button from "../../../components/MainButton";
import Bear from "../../../assets/bear.png";
import Deer from "../../../assets/deer.png";
import Dino from "../../../assets/dino.png";
import Dog from "../../../assets/dog.png";
import Cat from "../../../assets/cat.png";
import Rabbit from "../../../assets/rabbit.png";
import Fox from "../../../assets/fox.png";
import Fish from "../../../assets/fish.png";
import Penguin from "../../../assets/penguin.png";
import Squirrel from "../../../assets/squirrel.png";
import Tiger from "../../../assets/tiger.png";
import Hourse from "../../../assets/hourse.png";
import Snake from "../../../assets/snake.png";
import Duck from "../../../assets/duck.png";
import Raccoon from "../../../assets/raccoon.png";
import Wolf from "../../../assets/wolf.png";
import Sheep from "../../../assets/sheep.png";
import Frog from "../../../assets/frog.png";

export default function Recommends() {
    const navigate = useNavigate();
    const [selectedId, setSelectedId] = useState(null);

    function handleClick(id) {
        setSelectedId(id);
    }

    function handleSelect() {
        navigate('/message');
    }


    return (
        <RecommendsWrapper>
            <DescriptionWrapper>
                <LogoWrapper src={Logo} />
                <DescriptionText>
                    알아가고 싶은 상대를 골라주세요.
                </DescriptionText>
            </DescriptionWrapper>
            <ProfileCardWrapper>
                <ProfileCard id={1} src={Bear} onClick={() => handleClick(1)} $selected={selectedId === 1} />
                <ProfileCard id={2} src={Deer} onClick={() => handleClick(2)} $selected={selectedId === 2} />
                <ProfileCard id={3} src={Deer} onClick={() => handleClick(3)} $selected={selectedId === 3} />
                <ProfileCard id={4} src={Deer} onClick={() => handleClick(4)} $selected={selectedId === 4} />
                <ProfileCard id={5} src={Rabbit} onClick={() => handleClick(5)} $selected={selectedId === 5} />
                <ProfileCard id={6} src={Deer} onClick={() => handleClick(6)} $selected={selectedId === 6} />
                <ProfileCard id={7} src={Dog} onClick={() => handleClick(7)} $selected={selectedId === 7} />
            </ProfileCardWrapper>

            <Button onClick={handleSelect} $valid={selectedId !== null} $position="fixed">선택하기</Button>
        </RecommendsWrapper>
    )
};

const RecommendsWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background: #F9DBDD;
    overflow: auto;
`
const ProfileCardWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(4, 350px);
    margin: 30px 0 150px 0;
    column-gap: 20px;

    & > :nth-child(2n) {
        transform: translateY(50px);
    }
    
    @media screen and (max-width: 420px) {
        grid-template-columns: 1fr;
        grid-template-rows: repeat(4, 350px);

        & > :nth-child(2n) {
        transform: none;
    }
    }
`

const DescriptionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    margin: 100px 0 30px 0;
    width: calc(80vw + 10px); // -30px 한 상태
    max-width: 620px; // -30px 한 상태

    @media screen and (max-width: 420px) {
        width: calc(75vw - 15px); // -25px 한 상태
        min-width: 235px; // -25px 한 상태
    }
`

const DescriptionText = styled.div`
    font-size: 13px;
    color: #464646;

    width: 30vw;
    min-width: 115px;
    word-break: keep-all;
`

const LogoWrapper = styled.img`
    width: 35vw;
    min-width: 115px;
    max-width: 259px;
`