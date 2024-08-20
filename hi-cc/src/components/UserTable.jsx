import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const API_URL = import.meta.env.VITE_API_URL;

export function UserTable({data}) {
    const navigate = useNavigate();

    function handleDelete(uid) {
        fetchDeleteProfile(uid);
    }

    async function fetchDeleteProfile(uid) {
        fetch(`${API_URL}/profiles/${uid}`, {
            method: 'DELETE',
            credentials: 'include',
        }
        .then((response) => {
            if(!response.ok) {
                throw {status: response.status, message: response.statusText}
            } else {
                alert('정상적으로 삭제되었습니다.');
            }
        })
        .catch((error) => {
            if(error.status === 403) {
                alert('접근 권한이 없습니다.');
                navigate('/admin/login');
            } else if(error.status === 500 || error.status === 502) {
                navigate('/500');
            } else {
                console.error(error);
            }
        })
        )
    }

    return (
        <Result>
            <Td>{data.uid}</Td>
            <Td>{data.name}</Td>
            <Td>{data.phone}</Td>
            <Td>{data.instagram}</Td>
            <Td>{data.gender}</Td>
            <Td>
                <Button onClick={() => {}}>보기</Button>
            </Td>
            <Td>
                <Button onClick={() => handleDelete(data.uid)}>삭제</Button>
            </Td>
        </Result>
    );
}

const Result = styled.tr`
    box-sizing: border-box;
    font-family: sans-serif;
`

const Td = styled.td`
    text-align: center;

    color: #FFFFFF;
    font-family: sans-serif;
    font-size: 15px;

    max-width: 50px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`

const Button = styled.button`
    box-sizing: border-box;
    background-color: #161616;
    color: #FFFFFF;
    font-family: sans-serif;
    border: none;
    box-shadow: 0 0 1px #FFFFFF;
    
    cursor: pointer;
`