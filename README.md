# gas-scripts

Just a small home for the scripts that I'm using behind my Google Sheets.  google.py needs to be updated to use https://cocpy.readthedocs.io/en/stable/ which would save a few lines of code and save a bunch of time.  Though since this just runs a few times a day in the background, speed isn't a big deal for me.

## google.py
Pulls API data from Supercell, organizes a bit of the data*, and sends it to a Google Sheet as json

## doPost.gs
Required of all Google Apps Scripts web apss (that or doGet.gs).  This file basically receives the json, checks to see if it is the basic member data from the clan endpoint or if it's the more details player info from the player endpoint, then sends it to cocapi.gs for processing.

## cocapi.gs
This is where the magic happens.  This script goes through all the player data received and puts it on a sheet.
