#!/bin/bash
for f in *.jpg
do
    NAME=`echo "$f" | cut -d'.' -f1`
    EXTENSION=`echo "$f" | cut -d'.' -f2`
    convert $NAME.$EXTENSION -crop 5x5@ +repage +adjoin split/$NAME.segment%d.$EXTENSION
    convert $NAME.$EXTENSION -resize 600x600 -colors 256 lowres/$NAME.jpg
done