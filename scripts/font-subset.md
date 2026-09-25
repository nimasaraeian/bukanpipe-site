# Rebuilding the UI font subsets

`public/fonts/*.woff2` are subsets of the full faces in `app/fonts/`. The full
Estedad covers 1584 codepoints — Cyrillic, Greek, Latin-Extended and some 700
symbols this site never sets. The subset keeps ASCII, Latin-1, the whole Arabic
block, and the punctuation, arrows and maths the pages actually use, which is a
third off each file.

`lib/fonts/subset-coverage.ts` holds the same ranges the subset was cut to, and
a test walks every string the site ships against them, so a character outside
the subset fails the build rather than quietly rendering in a fallback face.

To rebuild after replacing a source font, or after widening the ranges:

    pip install fonttools brotli
    RANGES="U+0000-00FF,U+0600-06FF,U+200B-200F,U+2010-203A,U+2044,U+2070,\
    U+2074-2079,U+20AC,U+2116,U+2122,U+2190-21AF,U+2212,U+2215,U+2248,U+2260,\
    U+2264-2265,U+03B1-03C9,U+FDFC,U+FFFD"
    python3 -m fontTools.subset app/fonts/Estedad-Variable.woff2 \
      --unicodes="$RANGES" --layout-features='*' --flavor=woff2 \
      --no-hinting --desubroutinize \
      --output-file=public/fonts/estedad-variable.<sha256-first-8>.woff2

`--layout-features='*'` is load-bearing: Persian needs the GSUB features that
join letters, and dropping them leaves the text in unconnected isolated forms.

The filename carries the first 8 characters of the file's sha256 so it can be
served immutably; update the paths in `lib/fonts.ts` and `app/globals.css`, and
the ranges in `lib/fonts/subset-coverage.ts`, whenever the file changes.
