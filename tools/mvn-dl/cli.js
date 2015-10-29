#!/usr/bin/env node
'use strict';
const meow = require('meow');
const download = require('./');

const cli = meow(`
Usage:
 mvn-dl <artifact> [--repo <url>] [--dest <destination>]

Options:
 -d, --dest  Destination folder
 -r, --reop  Url to the maven repo

Examples:
 # download jar
 mvn-dl org.apache.commons:commons-lang3:3.4

 # download jar to dist
 mvn-dl org.apache.commons:commons-lang3:3.4 -d dist
`);

const artifact = cli.input[0];
if (!artifact) {
	cli.showHelp();
	process.exit(1);
}
const dest = cli.flags.d || cli.flags.dest;
const repo = cli.flags.r || cli.flags.repo;
download(artifact, dest, repo);
