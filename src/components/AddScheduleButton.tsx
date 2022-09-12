import { Dispatch, SetStateAction } from 'react';
import tw, { styled } from 'twin.macro';
import Plus from '/plus.svg';

const AddSchedule = styled.div`
     ${tw`flex items-center transition ease-in-out delay-150 w-36 h-12 shadow-md rounded-full p-3 border cursor-pointer hover:bg-blue-100/25 hover:shadow-lg`}
     span{
        ${tw`ml-2 text-sm text-gray-700`}
     }
`

interface AddScheduleButtonProps {
    setIsOpenModal: Dispatch<SetStateAction<boolean>>
}
const AddScheduleButton = ({ setIsOpenModal }: AddScheduleButtonProps) => {
    return (
        <>
            <AddSchedule onClick={() => { setIsOpenModal(prev => !prev) }}>
                <img src={Plus} />
                <span>만들기</span>
            </AddSchedule>
        </>
    );
};

export default AddScheduleButton;