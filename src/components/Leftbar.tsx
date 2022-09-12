import tw, { styled } from 'twin.macro';
import { ClassNames, DateFormatter, DayPicker, ModifiersClassNames, SelectSingleEventHandler } from 'react-day-picker';
import ko from 'date-fns/locale/ko';
import 'react-day-picker/dist/style.css';
import styles from 'react-day-picker/dist/style.module.css';
import { format } from 'date-fns';
import { Dispatch, SetStateAction, useState } from 'react';
import AddScheduleButton from './AddScheduleButton';
import { useDispatch, useSelector } from 'react-redux';
import { currentCalendar, setDay, setMonth } from '../store/modules/calendar';

const LeftbarContainer = styled.div<{ isOpen: boolean }>`
      ${tw`flex flex-col ml-3`}
      ${tw`transition-all ease-linear duration-100`}
      ${props => props.isOpen ? tw`w-64` : tw`w-0`}
`;

const LeftbarDatePickerWrapper = styled.div<{ isOpen: boolean }>`
    ${props => props.isOpen ? '' : tw`hidden`}
    .head{
        ${tw`text-[14px] text-gray-600 mt-3`}
    }
    .table{
        ${tw`w-[216px]`}
    }
    .row{
        ${tw`h-8 text-[12px] font-semibold`}
        .cell{
            button{
                ${tw`my-0 mx-auto w-5 h-5 mt-[1px]`}
            }
        }
    }
    .caption{
        ${tw`flex justify-between text-[10px] text-gray-600 ml-1`}
    }
    .nav{
        ${tw`flex justify-center items-center`}
        button{
            ${tw`w-5 h-5 rounded-full hover:bg-gray-100`}
            svg{
                ${tw`w-3`}
            }
        }
    }

    .today{
        ${tw`text-white bg-blue-500 hover:bg-blue-600`}
    }
    .selected{
        ${tw`text-blue-800 bg-blue-300`}
    }
    .outside{
        ${tw`text-gray-500 font-normal`}
    }
`;

const formatCaption: DateFormatter = (month, options) => (format(month, 'yyyy년 M월', { locale: options?.locale }));

const classNames: ClassNames = {
    ...styles,
    caption: 'caption',
    nav: 'nav',
    head: 'head',
    table: 'table',
    row: 'row',
    cell: 'cell',

};

const modifiersClassNames: ModifiersClassNames = {
    today: 'today',
    selected: 'selected',
    outside: 'outside'
};

interface LeftbarProps {
    isOpen: boolean,
    setIsOpenModal: Dispatch<SetStateAction<boolean>>
}

const Leftbar = ({ isOpen, setIsOpenModal }: LeftbarProps) => {
    const { selectDay, current } = useSelector(currentCalendar);
    const dispatch = useDispatch();
    return (
        <LeftbarContainer isOpen={isOpen}>
            <AddScheduleButton setIsOpenModal={setIsOpenModal} />
            <LeftbarDatePickerWrapper isOpen={isOpen}>
                <DayPicker
                    showOutsideDays
                    fixedWeeks
                    locale={ko}
                    classNames={classNames}
                    modifiersClassNames={modifiersClassNames}
                    mode="single"
                    formatters={{ formatCaption }}
                    month={new Date(`${current.year}-${current.month}`)}
                    onMonthChange={(e: unknown) => dispatch(setMonth((e as Date).toString()))}
                    onSelect={(e: unknown) => dispatch(setDay((e as Date).toString()))}
                    selected={selectDay}
                />
            </LeftbarDatePickerWrapper>
        </LeftbarContainer>
    );
};

export default Leftbar;