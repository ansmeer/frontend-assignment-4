export type PokemonList = {
  count: number;
  next?: string;
  previous?: string;
  results: Pokemon[];
};

export type Pokemon = {
  name: string;
  url: string;
};
