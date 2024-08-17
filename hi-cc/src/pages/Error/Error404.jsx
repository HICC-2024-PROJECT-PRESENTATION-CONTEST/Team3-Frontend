import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import ErrorModal from "../../components/ErrorModal";
import Button from "../../components/MainButton";

export default function Error404() {
    const navigate = useNavigate();
    function handleClick() {
        navigate(-1);
    }

    return (
        <NotFoundWrapper>
            <ErrorModal title="404" subtitle="Not Found">
                페이지를 찾을 수 없습니다.<br />
                입력하신 주소가 정확한지 다시 한 번 확인해주세요.
            </ErrorModal>
            <Button onClick={handleClick} $valid={true}>이전 페이지로</Button>
        </NotFoundWrapper>
    )
};

const NotFoundWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    min-width: 100vw;
    width: auto;
    min-height: 100vh;
    height: auto;
    justify-content: center;
    align-items: center;
    background: url('/src/assets/ErrorBackground.png') center;
`