import { useNavigate } from "react-router-dom";


export default function Agreement() {
    const navigate = useNavigate();
    function handleClick() {
        navigate('/profile');
    }
    
    return(
        <>
            <button onClick={handleClick}>동의합니다.</button>
        </>
    )
};