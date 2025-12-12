#!/bin/bash

#echo "I do exist"

SPOTIFY_DATA=$(dbus-send --print-reply --dest=org.mpris.MediaPlayer2.spotify /org/mpris/MediaPlayer2 org.freedesktop.DBus.Properties.Get string:"org.mpris.MediaPlayer2.Player" string:"Metadata")

CREATOR=$(echo "$SPOTIFY_DATA" | grep -C2 "xesam:artist" | grep "string" | grep -v "xesam:artist" | cut -d'"' -f2)	#ts must be changed
TITLE=$(echo "$SPOTIFY_DATA" | grep -C2 "xesam:title" | grep "string" | grep -v "xesam:title" | cut -d'"' -f2)
ALBUM=$(echo "$SPOTIFY_DATA" | grep -C1 "xesam:album" | grep "string" | grep -v "xesam:album" | cut -d'"' -f2)
COVER_URL=$(echo "$SPOTIFY_DATA" | grep -C2 "mpris:artUrl" | grep "string" | grep -v "mpris:artUrl" | cut -d'"' -f2)
TECHNICAL_RATING=$(echo "$SPOTIFY_DATA" | grep -C2 'xesam:autoRating' | grep "double" | grep -oP '[0-1.0-9]+')
LENGTH=$(echo "$SPOTIFY_DATA" | grep -C2 'mpris:length' | grep "uint64" | grep -oP '[0-9]+')

jq -n '{creator:$CREATOR, title:$TITLE, album:$ALBUM, coverUrl:$COVER_URL, autoRate:$TECHNICAL_RATING, length:$LENGTH}' --arg CREATOR "$CREATOR" --arg TITLE "$TITLE" --arg ALBUM "$ALBUM" --arg COVER_URL "$COVER_URL" --arg TECHNICAL_RATING "$TECHNICAL_RATING" --arg LENGTH "${LENGTH:3}"
