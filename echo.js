import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
const BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:8000/api/';

window.Pusher = Pusher;
window.Pusher.logToConsole = true;
const token = localStorage.getItem('token');

const echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    forceTLS: true,
    encrypted: true,
    // wsHost: window.location.hostname,
    // wsPort: 6001,     // for Laravel WebSockets
    disableStats: true,
    enabledTransports: ['ws', 'wss'],
    authEndpoint: BASE_URL + `/broadcasting/auth`,
    auth: {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Accept': 'application/json'
        }
    }
});


export default echo;
