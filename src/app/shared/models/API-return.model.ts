import { Character } from "./Character.model"
import { Episode } from "./Episode.model"
import { LocationRickMorty } from "./Location.model"

export interface Return {
    info: {
        count: number,
        pages: number,
        next: string,
        prev: string
      },
      results: Character[] | Episode[] | LocationRickMorty[]
    error?: Object
}
