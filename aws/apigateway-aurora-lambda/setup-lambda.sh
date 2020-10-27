#!/bin/bash
set -x 
# Create a lambda
npm init -y
touch index.js
touch data.json
mkdir tests
cd tests
touch index.test.js