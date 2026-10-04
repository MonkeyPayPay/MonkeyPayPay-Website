# Paisley's 3D moves (wish-list page only)

`paisley.glb` is Paisley's rigged model exported from Tripo (22 animations
baked in: dance_01–05, wave_goodbye_02, greet_03, cheer, flip, jump_down, walk,
run, laugh_02, swagger, sing_*, angry_*, climb, fall, clap).

`render.cjs` renders the moves listed in `moves.json` (clip name + the
seconds to use) into transparent atlas webps in `public/north-pole/paisley3d/`
and writes `src/data/paisley3d.json`, which `src/scripts/paisley3d.ts` plays on
`/north-pole`. Every move is in place (hip travel removed), front view, and at
the same scale (260 px/m) with her feet on the bottom edge. The walk is a side
view; the page slides her across at 0.507 m/s (her measured walking pace).

To add or change a move:

```sh
npm i --no-save three@0.170.0          # renderer only, not a site dependency
python3 -m http.server 8765 &           # from the repo root
node scripts/north-pole-paisley3d/render.cjs
```

Owner decision: these 3D animations are used ONLY on the wish-list page.
