#!/usr/bin/env bash

make
./mksite
make clean

postcss ../assets/style.css --no-map -u autoprefixer postcss-preset-env cssnano -o ../assets/style.min.css
html-minifier --collapse-whitespace --remove-comments --remove-optional-tags --remove-redundant-attributes --remove-script-type-attributes --remove-tag-whitespace --input-dir ../posts --output-dir ../posts_ && rm -rf ../posts && mv ../posts_ ../posts
html-minifier --collapse-whitespace --remove-comments --remove-optional-tags --remove-redundant-attributes --remove-script-type-attributes --remove-tag-whitespace --input-dir ../til --output-dir ../til_ && rm -rf ../til && mv ../til_ ../til
