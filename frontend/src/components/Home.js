import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [music, setMusic] = useState([]);

  useEffect(() => {
    axios.get('/api/music/all')
      .then(response => {
        setMusic(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the music!', error);
      });
  }, []);

  return (
    <div>
      <h1>Music List</h1>
      <ul>
        {music.map((song) => (
          <li key={song._id}>
            <p>{song.title} - {song.artist}</p>
            <audio controls>
              <source src={`/${song.filePath}`} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
