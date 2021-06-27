import styled from 'styled-components';
import {useState, useEffect} from 'react';
import Store from '../Store';

import useSound from 'use-sound';
import ar from '../assets/clap.mp3';
import zero from '../assets/DevastKick.wav';
import point from '../assets/bass.mp3';
import one from '../assets/oh.mp3';
import two from '../assets/ESynth_0.mp3';
import three from '../assets/bass_note.mp3';
import four from '../assets/ESynth_2.mp3';
import five from '../assets/ESynth_3.mp3';
import six from '../assets/ESynth_5.mp3';
import seven from '../assets/cut223_0.mp3';
import eight from '../assets/cut223_2.mp3';
import nine from '../assets/cut223_4.mp3';
import play from '../assets/visuals/play.svg';
import repeat from '../assets/visuals/arrow-repeat.svg';
import playWhite from '../assets/visuals/playwhite.svg';
import repeatWhite from '../assets/visuals/arrow-repeatwhite.svg';
import del from '../assets/visuals/delete.svg';

const SongsWrapper = styled.div`
    position: absolute;
    display: flex;
    flex-wrap: wrap;
    width: 90%;
    justify-content: center;
    align-items: center;
    top: 270px;
    margin-top: 30px;
    margin-inline: 5%;

    @media screen and (max-width: 500px) {
        margin-top: 0px;
        top: 210px;
    }
    
`

const SongBox = styled.div`
    width: 66px;
    height: 30px;
    background-color: rgb(220, 230, 230);
    border-radius: 17px;
    margin: 5px;
    display: flex;
    padding-inline: 5px;
    justify-content: space-between;
    align-items: center;
    box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.25);
    
    &:hover {
        cursor: pointer;
    }
`

const GlobalWrapper = styled.div`
    position: absolute;
    top: 160px;
    width: 100%;
    display: flex;
    justify-content: center;

    @media screen and (max-width: 500px) {
        top: 140px;
    }

`

const GlobalPlayer = styled.div`
    width: 110px;
    height: 60px;
    display: flex;
    color: white;
    align-items: center;
    border-radius: 7px;
    justify-content: space-evenly;
    background-color: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(5px);
    box-shadow: 3px 3px 15px rgba(0,0,0,0.2);

    &:hover {
        cursor: pointer;
        box-shadow: 3px 5px 15px rgba(0,0,0,0.5);
    }

    @media screen and (max-width: 500px) {
        height: 50px;
    }

`

const Recorder = () => {

    const [song, setSong] = useState([]);
    const [songs, setSongs] = useState([]);
    const [songsInfo, setSongsInfo] = useState([]);
    const [globalSongs, setGlobalSongs] = useState();
    const [songsIndexes, setSongsIndexes] = useState([]);

    var players = {};
    var playersLoop = {};

    const [playar] = useSound(ar);
    const [playzero] = useSound(zero);
    const [playpoint] = useSound(point);
    const [playone] = useSound(one);
    const [playtwo] = useSound(two);
    const [playthree] = useSound(three);
    const [playfour] = useSound(four);
    const [playfive] = useSound(five);
    const [playsix] = useSound(six);
    const [playseven] = useSound(seven);
    const [playeight] = useSound(eight);
    const [playnine] = useSound(nine);

    Store.subscribe(() => {
        setSong(Store.getState().songs[Store.getState().songs.length - 1].songs);
    });
  
    const playSong = (mySong, loop, songId, playerObject) => {

        // Convert song times to time diffs
        var timeDiffs = []
        var timeDiffsSongs = {}
        var idPlayed = {}
        for (let i = 1; i < mySong.length; i++) {
            var diff = mySong[i].time - mySong[0].time;
            timeDiffs.push(diff);
            timeDiffsSongs[diff] = mySong[i].note;
            idPlayed[mySong[i].id] = false;
        }

        
        let played = 0;

        // Play the song
        const startTime = Date.now();
        var playing = true;
        const play = () => {

            if (loop) {
                playerObject = playersLoop;
            }

            var time = Date.now();

            if (!playerObject[songId]) {
                playing = false;
            } 

            if (playing) {

                let index = 0;
                mySong.forEach((part) => {
                    time = Date.now();

                    if (index > 0) {
                        if (idPlayed[part.id] === false && time - startTime >= part.time - mySong[0].time) {
                            idPlayed[part.id] = true;
                            played += 1

                            switch (part.note) {
                                case 'ArrowRight':
                                    playar();
                                    break;
                                case '0':
                                    playzero();
                                    break;
                                case '.':
                                    playpoint();
                                    break;            
                                case '1':
                                    playone();
                                    break;
                                case '2':
                                    playtwo();
                                    break;
                                case '3':
                                    playthree();
                                    break;
                                case '4':
                                    playfour();
                                    break;
                                case '5':
                                    playfive();
                                    break;
                                case '6':
                                    playsix();
                                    break;
                                case '7':
                                    playseven();
                                    break;
                                case '8':
                                    playeight();
                                    break;
                                case '9':
                                    playnine();
                                    break;
                                default:
                                    break
                            }
                            
                            if (played >= mySong.length -1) {
                                // loop -> plays the song continuously
                                if (loop) {
                                    playSong(mySong, true, songId, playerObject);
                                    
                                } else {
                                    playing = false;
                                }
                            }   
                        }
                    }

                    index++;

                });

                if (playing) {
                    window.requestAnimationFrame(play);
                } else {
                    if (loop) {
                        playersLoop[songId] = !playerObject[songId];
                    } else {
                        players[songId] = !playerObject[songId]
                    }
                    return true;
                }
            }
        } 
        play();
        
    }

    useEffect(() => {
        // Create the new song element
        if (song.length > 0) {
            var songId = Math.random();
            var playing = false;
            players[songId] = playing;
            playersLoop[songId] = playing;
            setSongsIndexes([...songsIndexes, songsIndexes.length+1]);
            setSongs([...songs,
                <SongBox key={songsIndexes[songsIndexes.length-1]}>
                  
                    <img className="Play" id={`${songId} nonloop`} src={play} alt='could not load asset' width='20px' height='20px' onClick={() => {
                        players[songId] = !players[songId];
                        playSong(song, false, songId, players);
                    }}>

                    </img>

                    <img className="PlayLoop" id={`${songId} loop`} src={repeat} alt='could not load asset' width='20px' height='20px' onClick={() => {
                        if (!playersLoop[songId]) {
                            var element =  document.getElementById(`${songId} loop`);               
                            element.style.animation = 'loop-animation 1.618s ease-in-out infinite';
                        } else {
                            var element =  document.getElementById(`${songId} loop`);
                            element.style.animation = 'none'
                        }
                        playersLoop[songId] = !playersLoop[songId];
                        playSong(song, true, songId, playersLoop);
                        
                    }}>

                    </img>
                    
                    

                </SongBox>
            ]);

            setSongsInfo([...songsInfo,
                {
                    song,
                    id: songId
                }
            ]);
        }

    }, [song]);

    useEffect(() => {

        if (songs.length > 1) {
            setGlobalSongs(
                <GlobalPlayer id="global">
                    <img src={playWhite}
                        className="Play"
                        id="nonloop"
                        alt='could not load asset'
                        width='20px' height='auto'
                        onClick={() => {
                            songsInfo.forEach((info) => {
                                players[info.id] = !players[info.id];
                                playSong(info.song, false, info.id, players);
                            });
                        }}
                    />

                    <p>Play all</p>

                    <img src={repeatWhite}
                        className="PlayLoop"
                        id="global-loop"
                        alt='could not load asset'
                        width='20px' height='auto'
                        onClick={() => {
                            songsInfo.forEach((info) => {
                                if (!playersLoop[info.id]) {
                                    var element =  document.getElementById('global-loop');               
                                    element.style.animation = 'loop-animation 1.618s ease-in-out infinite';
                                } else {
                                    var element =  document.getElementById('global-loop');
                                    element.style.animation = 'none' 
                                }
                                playersLoop[info.id] = !playersLoop[info.id];
                                playSong(info.song, true, info.id, playersLoop);
                            });
                        }}
                    />

                </GlobalPlayer>
            )
        }
    }, [songs]);

    return <>
        <GlobalWrapper>
            {globalSongs}
        </GlobalWrapper>
        
        <SongsWrapper>
            
            {songs}
        </SongsWrapper>
        
        
    </>

}

export default Recorder;