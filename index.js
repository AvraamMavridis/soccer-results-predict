'use strict';

var csv = require('csv-to-json');
var _ = require('lodash');
var Promise = require('promise');
var Classifier = require('classify.js');

var Rclassifier = new Classifier();

var obj = {
    filename: './data/Greece-2014-2015.csv'
};

var dataSet = [
  './data/Greece-2008-2009.csv',
  './data/Greece-2009-2010.csv',
  './data/Greece-2010-2011.csv',
  './data/Greece-2011-2012.csv',
  './data/Greece-2012-2013.csv',
  './data/Greece-2013-2014.csv',
  './data/Greece-2014-2015.csv',];


let createObjectToParse = function(filename){
  return { filename };
}


let parseResults = function(obj){
  let promise = new Promise(function(resolve, reject){
    csv.parse(obj, function(err, json){
      if(err) reject(err);
      else{
        let results = _.map(json, function(result){ return _.pick(result, ['HomeTeam', 'AwayTeam','FTR','HTR']);});
        resolve(results);
      }
    });
  });
  return promise;
}



let addResultsToClassifierPerFile = function(results, classifier){
  _.forEach(results, function(result){
    if(_.includes(['H', 'D', 'A'], result.FTR)){
      console.log(result.FTR);
      classifier.train(result.FTR, `${result.HomeTeam.split(' ').join('')} ${result.AwayTeam.split(' ').join('')}`);
    }
  });
}

let addResultsToClassifier = function(classifier){
  let arrayOfPromises = _.map(dataSet, function(filepath){
    return parseResults(createObjectToParse(filepath));
  });

  return Promise.all(arrayOfPromises).then(function(results){
    results = _.flatten(results);
    addResultsToClassifierPerFile(results, classifier);
    return classifier;
  });
}



let predictResult = function(teamA, teamB){
  addResultsToClassifier(Rclassifier)
    .then(function(classifier){
      let matchResult = classifier.classify(`${teamA} ${teamB}`);
      console.log(classifier)
      console.log(`Match result: ${matchResult}`);
    })
}

predictResult('Kavala', 'Olympiakos');
