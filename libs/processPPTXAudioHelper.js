const { getPollyParams } = require('./getPollyParams');
const { generateAudio } = require('./polly');

/**
 * processPPTXAudioHelper helps perform audio conversion for processPPTXFile
 * @param notes[] array of notes to be converted to audio
 * @param finalConfig, @param fileName, @param relPath
 * @resolve Promise
 * @reject Error 
 * @sample processPPTXAudioHelper(['Some text I want to convert'], Json, 'filename', './<path>/);
 */
async function processPPTXAudioHelper (notes, finalConfig, fileName, relPath) {
    return new Promise((resolve)=>{
        promiseArray = [];
        for(i in notes){
            let pollyParams = getPollyParams(`<speak>${notes[i][1]}</speak>`, finalConfig.sharedConfig)
            promiseArray.push(generateAudio(pollyParams, `media${notes[i][0]}`, `${relPath}${fileName}/ppt/media/`));
    
        };
        Promise.all(promiseArray).then((response)=>{
            resolve(response);
        })
    });  
}

module.exports = {
    processPPTXAudioHelper
}