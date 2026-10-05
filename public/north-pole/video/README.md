# Family video (wish-list page)

`family.mp4` = the owner's clips joined back to back, in story order:
1. Mom + Dad (8 s)
2. Paisley + Dusty the dog (15 s)
3. Paisley + Dusty opening the present in her room (10 s)
4. Paisley getting caught by Mom + Dad (10 s)
5. Santa's sleigh → "Merry Christmas! From Paisley & the O'Brien Family" end
   card (6 s; owner's corrected re-make — replaced an earlier version with typos)

All 1280x720, 24 fps, no audio (49 s total). Always rebuild from the original
clips (not from family.mp4) so nothing is compressed twice:

```sh
ffmpeg -i 1.mp4 -i 2.mp4 -i 3.mp4 -i 4.mp4 -i 5.mp4 -filter_complex \
  "[0:v]setsar=1,fps=24[a];[1:v]setsar=1,fps=24[b];[2:v]setsar=1,fps=24[c];[3:v]setsar=1,fps=24[d];[4:v]setsar=1,fps=24[e];[a][b][c][d][e]concat=n=5:v=1:a=0,format=yuv420p[v]" \
  -map "[v]" -c:v libx264 -preset slow -crf 23 -movflags +faststart -an family.mp4
ffmpeg -i family.mp4 -c:v libvpx-vp9 -b:v 0 -crf 36 -row-mt 1 -an family.webm   # fallback
ffmpeg -ss 7.2 -i family.mp4 -frames:v 1 -c:v libwebp -quality 80 poster.webp
```
