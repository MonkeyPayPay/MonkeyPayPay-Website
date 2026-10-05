#!/bin/bash
# usage: gen.sh name seconds "prompt"
out="stems/$1.mp3"; [ -s "$out" ] && { echo "skip $out"; exit 0; }
body=$(python3 -c 'import json,sys;print(json.dumps({"text":sys.argv[2],"duration_seconds":float(sys.argv[1]),"prompt_influence":0.6}))' "$2" "$3")
code=$(curl -s -o "$out" -w "%{http_code}" -X POST "https://api.elevenlabs.io/v1/sound-generation?output_format=mp3_44100_128" -H "xi-api-key: $ELEVENLABS_API_KEY" -H "Content-Type: application/json" -d "$body")
echo "$1 -> $code $(stat -c%s "$out")"; [ "$code" = 200 ] || { cat "$out"; rm -f "$out"; }
