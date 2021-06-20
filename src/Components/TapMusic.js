import Store from '../Store';
import styled from 'styled-components';
import {useState, useEffect} from 'react';
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


const activePadColor = "hotpink";


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

    &:hover {
        background-color: rgb(33, 33, 33, 0.6);
    }

    &:active {
        background-color: ${activePadColor};
    }

`

function TapMusic() {

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

    const [song, setSong] = useState([]);

    const keys = ['ArrowRight', '0', '.', '1', '2', '3', '4', '5', '6', '7', '8', '9']


    // Play songs when clicking on buttons
    const buttonClicked = (id) => {
        switch (id) {
            case 'r':
                playClap();
                break;
            case '0':
                playKick1();
                break;
            case 's':
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
                playMono();
                break;
            default:
                console.log('unknown pad');
        }
    }

    // Play songs with keyboard
    document.onkeydown = function(e) {
        e = e || window.event;
        // Change the pad's color for a few milliseconds
        if (keys.includes(e.key)) {
            document.getElementById(e.key).style.backgroundColor = activePadColor;
            setTimeout(() => {
                document.getElementById(e.key).style.backgroundColor = "rgba(33, 33, 33, 0.3)";
            }, 150);
        }

        var currentRecordingBool = Store.getState().recording[Store.getState().recording.length - 1].recording;

        const noteDispatcher = (note, time) => {
            if (currentRecordingBool) {
                setSong([...song, {note, time}]);
            }
        }

        switch (e.key) {
            case 'ArrowRight':
                playClap();
                noteDispatcher('ArrowRight', Date.now());
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
                playMono();
                break;

            // Check for r or s to be pressed
            case 'r':                
            case 'R':

                if (!currentRecordingBool) {
                    console.log('Recordiiiing');
                    setSong([...song, {note: 'start', time: Date.now()}])
                    Store.dispatch({
                        type: 'REC',
                        payload: {recording: true}
                    });
                }

                break;

            case 's':
            case 'S':

                if (currentRecordingBool) {
                    console.log('Stop. Song:', song);
                    Store.dispatch({
                        type: 'REC',
                        payload: {recording: false}
                    });

                    // Save our song to the store and delete local state song
                    Store.dispatch({
                        type: 'ADD_SONG',
                        payload: {songs: song}
                    });

                    setSong([]);

                }

                break;
              
            default:
                console.log('unknown pad');
                break;
        }
    }


    return (
        <>
            <ButtonsGrid>
                <MusicButton id="7" onClick={() => {buttonClicked('7')}}></MusicButton>
                <MusicButton id="8" onClick={() => {buttonClicked('8')}}></MusicButton>
                <MusicButton id="9" onClick={() => {buttonClicked('9')}}></MusicButton>
                <MusicButton id="4" onClick={() => {buttonClicked('4')}}></MusicButton>
                <MusicButton id="5" onClick={() => {buttonClicked('5')}}></MusicButton>
                <MusicButton id="6" onClick={() => {buttonClicked('6')}}></MusicButton>
                <MusicButton id="1" onClick={() => {buttonClicked('1')}}></MusicButton>
                <MusicButton id="2" onClick={() => {buttonClicked('2')}}></MusicButton>
                <MusicButton id="3" onClick={() => {buttonClicked('3')}}></MusicButton>
                <MusicButton id="ArrowRight" onClick={() => {buttonClicked('r')}}></MusicButton>
                <MusicButton id="0" onClick={() => {buttonClicked('0')}}></MusicButton>
                <MusicButton id="." onClick={() => {buttonClicked('s')}}></MusicButton>
            </ButtonsGrid>
        </>
    )
}

export default TapMusic;