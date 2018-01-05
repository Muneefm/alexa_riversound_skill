/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = 'amzn1.ask.skill.2384ac28-15c5-4159-9830-e3516c1908d4';

const SKILL_NAME = 'River sound';
const GET_FACT_MESSAGE = "playing  ";
const HELP_MESSAGE = 'You can say open river sound, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye! see you soon!';
const LOOP_ON_MESSAGE = 'Loop turned on!';
const LOOP_OFF_MESSAGE = 'Loop turned off!';
const GIVE_US_RATING ='if you had a good time listening to the river, please dont forget to rate us, it would help us improve'



const RIVER_URL = 'https://s3.amazonaws.com/aws-website-muneef-1lay4/river.mp3';

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/lambda/data
//=========================================================================================================================================
const data = [
    'The first electronic computer ENIAC weighed more than 27 tons and took up 1800 square feet.',
    'Only about 10% of the world’s currency is physical money, the rest only exists on computers.',
    'TYPEWRITER is the longest word that you can write using the letters only on one row of the keyboard of your computer.',
    'Doug Engelbart invented the first computer mouse in around 1964 which was made of wood.',
    'There are more than 5000 new computer viruses are released every month.',
    'Around 50% of all Wikipedia vandalism is caught by a single computer program with more than 90% accuracy.',
    'If there was a computer as powerful as the human brain, it would be able to do 38 thousand trillion operations per second and hold more than 3580 terabytes of memory.',
    'The password for the computer controls of nuclear tipped missiles of the U.S was 00000000 for eight years.',
    'Approximately 70% of virus writers are said to work under contract for organized crime syndicates.',
    'HP, Microsoft and Apple have one very interesting thing in common – they were all started in a garage.',
    'An average person normally blinks 20 times a minute, but when using a computer he/she blinks only 7 times a minute.',
    'The house where Bill Gates lives, was designed using a Macintosh computer.',
    'The first ever hard disk drive was made in 1979, and could hold only 5MB of data.',
    'The Dirty Dozen was the name of a 12 engineer’s group who developed the first IBM computer.',
    'IMDb is one of the oldest websites on the internet, and began on Usenet in 1990 as a list of “actresses with beautiful eyes.”',
    'The woman who rented her garage to Larry Page and Sergey Brin in 1998 when they were creating Google, later became the CEO of YouTube.',
    'Amazon.com did not start as a complete e-commerce business but just as an online bookstore.'

];

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = 'amzn1.ask.skill.2384ac28-15c5-4159-9830-e3516c1908d4';
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {

    'AudioPlayer.PlaybackStarted' : function() {
        console.log('Alexa begins playing the audio stream');
        
    },
    'AudioPlayer.PlaybackFinished' : function() {
    	console.log('The stream comes to an end');
    },
    'AudioPlayer.PlaybackStopped' : function() {
    	console.log('Alexa stops playing the audio stream');
    },
    'AudioPlayer.PlaybackNearlyFinished' : function() {
        console.log('The currently playing stream is nearly complate and the device is ready to receive a new stream');
        
    },
    'AudioPlayer.PlaybackFailed' : function() {
        console.log('Alexa encounters an error when attempting to play a stream');
        this.response.speak(GIVE_US_RATING);
        this.emit(':responseReady');
    },
    'LaunchRequest': function () {
       /* var playBehavior = 'REPLACE_ALL';
       // this.response.speak("this is testing ").listen("test");
       //console.log('audio playing');
       this.attributes['loop'] = true;
        this.response.audioPlayerPlay(playBehavior, RIVER_URL, 1234, null, 0);
        this.emit(':responseReady');
*/
        console.log("launch req called");
        const speechOutput = 'Playing river sound!';
        const behavior = 'REPLACE_ALL';
        const url = "https://s3.amazonaws.com/aws-website-muneef-1lay4/river.mp3";
        const token = '1234';
        const expectedPreviousToken = 'expectedPreviousStream';
        const offsetInMilliseconds = 10000;
        console.log("before audio player called");

        this.response.speak(speechOutput)
                    .audioPlayerPlay(behavior, url, token, null, offsetInMilliseconds);
                    console.log("after audio player called");
                    this.response.cardRenderer(SKILL_NAME, GIVE_US_RATING);
        this.emit(':responseReady');
    },
    'AudioPlayer.ClearQueue' :function(){
        console.log("clear queue");
        this.response.audioPlayerClearQueue("CLEAR_ALL");	
        this.emit(':responseReady');
    },
    //https://s3.amazonaws.com/aws-website-muneef-1lay4/river.mp3
    //https://www.dropbox.com/s/svlvbye8zjp5x51/river.mp3?dl=0
    //https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3
    //https://s3.amazonaws.com/aws-website-muneef-1lay4/SoundHelix-Song-2.mp3
    'play': function () {
      /*  const factArr = data;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        const speechOutput = GET_FACT_MESSAGE + randomFact;

        this.response.cardRenderer(SKILL_NAME, randomFact);
        this.response.speak(speechOutput);*/
        var playBehavior = 'REPLACE_ALL';
        this.attributes['loop'] = true;
        const token = '1234';
        const url = "https://s3.amazonaws.com/aws-website-muneef-1lay4/river.mp3";

        this.response.audioPlayerPlay(playBehavior, url, token, null, 0);

        this.emit(':responseReady');
    },
    'AMAZON.PauseIntent': function () {
       // this.response.audioPlayerStop();
       // this.response.speak(STOP_MESSAGE);
       this.response.audioPlayerStop();
        this.emit(':responseReady');
    },
    'AMAZON.ResumeIntent': function () {
       // this.response.audioPlayerStop();
       // this.response.speak(STOP_MESSAGE);
       var playBehavior = 'REPLACE_ALL';
       this.attributes['loop'] = true;
       const token = '1234';

       this.response.audioPlayerPlay(playBehavior, RIVER_URL, token, null, 0);
        this.emit(':responseReady');
    },
    'AMAZON.LoopOnIntent' : function () { 
        this.attributes['loop'] = true;
        this.response.speak(LOOP_ON_MESSAGE);
        this.emit(':responseReady');
    },
        'AMAZON.LoopOffIntent' : function () {
            this.attributes['loop'] = false;
            this.response.speak(LOOP_OFF_MESSAGE);
            this.emit(':responseReady');
        },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;
        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.audioPlayerStop();
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.audioPlayerStop();
        this.response.speak(STOP_MESSAGE);

        this.emit(':responseReady');
    },
    'SessionEndedRequest': function () {
        console.log('session ended!');
       // this.attributes['endedSessionCount'] += 1;
       this.response.audioPlayerStop();
        this.emit(':responseReady', true); // Be sure to call :saveState to persist your session attributes in DynamoDB
    },
    
};
/*function playAudio(){
    var playBehavior = 'REPLACE_ALL';
    this.response.audioPlayerPlay(playBehavior, RIVER_URL, 1234, null, 0);
}*/
