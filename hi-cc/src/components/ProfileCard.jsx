import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import styled from "styled-components";

export default function ProfileCard(props, {children}) {

    return(
        <ProfileCardWrapper onClick={props.onClick}>
            <Top $selected={props.$selected}/>
            <Icon1 />
            <Icon2 />
            <WriteHere $selected={props.$selected}>
                <Image src={props.src}></Image>
                <br/>
                학과: <br />
                나이: <br />
                키: <br />
                MBTI: <br />
                닮은꼴: <br />
                흡연여부: <br />
            </WriteHere>
        </ProfileCardWrapper>
    ); 
}

const ProfileCardWrapper = styled.div`
    position: relative;
    width: calc(40vw + 10px);
    max-width: 310px;
    height: 80px;
    cursor: pointer;
`

const Top = styled.div`
    box-sizing: border-box;
    position: absolute;
    width: 40vw;
    max-width: 300px;
    height: 30px;

    top: 0px;
    left: 0px;

    background: ${props => props.$selected? "#F94364" : "#FAA8B1"};
    border: 3px solid #000000;
    border-radius: 20px 20px 0px 0px;
    z-index: 150;
`

const WriteHere = styled.div`
    box-sizing: border-box;
    position: absolute;
    width: 40vw;
    max-width: 300px;
    height: auto;

    top: 0px;
    left: 0px;
    padding: 36px 9px 15px 9px;
    font-size: 12px;
    line-height: 30px;

    background: ${props => props.$selected? "#FAA8B1" : "#FFFFFF"};
    border: 3px solid #000000;
    border-radius: 20px;
    z-index: 100;

    box-shadow: 13px 13px 0px rgba(0, 0, 0);
`

const Image = styled.img`
    width: 70px;
    height: 70px;
`

const Icon1 = styled.div`
    position: absolute;
    width: 13px;
    height: 13px;

    top: 7px;
    right: 23px;
    
    border: 3px solid #000000;
    border-radius: 30px;
    background-color: #FFFFFF;
    z-index: 160;

    @media screen and (max-width: 750px) {
        left: calc(40vw - 30px);
    }
`

const Icon2 = styled.div`
    position: absolute;
    width: 13px;
    height: 13px;

    top: 7px;
    right: 47px;
    
    border: 3px solid #000000;
    border-radius: 30px;
    background-color: #F94364;
    z-index: 160;

    @media screen and (max-width: 750px) {
        left: calc(40vw - 53px);
    }
`