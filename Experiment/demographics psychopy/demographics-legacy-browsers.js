/********************* 
 * Demographics Test *
 *********************/

// init psychoJS:
const psychoJS = new PsychoJS({
  debug: true
});

// open window:
psychoJS.openWindow({
  fullscr: true,
  color: new util.Color([0, 0, 0]),
  units: 'height',
  waitBlanking: true
});

// store info about the experiment session:
let expName = 'demographics';  // from the Builder filename that created this script
let expInfo = {'participant': '', 'session': '001'};

// Start code blocks for 'Before Experiment'
// schedule the experiment:
psychoJS.schedule(psychoJS.gui.DlgFromDict({
  dictionary: expInfo,
  title: expName
}));

const flowScheduler = new Scheduler(psychoJS);
const dialogCancelScheduler = new Scheduler(psychoJS);
psychoJS.scheduleCondition(function() { return (psychoJS.gui.dialogComponent.button === 'OK'); }, flowScheduler, dialogCancelScheduler);

// flowScheduler gets run if the participants presses OK
flowScheduler.add(updateInfo); // add timeStamp
flowScheduler.add(experimentInit);
flowScheduler.add(demographicsRoutineBegin());
flowScheduler.add(demographicsRoutineEachFrame());
flowScheduler.add(demographicsRoutineEnd());
flowScheduler.add(endRoutineBegin());
flowScheduler.add(endRoutineEachFrame());
flowScheduler.add(endRoutineEnd());
flowScheduler.add(quitPsychoJS, '', true);

// quit if user presses Cancel in dialog box:
dialogCancelScheduler.add(quitPsychoJS, '', false);

psychoJS.start({
  expName: expName,
  expInfo: expInfo,
  resources: [
  ]
});

psychoJS.experimentLogger.setLevel(core.Logger.ServerLevel.EXP);


var frameDur;
function updateInfo() {
  expInfo['date'] = util.MonotonicClock.getDateStr();  // add a simple timestamp
  expInfo['expName'] = expName;
  expInfo['psychopyVersion'] = '2021.1.4';
  expInfo['OS'] = window.navigator.platform;

  // store frame rate of monitor if we can measure it successfully
  expInfo['frameRate'] = psychoJS.window.getActualFrameRate();
  if (typeof expInfo['frameRate'] !== 'undefined')
    frameDur = 1.0 / Math.round(expInfo['frameRate']);
  else
    frameDur = 1.0 / 60.0; // couldn't get a reliable measure so guess

  // add info from the URL:
  util.addInfoFromUrl(expInfo);
  
  return Scheduler.Event.NEXT;
}


var demographicsClock;
var loading;
var endClock;
var text;
var globalClock;
var routineTimer;
function experimentInit() {
  // Initialize components for Routine "demographics"
  demographicsClock = new util.Clock();
  loading = new visual.TextStim({
    win: psychoJS.window,
    name: 'loading',
    text: 'Loading...',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  // Initialize components for Routine "end"
  endClock = new util.Clock();
  text = new visual.TextStim({
    win: psychoJS.window,
    name: 'text',
    text: '',
    font: 'Arial',
    units: 'norm', 
    pos: [0, 0], height: 0.1,  wrapWidth: undefined, ori: 0,
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  // Create some handy timers
  globalClock = new util.Clock();  // to track the time since experiment started
  routineTimer = new util.CountdownTimer();  // to track time remaining of each (non-slip) routine
  
  return Scheduler.Event.NEXT;
}


var t;
var frameN;
var continueRoutine;
var params;
var continue_routine;
var demographicsComponents;
function demographicsRoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'demographics'-------
    t = 0;
    demographicsClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    expInfo['xRes'] = screen.width;
    expInfo['yRes'] = screen.height;
    
    let src = ('demographics.html?xRes='+expInfo['xRes']+'&yRes='+expInfo['yRes']);
    
    params = {};  // Results added here after form is submitted
    continue_routine = true; // Routines can't be ended from within Begin Routine
    $(document).ready(function() {
        // Add custom contents from html file using an iframe:
        $('body').append('<div id="iframe-o" style="visibility: hidden; position: relative; display: table; margin: auto;"><div id="iframe-m" style="display: table-cell; vertical-align: middle;"><div id="iframe-i" style="display: inline-block; width:100%; overflow-y: auto; overflow-x: hidden;"><iframe id="iframe" src="'+src+'" frameborder="0" style="width: 100%"></iframe></div></div></div>');
    
        $('#iframe').on('load',function(iframe){
            // Auto-adjust iframe size:
            // Auto-adjust iframe size:
            $(this).contents().find('html').css({ 'display': 'table', 'width': '100%', 'overflow-x': 'hidden' });
            $('#iframe-o').height($(window).height()-20, true);
            $('#iframe-m').width($(this).contents().find('html').width()+100);
            $('#iframe-i').height ( Math.min ( $(this).contents().find('html').height()+20, $(window).height()-20 ), true );
            $(this).height($(this).contents().find('html').height());
            $('#iframe-o').css('visibility','visible');
    
            // If iframe contains a form, then capture its output:
            $(this).contents().find('form').on('submit',function(e){
                e.preventDefault();
                $.each($(this).serializeArray(),function(i, param){
                    params[param.name] = param.value;
                    psychoJS.experiment.addData(param.name, param.value);
                });
                console.log ( 'DEBUG:FRM', params );
                // Remove iframe and continue to next routine when done:
                $('#iframe-o').remove();
                continue_routine = false;
            });
        });
    });
    //$('#iframe').attr( 'src', function(i,val){ return val;} );
    // keep track of which components have finished
    demographicsComponents = [];
    demographicsComponents.push(loading);
    
    demographicsComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function demographicsRoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'demographics'-------
    // get current time
    t = demographicsClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *loading* updates
    if (t >= 0.0 && loading.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      loading.tStart = t;  // (not accounting for frame time here)
      loading.frameNStart = frameN;  // exact frame index
      
      loading.setAutoDraw(true);
    }

    continueRoutine = continue_routine;
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    demographicsComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function demographicsRoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'demographics'-------
    demographicsComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // expInfo variables appear on every line in the data file
    // after they are created.
    expInfo['gender'] = psychoJS.experiment._currentTrialData['gender'];
    expInfo['gender_text'] = psychoJS.experiment._currentTrialData['gender_text'];
    expInfo['age'] = psychoJS.experiment._currentTrialData['age'];
    expInfo['student'] = psychoJS.experiment._currentTrialData['student'];
    expInfo['english'] = psychoJS.experiment._currentTrialData['english'];
    // the Routine "demographics" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var endComponents;
function endRoutineBegin(snapshot) {
  return function () {
    //------Prepare to start Routine 'end'-------
    t = 0;
    endClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    text.setText(((((((((("The following variables will be added to the data file from this point onwards:\n\ngender: " + expInfo["gender"]) + "\ngender_text: ") + expInfo["gender_text"]) + "\nage: ") + expInfo["age"]) + "\nstudent: ") + expInfo["student"]) + "\nenglish: ") + expInfo["english"]));
    // keep track of which components have finished
    endComponents = [];
    endComponents.push(text);
    
    endComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function endRoutineEachFrame(snapshot) {
  return function () {
    //------Loop for each frame of Routine 'end'-------
    // get current time
    t = endClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text* updates
    if (t >= 0.0 && text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text.tStart = t;  // (not accounting for frame time here)
      text.frameNStart = frameN;  // exact frame index
      
      text.setAutoDraw(true);
    }

    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    endComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function endRoutineEnd(snapshot) {
  return function () {
    //------Ending Routine 'end'-------
    endComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // the Routine "end" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


function endLoopIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        const thisTrial = snapshot.getCurrentTrial();
        if (typeof thisTrial === 'undefined' || !('isTrials' in thisTrial) || thisTrial.isTrials) {
          psychoJS.experiment.nextEntry(snapshot);
        }
      }
    return Scheduler.Event.NEXT;
    }
  };
}


function importConditions(currentLoop) {
  return function () {
    psychoJS.importAttributes(currentLoop.getCurrentTrial());
    return Scheduler.Event.NEXT;
    };
}


function quitPsychoJS(message, isCompleted) {
  // Check for and save orphaned data
  if (psychoJS.experiment.isEntryEmpty()) {
    psychoJS.experiment.nextEntry();
  }
  
  
  psychoJS.window.close();
  psychoJS.quit({message: message, isCompleted: isCompleted});
  
  return Scheduler.Event.QUIT;
}
