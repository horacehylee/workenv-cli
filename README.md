# workenv-cli

## Installation

```
$ npm install -g workenv-cli
```

## Usage

### Programs

#### Register Program

With program path

```
workenv program register "C:\\...\TelegramDesktop\Telegram.exe"
> What do you want to call the program? (telegram):
```

Without program path

```
workenv program register
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
workenv
workenv list
workenv ls
```

### Preset Usage

Start preset

It will start all the programs enabled for the preset. If the program is already opened, it will be ignored.

```
workenv <preset_name>
```

Exit preset

It will close all programs listed for the preset.

```
workenv exit <preset_name>
```

## License

MIT © [Horace Lee](https://github.com/horacehylee)
