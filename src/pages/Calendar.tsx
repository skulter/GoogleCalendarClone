import { useState } from 'react';
import AddScheduleModal from '../components/AddScheduleModal';
import Header from '../components/Header';
import Main from '../components/Main';

const Calendar = () => {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    return (
        <>
            <Header setIsOpen={setIsOpen} />
            <Main isOpen={isOpen} setIsOpenModal={setIsOpenModal} />
            <AddScheduleModal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
        </>
    )
};

export default Calendar;
