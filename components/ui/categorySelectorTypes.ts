export type Choice = {
  id: string;
  label: string;
};

export type SelectorConfig = {
  id: string;
  choices: Choice[];
};

export type Selections = Record<string, string | null>;
