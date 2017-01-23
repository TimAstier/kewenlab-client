export type CharsArea = {
  localChars: array;
  currentChars: array;
  charsToDelete: array;
};

// This is the model of our module state (e.g. return type of the reducer)
export type State = CharsArea;

// Some utility functions that operates on our model
