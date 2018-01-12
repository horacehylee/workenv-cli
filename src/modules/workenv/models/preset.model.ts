import { Command } from "./command.model";

export class Preset {
  name: string;
  programs?: string[];
  commands?: Command[];
}
