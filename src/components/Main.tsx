import { Dispatch, SetStateAction, useState } from 'react';
import MainCalendar from "./MainCalendar";
import tw, { styled } from 'twin.macro';
import Leftbar from '../components/Leftbar';

const MainContainer = styled.main`
    ${tw`flex mt-4`}
`
const MainWrapper = styled.div`
    ${tw`flex flex-1 max-h-[calc(100vh - 5rem)] overflow-scroll`}
`

interface MainProps {
    isOpen: boolean
    setIsOpenModal: Dispatch<SetStateAction<boolean>>
}
const Main = ({ isOpen, setIsOpenModal }: MainProps) => {
    return (
        <MainContainer>
            <Leftbar isOpen={isOpen} setIsOpenModal={setIsOpenModal} />
            <MainWrapper>
                <MainCalendar />
            </MainWrapper>
        </MainContainer>
    );
};

export default Main;