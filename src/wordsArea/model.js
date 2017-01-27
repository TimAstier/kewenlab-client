export type WordsArea = {
  localChars: array;
  currentChars: array;
  wordsToDelete: array;
  visibilityFilter: string;
};

// This is the model of our module state (e.g. return type of the reducer)
export type State = WordsArea;

// Some utility functions that operates on our model
