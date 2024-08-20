import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const API_URL = import.meta.env.VITE_API_URL;

export default function Users() {
    const navigate = useNavigate();
    const [countUsers, setCountUsers] = useState(0);
    useEffect(() => {
        fetchUserCount();
    }, []);

    async function fetchUserCount() {
        await fetch(`${API_URL}/profiles?count`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((response) => {
            if(!response.ok) {
                throw {status: response.status, message: response.statusText}
            }
            else
                return response.json();
        })
        .then((result) => {
            setCountUsers(result.data);
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
    }

    return(
        <AdminUserWrapper>
            <UserCountWrapper>이용자 수: {countUsers}명</UserCountWrapper>
        </AdminUserWrapper>
    )
};

const AdminUserWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background: #2d2b39;
    overflow: auto;
`

const UserCountWrapper = styled.div`
    box-sizing: border-box;
    width: 100%;
    text-align: end;
    padding: 20px;
    color: #FFFFFF;
`