[![Build Status][travis]][travis-url]
[![npm package][npm-image]](npm-url)
# nm-hunter
✨💀👻 a node_modules hunter cli

## Getting Started
You will need Node >= 7 installed. [How do I install node? click here to find out about nvm](https://github.com/creationix/nvm#installation)

### Installation
```sh
npm install -g nm-hunter
```

# Usage
```sh
➜  cd ~
➜  nm-hunter
⠏ Hunting wild node_modules: 102 MB

. . .

⚡️ Found!
------------
⚠️ 134 MB ./node_modules
✅    0 B ./src/__mocks__/node_modules

total used: 134 MB
   it took: 220 milliseconds

. . .

➜  nm-hunter --help

  Usage: nm-hunter [options]


  Options:

    -V, --version  output the version number
    -v, --version  output the version number
    -s, --sort     sort the node_modules in ASC
    -w --warning   only display node_modules above 99M
    -h, --help     output usage information
```

## Development
Fork, then clone the repo:
```sh
git clone https://github.com/your-username/nm-hunter.git
cd nm-hunter
git remote set-url g3 https://github.com/g3org3/nm-hunter.git
npm install
npm link
nm-hunter --help
```

## Changelog
[https://github.com/g3org3/nm-hunter/blob/master/CHANGELOG.md](https://github.com/g3org3/nm-hunter/blob/master/CHANGELOG.md)

## Contributors
* George <7jagjag@gmail.com>

[travis]: https://travis-ci.org/g3org3/nm-hunter.svg?branch=master
[travis-url]: https://travis-ci.org/g3org3/nm-hunter
[npm-image]: https://img.shields.io/npm/v/nm-hunter.svg?style=flat-square
[npm-url]: https://www.npmjs.org/package/nm-hunter
