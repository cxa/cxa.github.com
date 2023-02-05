#!/usr/bin/env bash

make
./mksite
make clean

cd ..
postcss ./assets/style.css --no-map -u autoprefixer postcss-preset-env cssnano -o ./assets/style.min.css
terser ./assets/highlight.min.js ./assets/script.js -o ./assets/script.min.js
find . ./posts ./til -name "*.html" -depth 1 -exec html-minifier --collapse-whitespace --remove-comments --remove-optional-tags --remove-redundant-attributes --remove-script-type-attributes --remove-tag-whitespace {} -o {}.tmp \; -exec mv {}.tmp {} \;
