#!/usr/bin/env bash

shopt -s extglob 
cd js
cp -r !(client|ssr*) ../dist
shopt -u extglob