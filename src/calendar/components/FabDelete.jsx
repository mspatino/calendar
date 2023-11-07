import React from 'react'
import { useCalendarStore, useUiStore } from '../../hooks'

export const FabDelete = () => {


const { startDeletingEvent, hasSelectedEvent } = useCalendarStore();

const handleDelete = () => {
  startDeletingEvent();     
}

  return (
    <button className="btn btn-danger fab-danger"
    onClick={ handleDelete }
    style={{
      display: hasSelectedEvent ? '' : 'none'
    }}>
        <i className="fas fa-trash-alt"></i>
    </button>
  )
}
