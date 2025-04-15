import { io } from 'socket.io-client'
import { useAuthContext } from '../context/AuthContext';

const useSocket = () => {
    const { backendBaseURL } = useAuthContext();


    // functions 
    // const initSocket = async () => {
    //     const option = {
    //         'force new connection': true,
    //         reconnectionAttempt: 'infinity',
    //         timout: 10000,
    //         transports: ['websocket']
    //     }
    //     return io(backendBaseURL, option);
    // }

    // return { initSocket };
}

export default useSocket;