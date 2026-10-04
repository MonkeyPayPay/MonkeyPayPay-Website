# Family video (wish-list page)

`family.mp4` = the owner's two clips joined back to back (Mom + Dad first, then
Paisley + the dog). Both were 1280x720, 24 fps, no audio. Rebuilt with:

```sh
ffmpeg -i first.mp4 -i second.mp4 -filter_complex \
  "[0:v]setsar=1,fps=24[a];[1:v]setsar=1,fps=24[b];[a][b]concat=n=2:v=1:a=0,format=yuv420p[v]" \
  -map "[v]" -c:v libx264 -preset slow -crf 23 -movflags +faststart -an family.mp4
ffmpeg -ss 7.2 -i family.mp4 -frames:v 1 -c:v libwebp -quality 80 poster.webp
ffmpeg -i family.mp4 -c:v libvpx-vp9 -b:v 0 -crf 36 -row-mt 1 -an family.webm   # fallback
```
