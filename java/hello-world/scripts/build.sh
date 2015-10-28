#!/bin/bash
set +e
mkdir -p build/classes
javac -d build/classes -cp .:`find node_modules -name "*.jar" | tr "\n" ":"` lib/**/*.java

#cp or jar to set Main-Class, which is better?
cp -r lib/META-INF build/classes
#jar cfe ./build/lib.jar laat.MyMain -C build/classes/ .

proguard @proguard-rules.pro

mkdir -p dist
cp build/out.jar dist/$(basename ${npm_package_name})-${npm_package_version}.jar
