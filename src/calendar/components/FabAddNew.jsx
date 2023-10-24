import { addHours } from 'date-fns';
import React from 'react'
import { useCalendarStore, useUiStore } from '../../hooks'

export const FabAddNew = () => {

const { openDateModal } = useUiStore();
const { setActiverEvent } = useCalendarStore();

const handleClickNew = () => {
    setActiverEvent({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours( new Date(), 2),
        bgColor: '#fafafa',
        user:{
            _id: 123,
            name: 'Jesica'
        }
    });
    openDateModal();
}

  return (
    <button className="btn btn-primary fab"
    onClick={ handleClickNew }>
        <i className="fas fa-plus"></i>
    </button>
  )
}
