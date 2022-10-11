// React
import React, { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

// Custom Components
//import WorkoutsPage from '../pages/workouts/index';

import Workout from '../public/classes/Workout';

import List from '../components/List/List';

import styles from '../styles/Workouts.module.css';

function WorkoutsTest() {
  // A dummy workout list so that we have data to render.
  // Once the database is implemented this will not be necessary
  const workoutList = [];
  workoutList.push(
    new Workout('Push Workout', ['Chest', 'Shoulder', 'Triceps']),
    new Workout('Pull Workout', ['Back', 'Biceps', 'Abs']),
    new Workout('Legs Workout', ['Quadriceps', 'Hamstrings', 'Calves']),
    new Workout('Upper Workout', ['Chest', 'Back', 'Shoulder', 'Triceps']),
    new Workout('Workout 1', ['Chest', 'Shoulder', 'Triceps']),
    new Workout('Workout 2', ['Back', 'Biceps', 'Abs']),
    new Workout('Workout 3', ['Quadriceps', 'Hamstrings', 'Calves']),
    new Workout('Workout 4', ['Chest', 'Back', 'Shoulder', 'Triceps'])
  );

  const selectState = {};
  [selectState.selected, selectState.setSelected] = useState('');

  return (
    <>
      <div className={styles.container}>
        <main className={styles.main}>
          <List list={workoutList} listType="radio" {...selectState} />
        </main>
      </div>
    </>
  );
}

describe('The List of buttons displaying Workouts or Exercises', () => {
  it('Updates the selected button when another is clicked', () => {
    render(<WorkoutsTest />);

    const btns = screen.getAllByRole('radio');

    btns.forEach((btn1) => {
      fireEvent.click(btn1);
      expect(btn1.checked).toBeTruthy();

      btns.forEach((btn2) => {
        if (btn1 !== btn2) {
          expect(btn2.checked).toBeFalsy();
        }
      });
    });
  });
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
