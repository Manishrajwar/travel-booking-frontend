import { useState } from 'react';
import { Chat } from 'react-chat-module';
import 'react-chat-module/dist/index.css';
import "./styles.css"

function TravelChatbot() {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      createdAt: new Date(),
      messageId: "1",
      senderId: "bot",
      profilePicture: "https://res.cloudinary.com/dn3vbnvcs/image/upload/v1753009049/profile_kvtojm.png",
      type: "text",
      text: "Hi! 👋 Ask me something like: 'Show me trips to Manali', 'Hotels in Goa', or 'Places to visit in Jaipur'",
      name: "Travel Bot"
    }
  ]);

 const rules = [
  {
    keywords: ["hi", "hello"],
    answer: "Hello! Ask me about trips, hotels, or tourist spots."
  },
  {
    keywords: ["help", "info"],
    answer: "Sure! I can help you with trips, hotels, or must-visit places."
  },

  {
    keywords: ["trip", "manali"],
    answer: "Top trips in Manali include Adventure Trip, Snow Fun, Paragliding Expedition and more!"
  },
  {
    keywords: ["hotel", "manali"],
    answer: "Popular Manali hotels: Snow Valley Resort, Manali Heights, Himalayan Breeze Inn."
  },
  {
    keywords: ["places", "manali"],
    answer: "Must-visit in Manali: Solang Valley, Rohtang Pass, Hadimba Temple, Manu Temple."
  },

  {
    keywords: ["trip", "goa"],
    answer: "Top Goa trips: Beach Holiday, Party Package, Island Hopping, Relaxation Spa."
  },
  {
    keywords: ["hotel", "goa"],
    answer: "Best hotels in Goa: Goa Beach Resort, Ocean Pearl Goa, Coconut Grove Inn."
  },
  {
    keywords: ["places", "goa"],
    answer: "Popular in Goa: Baga Beach, Fort Aguada, Dudhsagar Falls, Basilica of Bom Jesus."
  },

  {
    keywords: ["trip", "jaipur"],
    answer: "Jaipur trips: Heritage Tour, Food Trip, Royal Palace Stay, Camel Safari."
  },
  {
    keywords: ["hotel", "jaipur"],
    answer: "Hotels in Jaipur: Jaipur Palace Hotel, Pink City Inn, Amber Fort Residency."
  },
  {
    keywords: ["places", "jaipur"],
    answer: "Must-see in Jaipur: Amber Fort, Hawa Mahal, City Palace, Johari Bazaar."
  },

  {
    keywords: ["trip", "delhi"],
    answer: "Delhi trips: Cultural Walk, Shopping Spree, Food Trail, Monuments Tour."
  },
  {
    keywords: ["hotel", "delhi"],
    answer: "Best hotels in Delhi: Delhi Grand, Red Fort Hotel, Connaught Inn."
  },
  {
    keywords: ["places", "delhi"],
    answer: "Top Delhi attractions: Red Fort, Qutub Minar, India Gate, Lotus Temple."
  },

  {
    keywords: ["trip", "shimla"],
    answer: "Shimla trips: Honeymoon, Family Trip, Toy Train Ride, Campfire Nights."
  },
  {
    keywords: ["hotel", "shimla"],
    answer: "Shimla stays: Shimla Hilltop, Mall Road Lodge, Evergreen Resort Shimla."
  },
  {
    keywords: ["places", "shimla"],
    answer: "Shimla highlights: Mall Road, Jakhoo Temple, Kufri, Christ Church."
  }
];


  const handleSend = (message) => {
    const newUserMessage = {
      ...message,
      messageId: `${Date.now()}`,
      senderId: "user",
      profilePicture: "https://res.cloudinary.com/dn3vbnvcs/image/upload/v1753009049/profile_kvtojm.png",
      name: "You"
    };

    const newMessages = [...messages, newUserMessage];

    const input = message.text.toLowerCase().trim();
const words = input.split(/\s+/); 

let maxCount = 0;
let reply = "";
let currentCount = 0;


rules.find(rule => {

      words.forEach(word => {
           if(rule.keywords.includes(word)){
              currentCount++;
           }
      });


      if( currentCount > maxCount ){
          reply = rule.answer;
          maxCount = currentCount;
      }

      currentCount = 0;
});


    const botReply = {
      messageId: `${Date.now() + 1}`,
      senderId: "bot",
      profilePicture: "https://res.cloudinary.com/dn3vbnvcs/image/upload/v1753009049/profile_kvtojm.png",
      type: "text",
      text: reply ? reply : "Sorry, I don't know that yet. Try asking about trips to Manali, hotels in Goa, or places to visit in Jaipur!",
      createdAt: new Date(),
      name: "Travel Bot"
    };

    setMessages([...newMessages, botReply]);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
          zIndex: 101,
          fontSize: '28px',
          lineHeight: '60px',
        }}
      >
        💬
      </button>

      {isOpen && (
        <div
        className='chat_bot_container'

        >
          <Chat
            userId={"user"}
            messages={messages}
            onSend={handleSend}
          />
        </div>
      )}
    </>
  );
}

export default TravelChatbot;
