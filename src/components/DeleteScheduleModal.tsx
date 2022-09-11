import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';
import tw, { styled } from 'twin.macro';
import { format } from "date-fns";
import { createSelectTime } from '../util/selectTime'
import { deleteModalInfoType, scheduleType, selectTimeType } from '..';
import { useDispatch } from 'react-redux';
import { addSchedule, deleteSchedule } from '../store/modules/schedule'

const DeleteScheduleModalContainer = styled.div<{ isOpenModal: boolean, deleteModalInfo: deleteModalInfoType }>`
    ${tw`flex flex-col w-[200px] bg-white rounded-lg shadow-xl z-50`}
    ${props => props.isOpenModal ? tw`fixed` : tw`invisible`}
    top: ${props => props.deleteModalInfo.position.y}px;
    left: ${props => props.deleteModalInfo.position.x}px;
`;

const DeleteScheduleModalCloseWrapper = styled.div`
    ${tw`flex justify-end w-full bg-gray-100 text-2xl pr-3 pb-1 rounded-t-lg`}

    div{
        ${tw`cursor-pointer`}
}
`;

const DeleteScheduleModalFormWrapper = styled.div`
    ${tw`flex flex-col w-full p-3 cursor-pointer hover:bg-gray-200`}
`;


interface DeleteScheduleModalProps {
    isOpenModal: boolean
    setIsOpenModal: Dispatch<SetStateAction<boolean>>
    deleteModalInfo: deleteModalInfoType
}

const DeleteScheduleModal = ({ isOpenModal, setIsOpenModal, deleteModalInfo }: DeleteScheduleModalProps) => {
    const dispatch = useDispatch();

    return (
        <DeleteScheduleModalContainer isOpenModal={isOpenModal} deleteModalInfo={deleteModalInfo}>
            <DeleteScheduleModalCloseWrapper className='flex justify-end itmes-center w-full bg-gray-100 text-2xl pr-3 pb-1 rounded-t-lg' >
                <div onClick={() => {
                    setIsOpenModal(false);
                }}>
                    x
                </div>
            </DeleteScheduleModalCloseWrapper >
            <DeleteScheduleModalFormWrapper onClick={() => {
                dispatch(deleteSchedule(deleteModalInfo.id));
                setIsOpenModal(false);
            }}>
                <div>삭제</div>
            </DeleteScheduleModalFormWrapper >
        </DeleteScheduleModalContainer >
    );
};

export default DeleteScheduleModal;