import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Button from "../../../components/MainButton";

const API_URL = import.meta.env.VITE_API_URL;

export default function EditProfile() {
    const navigate = useNavigate();

    const refs = { // focus & 유효성 체크를 위한 ref
        nameRef: useRef(null),
        phoneNumberFirstRef: useRef(null),
        phoneNumberSecondRef: useRef(null),
        instagramRef: useRef(null),
        passwordRef: useRef(null),
        confirmPasswordRef: useRef(null),
        genderRef: useRef(null),
        birthyearRef: useRef(null),
        heightRef: useRef(null),
        looklikeRef: useRef(null),
        smokingRef: useRef(null),
    }

    const [inputs, setInputs] = useState({
        name: "",
        instagram: "",
        major: "",
        height: "",
        MBTI: "",
        looklike: "",
        smoking: "",
    });

    useEffect(() => {
        fetchProfileData();
    }, []);

    async function fetchProfileData() {
        try {
            const response = await fetch(`${API_URL}/profiles`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if(!response.ok) {
                throw { status: response.status, message: response.statusText };
            } else {
                const data = await response.json();            
                setInputs({
                    name: data.name || "",
                    instagram: data.instagram || "",
                    major: data.major || "",
                    height: data.height || "",
                    MBTI: data.mbti || "",
                    looklike: data.looklike || "",
                    smoking: data.smoking || "",
                });
                navigate('/mypage');
            }
        } catch (error) {
            if (error.status === 403) {
                alert("접근 권한이 없습니다. 올바른 경로로 접속했는지 확인해주세요.");
            } else if (error.status === 404) {
                alert("프로필 정보를 확인할 수 없습니다.");
            } else if (error.status === 500 || error.status === 502) {
                navigate("/500");
            } else {
                alert('알 수 없는 오류가 발생했습니다.');
                console.error(error);
            }
        }
    }

    const [warnings, setWarnings] = useState({
        name: false,
        phoneNumberFirst: false,
        phoneNumberSecond: false,
        instagram: false,
        password: false,
        confirmPassword: false,
        gender: false,
        birthyear: false,
        height: false,
        looklike: false,
        smoking: false,
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs((prevInput) => {
            return {
                ...prevInput,
                [name]: value
            }
        });
    }

    function handleSelect(e) {
        // div 요소는 name, value 속성을 가지지 않으므로
        const name = e.target.getAttribute('name');
        const value = e.target.getAttribute('value');
        setInputs((prevInput) => {
            return {
                ...prevInput,
                [name]: value,
            }
        });
    }

    function handleBlur(e) {
        const { name, value } = e.target;
        let isValid = false;

        // 유효성 검사 로직
        switch (name) {
            case 'name':
                const regex = /^[\uAC00-\uD7A3\u3040-\u30FF\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF\u0020-\u007E]+$/;
                isValid = regex.test(value) && value.trim().length >= 2;
                break;
            case 'instagram':
                const instagramIdRegex = /^([a-z0-9._]{3,30})$/;
                isValid = (value === "" || instagramIdRegex.test(value));
                break;
            case 'height':
                isValid = (value === "" || (value >= 140 && value <= 220));
                break;
            default:
                break;
        }

        setWarnings((prevState) => ({
            ...prevState,
            [name]: !isValid
        }));
    }

    // 수정하기 버튼
    async function handleClick() {
        let tempWarnings = {};
        let firstInvalidRef = null;

        // 유효성 체크
        Object.keys(refs).forEach((key) => {
            if (refs[key].current) {
                let name = refs[key].current.name || refs[key].current.getAttribute("name");
                let value = refs[key].current.value || refs[key].current.getAttribute("value");
                
                let isValid = false;

                switch (name) {
                    case 'name':
                        const regex = /^[\uAC00-\uD7A3\u3040-\u30FF\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF\u0020-\u007E]+$/;
                        isValid = regex.test(value) && value.trim().length >= 2;
                        break;
                    case 'instagram':
                        const instagramIdRegex = /^([a-z0-9._]{3,30})$/;
                        isValid = (value === "" || instagramIdRegex.test(value));
                        break;
                    case 'birthyear':
                    case 'looklike':
                        isValid = (value !== "" && value !== 'default');
                        break;
                    case 'height':
                        isValid = (value === "" || (value >= 140 && value <= 220));
                        break;
                    case 'smoking':
                        isValid = value !== "";
                        break;
                    default:
                        break;
                }

                tempWarnings[name] = !isValid;

                if (!isValid && !firstInvalidRef) {
                    firstInvalidRef = refs[key];
                }
            }
        });

        setWarnings((prevState) => ({
            ...prevState,
            ...tempWarnings,
        }));

        if (firstInvalidRef) {
            return firstInvalidRef.current.focus();
        }

        const data = {
            name: inputs.name,
            instagram: inputs.instagram,
            height: (parseInt(inputs.height, 10) || null),
            major: inputs.major,
            mbti: inputs.MBTI,
            looklike: inputs.looklike,
            smoking: inputs.smoking === "true" ? true : false,
        };

        try {
            const response = await fetch(`${API_URL}/profiles`, {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if(!response.ok) {
                const error = new Error();
                error.status = response.status;
                throw error;
            }
            navigate('/mypage');
        } catch (error) {
            if (error.status === 403) {
                alert("접근 권한이 없습니다. 올바른 경로로 접속했는지 확인해주세요.");
            } else if (error.status === 409) {
                alert("이미 가입된 계정이 있습니다. 로그인 후 이용해주세요.");
            } else if (error.status === 400) {
                console.error("필수 필드 누락 혹은 잘못된 필드 형식입니다.");
            } else if (error.status === 500) {
                navigate("/500");
            } else {
                alert('알 수 없는 오류가 발생했습니다.');
            }
            console.error(error);
        }
    };


    return (
        <ProfileWrapper>
            {/* 프로필 등록 페이지 소개 */}
            <Title>
                <TitleText>
                    내 정보 등록
                </TitleText>
                <DescriptionText>
                    *이 표시된 칸은 필수 입력칸입니다.
                </DescriptionText>
            </Title>

            {/* 프로필 입력 칸 */}
            <InputWrapper>
                {/* 이름 입력 칸 */}
                <BasicWrapper>
                    <InputTitle>성명
                        <EssentialMark>*</EssentialMark></InputTitle>
                    <TextInput
                        type="text"
                        name="name"
                        placeholder="이름을 입력해주세요."
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={inputs.name}
                        ref={refs.nameRef}
                        $valid={!warnings.name}
                    />
                    {warnings.name && (
                        <WarningMessage>
                            *2글자 ~ 30글자의 한글/영어/중국어/일본어 이름만 등록 가능합니다.
                        </WarningMessage>
                    )}
                </BasicWrapper>

                {/* 인스타그램 입력 칸 */}
                <BasicWrapper>
                    <InputTitle>
                        인스타그램 아이디
                    </InputTitle>
                    <InstaInnerWrapper>
                    <InstaText>@</InstaText><TextInput
                        name="instagram"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={inputs.instagram}
                        placeholder="hongik"
                        ref={refs.instagramRef}
                        $valid={!warnings.instagram}
                    />
                    </InstaInnerWrapper>
                    {warnings.instagram && (
                        <WarningMessage>
                            *올바른 인스타그램 아이디를 입력해주세요.
                        </WarningMessage>
                    )}
                </BasicWrapper>

                {/* 학과 입력 칸 */}
                <BasicWrapper>
                    <InputTitle>학과</InputTitle>
                    <TextInput
                        name="major"
                        onChange={handleChange}
                        value={inputs.major}
                        placeholder="학과를 입력해주세요."
                        $valid="true"
                    />
                </BasicWrapper>

                {/* 키 입력 칸 */}
                <BasicWrapper>
                    <InputTitle>
                        키
                    </InputTitle>
                    <TextInput
                        type="number"
                        name="height"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        ref={refs.heightRef}
                        value={inputs.height}
                        placeholder="키를 입력해주세요."
                        $valid={!warnings.height}
                        min="140"
                        max="220"
                        onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()} // e, E, +, - 입력 막기
                    />
                    {warnings.height &&
                        <WarningMessage>
                            *올바른 키를 입력해주세요.
                        </WarningMessage>}
                </BasicWrapper>

                {/* MBTI 입력 칸 */}
                <BasicWrapper>
                    <InputTitle>
                        MBTI
                    </InputTitle>
                    <SelectInput
                        name="MBTI"
                        onChange={handleChange}
                        value={inputs.MBTI || "default"}
                        $valid={true}
                    >
                        <option value="default" hidden>MBTI를 선택해주세요.</option>
                        {['ISTJ', 'ISFJ', 'INFJ', 'INTJ', 'ISTP', 'ISFP', 'INFP', 'INTP', 'ESTP', 'ESFP', 'ENFP', 'ENTP', 'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'].map(type => (
                            <Option key={type} value={type}>{type}</Option>
                        ))}
                    </SelectInput>
                </BasicWrapper>

                {/* 닮은꼴 입력 칸 */}
                <BasicWrapper>
                    <InputTitle>
                        닮은꼴
                        <EssentialMark>*</EssentialMark>
                    </InputTitle>
                    <SelectInput
                        name="looklike"
                        onChange={handleChange}
                        value={inputs.looklike || "default"}
                        ref={refs.looklikeRef}
                        $valid={!warnings.looklike}
                    >
                        <option value="default" hidden>본인의 닮은꼴을 선택해주세요.</option>
                        {['강아지상', '개구리상', '거북이상', '곰상', '공룡상', '고양이상', '너구리상', '늑대상', '다람쥐상', '돼지상', '말상', '물고기상', '뱀상', '사슴상', '양상', '여우상', '오리상', '원숭이상', '토끼상', '펭귄상', '호랑이상'].map(person => (
                            <Option key={person} value={person}>{person}</Option>
                        ))}
                    </SelectInput>
                    {warnings.looklike &&
                        <WarningMessage>
                            *본인의 닮은꼴을 선택해주세요.
                        </WarningMessage>}
                </BasicWrapper>

                {/* 흡연여부 입력 칸 */}
                <BasicWrapper>
                    <InputTitle>
                        흡연여부
                        <EssentialMark>*</EssentialMark>
                    </InputTitle>
                    <CheckboxWrapper
                        name="smoking"
                        value={inputs.smoking}
                        ref={refs.smokingRef}
                        tabIndex={0}
                    >
                        <Checkbox
                            name="smoking"
                            onClick={handleSelect}
                            value="true"
                            $selected={inputs.smoking === "true"}
                        >
                            예
                        </Checkbox>
                        <Checkbox
                            name="smoking"
                            onClick={handleSelect}
                            value="false"
                            $selected={inputs.smoking === "false"}
                        >
                            아니오
                        </Checkbox>
                    </CheckboxWrapper>
                    {warnings.smoking &&
                        <WarningMessage>
                            *흡연 여부를 선택해주세요.
                        </WarningMessage>}
                </BasicWrapper>
            </InputWrapper>

            {/* 등록하기 버튼 */}
            <Button onClick={handleClick} $valid={true} $position="relative">수정하기</Button>
        </ProfileWrapper>
    )
};

const ProfileWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: auto;
    align-items: center;
    background: #F9DBDD;
`

const Title = styled.span`
    width: 75vw;
    min-width: calc(230px - 5vw);
    max-width: calc(480px - 5vw);
    margin: 11vh 0 3vh 0;
    top: 100px;
`

const TitleText = styled.div`
    margin: 1px 0;
    font-size: 25px;
`

const DescriptionText = styled.pre`
    font-size: 13px;
    color: #464646;
`

const InputWrapper = styled.form`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 75vw;
    height: auto;
    min-height: 83vh;
    padding: 10px;
    min-width: calc(230px - 5vw);
    max-width: calc(480px - 5vw);
    
    color: #000000;
`

const PhoneNumberWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: center;
    width: 100%;
`

const PhoneNumberInnerWrapper = styled.div`
    display: flex;
    align-items: center;
    text-align: center;
    width: 100%;
`

const PhoneNumberInput = styled.div`
    width: 30%;
    padding: 0 5px;
    margin: 0 4%;
`

const InstaInnerWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    
    align-items: center;
`
const InstaText = styled.div`
    margin-right: 5px;
    font-size: 15px;
`

const PasswordWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
`

const BirthyearWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
`
const AgeDifferenceWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    @media screen and (max-width: 360px) {
        font-size: 13px;
    }
`

const AgeDifferenceInnerWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: row;
    width: 100%;
`

const AgeDifferenceInputWrapper = styled.div`
    display: flex;
    position: relative;
    flex-direction: row;
    display: flex;
    align-items: center;
    margin: 0 10px;
    width: 110px;

    @media screen and (max-width: 360px) {
        margin: 0;
        width: 80px;
        font-size: 13px;
    }
`

const BasicWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
`

const InputTitle = styled.div`
    font-size: 15px;
    padding: 25px 0 10px 0;

    @media screen and (max-width: 360px) {
        font-size: 13px;
    }
`

const EssentialMark = styled.span`
    font-size: 15px;
    color: #F94364;
`

const TextInput = styled.input`
    width: calc(100% - 10px);
    height: 18px;
    padding: 5px;
    font-size: 13px;
    
    border-color: ${(props) => props.$valid ? "#000000" : "#F94364"};
    border-width: 2px;
    border-radius: 5px;
    
    &::placeholder {
        color: #979797;
        font-size: 13px;
    }

    // type이 number일 경우 화살표 제거
    &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    &::-webkit-autofill {
        -webkit-box-shadow: 0 0 0 30px #fff inset; -webkit-text-fill-color: #000;
        transition: background-color 5000s ease-in-out 0s;
        /* &:hover {
            transition: background-color 5000s ease-in-out 0s;
        }
        &:focus {
            transition: background-color 5000s ease-in-out 0s;
        }
        &:active {
            transition: background-color 5000s ease-in-out 0s;
        } */
    }
`

const SelectInput = styled.select`
    width: 100%;
    height: 31px;
    padding: 5px;

    background-color: #FFFFFF;
    border-color: ${(props) => props.$valid ? "#000000" : "#F94364"};
    border-width: 2px;
    border-radius: 5px;
    margin-top: 5px;

    color: ${(props) => props.value === "default" ? "#979797" : "#000000"};
    font-size: 13px;
`

const Option = styled.option`
    color: #000000;
    font-size: 13px;
`

const WarningMessage = styled.div`
    font-size: 11px;
    color: #F94364;
    padding-top: 5px;
`
const CheckboxWrapper = styled.div`
    display: flex;
    align-items: flex-start;
`

const Checkbox = styled.div`
    border: solid 2px;
    border-radius: 5px;
    margin-right: 10px;
    padding: 3px 15px;
    color: #000000;

    background-color: ${(props) => props.$selected ? "#FAA8B1" : "#FFFFFF"};
    @media screen and (max-width: 360px) {
        margin-right: 10px;
        padding: 1.5px 10px;
        font-size: 13px;
    }
`

const CountButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 27px;
    height: 27px;
    border: solid 2px;
    border-radius: 5px;
    margin: 0 10px;
    color: #000000;
    border-color: #000000;

    background-color: ${(props) => props.$valid ? "#FAA8B1" : "#D9D9D9"};

    @media screen and (max-width: 360px) {
        width: 20px;
        height: 20px;
        margin: 0 5px;
        font-size: 11px;
    }
`