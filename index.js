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
const GIVE_US_RATING ='if you had a good time listening to the river, please dont forget to rate us 5 stars, it would help us improve'



const RIVER_URL = 'https://s3.amazonaws.com/aws-website-muneef-1lay4/river.mp3';

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/lambda/data
//=========================================================================================================================================


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
        console.log('The currently playing stream is nearly complete and the device is ready to receive a new stream');
        
    },
    'AudioPlayer.PlaybackFailed' : function() {
        console.log('Alexa encounters an error when attempting to play a stream');
       
    },
    'LaunchRequest': function () {
      
        console.log("launch req called");
        const speechOutput = 'Playing river sound!';
        const behavior = 'REPLACE_ALL';
        const url = "https://s3.amazonaws.com/aws-website-muneef-1lay4/river.mp3";
        const token = '1234';
        const expectedPreviousToken = 'expectedPreviousStream';
        const offsetInMilliseconds = 0;
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
        console.log("play  intent");

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
    'AMAZON.NextIntent': function(){
        var playBehavior = 'REPLACE_ALL';
        this.attributes['loop'] = true;
        const token = '1234';
        const url = "https://s3.amazonaws.com/aws-website-muneef-1lay4/river.mp3";
        this.response.audioPlayerPlay(playBehavior, url, token, null, 0);
        this.emit(':responseReady');
    },
    'AMAZON.PreviousIntent': function(){
        var playBehavior = 'REPLACE_ALL';
        this.attributes['loop'] = true;
        const token = '1234';
        const url = "https://s3.amazonaws.com/aws-website-muneef-1lay4/river.mp3";
        this.response.audioPlayerPlay(playBehavior, url, token, null, 0);
        this.emit(':responseReady');
    },
    'PlaybackStarted' : function () {
        console.log('session PlaybackStarted!');
    },
    'PlaybackFinished' : function () {
        console.log('session PlaybackFinished!');

    },
    'PlaybackStopped' : function () {
        console.log('session PlaybackStopped!');

    },
    'PlaybackNearlyFinished' : function () {
        console.log('session PlaybackNearlyFinished!');
       // this.response.emit(':play');
       const behavior = 'ENQUEUE';
        const url = "https://s3.amazonaws.com/aws-website-muneef-1lay4/river.mp3";
        const token = '1234';
        const expectedPreviousToken = '1234';
        const offsetInMilliseconds = 0;
        console.log("before audio player called in nearly finish");

        this.response.audioPlayerPlay(behavior, url, token, expectedPreviousToken, 0);
        this.emit(':responseReady');

    },
    'PlaybackFailed' : function () {
        console.log('session PlaybackFailed!');

    }
    
};
/*function playAudio(){
    var playBehavior = 'REPLACE_ALL';
    this.response.audioPlayerPlay(playBehavior, RIVER_URL, 1234, null, 0);
}*/
