import { useDispatch , useSelector } from 'react-redux';
import { calendarApi } from '../api';
import { clearErrorMessage, onChecking, onLogin, onLogout } from '../store';

export const useAuthStore = () => {

    const { status , user , errorMessage  } = useSelector( state => state.auth);

    const dispatch = useDispatch();

    //asincrona x que va a llegar al back-end
    const startLogin = async ({ email , password }) => {
        console.log({email,password});
        dispatch( onChecking() ); 
        try {
           
        const {data} = await calendarApi.post('/auth',{email,password});
        //console.log({resp});   
        localStorage.setItem('token',data.token);
        localStorage.setItem('token-init-date',new Date().getTime());

        dispatch( onLogin({name: data.name, uid: data.uid}));

        } catch (error) {
            //console.log({error});
            dispatch( onLogout('Credenciales Incorrectas'));
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);
            
        }
    }

    const startRegister = async ({ name , email , password }) => {
        console.log({email,password});
        dispatch( onChecking() );  
        try {
          
        const {data} = await calendarApi.post('/auth/new',{name,email,password});
        //console.log({resp});   
        localStorage.setItem('token',data.token);
        localStorage.setItem('token-init-date',new Date().getTime());

        dispatch( onLogin({name: data.name, uid: data.uid}));

        } catch (error) {
            //console.log({error});
            dispatch( onLogout(error.response.data?.msg || ''));
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);
            
        }
    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        if (!token) return dispatch( onLogout() );
        try {
            const { data } = await calendarApi.get('/auth/renew');
            localStorage.setItem('token',data.token);
            localStorage.setItem('token-init-date',new Date().getTime());

            dispatch( onLogin({name: data.name, uid: data.uid}));
        } catch (error) {
            localStorage.clear();
            dispatch( onLogout() );
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch( onLogout() );
    }


    return {
        //* Propiedades
        status, 
        user, 
        errorMessage,

        //* Métodos
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout,
    }


}