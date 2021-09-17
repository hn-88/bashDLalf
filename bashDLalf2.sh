#!/bin/bash

i=1
while read line
do
  echo "$line"
  fname=$(cut -d '/' -f 10 <<< "$line" |  cut -d '?' -f 1 )
  echo "$fname"
  wget "$line" -O "$fname"
  i=$((i+1))
  echo $i
done < dlist.txt

