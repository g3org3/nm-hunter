[![Build Status][travis]][travis-url]
[![npm package][npm-image]](npm-url)
# nm-hunter
✨💀👻 a node_modules hunter cli

## Getting Started
You will need Node >= 6 installed. [How do I install node? click here to find out about nvm](https://github.com/creationix/nvm#installation)

### Installation
Install the yagg globally
```sh
npm install -g nm-hunter
```

# Usage
```sh
$ nm-hunter

Searching for node_modules... 🔦
Working... this might take some minutes ⏱

⚡️ Found!
-------------
⚠️ 134M	./node_modules
✅   0B	./src/__mocks__/node_modules
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
