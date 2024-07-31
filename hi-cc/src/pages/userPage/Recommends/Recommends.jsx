import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";

import ProfileCard from "../../../components/ProfileCard";
import Button from "../../../components/MainButton";
import Bear from "../../../assets/bear.png";
import Deer from "../../../assets/deer.png";
import Rabbit from "../../../assets/rabbit.png";
import Dog from "../../../assets/dog.png";

export default function Recommends() {
    const navigate = useNavigate();
    const [selectedId, setSelectedId] = useState(null);

    function handleClick(id) {
        setSelectedId(id);
    }

    function handleSelect() {
        navigate('/message');
    }


    return(
        <RecommendsWrapper>
            <DescriptionText>
                    상대에게 한번,<br/>
                    추가로 문자를 보낼 수 있어요.
            </DescriptionText>
            
            <ProfileCardWrapper>
                <ProfileCard id={1} src={Bear} onClick={() => handleClick(1)} $selected={selectedId === 1} />
                <ProfileCard id={2} src={Deer} onClick={() => handleClick(2)} $selected={selectedId === 2} />
                <ProfileCard id={3} src={Deer} onClick={() => handleClick(3)} $selected={selectedId === 3} />
                <ProfileCard id={4} src={Deer} onClick={() => handleClick(4)} $selected={selectedId === 4} />
                <ProfileCard id={5} src={Rabbit} onClick={() => handleClick(5)} $selected={selectedId === 5} />
                <ProfileCard id={6} src={Deer} onClick={() => handleClick(6)} $selected={selectedId === 6} />
                <ProfileCard id={7} src={Dog} onClick={() => handleClick(7)} $selected={selectedId === 7} />
            </ProfileCardWrapper>

            <Button onClick={handleSelect} $valid={selectedId !== null}>선택하기</Button>
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
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, 350px);
    margin: 30px 0 100px 0;
    column-gap: 2vw;
`


const DescriptionText = styled.div`
    font-size: 13px;
    color: #464646;
`