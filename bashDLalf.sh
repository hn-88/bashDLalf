#!/bin/bash

i=1
for line in $(cat /root/dlist.txt)
do
  #echo $line
  fname=$(cut -d '/' -f 10 <<< $line |  cut -d '?' -f 1 )
  #echo $fname
  wget $line -O $fname
  i=$((i+1))
  echo $i
done
