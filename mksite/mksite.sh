#!/usr/bin/env bash

make
./mksite
make clean

postcss ../assets/style.css --no-map -u autoprefixer postcss-preset-env cssnano -o ../assets/style.min.css
