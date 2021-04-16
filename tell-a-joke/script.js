const button = document.getElementById('button');
const audioElement = document.getElementById('audio');


// Passing Joke to VoiceRSS API
function tellMe(joke) {
    VoiceRSS.speech({
        key: 'd7edb667bf334b38b3bc96274322669c',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get jokes from Joke API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) { // two-part joke
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // Text-to-Speech
        tellMe(joke);

        // Disable button
        toggleButton();

    } catch (error) {
        // Catch errors
        console.log(`Whoops... ${error}`);
    }
}

// Event listeners
button.addEventListener('click', getJokes);

// Disable/enable button
function toggleButton() {
    button.disabled = !button.disabled;
}

audioElement.addEventListener('ended', toggleButton)