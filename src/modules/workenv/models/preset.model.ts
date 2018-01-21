import { Command } from "./command.model";
import { Except } from "./except.model";

export class Preset {
  name: string;
  programs?: string[];
  commands?: Command[];
  except?: Except;
}
