export interface Ship {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Alien {
  x: number;
  y: number;
  width: number;
  height: number;
  alive: boolean;
}

export interface Bullet {
  x: number;
  y: number;
  used: boolean;
}

export interface Nuke {
  x: number;
  y: number;
  used: boolean;
}