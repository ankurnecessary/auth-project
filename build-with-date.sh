#!/bin/bash
# `chmod +x build-with-date.sh` - You have to run this command once before using `npm run build:stats` in the console

# Prepending the current date to temp-build-stats.txt
echo "=============================================================================" >> temp-build-stats.txt
date >> temp-build-stats.txt
echo "=============================================================================" >> temp-build-stats.txt
echo " " >> temp-build-stats.txt

# Run the build and store the output in a temporary file
npx next build >> temp-build-stats.txt

# Prepend temp-build-stats.txt to the build-stats.txt and generate new-build-stats.txt with the content
cat temp-build-stats.txt build-stats.txt > new-build-stats.txt
# Copy the content of new-build-stats.txt to build-stats.txt and deleting new-build-stats.txt
mv new-build-stats.txt build-stats.txt
# Deleting temp-build-stats.txt
rm temp-build-stats.txt