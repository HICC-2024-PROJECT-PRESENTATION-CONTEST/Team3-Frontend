import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Manager() {
    const navigate = useNavigate();

    function handleClick(nextPage) {
        navigate(nextPage);
    }

    return(
        <ManagerWrapper>
            <Button onClick={() => handleClick('/admin/users')}>사용자 관리</Button>
            <Button onClick={() => handleClick('/admin/qr')}>QR 코드</Button>
        </ManagerWrapper>
    )
};

const ManagerWrapper = styled.div`
    display: flex;
    flex-direction: column;

    width: 100vw;
    height: 100vh;

    justify-content: center;
    align-items: center;

    background-color: #2d2b39;
`

const Button = styled.button`
    width: 200px;
    height: 50px;
    
    border: 0px;
    border-radius: 10px;
    margin: 10px 0;
    
    font-size: 20px;
    color: #FFFFFF;

    background-color: #161616;

    cursor: pointer;

    &:hover {
        background-color: #000000;
    }
`