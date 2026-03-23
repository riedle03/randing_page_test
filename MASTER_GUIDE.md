# 🎨 바이브코딩으로 웹사이트 클론하기
## UIUX 디자이너 교사용 완전 가이드

> **대상 사이트:** DH's Fabulous Site — "A new kind of credit card."
> **URL:** https://dhs-fabulous-site-09d196.webflow.io/
> **난이도:** 초급 (코딩 경험 불필요)
> **예상 수업 시간:** 90~120분

---

# PART 1. 사이트 분석

## 1-1. 이 사이트는 어떻게 만들어졌나?

DH's Fabulous Site는 **Webflow**로 제작된 크레딧카드 랜딩페이지입니다.
Apple Card를 오마주한 **시네마틱 원-페이지(Scroll-driven Stage)** 구조가 핵심입니다.

### 구조 다이어그램

```
<body>
  └── .stage (height: 4000px — 스크롤 트리거 공간)
       ├── .intro-title          (히어로 타이틀 이미지, z-index:20)
       ├── .gradient-card-wrapper (카드 비주얼 컨테이너, z-index:10)
       │    ├── .apple-card-wrapper
       │    │    ├── .card-branding     (SVG 브랜딩)
       │    │    └── .card-gradient-end (SVG 그래디언트)
       │    └── .gradient-big          (배경 그래디언트, 1280×802px)
       ├── .card-title-end       (h1 텍스트, z-index:20)
       └── .iphone-wrapper       (iPhone 목업, z-index:1)
```

> **핵심 포인트:** 모든 요소가 `position: fixed`로 고정되어 있고,
> 스크롤하면 Webflow IX2 엔진이 각 요소의 투명도/위치를 조절합니다.
> 즉, "스크롤 = 타임라인"입니다.

---

## 1-2. 스크롤 시퀀스 (5단계)

| 단계 | 스크롤 위치 | 화면에서 일어나는 일 |
|------|------------|-------------------|
| 1 — 인트로 | 0% | 페이지 전체 `opacity: 0 → 1` 페이드인, 타이틀이 아래서 위로 슬라이드 |
| 2 — 카드 등장 | ~20% | 크레딧카드 컴포넌트 `opacity: 0 → 1` 나타남 |
| 3 — 타이틀 전환 | ~50% | "A new kind of credit card." 텍스트 페이드인 |
| 4 — iPhone 공개 | ~70% | iPhone 목업이 아래서 슬라이드업 |
| 5 — 엔딩 | 100% | 완성된 컴포지션 고정 |

---

## 1-3. 디자인 스펙 (실제 CSS에서 추출)

### 색상 팔레트

| 역할 | 색상값 | 용도 |
|------|--------|------|
| 페이지 배경 | `#ffffff` | body 배경 |
| 주 텍스트 (h1) | `#070707` | 메인 헤딩 |
| 카드 테두리 | `#E5E0DA` | 티타늄 실버 느낌 |
| 배경 그래디언트 시작 | `#F8F4EF ~ #FFFFFF` | 크림 화이트 |
| 배경 그래디언트 중단 | 연한 핑크-베이지 | 전환 색조 |
| 배경 그래디언트 끝 | `#E8E3DD` | 소프트 그레이 |

### 타이포그래피

| 속성 | 값 |
|------|-----|
| 폰트 패밀리 | `system-ui, -apple-system, BlinkMacSystemFont` (외부 폰트 없음) |
| h1 크기 | `63px` |
| h1 굵기 | `font-weight: 600` |
| h1 색상 | `#070707` |

### 카드 컴포넌트

| 속성 | 값 |
|------|-----|
| 크기 | `480 × 300px` |
| 모서리 반경 | `12.874px` |
| 테두리 두께 | `2.759px` |
| 테두리 색상 | `#E5E0DA` |

### 반응형 취약점 ⚠️
- 카드(480px)와 h1(63px)에 모바일 오버라이드 없음
- 375px(iPhone SE) 화면에서 오버플로우 가능성 있음
- **클론 시 모바일 대응 추가 필요**

---

# PART 2. 리버스 프롬프팅

## 2-1. 리버스 프롬프팅이란?

```
완성된 사이트 관찰 → 시각적 요소 언어화 → AI 프롬프트 작성 → 결과 비교 → 반복 개선
```

**디자이너에게 유리한 이유:** 코드 문법 대신 **디자인 언어**로 대화하기 때문입니다.
"폰트 크기 63px"보다 "Apple Card처럼 크고 우아한 제목"이 더 자연스럽습니다.

---

## 2-2. 시각 요소 → 프롬프트 변환 공식

### 공식 1: 레이아웃 설명

```
[레이아웃 패턴] + [정렬 방향] + [주요 요소 배치]

예시:
"Full-screen hero section with centered content,
 large heading on top, credit card visual in the middle,
 iPhone mockup at the bottom"
```

### 공식 2: 색상 설명

```
[배경] + [텍스트] + [강조] + [분위기]

예시:
"White background with warm ivory-to-cream gradient,
 near-black (#070707) heading text,
 titanium silver (#E5E0DA) card border,
 Apple Card inspired minimal palette"
```

### 공식 3: 애니메이션 설명

```
[트리거] + [대상] + [효과] + [타이밍]

예시:
"On scroll, fade in each section with slight upward slide (translateY),
 card appears first, then heading, then iPhone mockup,
 smooth ease-out timing"
```

---

## 2-3. 실전 프롬프트 모음 (복사해서 바로 사용)

### 프롬프트 ① — 전체 페이지 구조

```
Create a cinematic credit card landing page inspired by Apple Card.

Layout:
- Single scroll-driven page (no traditional sections)
- All elements are fixed-positioned and animate on scroll
- Background: warm white-to-cream gradient (like Apple Card's titanium finish)

Scroll sequence:
1. Page fades in from opacity 0
2. Credit card visual appears (center screen)
3. Heading "A new kind of credit card." fades in
4. iPhone mockup slides up from bottom

Style:
- Font: system-ui / SF Pro inspired
- H1: 63px, font-weight 600, color #070707
- Background: #ffffff with soft gradient overlay
- Card: 480×300px, border-radius 13px, titanium silver border #E5E0DA

Tech stack: HTML + CSS + vanilla JavaScript (no frameworks)
```

---

### 프롬프트 ② — 히어로 섹션만

```
Create a hero section for a credit card landing page.

Requirements:
- Full viewport height (100vh)
- White background with subtle warm gradient
- Large bold heading: "A new kind of credit card."
  - Font size: 63px, weight: 600, color: #070707
  - Center aligned
- Below the heading: a premium credit card visual
  - Size: 480×300px, border-radius: 13px
  - Titanium silver border color: #E5E0DA
  - Subtle gradient overlay from white to soft pink-beige
- Entrance animation: fade in + slight slide up (translateY 12px → 0)
```

---

### 프롬프트 ③ — 카드 컴포넌트

```
Create a premium credit card UI component.

Specifications:
- Size: 480px × 300px
- Border radius: 13px (subtle rounded corners)
- Border: 2.76px solid #E5E0DA (titanium silver)
- Background: white with gradient overlay
  - Top-left: pure white (#FFFFFF)
  - Bottom-right: soft silver-pink (#E5E0DA with 50% opacity)
- Card branding (top area): placeholder for logo/text
- Gradient end effect: SVG gradient on right edge fading to transparent
- Shadow: none (flat, premium feel)
- The card should look physical — like holding a real Apple Card
```

---

### 프롬프트 ④ — 색상/스타일 수정

```
Update the current design with these style changes:

Color palette adjustments:
- Background: change to warm ivory (#FAF8F5) instead of pure white
- Add a large background gradient blob (1280×802px area)
  using warm cream tones: #F8F4EF → #FFFFFF → #E8E3DD
- Keep heading color: #070707 (near-black, not pure black)
- Card border: keep #E5E0DA

Typography:
- Use system fonts only: system-ui, -apple-system, BlinkMacSystemFont
- No Google Fonts or external font loading
- Letter-spacing: -0.02em for headings (tight, premium feel)
```

---

### 프롬프트 ⑤ — 반응형 수정

```
Make the design fully responsive:

Mobile (375px - 768px):
- H1: reduce from 63px to 32px
- Credit card: scale down to 320×200px
- iPhone mockup: hide on mobile or reduce to 60% size
- Adjust scroll-animation timings for shorter scroll distance

Tablet (768px - 1024px):
- H1: 48px
- Card: 380×240px
- Maintain scroll-driven animation behavior

Desktop (1024px+):
- Keep original specs (63px heading, 480×300px card)
- Max content width: 1280px, centered
```

---

### 프롬프트 ⑥ — 반복 개선용

```
Looking at the current result, please adjust:

1. [문제점] → [원하는 상태]
   예: "The card looks flat" → "Add subtle inner glow and depth"

2. [문제점] → [원하는 상태]
   예: "Heading is too centered" → "Align to left, 20% from left edge"

3. [문제점] → [원하는 상태]
   예: "Animation feels abrupt" → "Slow down fade-in to 0.8s ease-out"

Keep all other elements unchanged.
```

---

# PART 3. 단계별 바이브코딩 실습

## 3-1. 수업 목표

이 실습을 마친 후 학습자는:
- AI 도구와 대화하며 웹사이트를 구현할 수 있다
- 디자인 의도를 명확한 프롬프트로 표현할 수 있다
- 반복적 피드백으로 디자인을 개선할 수 있다
- **코드 없이** 완성도 높은 랜딩페이지를 만들 수 있다

> **핵심 철학:** 코드는 도구일 뿐, 디자이너의 시각이 중심입니다.

---

## 3-2. 준비물

| 도구 | 추천 대상 | 링크 |
|------|----------|------|
| **v0.dev** | 빠른 결과 원하는 디자이너 (추천) | https://v0.dev |
| **Claude + Cursor** | 코드도 이해하고 싶은 디자이너 | https://cursor.com |
| **Bolt.new** | 풀스택 구현 필요한 경우 | https://bolt.new |

**기타 준비물:**
- 클론 대상 사이트 스크린샷 (여러 각도)
- 프롬프트 초안 메모장 (Notion, Google Docs 등)

---

## STEP 1: 사이트 관찰하기 ⏱️ 5분

### 무엇을 볼 것인가?

```
관찰 체크리스트:
[ ] 전체 섹션 개수 (이 사이트: 섹션 없음, 스크롤 애니메이션 1페이지)
[ ] 주 색상 3가지 (흰색, 크림/베이지, 오프블랙)
[ ] 헤딩 텍스트 ("A new kind of credit card.")
[ ] 핵심 비주얼 요소 (크레딧카드 + iPhone 목업)
[ ] 애니메이션 방식 (스크롤 하면 요소들이 순서대로 등장)
[ ] 폰트 느낌 (얇지 않고, 굵지도 않은 600 weight)
[ ] 전체 분위기 (Apple처럼 미니멀, 프리미엄, 화이트 위주)
```

### 교사 팁 💡
> "이 사이트에서 가장 인상적인 것 하나만 골라보세요"라고 질문하면
> 학생들이 디자인 의도를 빠르게 파악합니다.

---

## STEP 2: 구조 스케치하기 ⏱️ 10분

종이에 손으로 그려도 됩니다. 핵심은 **계층 구조** 파악입니다.

```
┌─────────────────────────────────────┐
│          [타이틀 이미지]              │  ← intro-title
│                                      │
│       ┌──────────────┐               │
│       │  크레딧카드    │               │  ← card component
│       │  (480×300)   │               │
│       └──────────────┘               │
│                                      │
│   "A new kind of credit card."       │  ← h1 텍스트
│                                      │
│       ┌──────────────┐               │
│       │  iPhone 목업  │               │  ← iphone-wrapper
│       └──────────────┘               │
└─────────────────────────────────────┘
```

### 와이어프레임 없어도 되는 이유
AI는 텍스트 설명만으로도 충분히 레이아웃을 구성합니다.
스케치는 **나 자신**이 구조를 이해하기 위한 것입니다.

---

## STEP 3: 첫 번째 프롬프트 입력 ⏱️ 10분

### v0.dev 사용 시

1. https://v0.dev 접속
2. 화면 하단 입력창에 다음 프롬프트 붙여넣기:

```
Create a cinematic credit card landing page.

- White background with warm cream gradient (#FAF8F5)
- Centered heading: "A new kind of credit card."
  Font: system-ui, size 63px, weight 600, color #070707
- Premium credit card visual (480×300px, border-radius 13px)
  Border: 2px solid #E5E0DA (titanium silver)
  Gradient background from white to soft beige
- iPhone mockup below the card
- Scroll-triggered fade-in animations for each element
- Minimal, Apple-inspired design aesthetic
```

3. 생성 결과 확인 → 스크린샷으로 원본과 비교

### Cursor 사용 시

1. Cursor 열기 → 새 파일 `index.html` 생성
2. `Cmd/Ctrl + L` → Claude 채팅창 열기
3. 동일한 프롬프트 입력

---

## STEP 4: 반복 개선하기 ⏱️ 15분

### 시나리오별 개선 프롬프트

#### 색상이 마음에 안 들 때
```
The background feels too cold.
Make it warmer — use ivory (#FAF8F5) instead of white,
and add a soft pink-beige glow behind the card.
```

#### 카드가 너무 단순할 때
```
The credit card looks too flat.
Add a subtle gradient from pure white (top-left)
to soft silver-pink (#E5E0DA, 50% opacity, bottom-right).
Also add a very subtle shadow: 0 4px 24px rgba(0,0,0,0.08)
```

#### 텍스트 위치가 어색할 때
```
Move the heading "A new kind of credit card."
to appear BELOW the card visual, not above it.
Center align. Keep the same font size.
```

#### 애니메이션이 너무 빠를 때
```
Slow down all entrance animations.
Fade-in duration: 0.8s (currently too fast)
Slide-up distance: 12px (translateY)
Timing function: ease-out
Add 0.2s delay between each element appearing
```

#### 모바일이 깨질 때
```
The layout breaks on mobile.
Fix for 375px screen:
- Scale heading to 32px
- Card size: 300×188px
- Maintain centered layout
- Ensure no horizontal overflow
```

---

## STEP 5: 마무리 & 공유 ⏱️ 5분

### 결과 확인 체크리스트

```
[ ] 원본과 비교했을 때 분위기가 유사한가?
[ ] 크레딧카드 컴포넌트가 프리미엄하게 보이는가?
[ ] 텍스트 계층이 명확한가?
[ ] 배경 색상이 따뜻한 화이트 계열인가?
[ ] 스크롤/페이드 애니메이션이 자연스러운가?
[ ] 모바일에서 레이아웃이 유지되는가?
```

### 간단 배포 방법

| 방법 | 소요 시간 | 링크 |
|------|---------|------|
| **Vercel** | 1분 | vercel.com → "Import Git" 또는 drag & drop |
| **Netlify** | 2분 | netlify.com → drag & drop HTML 폴더 |
| **GitHub Pages** | 5분 | GitHub 레포 → Settings → Pages |

---

# PART 4. 교사용 운영 가이드

## 4-1. 수업 타임라인 (90분 기준)

| 시간 | 활동 | 주요 포인트 |
|------|------|------------|
| 0~10분 | 사이트 소개 & 관찰 | "스크롤하면 무엇이 일어나나요?" |
| 10~20분 | 리버스 프롬프팅 개념 설명 | 공식 3가지 판서 |
| 20~35분 | 첫 프롬프트 입력 | PART 2의 프롬프트 ① 사용 |
| 35~60분 | 반복 개선 실습 | 각자 3회 이상 개선 |
| 60~75분 | 팀별 결과 발표 | 원본 vs 클론 비교 |
| 75~90분 | 회고 & 배포 | 잘 된 점 / 아쉬운 점 |

---

## 4-2. 자주 하는 실수 & 해결법

| 실수 | 원인 | 해결 방법 |
|------|------|----------|
| AI가 엉뚱한 것을 만든다 | 프롬프트가 너무 추상적 | 숫자/색상코드/크기를 구체적으로 명시 |
| 카드 색상이 이상하다 | 그래디언트 방향 미지정 | "top-left to bottom-right" 방향 명시 |
| 이미지가 안 보인다 | 실제 이미지 파일 없음 | placeholder 이미지 URL 사용 요청 |
| 애니메이션이 작동 안 한다 | JS 코드 분리 필요 | "include JavaScript in same file" 추가 |
| 모바일이 깨진다 | 고정 픽셀 크기 문제 | "make it fully responsive" 추가 요청 |
| 결과가 매번 달라진다 | AI의 창의적 해석 | 더 구체적인 스펙 명시 또는 "keep previous style" |

---

## 4-3. 평가 기준 (100점)

| 항목 | 배점 | 기준 |
|------|------|------|
| 사이트 관찰 정확도 | 20점 | 주요 요소 5가지 이상 식별 |
| 프롬프트 구체성 | 25점 | 색상/크기/스타일 수치 포함 |
| 반복 개선 횟수 | 25점 | 3회 이상 의미 있는 개선 |
| 원본 재현도 | 20점 | 분위기/레이아웃 유사성 |
| 발표/설명 | 10점 | 과정과 배운 점 명확히 설명 |

---

## 4-4. 확장 활동 (심화반)

1. **다크 모드 버전** 만들기: 배경을 `#070707`, 텍스트를 `#FFFFFF`로
2. **다른 카드 브랜드** 적용: Amex, Visa, Mastercard 느낌으로
3. **섹션 추가**: 혜택 설명 섹션, FAQ 섹션 추가해보기
4. **Webflow로 재현**: 바이브코딩 결과를 Webflow에서 직접 구현
5. **애니메이션 심화**: GSAP 또는 Framer Motion으로 업그레이드

---

## 4-5. 학생 배포 자료 (별도 인쇄용)

> 아래 프롬프트를 v0.dev에 붙여넣고 시작하세요!

```
Create a cinematic credit card landing page (Apple Card inspired).

Design specs:
- Background: white with warm cream gradient (#FAF8F5)
- Main heading: "A new kind of credit card."
  → Font: system-ui, 63px, weight 600, color #070707
- Credit card component (480×300px):
  → Border radius: 13px
  → Border: 2px solid #E5E0DA
  → Background gradient: white (top-left) to silver-beige (bottom-right)
- iPhone mockup below the card
- Scroll animations: each element fades in with slight upward slide
- Fully responsive (mobile-friendly)
- Minimal, premium aesthetic — less is more
```

---

*가이드 제작: Claude AI (claude-sonnet-4-6) | 분석 기준일: 2026-03-23*
*파일 구성:*
*- `analysis_report.md` — 사이트 상세 분석*
*- `reverse_prompting_guide.md` — 리버스 프롬프팅 전체 가이드*
*- `vibecoding_guide.md` — 바이브코딩 실습 가이드*
*- `MASTER_GUIDE.md` — 이 통합 문서*
