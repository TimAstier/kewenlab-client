export type WordsArea = {
  localChars: array;
  currentChars: array;
};

// This is the model of our module state (e.g. return type of the reducer)
export type State = WordsArea;

// Some utility functions that operates on our model