import { useEffect } from "react";
import styled from "styled-components";

const API_URL = import.meta.env.VITE_API_URL;

export default function OthersChoice() {
    return(
        <OthersChoiceWrapper>
            <ProfileCard>나를 선택한 상대방</ProfileCard>
        </OthersChoiceWrapper>
    )
};

const OthersChoiceWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: auto;
`

const ProfileCard = styled.div`
    width: calc(100% - 30px);
    height: auto;
    margin: 20px 0px;

    background-color: #FFDEE2;

    border: solid 3px #000000;
    border-radius: 10px;
`