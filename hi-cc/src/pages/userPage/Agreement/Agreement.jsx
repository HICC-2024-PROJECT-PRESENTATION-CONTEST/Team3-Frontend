import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Button from "../../../components/MainButton";

export default function Agreement() {
    const navigate = useNavigate();
    const [isValid, setIsValid] = useState(false);

    function handleClick() {
        navigate('/profile');
    }
    
    return(
        <AgreementWrapper>
            <Button onClick={handleClick} $valid={isValid}>동의합니다.</Button>
        </AgreementWrapper>
    )
};

const AgreementWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    align-items: center;
    background: #F9DBDD;
    overflow: hidden;
`