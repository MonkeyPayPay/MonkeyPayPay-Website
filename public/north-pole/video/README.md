# Family video (wish-list page)

`family.mp4` = the owner's clips joined back to back, in story order:
1. Mom + Dad (8 s)
2. Paisley + Dusty the dog (15 s)
3. Paisley + Dusty opening the present in her room (10 s)
4. Paisley getting caught by Mom + Dad (10 s)
5. Santa's sleigh → "Merry Christmas! From Paisley & the O'Brien Family" end
   card (6 s; owner's corrected re-make — replaced an earlier version with typos)

All 1280x720, 24 fps, 49 s total. Always rebuild the picture from the original
clips (not from family.mp4) so nothing is compressed twice:

```sh
ffmpeg -i 1.mp4 -i 2.mp4 -i 3.mp4 -i 4.mp4 -i 5.mp4 -filter_complex \
  "[0:v]setsar=1,fps=24[a];[1:v]setsar=1,fps=24[b];[2:v]setsar=1,fps=24[c];[3:v]setsar=1,fps=24[d];[4:v]setsar=1,fps=24[e];[a][b][c][d][e]concat=n=5:v=1:a=0,format=yuv420p[v]" \
  -map "[v]" -c:v libx264 -preset slow -crf 23 -movflags +faststart -an family.mp4
ffmpeg -i family.mp4 -c:v libvpx-vp9 -b:v 0 -crf 36 -row-mt 1 -an family.webm   # fallback
ffmpeg -ss 7.2 -i family.mp4 -frames:v 1 -c:v libwebp -quality 80 poster.webp
```

## Sound (ElevenLabs)

The soundtrack is a separate mix, added on top of the finished video **without
re-encoding the picture** (`-c:v copy`). Everything lives in
`scripts/north-pole-audio/` (outside `public/`, so it isn't deployed):

- `stems/` — the ElevenLabs clips: `music.mp3` (Music API, 50 s instrumental
  Christmas lullaby) + sound effects (Sound Effects API): snore, jingle,
  steps, bark, rip, gasp, creak, uhoh, sleigh, hohoho.
- `gen.sh name seconds "prompt"` — makes one sound effect (needs
  `ELEVENLABS_API_KEY`; skips stems that already exist). Max 4 at once.
- `mix.sh` — builds `mix.wav`: music at -11 dB, ducked under the effects with a
  sidechain compressor, then loudnorm to about -16 LUFS / -1.5 dBTP.

Where each effect lands (seconds on the video):

| time | scene | sound |
| --- | --- | --- |
| 4.3 | Mom + Dad asleep | snoring |
| 7.3 | cut to Paisley | jingle-bell sparkle (wake-up) |
| 8.05 | Paisley runs to the tree | little footsteps |
| 10.3 | Dusty reaches the presents | happy bark |
| 17.5 | carrying the present down the hall | footsteps (same clip, slowed) |
| 23.15 | her room | wrapping paper ripping |
| 26.5 | she holds up the present | delighted gasp |
| 32.85 | door opens | door creak |
| 33.9 | Mom + Dad in the doorway | "uh-oh" sting |
| 43.15 | sparkle → Santa's sleigh card | sleigh bells |
| 45.7 | Merry Christmas card | "Ho ho ho!" |

Remix + mux (after changing timings or stems; in this folder):

```sh
../../../scripts/north-pole-audio/mix.sh   # writes scripts/north-pole-audio/mix.wav
M=../../../scripts/north-pole-audio/mix.wav
ffmpeg -i family.mp4  -i $M -map 0:v -map 1:a -c:v copy -c:a aac -b:a 128k -af apad -shortest -movflags +faststart out.mp4
ffmpeg -i family.webm -i $M -map 0:v -map 1:a -c:v copy -c:a libopus -b:a 96k -af apad -shortest out.webm
mv out.mp4 family.mp4 && mv out.webm family.webm
```

(`-map 0:v` takes only the picture, so re-muxing replaces the old soundtrack.)
If the picture is ever rebuilt from the original clips, re-run the mux above.
