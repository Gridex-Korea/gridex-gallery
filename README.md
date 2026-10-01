# 해부도 전시관

Claude와 대화하며 만든 해부도와 3D 구성도를 모아 두고 실행해 보는 로컬 전시관입니다. 빌드 과정이 없는 정적 웹 페이지라서 이 폴더만 있으면 됩니다.

## 실행

- `start.cmd` 더블클릭: 로컬 서버를 켜고 브라우저에서 http://localhost:8765 를 엽니다. 끌 때는 검은 창에서 `Ctrl+C`.
- 터미널에서: `python serve.py` (포트를 바꾸려면 `python serve.py --port 8766`)
- 서버 없이 `index.html`을 브라우저로 바로 열어도 동작합니다.

글꼴(Google Fonts)과 3D 라이브러리(three.js, cdnjs·jsDelivr)를 인터넷에서 불러오므로 인터넷 연결이 필요합니다.

## 폴더 구조

| 경로 | 내용 |
|---|---|
| `index.html` | 홈. 작품 카드 목록 |
| `view.html` | 작품 보기. 위쪽 막대와 작품 실행 화면 |
| `exhibits.js` | 전시 목록(작품 정보) |
| `exhibits.local.js` | 로컬 전용 작품 목록. 저장소에 올리지 않음(아래 참고) |
| `exhibits/<id>.html` | 작품. 하나하나가 따로 열어도 실행되는 웹 페이지 |
| `thumbs/<id>.png` | 카드 썸네일 |
| `assets/` | 홈과 보기 화면이 함께 쓰는 스타일·스크립트 |
| `serve.py`, `start.cmd` | 로컬 서버 |
| `tools/make_thumbs.py` | 썸네일 자동 촬영 (헤드리스 Edge 또는 Chrome) |

## 작품 추가

1. 작품 HTML을 `exhibits/<id>.html`로 저장합니다. `id`는 영문 소문자·숫자·`-`로 짓습니다(예: `robot-arm-3d`).
   claude.ai 아티팩트에서 가져온 파일은 문서 골격이 빠져 있습니다. 맨 위에 `<!doctype html>`, `<html lang="ko">`, `<head>`(`<meta charset="utf-8">`와 viewport 메타 포함)를 붙이고, 스타일에 `body{margin:0}`와 `[hidden]{display:none!important}`를 넣어 주세요. 아티팩트로 게시할 때 자동으로 붙던 기본 스타일입니다.
2. `exhibits.js`의 `EXHIBITS`에 항목을 하나 추가합니다.
3. 썸네일을 찍습니다: `python tools\make_thumbs.py <id>`
4. 홈을 새로 고침하면 카드가 생깁니다.

Claude에게 맡길 때는 이 폴더에서 아티팩트 링크와 함께 "이 아티팩트를 전시관에 추가해줘"라고 하면 됩니다. 순서는 `CLAUDE.md`에 적어 두었습니다.

### 항목 예시

```js
{
  id: "robot-arm-3d",         // exhibits/robot-arm-3d.html, thumbs/robot-arm-3d.png
  no: "AG-012",               // 도번. 홈에서는 큰 번호(최근 작품)가 앞에 옵니다
  title: "로봇 팔 3D 구성도",
  type: "구성도",             // 거르기 버튼의 기준. 종류가 두 가지 이상이 되면 버튼이 저절로 나타납니다
  format: "3D",               // 썸네일 위에 붙는 표시 (2D / 3D)
  summary: "카드에 들어갈 한두 문장 소개",
  features: ["회전", "분해 보기"],
  made: "2026-10-02",
  model: "Claude Opus 5.5",
  effort: "최대",             // 실제로 최대 추론으로 만든 경우에만. 모르면 ""
  artifact: "",               // claude.ai 원본 링크. 있으면 보기 화면에 버튼이 생깁니다
  thumb: { zoom: 1, focus: "50% 50%" }  // 카드에서 보일 부분: 확대 배율과 기준점
}
```

## 썸네일

`tools/make_thumbs.py`는 작품을 1280×800으로 찍어 `thumbs/<id>.png`에 저장합니다. 카드에서 보일 부분은 `thumb.zoom`(확대 배율)과 `thumb.focus`(기준점, "가로% 세로%")로 맞춥니다. 썸네일이 없으면 카드에 도번과 형식이 적힌 대체 그림이 나옵니다.

움직이는 작품은 주소 끝의 `#thumb`를 보고 자동 회전 같은 움직임을 멈추게 해 두면 매번 같은 장면이 찍힙니다. `exhibits/cheongwadae-3d.html`의 `still` 변수가 예시입니다. 해부도 시리즈는 공용 엔진의 `if (still) seek(초)`로 고정할 장면을 고릅니다.

## 공개 저장소와 로컬 전용 작품

이 폴더는 공개 저장소 https://github.com/Gridex-Korea/gridex-gallery 이고, main 브랜치가 GitHub Pages로 https://gridex-korea.github.io/gridex-gallery/ 에 그대로 배포됩니다(push하면 1~2분 뒤 반영). `.nojekyll`은 파일을 변환 없이 내보내게 하는 표시라 지우지 마세요. 팬 작품처럼 공개하지 않을 작품은 항목을 `exhibits.local.js`에 적고, 작품 파일·썸네일과 함께 `.gitignore`에 넣습니다. 이 PC의 전시관에서는 보이지만 저장소에는 올라가지 않습니다.

공개 배포는 이 폴더를 통째로 올리지 말고 저장소에서 받은 사본으로 하세요. 폴더째 올리면 로컬 전용 작품도 함께 나갑니다.
