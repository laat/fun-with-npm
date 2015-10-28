#!/bin/bash
mkdir -p dist
cd dist
curl http://apache.uib.no//commons/lang/binaries/commons-lang3-3.4-bin.tar.gz | tar xzvf - commons-lang3-3.4/commons-lang3-3.4.jar --strip-components=1
