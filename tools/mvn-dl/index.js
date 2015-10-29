'use strict';
const fs = require('fs');
const path = require('path');
const util = require('util');
const request = require('request');

const parseArtifact = function (name) {
	const parts = name.split(':');
	if (parts.length >= 3) {
		const artifact = {
			groupId: parts[0],
			artifactId: parts[1],
			version: parts[parts.length - 1]
		};
		if (parts.length > 3) {
			artifact.extension = parts[2];
		}
		if (parts.length > 4) {
			artifact.classifier = parts[3];
		}
		return artifact;
	}
	throw new Error('not a maven package name. try <group>:<artifact>:<version>');
};

const filename = function (artifact) {
	const extension = artifact.extension || 'jar';
	if (artifact.classifier) {
		return util.format('%s-%s-%s.%',
				artifact.artifactId,
				artifact.classifier,
				artifact.version,
				extension);
	}
	return util.format('%s-%s.%s',
			artifact.artifactId,
			artifact.version,
			extension);
};

const groupPath = function (artifact) {
	return [artifact.groupId.replace(/\./g, '/'),
		artifact.artifactId,
		artifact.version
	].join('/');
};

const artifactPath = function (artifact) {
	return path.join(groupPath(artifact), filename(artifact));
};

const artifactUrl = function (artifact, repo) {
	repo = repo || 'https://repo1.maven.org/maven2/';
	return repo + artifactPath(artifact);
};

const download = function (artifact, dest, repo) {
	dest = path.join(dest || '', filename(artifact));

	const file = fs.createWriteStream(dest);

	const url = artifactUrl(artifact, repo);
	console.log("GET " + url);
	const sendReq = request.get(url);

	sendReq.pipe(file);

	file.on('finish', () => {
		file.close();
	});

	file.on('error', () => {
		fs.unlink(dest);
	});
};

module.exports = function (artifact, dest, repo) {
	download(parseArtifact(artifact), dest, repo);
};
