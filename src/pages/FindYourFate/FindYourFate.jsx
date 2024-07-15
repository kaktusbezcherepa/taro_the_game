import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import './FindYourFate.css';
import CustomModal from '../../components/modalWin/CustomModal';
import PageTransition from '../../components/animationBetweenPages/PageAnim';

const FindYourFate = () => {
  const [card, setCard] = useState("/icons/newcoloda2.jpg");
  const [cardSlots, setCardSlots] = useState([null, null, null]);
  const [availableCards, setAvailableCards] = useState([]);
  const [showedCards, setShowedCards] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const TOTAL_CARDS = 22;

  const navigate = useNavigate();

  useEffect(() => {
    setAvailableCards(Array.from({ length: TOTAL_CARDS }, (_, i) => `/assets/cards/card${i + 1}.jpg`));
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
        setModalMessage('Карты закончились');
        setIsModalOpen(true);
      }
    } else {
      setModalMessage('Слотов больше нет');
      setIsModalOpen(true);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  const reset = () => {
    setCardSlots([null, null, null]);
    setAvailableCards(Array.from({ length: TOTAL_CARDS }, (_, i) => `/assets/cards/card${i + 1}.jpg`));
    setShowedCards(0);
  };

  const toMainPage = () => {
    setTimeout(() => {
      navigate("/");
    }, 300);
  };

  return (
    <>
      <div
        className="back"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
      </div>
        
      <motion.button onClick={toMainPage} className='back-fate-button'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        GO BACK
      </motion.button>
      {/* {showedCards === 3 && (
        <motion.div className='result-container'
        initial={{ opacity : 0}}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0}}
        transition={{ delay: 0.5, duration: 1}}>
          <div className="result-info"></div>
        </motion.div>
      )} */}
      <motion.div
        className="card-slots"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {cardSlots.map((slot, i) => (
          <motion.div
            key={i}
            className="card-slot"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
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
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        <img className="name" src={card} alt="newtaro" />
      </motion.button>

      {showedCards === 3 && (
        <div className="reset-button-container">
          <motion.button
            className="reset-button"
            onClick={reset}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Reset
          </motion.button>
        </div>
      )}

      

      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={modalMessage}
      />
    </>
  );
};

export default FindYourFate;