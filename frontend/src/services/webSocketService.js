let socket;

export const connect = (token) => {
    socket = new WebSocket(`wss://chatapp-kryh.onrender.com/?token=${token}`);
    //console.log(socket);
    socket.onopen = () => {
        console.log('WebSocket connected');
    };

    socket.onclose = () => {
        console.log('WebSocket disconnected');
    };

    socket.onerror = (error) => {
        console.log('WebSocket error:', error);
    };
};

export const sendMessage = (message) => {
    if (socket) {
        socket.send(JSON.stringify(message));
    }
};

export const onMessage = (callback) => {
    if (socket) {
        socket.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                //console.log('Received message:', message);
                callback(message);
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        };
    }
};
