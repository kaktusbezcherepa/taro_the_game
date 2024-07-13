import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './FindYourFate.css';

const FindYourFate = () => {
  const [card, setCard] = useState("/icons/newcoloda2.jpg");
  const [cardSlots, setCardSlots] = useState([null, null, null]);
  const [availableCards, setAvailableCards] = useState([]);
  const [showedCards, setShowedCards] = useState(0);
  const TOTAL_CARDS = 22;

  useEffect(() => {
    setAvailableCards(Array.from({length: TOTAL_CARDS}, (_, i) => `/assets/cards/card${i + 1}.jpg`));
  }, []);

  const getRandomCard = () => {
    if (availableCards.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * availableCards.length);
    const newAvailableCards = [...availableCards];
    return newAvailableCards.splice(randomIndex, 1)[0];
  };

  const handleClick = () => {
    const emptySlotIndex = cardSlots.findIndex(slot => slot === null);
    if (emptySlotIndex !== -1) {
      const randomCard = getRandomCard();
      if (randomCard) {
        const newCardSlots = [...cardSlots];
        newCardSlots[emptySlotIndex] = randomCard;
        setCardSlots(newCardSlots);
        setShowedCards(prev => prev + 1);
        setAvailableCards(prev => prev.filter(card => card !== randomCard));
      } else {
        alert('Карты закончились');
      }
    } else {
      alert('Слотов больше нет');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  const reset = () => {
    setCardSlots([null, null, null]);
    setAvailableCards(Array.from({length: TOTAL_CARDS}, (_, i) => `/assets/cards/card${i + 1}.jpg`));
    setShowedCards(0);
  };

  return (
    <>
    <motion.div
      className="back"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      </motion.div>
      <motion.div 
        className="card-slots"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {cardSlots.map((slot, i) => (
          <motion.div 
            key={i} 
            className="card-slot"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * (i + 1), duration: 0.3 }}
          >
            <AnimatePresence>
              {slot && (
                <motion.img 
                  src={slot} 
                  alt="card" 
                  className="card-image"
                  initial={{ opacity: 0, scale: 0.8, rotateY: 69, rotateX: 69 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0, rotateX: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotateY: 0, rotateX: 0 }}
                  transition={{ duration: 0.7 }}
                />
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.button 
        className="image-button" 
        onClick={handleClick} 
        onKeyPress={handleKeyPress}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        <img className="name" src={card} alt="newtaro" />
      </motion.button>
      
      {showedCards === 3 && (
        <div className="test">
        <motion.button 
          className="reset-button" 
          onClick={reset}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Reset
        </motion.button>
        </div>
      )}
    
    </>
  );
};

export default FindYourFate;