"""Build walkthrough.gif: headless-Chrome screenshots of the running app,
framed with a browser bar (real URL) and a caption. Needs the API on :3001
and the Vite dev server on :5180 (npm run dev -- --port 5180)."""
import subprocess, sys, os
from PIL import Image, ImageDraw, ImageFont

OUT = sys.argv[1]
SHOTS = os.environ.get("SHOTS_DIR", "/tmp")
BASE = "http://localhost:5180"
W, H, BAR, CAP = 1000, 620, 44, 44
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

def font(size):
    for p in ["/System/Library/Fonts/Supplemental/Arial.ttf", "/System/Library/Fonts/Helvetica.ttc"]:
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()

def shoot(path, name):
    out = os.path.join(SHOTS, name + ".png")
    subprocess.run([CHROME, "--headless", "--disable-gpu", "--hide-scrollbars",
                    f"--screenshot={out}", f"--window-size={W},{H}",
                    "--virtual-time-budget=9000", BASE + path],
                   check=True, capture_output=True)
    return Image.open(out).convert("RGB").resize((W, H))

def frame(content, path, caption):
    img = Image.new("RGB", (W, BAR + H + CAP), (255, 255, 255))
    d = ImageDraw.Draw(img)
    d.rectangle([0, 0, W, BAR], fill=(222, 225, 230))
    d.rounded_rectangle([90, 8, W - 20, BAR - 8], 12, fill=(255, 255, 255))
    d.text((106, BAR // 2), "localhost:5180" + path, font=font(15), fill=(60, 64, 72), anchor="lm")
    img.paste(content, (0, BAR))
    d.rectangle([0, BAR + H, W, BAR + H + CAP], fill=(30, 34, 44))
    d.text((W // 2, BAR + H + CAP // 2), caption, font=font(17), fill=(240, 242, 245), anchor="mm")
    return img

steps = [
    ("/", "home", "Home: pick one of four venues on the interactive map"),
    ("/locations/1", "loc1", "Click a venue: its own page lists that venue's events from the database"),
    ("/locations/4", "loc4", "Each location has its own URL (/locations/4)"),
    ("/events", "events", "Events page: all events, filter by venue, live countdowns, past events marked"),
]
frames = [frame(shoot(p, n), p, c) for p, n, c in steps]
frames[0].save(OUT, save_all=True, append_images=frames[1:], duration=2800, loop=0, optimize=True)
print("wrote", OUT, len(frames), "frames")
