"""전시 작품 썸네일 만들기.

    python tools/make_thumbs.py                 # exhibits/*.html 전부
    python tools/make_thumbs.py drone-3d        # 고른 작품만

헤드리스 Edge(없으면 Chrome)로 exhibits/<id>.html#thumb 를 1280x800 으로 찍어
thumbs/<id>.png 로 저장합니다. 움직이는 작품은 주소의 #thumb 를 보고 첫 장면을
고정해 두면 썸네일이 매번 같게 나옵니다(선택 사항).
"""
import os
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
EXHIBITS = ROOT / "exhibits"
THUMBS = ROOT / "thumbs"
CANDIDATES = [
    r"%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe",
    r"%ProgramFiles%\Microsoft\Edge\Application\msedge.exe",
    r"%ProgramFiles%\Google\Chrome\Application\chrome.exe",
    r"%LocalAppData%\Google\Chrome\Application\chrome.exe",
]


def find_browser():
    for c in CANDIDATES:
        p = Path(os.path.expandvars(c))
        if p.exists():
            return str(p)
    for name in ("msedge", "chrome", "google-chrome", "chromium"):
        p = shutil.which(name)
        if p:
            return p
    sys.exit("Edge나 Chrome을 찾지 못했습니다.")


def shoot(browser, page, out, width=1280, height=800, wait_ms=6000):
    out.unlink(missing_ok=True)
    profile = Path(tempfile.gettempdir()) / "anatomy-gallery-thumbs"
    subprocess.run(
        [
            browser,
            "--headless=new",
            "--hide-scrollbars",
            "--no-first-run",
            "--no-default-browser-check",
            "--use-angle=swiftshader",
            "--enable-unsafe-swiftshader",
            "--force-device-scale-factor=1",
            f"--user-data-dir={profile}",
            f"--window-size={width},{height}",
            f"--virtual-time-budget={wait_ms}",
            f"--screenshot={out}",
            page.as_uri() + "#thumb",
        ],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        timeout=180,
        check=False,
    )
    return out.exists()


def main():
    ids = sys.argv[1:] or sorted(p.stem for p in EXHIBITS.glob("*.html"))
    browser = find_browser()
    THUMBS.mkdir(exist_ok=True)
    failed = 0
    for i in ids:
        page = EXHIBITS / f"{i}.html"
        if not page.exists():
            print(f"없음: exhibits/{i}.html")
            failed += 1
            continue
        ok = shoot(browser, page, THUMBS / f"{i}.png")
        print(("저장: " if ok else "실패: ") + f"thumbs/{i}.png")
        failed += not ok
    sys.exit(1 if failed else 0)


if __name__ == "__main__":
    main()
