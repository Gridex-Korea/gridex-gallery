"""해부도 전시관 로컬 서버.

    python serve.py              # http://localhost:8765 을 열고 브라우저를 띄웁니다
    python serve.py --port 8766  # 다른 포트
    python serve.py --no-browser # 브라우저는 띄우지 않습니다
"""
import argparse
import functools
import http.server
import sys
import threading
import webbrowser
from pathlib import Path

ROOT = Path(__file__).resolve().parent


class Handler(http.server.SimpleHTTPRequestHandler):
    # Windows 레지스트리의 MIME 설정에 휘둘리지 않도록 직접 지정합니다
    extensions_map = {
        **http.server.SimpleHTTPRequestHandler.extensions_map,
        ".html": "text/html; charset=utf-8",
        ".js": "text/javascript; charset=utf-8",
        ".css": "text/css; charset=utf-8",
        ".json": "application/json",
        ".png": "image/png",
        ".svg": "image/svg+xml",
    }

    def end_headers(self):
        # 작품을 고친 뒤 새로 고침하면 바로 보이도록 캐시를 끕니다
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def log_request(self, code="-", size="-"):
        if str(code).startswith(("4", "5")):
            super().log_request(code, size)


class Server(http.server.ThreadingHTTPServer):
    # Windows에서는 주소 재사용을 켜면 이미 쓰는 포트에도 붙어 버리므로 끕니다
    allow_reuse_address = sys.platform != "win32"


def main():
    parser = argparse.ArgumentParser(description="해부도 전시관 로컬 서버")
    parser.add_argument("--port", type=int, default=8765)
    parser.add_argument("--no-browser", action="store_true", help="브라우저를 띄우지 않습니다")
    args = parser.parse_args()

    handler = functools.partial(Handler, directory=str(ROOT))
    try:
        httpd = Server(("127.0.0.1", args.port), handler)
    except OSError:
        sys.exit(f"{args.port}번 포트를 쓸 수 없습니다. 다른 번호로 실행하세요: python serve.py --port {args.port + 1}")

    url = f"http://localhost:{args.port}/"
    print(f"해부도 전시관: {url}  (끝내려면 Ctrl+C)", flush=True)
    if not args.no_browser:
        threading.Timer(0.4, webbrowser.open, args=(url,)).start()
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n전시관 서버를 껐습니다.")
    finally:
        httpd.server_close()


if __name__ == "__main__":
    main()
