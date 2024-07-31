import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import ErrorModal from "../../components/ErrorModal";
import Button from "../../components/MainButton";

export default function Error500() {
    const navigate = useNavigate();
    function handleClick() {
        navigate(-1);
    }

    return (
        <ServerErrorWrapper>
            <ErrorModal title="500" subtitle="Internal Server Error">
                서비스 이용에 불편을 드려 죄송합니다.<br />
                관리자에게 문의하시거나 잠시 후 다시 시도하세요.
            </ErrorModal>
            <Button onClick={handleClick} $valid={true}>이전 페이지로</Button>
        </ServerErrorWrapper>
    )
};

const ServerErrorWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
    background: url('/src/assets/ErrorBackground.png') center;
`