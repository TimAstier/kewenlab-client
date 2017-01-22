This is especially useful if you are using TypeScript or Flow.
export type TextEditor = {
  localContent: string;
  currentContent: string;
};

// This is the model of our module state (e.g. return type of the reducer)
export type State = TextEditor;

// Some utility functions that operates on our model
