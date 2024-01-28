import { Subtitle, type SytleInfo, type SubtitleElement } from "$utils/types";

export function fromASS(ass: string, framerate: number): Subtitle {
  let lines = ass.split("\n");

  lines = lines.map((line: string) => {
    if (line[line.length - 1] == "\r") {
      line = line.substring(0, line.length - 1);
    }
    return line;
  });

  const subtitle = new Subtitle();
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.substring(0, 5) == "Style") {
      const segments = line.substring(7).split(",");
      const style: SytleInfo = {
        font: segments[1],
        size: segments[2]
      };
      subtitle.styles.set(segments[0], style);
    } else if (line.substring(0, 8) == "Dialogue") {
      const segments = line.substring(10).split(",");
      const subelem: SubtitleElement = {
        layer: Number(segments[0]),
        start: time2frame(segments[1], framerate),
        end: time2frame(segments[2], framerate),
        style: segments[4],
        text: segments[segments.length - 1]
      };
      subtitle.elements.push(subelem);
    }
  }
  return subtitle;
}

function time2frame(time: string, framerate: number): number {
  const segments = time.split(":");
  const seconds = Number(segments[0]) * 3600 + Number(segments[1]) * 60 + Number(segments[2]);
  const frame = Math.round(framerate * seconds);
  return frame;
}
