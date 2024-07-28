import { useNavigate } from "react-router-dom";

export default function Start() {
    const navigate = useNavigate();
    function handleClick() {
        navigate('/agreement');
    }

    return(
        <>
            <button onClick={handleClick}>시작하기</button>
            <button>로그인하기</button>
        </>
    )
};