export type Sidebar = {
  textItems: [];
  currentTextId: integer;
};

// This is the model of our module state (e.g. return type of the reducer)
export type State = Sidebar;

// Some utility functions that operates on our model
