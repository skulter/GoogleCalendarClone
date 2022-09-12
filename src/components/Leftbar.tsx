import tw, { styled } from 'twin.macro';
import { ClassNames, DateFormatter, DayPicker, ModifiersClassNames, SelectSingleEventHandler } from 'react-day-picker';
import ko from 'date-fns/locale/ko';
import 'react-day-picker/dist/style.css';
import styles from 'react-day-picker/dist/style.module.css';
import { format } from 'date-fns';
import { Dispatch, SetStateAction, useState } from 'react';
import AddScheduleButton from './AddScheduleButton';
import { useDispatch, useSelector } from 'react-redux';

import DatePicker from './DatePicker';

const LeftbarContainer = styled.div<{ isOpen: boolean }>`
      ${tw`flex flex-col ml-3`}
      ${tw`transition-all ease-linear duration-100`}
      ${props => props.isOpen ? tw`w-64` : tw`w-0`}
`;


interface LeftbarProps {
    isOpen: boolean,
    setIsOpenModal: Dispatch<SetStateAction<boolean>>
}

const Leftbar = ({ isOpen, setIsOpenModal }: LeftbarProps) => {
    return (
        <LeftbarContainer isOpen={isOpen}>
            <AddScheduleButton setIsOpenModal={setIsOpenModal} />
            <DatePicker isOpen={true} isModal={false} />
        </LeftbarContainer>
    );
};

export default Leftbar;