import { Dispatch, MouseEvent, SetStateAction } from 'react';
import tw, { styled } from 'twin.macro';
import { deleteModalInfoType } from '..';
import { useDispatch } from 'react-redux';
import { deleteSchedule } from '../store/modules/schedule'

const DeleteScheduleModalContainer = styled.div<{ isOpenModal: boolean, deleteModalInfo: deleteModalInfoType }>`
    ${tw`flex w-full h-full top-0 left-0 z-50 relative`}
    ${props => props.isOpenModal ? tw`fixed` : tw`invisible`}
    >div{
        ${tw`flex flex-col w-[200px] h-20 bg-white rounded-lg shadow-xl z-50 absolute`}
        top: ${props => props.deleteModalInfo.position.y}px;
        left: ${props => props.deleteModalInfo.position.x}px;
    }
`

const DeleteScheduleModalCloseWrapper = styled.div`
    ${tw`flex justify-end w-full bg-gray-100 text-2xl pr-3 pb-1 rounded-t-lg`}

    div{
        ${tw`cursor-pointer`}
}
`

const DeleteScheduleModalFormWrapper = styled.div`
    ${tw`flex flex-col w-full p-3 cursor-pointer rounded-b-lg hover:bg-gray-200`}
`

interface DeleteScheduleModalProps {
    isOpenModal: boolean
    setIsOpenModal: Dispatch<SetStateAction<boolean>>
    deleteModalInfo: deleteModalInfoType
}

const DeleteScheduleModal = ({ isOpenModal, setIsOpenModal, deleteModalInfo }: DeleteScheduleModalProps) => {
    const dispatch = useDispatch();
    return (
        <DeleteScheduleModalContainer className='deleteModal' isOpenModal={isOpenModal} deleteModalInfo={deleteModalInfo}
            onClick={(e: MouseEvent<HTMLDivElement>) => {
                (e.target as HTMLDivElement).classList.contains('deleteModal') && setIsOpenModal(false);
            }}>
            <div>
                <DeleteScheduleModalCloseWrapper>
                    <div onClick={() => { setIsOpenModal(false); }}> x </div>
                </DeleteScheduleModalCloseWrapper >
                <DeleteScheduleModalFormWrapper
                    onClick={() => {
                        dispatch(deleteSchedule(deleteModalInfo.id));
                        setIsOpenModal(false);
                    }}>
                    <div>삭제</div>
                </DeleteScheduleModalFormWrapper >
            </div>
        </DeleteScheduleModalContainer >
    );
};

export default DeleteScheduleModal;