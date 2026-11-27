const sessions = new Map();

// Get an existing session or create a new one
export const getSession = (sessionId) => {
    if (!sessions.has(sessionId)) {
        sessions.set(sessionId, []);
    }

    return sessions.get(sessionId);
};

// Add a message to a session
export const addMessage = (sessionId, message) => {
    const history = getSession(sessionId);

    history.push(message);

    // Keep only the latest 10 messages
    if (history.length > 10) {
        history.splice(0, history.length - 10);
    }
};

// Get recent conversation history
export const getRecentHistory = (sessionId) => {
    const history = getSession(sessionId);

    return history.slice(-10);
};
