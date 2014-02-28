#!/bin/bash

BASE_DIR=`dirname $0`

$BASE_DIR/../node_modules/jasmine-node/bin/jasmine-node $BASE_DIR/../test/server/ 
