#!/bin/bash
# Builds mix.wav (49.21 s) from the ElevenLabs stems. Times in ms on the video timeline.
set -e
cd "$(dirname "$0")"
ffmpeg -y -v error \
 -i stems/music.mp3 -i stems/snore.mp3 -i stems/jingle.mp3 -i stems/steps.mp3 -i stems/bark.mp3 -i stems/steps.mp3 \
 -i stems/rip.mp3 -i stems/gasp.mp3 -i stems/creak.mp3 -i stems/uhoh.mp3 -i stems/sleigh.mp3 -i stems/hohoho.mp3 -filter_complex "
[0:a]atrim=0:49.21,asetpts=N/SR/TB,volume=-11dB,afade=t=in:d=1.2,afade=t=out:st=47.4:d=1.8[mus];
[1:a]volume=-7dB,afade=t=out:st=2.9:d=0.8,adelay=4300|4300[snore];
[2:a]volume=-5dB,adelay=7300|7300[jingle];
[3:a]volume=+6dB,adelay=8050|8050[steps];
[4:a]volume=-8dB,adelay=10300|10300[bark];
[5:a]volume=+1dB,atempo=0.85,afade=t=out:st=3.0:d=0.6,adelay=17500|17500[hall];
[6:a]volume=-2dB,adelay=23150|23150[rip];
[7:a]volume=-12dB,adelay=26500|26500[gasp];
[8:a]volume=-9dB,adelay=32850|32850[creak];
[9:a]volume=-12dB,adelay=33900|33900[uhoh];
[10:a]volume=-9dB,afade=t=in:d=0.4,afade=t=out:st=4.6:d=1.4,adelay=43150|43150[sleigh];
[11:a]volume=-11dB,adelay=45700|45700[ho];
[snore][jingle][steps][bark][hall][rip][gasp][creak][uhoh][sleigh][ho]amix=inputs=11:normalize=0:duration=longest,apad=whole_dur=49.21,atrim=0:49.21,asplit[sfx][sc];
[mus][sc]sidechaincompress=threshold=0.03:ratio=4:attack=20:release=400:makeup=1[duck];
[duck][sfx]amix=inputs=2:normalize=0:duration=first,aresample=48000,loudnorm=I=-16:TP=-1.5:LRA=11,aresample=48000,apad=whole_dur=49.208,atrim=0:49.208,afade=t=out:st=48.6:d=0.6[out]" \
 -map "[out]" -ac 2 -ar 48000 mix.wav
