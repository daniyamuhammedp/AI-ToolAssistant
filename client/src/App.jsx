
import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! Ask me anything — I can calculate, check weather, search the web, query the database, or search your notes."
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Store the session ID for this conversation
  const sessionId = useRef(crypto.randomUUID());

  // Reference to the bottom of the chat
  const bottomRef = useRef(null);

  // Automatically scroll to the latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages, loading]);

  // Send a message to the backend
  const sendMessage = async () => {
    const text = input.trim();

    if (!text || loading) return;

    const userMessage = {
      role: "user",
      text
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        // Send both message and session ID
        body: JSON.stringify({
          message: text,
          sessionId: sessionId.current
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Request failed");
      }

      // Display the assistant response
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data.answer || "No response."
        },
      ]);

    } catch (err) {
      // Display errors
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text:
            err instanceof Error
              ? err.message
              : "Something went wrong. Please try again.",
          error: true,
        },
      ]);

    } finally {
      setLoading(false);
    }
  };

  // Send message when Enter is pressed
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Start a new conversation
  const startNewChat = () => {
    if (loading) return;

    sessionId.current = crypto.randomUUID();

    setMessages([
      {
        role: "assistant",
        text: "New conversation started! How can I help you?"
      }
    ]);

    setInput("");
  };

  return (
    <div className="app">

      {/* Header */}
      <header className="app-header">
        <div>
          <h1>AI Tool Assistant</h1>
          <p>
            Calculator · Weather · Search · Database · Notes
          </p>
        </div>

        <button
          className="new-chat-button"
          onClick={startNewChat}
          disabled={loading}
        >
          + New Chat
        </button>
      </header>

      {/* Chat messages */}
      <main className="chat-window">

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`message ${msg.role} ${
              msg.error ? "error" : ""
            }`}
          >
            <div className="bubble">
              {msg.text}
            </div>
          </div>
        ))}

        {/* Loading animation */}
        {loading && (
          <div className="message assistant">
            <div className="bubble typing">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />

      </main>

      {/* Message input */}
      <footer className="chat-input">

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask something..."
          rows={1}
          disabled={loading}
        />

        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
        >
          {loading ? "Sending..." : "Send"}
        </button>

      </footer>

    </div>
  );
}

export default App;
