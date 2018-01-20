# workenv-cli

[![npm version](https://badge.fury.io/js/workenv-cli.svg)](https://badge.fury.io/js/workenv-cli)
[![Coverage Status](https://coveralls.io/repos/github/horacehylee/workenv-cli/badge.svg?branch=master&service=github)](https://coveralls.io/github/horacehylee/workenv-cli?branch=master&service=github)

## Installation

NPM
```
$ npm install -g workenv-cli
```

Yarn
```
$ yarn global add workenv-cli
```

## Usage

### Programs

#### Add Program

##### With program path

```
workenv program add C:\\...\TelegramDesktop\Telegram.exe
> What do you want to call the program? (telegram):
```

##### Without program path

```
workenv program add
> What do you want to call the program? :
> What is the program path?:
```

#### List Programs

```
workenv program
workenv program list
workenv program ls
```

#### Remove Program

```
workenv program remove telegram
```

#### Run Program

```
workenv program run telegram
```

### Kill Program

```
workenv program kill telegram
```

### Preset Management

#### Add Preset

```
workenv add <preset_name>
```

#### Edit Preset

Can enable or disable program for the preset.

```
workenv edit <preset_name>
> Select the program to be included:
```

#### View Preset

```
workenv view <preset_name>
```

#### List Presets

```
workenv list
workenv ls
```

#### Remove Preset

```
workenv remove <preset_name>
workenv rm <preset_name>
```

### Preset Usage

#### Start preset

It will start all the programs enabled for the preset. If the program is already opened, it will be ignored.

```
workenv
workenv start <preset_name>
workenv <preset_name> ...<more_preset_names>
```

#### Exit preset

It will close all programs listed for the preset.

```
workenv exit <preset_name>
```

## License

MIT © [Horace Lee](https://github.com/horacehylee)
