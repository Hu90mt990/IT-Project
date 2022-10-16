// React
import React, { useState, useEffect } from 'react';

// Next components
import Image from 'next/image';

// Firebase
import { collection, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase-config';

// Styles
import styles from '../../styles/List.module.css';

// Authentication
import { useAuth } from '../../context/authUserContext';

const star = '/images/star.png';
const starFilled = '/images/starFilled.png';

const usersCollectionRef = collection(db, 'users');

export default function Element({ element, type }) {
  // State of the image that is displayed as the favourite button
  const [imgPath, setImgPath] = useState(star);

  const { authUser } = useAuth();

  useEffect(() => {
    const isChecked = () => {
      if (authUser) {
        if (type === 'workouts') {
          if (authUser.favouriteWorkouts.includes(element.id)) {
            setImgPath(starFilled);
          } else {
            setImgPath(star);
          }
        }
        if (type === 'exercises') {
          if (authUser.favouriteExercises.includes(element.id)) {
            setImgPath(starFilled);
          } else {
            setImgPath(star);
          }
        }
      } else {
        setImgPath(star);
      }
    };
    isChecked();
  }, [authUser, element.id, type]);

  const updateFavWorkouts = async (newFavs) => {
    authUser.favouriteWorkouts = newFavs;
    const docRef = doc(usersCollectionRef, authUser.uid);
    await updateDoc(docRef, {
      favouriteWorkouts: newFavs,
    });
  };

  const updateFavExercises = async (newFavs) => {
    authUser.favouriteExercises = newFavs;
    const docRef = doc(usersCollectionRef, authUser.uid);
    await updateDoc(docRef, {
      favouriteExercises: newFavs,
    });
  };

  const removeFavWorkout = (elem) => {
    const newFavs = authUser.favouriteWorkouts.filter((val) => val !== elem);
    updateFavWorkouts(newFavs);
  };

  const addToFavWorkouts = async (elem) => {
    authUser.favouriteWorkouts.push(elem);
    updateFavWorkouts(authUser.favouriteWorkouts);
  };

  const removeFavExercise = async (elem) => {
    const newFavs = authUser.favouriteExercises.filter((val) => val !== elem);
    updateFavExercises(newFavs);
  };

  const addToFavExercises = async (elem) => {
    authUser.favouriteExercises.push(elem);
    updateFavExercises(authUser.favouriteExercises);
  };

  // Event handler if the favourite button is clicked on
  const toggleStar = (e) => {
    e.preventDefault();
    if (authUser) {
      if (type === 'workouts') {
        if (authUser.favouriteWorkouts.includes(element.id)) {
          removeFavWorkout(element.id);
          setImgPath(star);
        } else {
          addToFavWorkouts(element.id);
          setImgPath(starFilled);
        }
      }
      if (type === 'exercises') {
        if (authUser.favouriteExercises.includes(element.id)) {
          removeFavExercise(element.id);
          setImgPath(star);
        } else {
          addToFavExercises(element.id);
          setImgPath(starFilled);
        }
      }
    }
  };

  return (
    <div className={styles.element}>
      <Image
        src={element.imgSrc}
        alt={element.imgAlt}
        height={84}
        width={120}
      />

      <div className={styles.txt}>
        <h1>{element.name}</h1>
        <p>{element.muscleGroups.join(', ')}</p>
      </div>

      <div className={styles.star}>
        <form>
          <input
            type="image"
            src={imgPath}
            height={38}
            width={38}
            alt="star"
            onClick={toggleStar}
          />
        </form>
      </div>
    </div>
  );
}
