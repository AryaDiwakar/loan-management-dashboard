import { useState } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { chatbotResponses, quickActions } from '../../data/mockData';
import './Chatbot.css';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', content: chatbotResponses.greeting }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleQuickAction = (action) => {
    const userMessage = { id: Date.now(), type: 'user', content: action.label };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let response;
      switch (action.id) {
        case 'emi':
          response = chatbotResponses.EMI_DUE;
          break;
        case 'payment':
          response = chatbotResponses.PAYMENT;
          break;
        case 'rates':
          response = chatbotResponses.INTEREST;
          break;
        default:
          response = chatbotResponses.DEFAULT;
      }
      const botMessage = { id: Date.now() + 1, type: 'bot', content: response };
      setMessages(prev => [...prev, botMessage]);
    }, 1200);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = { id: Date.now(), type: 'user', content: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const botMessage = { 
        id: Date.now() + 1, 
        type: 'bot', 
        content: "I understand you're asking about: " + inputValue + ". " + chatbotResponses.DEFAULT 
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <>
      <button 
        className={`chatbot-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        <span className="chatbot-pulse" />
      </button>

      <div className={`chatbot-panel ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header">
          <div className="chatbot-avatar">
            <Bot size={20} />
          </div>
          <div className="chatbot-info">
            <h3>Loan Assistant</h3>
            <span className="chatbot-status">
              <span className="status-dot" />
              Online
            </span>
          </div>
          <button className="chatbot-close" onClick={() => setIsOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <div className="chatbot-messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.type}`}>
              {message.type === 'bot' && (
                <div className="message-avatar">
                  <Bot size={16} />
                </div>
              )}
              <div className="message-content">
                {message.content.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
              {message.type === 'user' && (
                <div className="message-avatar user">
                  <User size={16} />
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="message bot">
              <div className="message-avatar">
                <Bot size={16} />
              </div>
              <div className="typing-indicator">
                <span /><span /><span />
              </div>
            </div>
          )}
        </div>

        <div className="quick-actions">
          {quickActions.map((action) => (
            <button 
              key={action.id}
              className="quick-action-btn"
              onClick={() => handleQuickAction(action)}
            >
              <Sparkles size={14} />
              {action.label}
            </button>
          ))}
        </div>

        <div className="chatbot-input">
          <input
            type="text"
            placeholder="Ask me anything about your loans..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button className="send-btn" onClick={handleSend}>
            <Send size={18} />
          </button>
        </div>
      </div>
    </>
  );
}

export default Chatbot;
