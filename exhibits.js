// 전시 목록: 작품 하나에 항목 하나.
// 작품 파일은 exhibits/<id>.html, 썸네일은 thumbs/<id>.png 입니다(python tools/make_thumbs.py <id>).
// effort는 그 추론 설정으로 실제로 만든 작품에만 "최대"라고 적습니다. 모르면 비워 둡니다.

window.GALLERY = {
  name: "해부도 전시관",
  model: "Claude Opus 5.5",
  effort: "최대",
  opened: "2026-10-01"
};

window.EXHIBITS = [
  {
    id: "cheongwadae-3d",
    no: "AG-011",
    title: "청와대 본관 짓기",
    type: "건축 공정",
    format: "3D",
    summary: "청와대 본관이 터 고르기부터 청기와 지붕, 앞뜰까지 아홉 단계로 지어지는 과정을 재생합니다. 형태와 비율을 단순화한 모형입니다.",
    features: ["9단계 공정 재생", "공정 되감기", "자동 회전", "청기와 장수 집계"],
    made: "2026-09-29",
    model: "Claude",
    effort: "",
    artifact: "https://claude.ai/artifact/7NYGAeVvgmoMT1M3HXxvPn",
    thumb: { zoom: 1.25, focus: "60% 60%" }
  },
  {
    id: "solar-drone-path-3d",
    no: "AG-010",
    title: "태양광 드론 경로 최적화",
    type: "시뮬레이션",
    format: "3D",
    summary: "태양광 단지의 핫스팟 22곳을 도는 점검 드론의 비행 순서를 보고서 순서, 최근접 이웃, 2-opt로 바꿔 가며 비행 거리와 출격 횟수를 비교합니다.",
    features: ["경로 알고리즘 비교", "배터리 한도 조절", "비행 재생", "전면 스캔"],
    made: "2026-09-29",
    model: "Claude",
    effort: "",
    artifact: "https://claude.ai/artifact/RnvEj47tQ18W18FqSpwJ3p",
    thumb: { zoom: 1.45, focus: "10% 79%" }
  },
  {
    id: "drone-3d",
    no: "AG-009",
    title: "드론 해부도",
    type: "해부도",
    format: "3D",
    summary: "154 kV 송전선로를 점검하는 드론을 현장에서 따라가다 기체를 분해합니다. 비행 상태별 추력 배분과 부품 수량을 함께 봅니다.",
    features: ["자동 투어", "분해 보기", "부품 리스트", "설계값 재계산"],
    made: "2026-09-29",
    model: "Claude Opus 5.5",
    effort: "최대",
    artifact: "https://claude.ai/artifact/GoRkEMq38p5tSH7fysyKQq",
    thumb: { zoom: 1.6, focus: "3% 32%" }
  },
  {
    id: "ev-3d",
    no: "AG-008",
    title: "전기차 해부도",
    type: "해부도",
    format: "3D",
    summary: "초급속 충전소에 선 전기차의 차체를 투시하고 구동 유닛을 분해합니다. 역행, 회생, 승압 충전 때 전력이 흐르는 길을 보여 줍니다.",
    features: ["자동 투어", "차체 투시", "분해 보기", "부품 리스트"],
    made: "2026-09-29",
    model: "Claude Opus 5.5",
    effort: "최대",
    artifact: "https://claude.ai/artifact/9UkJAc8KMr4kuVrGAmYfBh",
    thumb: { zoom: 1.6, focus: "3% 32%" }
  },
  {
    id: "offshore-wind-3d",
    no: "AG-007",
    title: "해상풍력 해부도",
    type: "해부도",
    format: "3D",
    summary: "10 MW 터빈 40기로 된 400 MW 해상풍력 단지에서 터빈 한 기, 나셀 속 구동계와 풀 컨버터까지 들어갑니다.",
    features: ["자동 투어", "분해 보기", "부품 리스트", "설계값 재계산"],
    made: "2026-09-27",
    model: "Claude Opus 5.5",
    effort: "최대",
    artifact: "https://claude.ai/artifact/7q1jDcrS99ZBUNiwx5Ne7X",
    thumb: { zoom: 1.6, focus: "3% 32%" }
  },
  {
    id: "gfm-ess-3d",
    no: "AG-006",
    title: "GFM ESS 해부도",
    type: "해부도",
    format: "3D",
    summary: "100 MW / 200 MWh 그리드 포밍 ESS를 단지, PCS 블록, PCS 내부 순서로 열어 봅니다. 전압원·관성·고장 동작을 회로도로 짚습니다.",
    features: ["자동 투어", "컨테이너 투시", "분해 보기", "부품 리스트"],
    made: "2026-09-27",
    model: "Claude Opus 5.5",
    effort: "최대",
    artifact: "https://claude.ai/artifact/6238AKKEXrC6XCusn2nV5q",
    thumb: { zoom: 1.6, focus: "3% 32%" }
  },
  {
    id: "pv-inverter-3d",
    no: "AG-005",
    title: "태양광 인버터 해부도",
    type: "해부도",
    format: "3D",
    summary: "100 MW 태양광 발전 블록에서 3.3 MVA 센트럴 인버터, 그 안의 3레벨 ANPC 전력 유닛까지 내려갑니다.",
    features: ["자동 투어", "분해 보기", "부품 리스트", "설계값 재계산"],
    made: "2026-09-27",
    model: "Claude Opus 5.5",
    effort: "최대",
    artifact: "https://claude.ai/artifact/TWcfaBXmftobn6Yx7epv2t",
    thumb: { zoom: 1.6, focus: "3% 32%" }
  },
  {
    id: "statcom-3d",
    no: "AG-004",
    title: "STATCOM 해부도",
    type: "해부도",
    format: "3D",
    summary: "±200 Mvar STATCOM 변전소에서 Δ 결선 클러스터와 풀브리지 서브모듈까지 따라가며 +V·0·−V 스위칭을 봅니다.",
    features: ["자동 투어", "밸브홀 투시", "분해 보기", "부품 리스트"],
    made: "2026-09-27",
    model: "Claude Opus 5.5",
    effort: "최대",
    artifact: "https://claude.ai/artifact/MtvNWJdamGJBmwsN1r75oN",
    thumb: { zoom: 1.6, focus: "3% 32%" }
  },
  {
    id: "mmc-converter-3d",
    no: "AG-003",
    title: "MMC 컨버터 해부도",
    type: "해부도",
    format: "3D",
    summary: "±320 kV · 1,000 MW HVDC 컨버터 스테이션에서 밸브 타워, 하프브리지 서브모듈까지 내려갑니다. 설계값을 바꾸면 부품 수량이 다시 계산됩니다.",
    features: ["자동 투어", "밸브홀 투시", "분해 보기", "부품 리스트"],
    made: "2026-09-27",
    model: "Claude Opus 5.5",
    effort: "최대",
    artifact: "https://claude.ai/artifact/JWBEkKnLwtMeopkojybhXZ",
    thumb: { zoom: 1.6, focus: "3% 32%" }
  }
];
