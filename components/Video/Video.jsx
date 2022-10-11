// React
import React from 'react';

// Styles
import styles from '../../styles/Video.module.css';

export default function Video({ videoURL }) {
  function verifyURL(link) {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = link.match(regExp);
    return match && match[7].length === 11 ? match[7] : false;
  }

  return (
    <div className={styles.video}>
      <iframe
        width="100%"
        height="300px"
        src={
          videoURL != null
            ? `https://www.youtube.com/embed/${verifyURL(videoURL)}`
            : ''
        }
        title="YouTube Video"
      />
    </div>
  );
}
