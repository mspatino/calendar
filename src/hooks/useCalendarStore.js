
import { useDispatch, useSelector } from 'react-redux'
import { calendarApi } from '../api';
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from '../store';

export const useCalendarStore = () => {

  const dispatch = useDispatch();

  const { events, activeEvent } = useSelector( state => state.calendar);

  const setActiverEvent = ( calendarEvent ) => {

    dispatch ( onSetActiveEvent( calendarEvent ) )

  }

  const startSavingEvent = async( calendarEvent ) => {
      //TODO: llegar al backend

      //Todo bien
      if (calendarEvent._id){
        //* Actualizando
        dispatch( onUpdateEvent( { ...calendarEvent} ) );
      }else{
        //* Creando
        const { response } = await calendarApi.post('/events',calendarEvent);
        console.log({response});
        dispatch (onAddNewEvent( {...calendarEvent,_id: new Date().getTime() } ));

      }

  }

  const startDeletingEvent = () =>{
    //TODO: llegar al backend

    dispatch( onDeleteEvent() );
  }


  
  return {
    //* Propiedades
    events,
    activeEvent,
    hasSelectedEvent: !!activeEvent,
    
    //* Metodos
    setActiverEvent,
    startSavingEvent,
    startDeletingEvent,
    
  }
}
