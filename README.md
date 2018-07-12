<p align="center">
	<a href="https://zenroom.dyne.org">
		<img src="https://cdn.rawgit.com/DECODEproject/zenroom/develop/docs/logo/zenroom.svg" width="300" alt="zenroom studio">
	</a>
</p>

<p align="center">
  <a href="https://github.com/DECODEproject/zenroom-studio/releases/latest">
		<img src="https://img.shields.io/github/release/DECODEproject/zenroom-studio/all.svg"
			 alt="GitHub (pre-)release">
	</a>
  <a href="https://greenkeeper.io/">
		<img src="https://badges.greenkeeper.io/DECODEproject/zenroom-studio.svg"
			 alt="Greenkeeper badge">
	</a>
	<a href="https://travis-ci.org/DECODEproject/zenroom-studio">
		<img src="https://travis-ci.org/DECODEproject/zenroom-studio.svg?branch=master"
			 alt="Build Status">
	</a>
  <a href="https://app.fossa.io/projects/git%2Bgithub.com%2FDECODEproject%2Fzenroom-studio?ref=badge_shield" alt="FOSSA Status">
    <img src="https://app.fossa.io/api/projects/git%2Bgithub.com%2FDECODEproject%2Fzenroom-studio.svg?type=shield"/>
  </a>
  <a href="https://ci.appveyor.com/project/puria/zenroom-studio-02nrq">
		<img src="https://ci.appveyor.com/api/projects/status/kpd2m3ow42tns5vi?svg=true"
			 alt="Build Status">
	</a>
  <a href="https://dyne.org">
    <img src="https://img.shields.io/badge/%3C%2F%3E%20with%20%E2%9D%A4%20by-Dyne.org-blue.svg" alt="Dyne.org">
  </a>
</p>


# Zenroom Studio

Zenroom Studio is a multiplatform (Gnu+Linux, Windows, macOS) IDE designed specifically to work with [Zenroom](https://github.com/DECODEproject/zenroom)

The main use case for Zenroom is that of **distributed computing** of untrusted code where advanced cryptographic functions are required, for instance it can be used as a distributed ledger implementation (also known as **blockchain smart contracts**).

Zenroom and Zenroom Studio are software in **ALPHA stage** and are part of the [DECODE project](https://decodeproject.eu) about data-ownership and [technological sovereignty](https://www.youtube.com/watch?v=RvBRbwBm_nQ). Our effort is that of improving people's awareness of how their data is processed by algorithms, as well facilitate the work of developers to create along [privacy by design principles](https://decodeproject.eu/publications/privacy-design-strategies-decode-architecture) using algorithms that can be deployed in any situation without any change.

<details>
 <summary><strong>Table of Contents</strong> (click to expand)</summary>

* [Installation](#floppy_disk-installation)
* [Usage](#video_game-usage)
* [Configuration](#wrench-configuration)
* [Notes](#memo-notes)
* [Troubleshooting & debugging](#bug-troubleshooting--debugging)
* [Acknowledgements](#heart_eyes-acknowledgements)
* [License](#briefcase-license)
</details>

***
## :floppy_disk: Installation

### Desktop binaries

To install in on yout desktop please download the following released binaries for you platform on the [release page](https://github.com/DECODEproject/zenroom-studio/releases/latest)

### Development

For developers the easiest way to get up and running is:

1. Checkout and install all the dependencies

```bash
git clone https://github.com/DECODEproject/zenroom-studio.git
cd zenroom-studio
yarn
```

2. Run Zenroom Studio
```bash
yarn start
```

***
## :video_game: Usage

***
## :wrench: Configuration
As for now the software has no configuration. They are planned soon to be added, as soon as they are available all the options will be listed here.

***
## :memo: Notes

### Packaging
To build the packages for your platform there are some commands available listed below. Please note that in order to build the *windows executable* you need [Wine](https://www.winehq.org/) installed and configured, and for build the *mac .dmg package* you need to run the command on a macOS operating system.

#### :apple: macOS

`yarn package-mac`


#### :penguin: Gnu+Linux

`yarn package-linux`

#### :checkered_flag: Windows

`yarn package-win`

#### To build all platforms

`yarn package-all`


### Linting
All the code is configured to be linted with [ESLint](https://eslint.org/). So especially for new code contributions is preferrable to run and fix the lint suggestions.

#### Javascript
* Run the linter
`yarn lint`

* Automagically fix lint suggestions
`yarn lint-fix`

#### CSS
* Run the linter
`yarn lint-styles`

* Automagically fix lint suggestions
`yarn lint-styles-fix`


***
## :bug: Troubleshooting & debugging

### Debug mode
To run Zenroom Studio in debug mode you'll need first to install it on your local machine following the instructions listed in [Installation#Development](#development)
and after run

`yarn run dev`

This will enable the inspector in electron/chrome and gives you more verbose output on the console.

### Common problems
* `error eslint@5.1.0: The engine "node" is incompatible with this module. Expected version "^6.14.0 || ^8.10.0 || >=9.10.0".` 
You need to upgrade you node version to a newer version. Take a look [here](https://davidwalsh.name/upgrade-nodejs).

***
## :heart_eyes: Acknowledgements

Copyright (C) 2018 by [Dyne.org](https://www.dyne.org) foundation, Amsterdam

Designed, written and maintained by Puria Nafisi Azizi.

Special thanks to Federico Bonelli and Jaromil for their expert reviews.

This software used as a starting point the awesome [electron react boilerplate](https://github.com/chentsulin/electron-react-boilerplate) by @chentsulin

<img src="https://zenroom.dyne.org/img/ec_logo.png" class="pic" alt="Project funded by the European Commission">

This project is receiving funding from the European Union’s Horizon 2020 research and innovation programme under grant agreement nr. 732546 (DECODE).

***
## :briefcase: License

    Zenroom Studio. The Zencode IDE
    
    Copyright (C) 2018  Dyne.org foundation, Amsterdam

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published
    by the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
