import { ChangeEvent, Dispatch, FormEvent, MouseEvent, SetStateAction, useState } from 'react';
import tw, { styled } from 'twin.macro';
import { format } from "date-fns";
import { createSelectTime } from '../util/selectTime'
import { scheduleType, selectTimeType } from '..';
import { useDispatch, useSelector } from 'react-redux';
import schedule, { addSchedule, initialSchdulesState, schedules, setCurrentSchedule } from '../store/modules/schedule'
import DatePicker from './DatePicker';
import { currentCalendar } from '../store/modules/calendar';

const AddScheduleModalContainer = styled.div<{ isOpenModal: boolean }>`
    ${tw`flex justify-center items-center w-full h-full top-0 left-0 `}
    ${props => props.isOpenModal ? tw`fixed` : tw`hidden`}
    >div{
        ${tw`top-32 left-5 -flex flex-col w-[360px] bg-white rounded-lg shadow-[ 0px 0px 50px -5px rgba(0,0,0,0.50)]`}
    }
`

const AddScheduleModalCloseWrapper = styled.div`
    ${tw`flex justify-end w-full bg-gray-100 text-2xl pr-3 pb-1 rounded-t-lg`}

    div{
        ${tw`cursor-pointer`}
    }
`

const AddScheduleModalFormWrapper = styled.div`
    ${tw`flex flex-col w-full p-4`}
`

const AddScheduleModalFormDataContainer = styled.div`
    ${tw`flex mt-3`}
`

const SelectBox = styled.select`
    ${tw`outline-none border-transparent border-2 border-solid focus:border-b-blue-500 focus:bg-gray-100 hover:bg-gray-100 mx-1 px-1`}
    appearance:none;
`

interface AddScheduleModalProps {
    isOpenModal: boolean
    setIsOpenModal: Dispatch<SetStateAction<boolean>>
}

const AddScheduleModal = ({ isOpenModal, setIsOpenModal }: AddScheduleModalProps) => {
    const dispatch = useDispatch();
    const { selectDay } = useSelector(currentCalendar);
    const { currentSchedule } = useSelector(schedules);
    const [datePickerModalIsOpen, setDatePickerModalIsOpen] = useState<boolean>(false);
    const [endSeleteTime, setEndSelectTime] = useState(createSelectTime());
    const startSeleteTime = createSelectTime();
    const displaySelectDay = format(selectDay, 'yyyy-MM-dd');
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(addSchedule(currentSchedule));
        dispatch(setCurrentSchedule(initialSchdulesState.currentSchedule));
        setIsOpenModal(false);
    };

    const handleStartDateChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const [hour, min] = e.target.value.split(":");
        const startIndex = (e.target as HTMLSelectElement).selectedIndex; // 선택된 option index
        setEndSelectTime(createSelectTime(startIndex))
        dispatch(setCurrentSchedule({
            ...currentSchedule,
            startDate: {
                hour: parseInt(hour),
                min: parseInt(min)
            },
            endDate: {
                hour: parseInt(hour),
                min: parseInt(min)
            }
        }))
    };

    const handleEndDateChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const [hour, min] = e.target.value.split(":");
        dispatch(setCurrentSchedule({
            ...currentSchedule, endDate: {
                hour: parseInt(hour),
                min: parseInt(min)
            }
        }));
    };

    const modalClose = () => {
        dispatch(setCurrentSchedule(initialSchdulesState.currentSchedule));
        setDatePickerModalIsOpen(false);
        setIsOpenModal(false);
    }
    return (
        <AddScheduleModalContainer className="addModal" isOpenModal={isOpenModal}
            onClick={(e: MouseEvent<HTMLDivElement>) => {
                (e.target as HTMLDivElement).classList.contains('addModal') && modalClose();
            }}>
            <div>
                <AddScheduleModalCloseWrapper >
                    <div onClick={modalClose}>
                        x
                    </div>
                </AddScheduleModalCloseWrapper >
                <AddScheduleModalFormWrapper>
                    <form onSubmit={handleSubmit}>
                        <input type='text'
                            className='w-full outline-none border-transparent border-2 border-solid border-b-zinc-100 focus:border-b-blue-500 '
                            placeholder="제목 추가"
                            required
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                dispatch(setCurrentSchedule({ ...currentSchedule, title: e.target.value }));
                            }}
                            value={currentSchedule.title}
                        />
                        <AddScheduleModalFormDataContainer>
                            <SelectBox as="div" className='datePicketModal relative' onClick={(e: MouseEvent<HTMLDivElement>) => {
                                setDatePickerModalIsOpen(prev => !prev);
                            }}>
                                {displaySelectDay}
                                {datePickerModalIsOpen &&
                                    <DatePicker isOpen={datePickerModalIsOpen} isModal />
                                }
                            </SelectBox>
                            <SelectBox onChange={handleStartDateChange} value={`${currentSchedule.startDate.hour}:${currentSchedule.startDate.min}`}>
                                {startSeleteTime.map((time, index) => (
                                    <option
                                        key={time.showText + index}
                                        value={`${time.hour}:${time.min}`}
                                    >
                                        {time.showText}
                                    </option>
                                ))}
                            </SelectBox>
                            -
                            <SelectBox
                                onChange={handleEndDateChange} value={`${currentSchedule.endDate.hour}:${currentSchedule.endDate.min}`}>
                                {endSeleteTime.map((time, index) => (
                                    <option
                                        key={time.showText + index}
                                        value={`${time.hour}:${time.min}`}
                                    >
                                        {time.showText}
                                    </option>
                                ))}
                            </SelectBox>
                        </AddScheduleModalFormDataContainer>
                        <div className="flex justify-end w-full mb-3 mt-8 ">
                            <button className="bg-blue-500 text-white px-4 py-2 text-sm rounded hover:bg-blue-600" type="submit">
                                저장
                            </button>
                        </div>
                    </form>
                </AddScheduleModalFormWrapper >
            </div>
        </AddScheduleModalContainer >
    );
};

export default AddScheduleModal;