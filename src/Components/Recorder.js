import styled from 'styled-components';
import {useState, useEffect} from 'react';
import Store from '../Store';

import useSound from 'use-sound';
import kik from '../assets/DevastKick.wav';
import kik1 from '../assets/GO_TO_808_E.wav';
import beep from '../assets/beep.mp3';
import clap from '../assets/clap.mp3';
import female_voice from '../assets/female_voice.mp3';
import mono from '../assets/mono.mp3';
import mono1 from '../assets/mono1.mp3';
import mono2 from '../assets/mono2.mp3';
import mono3 from '../assets/mono3.mp3';
import shake from '../assets/shake.mp3';
import snare from '../assets/snare.mp3';
import rattle from '../assets/rattle.mp3';
import play from '../assets/visuals/play.svg';
import repeat from '../assets/visuals/arrow-repeat.svg';


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
    
`

const SongBox = styled.div`
    width: 66px;
    height: 30px;
    background-color: rgb(220, 230, 230);
    border-radius: 17px;
    margin: 5px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.25);
    
    &:hover {
        cursor: pointer;
    }
`

const Recorder = () => {

    const [song, setSong] = useState([]);
    const [songs, setSongs] = useState([]);
    var players = {};
    var playersLoop = {};

    const [playKick] = useSound(kik);
    const [playKick1] = useSound(kik1);
    const [playBeep] = useSound(beep);
    const [playClap] = useSound(clap);
    const [playFemaleVoice] = useSound(female_voice);
    const [playMono] = useSound(mono);
    const [playMono1] = useSound(mono1);
    const [playMono2] = useSound(mono2);
    const [playSnare] = useSound(snare);
    const [playShake] = useSound(shake);
    const [playMono3] = useSound(mono3);
    const [playRattle] = useSound(rattle);

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
                console.log('Playing end');
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
                                    playClap();
                                    break;
                                case '0':
                                    playKick1();
                                    break;
                                case '.':
                                    playKick();
                                    break;            
                                case '1':
                                    playFemaleVoice();
                                    break;
                                case '2':
                                    playBeep();
                                    break;
                                case '3':
                                    playSnare();
                                    break;
                                case '4':
                                    playMono();
                                    break;
                                case '5':
                                    playMono1();
                                    break;
                                case '6':
                                    playMono2();
                                    break;
                                case '7':
                                    playMono3();
                                    break;
                                case '8':
                                    playShake();
                                    break;
                                case '9':
                                    playRattle();
                                    break;
                                default:
                                    break
                            }
                            
                            if (played >= mySong.length -1) {
                                // loop -> plays the song continuously
                                if (loop) {
                                    playSong(mySong, true, songId, playerObject);
                                    
                                } else {
                                    console.log('not playing', loop, playersLoop[songId]);
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
            setSongs([...songs,
                <SongBox>

                    
                    <img className="Play" id={songId} src={play} alt='could not load asset' width='20px' height='20px' onClick={() => {
                        players[songId] = !players[songId];
                        playSong(song, false, songId, players);
                    }}>

                    </img>

                    <img className="Play" id={songId} src={repeat} alt='could not load asset' width='20px' height='20px' onClick={() => {
                        playersLoop[songId] = !playersLoop[songId];
                        playSong(song, true, songId, playersLoop);
                    }}>

                    </img>

                </SongBox>
            ]);
        }

    }, [song]);

    return <>
        
        <SongsWrapper>
            {songs}
        </SongsWrapper>
        
        
    </>

}

export default Recorder;