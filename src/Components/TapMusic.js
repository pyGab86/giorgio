import Store from '../Store';
import styled from 'styled-components';
import {useState, useEffect} from 'react';
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

import music from '../assets/visuals/music-note.svg';


const ButtonsGrid = styled.div`
    display: grid;
    grid: repeat(4, 25%) / repeat(3, 33.33%);
    width: 98%;
    max-width: 500px;
    height: 98%;
    justify-self: center;

`

const MusicButton = styled.div`
    background-color: rgba(33, 33, 33, 0.3);
    margin: 3px;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-center: center;

    &:active {
        background-color: rgb(33, 33, 33, 0.6);
    }

    &:hover {
        cursor: pointer;
    }

`

const RecorderWrapper = styled.div`
    position: absolute;
    top: 0px;
    margin-top: 50px;
    margin-inline: 10px;
    font-size: 16px;
    color: white;
    font-weight: bold;
    border: 2px white solid;
    border-radius: 5px;
    width: 90%;
    max-width: 800px;
    text-align: center;

    &:hover, &:active {
        background-color: rgba(255, 255, 255, 0.4);
        cursor: pointer;
    }
` 

const GridWrapper = styled.div`
    border-radius: 10px;
    background-color: rgba(200, 200, 200, 0.15);
    backdrop-filter: blur(5px);
    box-shadow: inset 0 0 2000px rgba(255, 255, 255, .5);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
    max-height: 300px;
    max-width: 800px;
    position: absolute;
    bottom: 10px;
    width: 90%;
`



function TapMusic() {

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

    const [song, setSong] = useState([]);
    const [isRecording, setIsRecording] = useState(false);
    const [text, setText] = useState('Press R to start recording');
    const [nbSongs, setNbSongs] = useState(0);

    const keys = ['ArrowRight', '0', '.', '1', '2', '3', '4', '5', '6', '7', '8', '9']

    const noteDispatcher = (note, time) => {
        var currentRecordingBool = Store.getState().recording[Store.getState().recording.length - 1].recording;
        if (currentRecordingBool) {
            setSong([...song, {note, time, id: Math.random()}]);
        }
    }

    const manageRecord = () => {
        setIsRecording(!isRecording);
        if (!isRecording && nbSongs < 6) {
            setText('Recording... Press S to stop');
        } else if (nbSongs < 6) {
            setText('Press R to start recording');
        }

        if (nbSongs === 6) {
            setText('You can only record 6 songs')
        }
    }

    // Play songs when clicking on buttons
    const buttonClicked = (id) => {
        var currentRecordingBool = Store.getState().recording[Store.getState().recording.length - 1].recording;

        if (keys.includes(id)) {
            document.getElementById(id).style.backgroundColor = 'rgb(33, 33, 33, 0.6)';
            setTimeout(() => {
                document.getElementById(id).style.backgroundColor = "rgba(33, 33, 33, 0.3)";
            }, 150);
        }

        switch (id) {
            case 'ArrowRight':
                playar();
                noteDispatcher('ArrowRight', Date.now());
                break;
            case '0':
                playzero();
                noteDispatcher('0', Date.now());
                break;
            case '.':
                playpoint();
                noteDispatcher('.', Date.now());
                break;            
            case '1':
                playone();
                noteDispatcher('1', Date.now());
                break;
            case '2':
                playtwo();
                noteDispatcher('2', Date.now());
                break;
            case '3':
                playthree();
                noteDispatcher('3', Date.now());
                break;
            case '4':
                playfour();
                noteDispatcher('4', Date.now());
                break;
            case '5':
                playfive();
                noteDispatcher('5', Date.now());
                break;
            case '6':
                playsix();
                noteDispatcher('6', Date.now());
                break;
            case '7':
                playseven();
                noteDispatcher('7', Date.now());
                break;
            case '8':
                playeight();
                noteDispatcher('8', Date.now());
                break;
            case '9':
                playnine();
                noteDispatcher('9', Date.now());
                break;

            case 'rec':
                if (!currentRecordingBool && nbSongs < 6) {
                    setSong([...song, {note: 'start', time: Date.now()}])
                    Store.dispatch({
                        type: 'REC',
                        payload: {recording: true}
                    });
                    manageRecord();
                    setNbSongs(nbSongs+1);
                } else {
                    setSong([...song]);
                    Store.dispatch({
                        type: 'REC',
                        payload: {recording: false}
                    });

                    // Save our song to the store and delete local state song
                    Store.dispatch({
                        type: 'ADD_SONG',
                        payload: {songs: [...song, {note: 'end', time: Date.now(), id: Math.random()}]}
                    });

                    setSong([]);
                    manageRecord();
                }

                if (nbSongs === 6) {
                    manageRecord();
                }

                break;
              
            default:
                break;
        }
    }

    // Play songs with keyboard
    document.onkeydown = function(e) {
        e = e || window.event;
        // Change the pad's color for a few milliseconds
        if (keys.includes(e.key)) {

            document.getElementById(e.key).style.backgroundColor = 'rgb(33, 33, 33, 0.6)';
            setTimeout(() => {
                document.getElementById(e.key).style.backgroundColor = "rgba(33, 33, 33, 0.3)";
            }, 150);

        }

        var currentRecordingBool = Store.getState().recording[Store.getState().recording.length - 1].recording;
        
        switch (e.key) {
            case 'ArrowRight':
                playar();
                noteDispatcher('ArrowRight', Date.now());
                break;
            case '0':
                playzero();
                noteDispatcher('0', Date.now());
                break;
            case '.':
                playpoint();
                noteDispatcher('.', Date.now());
                break;            
            case '1':
                playone();
                noteDispatcher('1', Date.now());
                break;
            case '2':
                playtwo();
                noteDispatcher('2', Date.now());
                break;
            case '3':
                playthree();
                noteDispatcher('3', Date.now());
                break;
            case '4':
                playfour();
                noteDispatcher('4', Date.now());
                break;
            case '5':
                playfive();
                noteDispatcher('5', Date.now());
                break;
            case '6':
                playsix();
                noteDispatcher('6', Date.now());
                break;
            case '7':
                playseven();
                noteDispatcher('7', Date.now());
                break;
            case '8':
                playeight();
                noteDispatcher('8', Date.now());
                break;
            case '9':
                playnine();
                noteDispatcher('9', Date.now());
                break;

            // Check for r or s to be pressed
            case 'r':                
            case 'R':

                if (!currentRecordingBool && nbSongs < 6) {
                    setSong([...song, {note: 'start', time: Date.now(), id: Math.random()}])
                    Store.dispatch({
                        type: 'REC',
                        payload: {recording: true}
                    });

                    manageRecord();
                    setNbSongs(nbSongs+1);

                } else if (nbSongs === 6) {
                    manageRecord();
                }

                break;

            case 's':
            case 'S':

                if (currentRecordingBool) {
                    
                    Store.dispatch({
                        type: 'REC',
                        payload: {recording: false}
                    });

                    // Save our song to the store and delete local state song
                    Store.dispatch({
                        type: 'ADD_SONG',
                        payload: {songs: [...song, {note: 'end', time: Date.now(), id: Math.random()}]}
                    });

                    setSong([]);
                    manageRecord();

                }

                break;
              
            default:
                break;
        }
    }


    return (
        <>
            <RecorderWrapper id="rec" onClick={() => {buttonClicked('rec')}}>
                <h4>{text}</h4>
            </RecorderWrapper>

            <GridWrapper>
                <ButtonsGrid>
                    <MusicButton id="7" onClick={() => {buttonClicked('7')}}>
                        <img id="note" src={music} alt='' width='10%' height='auto'></img>
                    </MusicButton>
                    <MusicButton id="8" onClick={() => {buttonClicked('8')}}>
                        <img src={music} alt='' width='10%' height='auto'></img>
                    </MusicButton>
                    <MusicButton id="9" onClick={() => {buttonClicked('9')}}>
                        <img src={music} alt='' width='10%' height='auto'></img>
                    </MusicButton>
                    <MusicButton id="4" onClick={() => {buttonClicked('4')}}>
                        <img src={music} alt='' width='10%' height='auto'></img>
                    </MusicButton>
                    <MusicButton id="5" onClick={() => {buttonClicked('5')}}>
                        <img src={music} alt='' width='10%' height='auto'></img>
                    </MusicButton>
                    <MusicButton id="6" onClick={() => {buttonClicked('6')}}>
                        <img src={music} alt='' width='10%' height='auto'></img>
                    </MusicButton>
                    <MusicButton id="1" onClick={() => {buttonClicked('1')}}>
                        <img src={music} alt='' width='10%' height='auto'></img>
                    </MusicButton>
                    <MusicButton id="2" onClick={() => {buttonClicked('2')}}>
                        <img src={music} alt='' width='10%' height='auto'></img>
                    </MusicButton>
                    <MusicButton id="3" onClick={() => {buttonClicked('3')}}>
                        <img src={music} alt='' width='10%' height='auto'></img>
                    </MusicButton>
                    <MusicButton id="ArrowRight" onClick={() => {buttonClicked('ArrowRight')}}>
                        <img src={music} alt='' width='10%' height='auto'></img>
                    </MusicButton>
                    <MusicButton id="0" onClick={() => {buttonClicked('0')}}>
                        <img src={music} alt='' width='10%' height='auto'></img>
                    </MusicButton>
                    <MusicButton id="." onClick={() => {buttonClicked('.')}}>
                        <img src={music} alt='' width='10%' height='auto'></img>
                    </MusicButton>
                </ButtonsGrid>
            </GridWrapper>
        </>
    )
}

export default TapMusic;