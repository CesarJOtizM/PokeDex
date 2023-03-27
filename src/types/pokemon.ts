export interface PokemonDetailRaw {
  abilities?: Abilities[] | null
  base_experience: number
  forms?: Forms[] | null
  game_indices?: Game_indices[] | null
  height: number
  held_items?: null[] | null
  id: number
  is_default: boolean
  location_area_encounters: string
  moves?: Moves[] | null
  name: string
  order: number
  past_types?: null[] | null
  species: Species
  sprites: Sprites
  stats?: Stat[] | null
  types?: Stat[] | null
  weight: number
}

export interface Abilities {
  ability: Ability
  is_hidden: boolean
  slot: number
}

export interface Ability {
  name: string
  url: string
}

interface Forms {
  name: string
  url: string
}

interface Game_indices {
  game_indices?: GameIndicesEntity[] | null
}

interface GameIndicesEntity {
  game_index: number
  version: Version
}

interface Version {
  name: string
  url: string
}

interface Moves {
  move: MoveLearnMethodOrVersionGroupOrMove
  version_group_details?: VersionGroupDetailsEntity[] | null
}

interface MoveLearnMethodOrVersionGroupOrMove {
  name: string
  url: string
}

interface VersionGroupDetailsEntity {
  level_learned_at: number
  move_learn_method: MoveLearnMethodOrVersionGroupOrMove
  version_group: MoveLearnMethodOrVersionGroupOrMove
}

interface Species {
  name: string
  url: string
}

interface Sprites extends Pictures {
  other: Other
  versions: Versions
}

interface Pictures {
  back_default?: string
  back_female?: string
  back_shiny?: string
  back_shiny_female?: string
  front_default?: string
  front_female?: string
  front_shiny?: string
  front_shiny_female?: string
  front_gray?: string
  front_transparent?: string
  front_shiny_transparent?: string
  back_shiny_transparent?: string
}

interface Other {
  dream_world: DreamWorld
  home: Home
  'official-artwork': OfficialArtwork
}

interface DreamWorld {
  front_default: string
  front_female?: null
}

interface Home {
  front_default: string
  front_female?: null
  front_shiny: string
  front_shiny_female?: null
}

interface OfficialArtwork {
  front_default: string
  front_shiny: string
}

interface Versions {
  'generation-i': GenerationI
  'generation-ii': GenerationII
  'generation-iii': GenerationIII
  'generation-iv': GenerationIV
  'generation-v': GenerationV
  'generation-vi': GenerationVI
  'generation-vii': GenerationVII
  'generation-viii': GenerationVIII
}

interface GenerationI {
  'red-blue': Partial<Pictures>
  yellow: Partial<Pictures>
}

interface GenerationII {
  crystal: Partial<Pictures>
  gold: Partial<Pictures>
  silver: Partial<Pictures>
}

interface GenerationIII {
  emerald: Partial<Pictures>
  'firered-leafgreen': Partial<Pictures>
  'ruby-sapphire': Partial<Pictures>
}

interface GenerationIV {
  ' diamond-pearl': Partial<Pictures>
  'heartgold-soulsilver': Partial<Pictures>
  platinum: Partial<Pictures>
}

interface GenerationV {
  'black-white': Partial<Pictures>
}

interface GenerationVI {
  'omegaruby-alphasapphire': Partial<Pictures>
  'x-y': Partial<Pictures>
}
interface GenerationVII {
  icons: Partial<Pictures>
  'ultra-sun-ultra-moon': Partial<Pictures>
}
interface GenerationVIII {
  icons: Partial<Pictures>
}

interface Stat {
  base_stat: number
  effort: number
  stat: Stat
}
interface Stat {
  name: string
  url: string
}

interface Stat {
  slot: number
  type: Type
}
interface Type {
  name: string
  url: string
}
