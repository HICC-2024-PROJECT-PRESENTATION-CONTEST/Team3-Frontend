import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import styled from "styled-components";

export default function ProfileCard(props, {children}) {
    const CardRef = useRef(null);
    const [CardHeight, setCardHeight] = useState(0);

    const updateCardHeight = () => {
        if (CardRef.current) {
            setCardHeight(CardRef.current.clientHeight);
        }
    };

    useLayoutEffect(() => {
        updateCardHeight();
    }, []);

    useEffect(() => {
        window.addEventListener('load', updateCardHeight);
        window.addEventListener('resize', updateCardHeight);
        return () => {
          window.removeEventListener('load', updateCardHeight);
          window.removeEventListener('resize', updateCardHeight);
        };
      }, []);

    return(
        <ProfileCardWrapper onClick={props.onClick}>
            <Top $selected={props.$selected}/>
            <Icon1 />
            <Icon2 />
            <WriteHere ref={CardRef} $selected={props.$selected}>
                <Image src={props.src}></Image>
                <br/>
                이름: <br />
                학과: <br />
                나이: <br />
                키: <br />
                MBTI: <br />
                흡연여부: <br />
            </WriteHere>
            <Shadow style={{  height: `${CardHeight}px` }}/>
        </ProfileCardWrapper>
    ); 
}

const ProfileCardWrapper = styled.div`
    position: relative;
    width: calc(40vw + 10px);
    height: 80px;
    cursor: pointer;
`

const Top = styled.div`
    box-sizing: border-box;
    position: absolute;
    width: 40vw;
    height: 28px;

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
`

const Image = styled.img`
    width: 70px;
    height: 70px;
`

const Shadow = styled.div`
    box-sizing: border-box;
    position: absolute;
    width: 40vw;

    top: 10px;
    left: 10px;

    background: #000000;
    border: 3px solid #000000;
    border-radius: 20px;
    z-index: 0;
`

const Icon1 = styled.div`
    position: absolute;
    width: 13px;
    height: 13px;

    top: 5px;
    left: calc(40vw - 30px);
    
    border: 3px solid #000000;
    border-radius: 30px;
    background-color: #F94364;
    z-index: 160;
`

const Icon2 = styled.div`
    position: absolute;
    width: 13px;
    height: 13px;

    top: 5px;
    left: calc(40vw - 53px);
    
    border: 3px solid #000000;
    border-radius: 30px;
    background-color: #FFFFFF;
    z-index: 160;
`