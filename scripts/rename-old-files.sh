#!/bin/bash

for file in src/**/**/**/*.ts
do
  mv "$file" "${file%.ts}.old"
done