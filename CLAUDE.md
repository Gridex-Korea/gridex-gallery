# 해부도 전시관 (anatomy-gallery)

Claude와 만든 해부도·3D 구성도를 모아 실행하는 로컬 정적 사이트. 빌드도 패키지도 없다(글꼴과 three.js만 CDN).

- 실행: `start.cmd` 또는 `python serve.py` → http://localhost:8765 (`--port`, `--no-browser`). Claude 미리보기는 `.claude/launch.json`의 `gallery` 구성.
- `index.html`을 파일로 바로 열어도 동작해야 한다. 그래서 전시 목록은 fetch하지 않고 `<script src="exhibits.js">`로 읽는다.
- 구조: `index.html`(카드 홈) · `view.html?id=<id>`(위 막대 + iframe) · `exhibits.js`(목록) · `exhibits.local.js`(로컬 전용 목록, git 제외) · `exhibits/<id>.html`(작품) · `thumbs/<id>.png` · `assets/site.css`, `assets/gallery.js`(홈과 보기 화면 공용).

## 작품 추가 순서

1. 원본 확보: claude.ai 아티팩트 링크를 받으면 Artifact 도구 `read`로 HTML을 받는다. 작품은 `exhibits/<id>.html` 한 파일로 완결돼야 한다(따로 열어도 실행). 여러 파일로 게시된 아티팩트(해부도 시리즈처럼 `css/`·`js/`가 따로 있는 것)는 `list`(scope `files`)로 파일 목록을 보고 `read`의 `paths`로 모두 받아 CSS·JS를 한 파일 안에 넣는다.
2. 아티팩트 원본에는 문서 골격이 없다. `<!doctype html>`, `<html lang="ko">`, `<meta charset="utf-8">`, viewport 메타, `<title>`을 붙이고 스타일에 `body{margin:0}`, `[hidden]{display:none!important}`를 넣는다. 게시 골격이 대신 해 주던 기본값이라 빠뜨리면 로컬에서만 깨진다(`hidden` 속성이 안 먹는 등).
3. `exhibits.js`의 `EXHIBITS`에 항목을 추가한다. 도번 `no`는 AG-001부터 차례로 매기고, 홈은 도번 내림차순으로 보여 준다.
4. 움직이는 작품은 `location.hash === "#thumb"`일 때 첫 장면을 고정하게 한다(`exhibits/cheongwadae-3d.html`의 `still` 참고). 해부도 시리즈는 공용 엔진의 `if (still) seek(초)`로 고정할 장면을 고른다.
5. `python tools/make_thumbs.py <id>`로 썸네일을 찍고, 이미지를 직접 열어 확인한 뒤 `thumb.zoom`/`thumb.focus`로 카드 구도를 맞춘다.
6. 서버를 띄워 홈 카드 → 보기 화면 → 작품 동작까지 확인한다. 확인용 서버는 끝나면 끈다(켜 둔 채면 사용자의 `start.cmd`가 8765 포트에서 막힌다).

## 표기 규칙

- 전시관 자체는 Claude Opus 5.5 최대 추론으로 만들었다(홈의 문구와 결재란 도장). 이 문구는 유지한다.
- 작품별 `effort`는 그 작품을 실제로 최대 추론으로 만들었을 때만 "최대"로 적고, 모르면 비워 둔다.
- 팬 작품(기존 캐릭터 등)은 화면에 비공식 개념도라고 밝힌다.

## 공개 저장소

- 공개 저장소다: https://github.com/Gridex-Korea/gridex-gallery . 커밋 작성자는 이 저장소의 로컬 설정(gridex-khj noreply 메일)을 쓴다. 개인 정보·키·사내 자료는 올리지 않는다.
- 팬 작품 등 공개하지 않을 작품은 `exhibits.local.js`(로컬 전용 목록)에 넣고 작품 파일·썸네일과 함께 `.gitignore`에 적는다. 마징가 Z 2점(AG-001, AG-002)이 여기에 있다.
- 공개 배포는 저장소 사본으로 한다. 이 폴더를 통째로 올리면 로컬 전용 작품도 나간다.
- 배포: GitHub Pages, main 브랜치 루트 → https://gridex-korea.github.io/gridex-gallery/ . main에 push하면 다시 배포된다. 사이트가 하위 경로(`/gridex-gallery/`)에서 열리므로 링크와 파일 경로는 상대 경로로 둔다. `.nojekyll`은 지우지 않는다.
