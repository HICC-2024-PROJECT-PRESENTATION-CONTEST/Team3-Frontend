import React, { useEffect } from 'react';
import styled from "styled-components";

import ProfileCard from "../../../components/ProfileCard";
import Button from "../../../components/MainButton";
import Bear from "../../../assets/bear.png";
import Deer from "../../../assets/deer.png";
import Rabbit from "../../../assets/rabbit.png";
import Dog from "../../../assets/dog.png";

export default function Recommends() {

    return(
        <RecommendsWrapper>
            <DescriptionText>
                    상대에게 한번,<br/>
                    추가로 문자를 보낼 수 있어요.
            </DescriptionText>
            
            <ProfileCardWrapper>
                <ProfileCard src={Bear}></ProfileCard>
                <ProfileCard src={Deer}></ProfileCard>
                <ProfileCard src={Deer}></ProfileCard>
                <ProfileCard src={Deer}></ProfileCard>
                <ProfileCard src={Rabbit}></ProfileCard>
                <ProfileCard src={Deer}></ProfileCard>
                <ProfileCard src={Dog}></ProfileCard>
            </ProfileCardWrapper>

            <Button>선택하기</Button>
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