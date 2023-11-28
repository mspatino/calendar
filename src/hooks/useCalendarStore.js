
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2';
import { calendarApi } from '../api';
import { convertEventsToDateEvents } from '../helpers';
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store';

export const useCalendarStore = () => {

  const dispatch = useDispatch();

  const { events, activeEvent } = useSelector( state => state.calendar);

  const user = useSelector( state => state.auth);

  const setActiverEvent = ( calendarEvent ) => {

    dispatch ( onSetActiveEvent( calendarEvent ) )

  }

  const startSavingEvent = async ( calendarEvent ) => {
    try {
      
      if (calendarEvent.id){
        //* Actualizando
        await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent);
        dispatch( onUpdateEvent( { ...calendarEvent},user ) );

        return;
      }
        //* Creando
         const { data }   = await calendarApi.post('/events',calendarEvent);
        dispatch (onAddNewEvent( {...calendarEvent,id: data.evento.id , user} ));
    
      } catch (error) {
      console.log(error);
      Swal.fire('Error al guardar',error.response.data.msg, 'error');
    }
      

      

  }

  const startDeletingEvent = async() =>{
    //TODO: llegar al backend
    try {
      await calendarApi.delete(`/events/${ activeEvent.id }`);
      
      dispatch( onDeleteEvent() );
    } catch (error) {
      console.log(error);
      Swal.fire('Error al eliminar',error.response.data.msg, 'error');
    }
  }
//* carga de los eventos de nuestro backend
  const startLoadingEvents = async () => {
    try {
      console.log('entro a startLoadingEvents');
      const { data } = await calendarApi.get('/events');

       console.log('data startLoading event',data.eventos);
      const events = convertEventsToDateEvents( data.eventos );
      dispatch( onLoadEvents(data.eventos) );
    } catch (error) {
      console.log('Error cargando eventos');
      console.log(error);
    }
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
    startLoadingEvents
    
  }
}
