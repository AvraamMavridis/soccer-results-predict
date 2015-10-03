'use strict';

var csv = require('csv-to-json');
var _ = require('lodash');
var Promise = require('promise');
var fs = require('fs');

var dclassify = require('dclassify');
var Classifier = dclassify.Classifier;
var DataSet    = dclassify.DataSet;
var Document   = dclassify.Document;

/**
 * Array of filepaths from files with results
 */
var dataSet = fs.readdirSync('./data/').map(function(path) { return `./data/${path}`; });

/**
 * Helper function to delete the properties with undefined value from an object
 * @param {String} filename
 * @return {Object} with filename property
 */
let createObjectToParse = function(filename){
  return { filename };
}

/**
 * Helper function to delete the properties with undefined value from an object
 * @param {Object}
 * @return {Object}
 */
let deleteUndefinedValues = function(obj){
  _.keys(obj).forEach(function(key){
    if(Boolean(obj[key])){}
    else{
      delete obj[key];
    }
  });

  return obj;
}

/**
 * Parses one individual file removing undefined values, Divition and Date from the results
 * @param {Object} Object with filename property
 * @return {promise} Array of results
 */
let parseResults = function(objectToParse){
  let promise = new Promise(function(resolve, reject){
    csv.parse(objectToParse, function(err, json){
      if(err) reject(err);
      else{
        let results = _.map(json, function(result){
          let res = _.omit(result, ['Div', 'Date']);
          res = deleteUndefinedValues(res);
          return res;
        });

        resolve(results);
      }
    });
  });
  return promise;
}

/**
 * Parses the results per file
 * @param {array} Array of results per file
 * @return {array} Array of results
 */
let parseResultsPerFile = function(results){
  return _.map(results, function(result){

    if(_.includes(['H', 'D', 'A'], result.FTR)){

      let resultCharacteristics = [];
      _.keys(result).forEach(function(key){
        resultCharacteristics.push(`${key} : ${result[key]}`);
      });

      let item = new Document('res' + Math.random(), resultCharacteristics);
      item.finalResult = result.FTR;
      return item;
    }
  });
}

/**
 * Creates a new classifier, add the results on it and returns a promise
 * @return {promise} When it will be resolved returns the classifier
 */
let addResultsToClassifier = function(){

  let classifierData = new DataSet();
  let classifier = new Classifier();

  let arrayOfPromises = _.map(dataSet, function(filepath){
    return parseResults(createObjectToParse(filepath));
  });

  return Promise.all(arrayOfPromises).then(function(results){
    results = _.flatten(results);
    results = parseResultsPerFile(results, classifierData);

    let homeWins = _.filter(results, { finalResult: 'H' });
    let awayWins = _.filter(results, { finalResult: 'A' });
    let draws = _.filter(results, { finalResult: 'D' });

    classifierData.add('H', homeWins);
    classifierData.add('A', awayWins);
    classifierData.add('D', draws);

    classifier.train(classifierData);

    return classifier;
  });
}

/**
 * Predict the result of a match.
 * Reads HomeTeam, AwayTeam from the command line
 */
let predictResults = function(){
  let HomeTeam = process.argv[2];
  let AwayTeam = process.argv[3];
  addResultsToClassifier()
    .then(function(classifier){
      let testDoc = new Document('testDoc', [`HomeTeam : ${HomeTeam}`, `AwayTeam : ${AwayTeam}`]);
      let result1 = classifier.classify(testDoc);
      console.log(result1);
    });
}();
