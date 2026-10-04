# The family's 3D moves (wish-list page only)

Rigged Tripo models, all on the same 65-bone `mixamorig` skeleton (~1 unit tall):

| file | own clips |
|---|---|
| `paisley.glb` | 22 (dance_01–05, wave_goodbye_02, greet_03, cheer, flip, jump_down, walk, run, laugh_02, swagger, sing_*, angry_*, climb, fall, clap) |
| `dad.glb` | dance_05, dance_03 |
| `mom.glb` | greet_03, laugh_02, clap (frozen) |
| `monkey.glb` | 85 (names end in `.001`) — the MonkeyPayPay mascot |

`moves.json` lists, per character, the clips + seconds to render. A character
with `"lend": "paisley.glb"` borrows Paisley's clips it doesn't have (rotation
tracks only; hip height rescaled to its body). `"scale"` overrides the default
260 px per model unit (the hero monkey uses 330 so she's crisp at hero size).

`render.cjs` renders every move in place (hip travel removed), front view
(`"side": true` = side view, used for Paisley's walk), feet on the bottom edge,
into atlas webps in `public/north-pole/<out>/` and writes
`src/data/family3d.json`, which `src/scripts/family3d.ts` plays on `/north-pole`.
Paisley's walk slides across the page at 0.507 m/s (her measured pace).

```sh
npm i --no-save three@0.170.0          # renderer only, not a site dependency
python3 -m http.server 8765 &           # from the repo root
node scripts/north-pole-3d/render.cjs   # or: … render.cjs monkey dad
```

Owner decision: these 3D animations are used ONLY on the wish-list page
(the monkey may later go site-wide if the owner likes it).
