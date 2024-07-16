import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import './FindYourFate.css';
import CustomModal from '../../components/modalWin/CustomModal';
import data from '../../Data';


const FindYourFate = () => {
  const [cardSlots, setCardSlots] = useState(Array(3).fill(null));
  const [availableCards, setAvailableCards] = useState([]);
  const [modalMessage, setModalMessage] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setAvailableCards([...data]);
  }, []);

  const handleClick = () => {
    if (cardSlots.every(slot => slot !== null)) {
      setModalMessage('Слотов больше нет');
      return;
    }

    if (availableCards.length === 0) {
      setModalMessage('Карты закончились');
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableCards.length);
    const [selectedCard] = availableCards.splice(randomIndex, 1);
    const getRandomZeroOrOneEighty = () => {
      const randomNumber = Math.random(); 
      return randomNumber < 0.5 ? 0 : 180; 
    }

    let test = getRandomZeroOrOneEighty()

    setCardSlots(prev => {
      const emptyIndex = prev.findIndex(slot => slot === null);
      const newSlots = [...prev];
      newSlots[emptyIndex] = selectedCard;
      return newSlots;
    });

    setAvailableCards([...availableCards]);
  };

  const reset = () => {
    setCardSlots(Array(3).fill(null));
    setAvailableCards([...data]);
  };

  return (
    <>
      <div className="back"></div>
      {hoveredCard && (
        <motion.div 
        className="taro-info"
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        exit={{ opacity: 0}}
        transition={{ delay: 0.2, duration: 0.7}}>
          <h2>{hoveredCard.name}</h2>
          <p><span className='up-position'>Прямое положение: </span>{hoveredCard.description}</p>
        </motion.div>
      )}
      <motion.button 
        onClick={() => navigate("/")} 
        className='back-fate-button'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        GO BACK
      </motion.button>

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
                  src={slot.path}
                  alt="card"
                  className="card-image"
                  initial={{ opacity: 0, scale: 0.8, rotateY: 69, rotateX: 69 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0, rotateX: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotateY: 0, rotateX: 0 }}
                  transition={{ duration: 0.7 }}
                  onMouseEnter={() => setHoveredCard(slot)}
                  onMouseLeave={() => setHoveredCard(null)}
                />
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
        
      <motion.button
        className="image-button"
        onClick={handleClick}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        <img className="name" src="/icons/newcoloda2.jpg" alt="newtaro" />
      </motion.button>

      {cardSlots.every(slot => slot !== null) && (
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
        isOpen={!!modalMessage}
        onClose={() => setModalMessage('')}
        message={modalMessage}
      />
    </>
  );
};

export default FindYourFate;