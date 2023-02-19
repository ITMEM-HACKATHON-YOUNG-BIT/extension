/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
// initialize elements we'll use
const recordButton = document.getElementById('recordButton');
const recordButtonImage = recordButton.firstElementChild;
const recordedAudioContainer = document.getElementById('recordedAudioContainer');
const saveAudioButton = document.getElementById('saveButton');
const discardAudioButton = document.getElementById('discardButton');
const recordingsContainer = document.getElementById('recordings');

let chunks = []; // will be used later to record audio
let mediaRecorder = null; // will be used later to record audio
let audioBlob = null; // the blob that will hold the recorded audio

function mediaRecorderDataAvailable(e) {
    chunks.push(e.data);
}

function mediaRecorderStop() {
    const audioElm = document.createElement('audio');
    audioElm.setAttribute('controls', ''); // add controls
    audioBlob = new Blob(chunks, {type: 'audio/mp3'});
    const audioURL = window.URL.createObjectURL(audioBlob);
    audioElm.src = audioURL;
    saveRecording()
    // reset to default
    mediaRecorder = null;
    chunks = [];
}

function record() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('Your browser does not support recording!');
        return;
    }

    // browser supports getUserMedia
    // change image in button
    recordButtonImage.src = `/images/${mediaRecorder && mediaRecorder.state === 'recording' ? 'microphone' : 'microphone_on'}.svg`;
    if (!mediaRecorder) {
        // start recording
        navigator.mediaDevices.getUserMedia({
            audio: true,
        })
            .then((stream) => {
                mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.start();
                mediaRecorder.ondataavailable = mediaRecorderDataAvailable;
                mediaRecorder.onstop = mediaRecorderStop;
            })
            .catch((err) => {
                // alert(`The following error occurred: ${err}`);
                // change image in button
                // recordButtonImage.src = '/images/microphone.svg';
                console.log("bad")
            });
    } else {
        // stop recording
        mediaRecorder.stop();
    }
}

recordButton.addEventListener('click', record);

function resetRecording() {
    if (recordedAudioContainer.firstElementChild.tagName === 'AUDIO') {
        recordedAudioContainer.firstElementChild.remove();
        // hide recordedAudioContainer
        recordedAudioContainer.classList.add('d-none');
        recordedAudioContainer.classList.remove('d-flex');
    }
    audioBlob = null;
}

function playRecording(e) {
    let button = e.target;
    if (button.tagName === 'IMG') {
        // get parent button
        button = button.parentElement;
    }
    const audio = button.previousElementSibling;
    if (audio && audio.tagName === 'AUDIO') {
        if (audio.paused) {
            audio.play();
            button.firstElementChild.src = 'images/microphone_on.svg';
        } else {
            audio.pause();
            button.firstElementChild.src = 'images/microphone.svg';
        }
    }
}

function createRecordingElement(file) {
    const recordingElement = document.createElement('div');
    recordingElement.classList.add('col-lg-2', 'col', 'recording', 'mt-3');
    const audio = document.createElement('audio');
    audio.src = file;
    audio.onended = (e) => {
        e.target.nextElementSibling.firstElementChild.src = 'images/mi.png';
    };
    recordingElement.appendChild(audio);
    const playButton = document.createElement('button');
    playButton.classList.add('play-button', 'btn', 'border', 'shadow-sm', 'text-center', 'd-block', 'mx-auto');
    const playImage = document.createElement('img');
    playImage.src = '/images/play.png';
    playImage.classList.add('img-fluid');
    playButton.appendChild(playImage);
    playButton.addEventListener('click', playRecording);
    recordingElement.appendChild(playButton);
    return recordingElement;
}

// fetch recordings
function fetchRecordings() {
    fetch('/recordings')
        .then((response) => response.json())
        .then((response) => {
            if (response.success && response.files) {
                recordingsContainer.innerHTML = ''; // remove all children
                response.files.forEach((file) => {
                    const recordingElement = createRecordingElement(file);
                    // console.log(file, recordingElement);
                    recordingsContainer.appendChild(recordingElement);
                });
            }
        })
        .catch((err) => console.error(err));
}

function saveRecording() {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.mp3');
    fetch('/record', {
        method: 'POST',
        body: formData,
    })
        .then((response) => response.json())
        .then(() => {
            // alert('Your recording is saved');
            resetRecording();
            fetchRecordings();
        })
        .catch((err) => {
            // console.error(err);
            alert('An error occurred, please try again later');
            resetRecording();
        });
}

saveAudioButton.addEventListener('click', saveRecording);

function discardRecording() {
    if (confirm('Are you sure you want to discard the recording?')) {
        // discard audio just recorded
        resetRecording();
    }
}

discardAudioButton.addEventListener('click', discardRecording);

fetchRecordings();