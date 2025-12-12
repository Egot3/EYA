echo $(gdbus call --session --dest org.mpris.MediaPlayer2.spotify \
  --object-path /org/mpris/MediaPlayer2 \
  --method org.freedesktop.DBus.Properties.Get \
  "org.mpris.MediaPlayer2.Player" "Position" | grep -oP '<int64\s+\K\d+') 
