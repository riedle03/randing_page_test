# DH's Fabulous Site — 시각 분석 보고서

**URL:** https://dhs-fabulous-site-09d196.webflow.io/
**플랫폼:** Webflow
**최종 퍼블리시:** 2026-03-23
**분석 기준:** 실제 HTML 소스 + CSS 스타일시트 직접 파싱

---

## 1. 레이아웃 구조

### 전체 아키텍처

이 페이지는 전통적인 섹션 분리 방식이 아닌 **스크롤 기반 단일 스테이지(Scroll-driven Stage)** 구조다. 모든 요소가 `position: fixed`로 고정되고, 바깥쪽 `.stage` 컨테이너만 `height: 4000px`의 스크롤 여유를 확보한다. 사용자가 스크롤하면 Webflow IX2 애니메이션 엔진이 각 요소의 opacity/transform을 scroll progress에 따라 구동한다.

```
<body>
  └── .stage (height: 4000px — 스크롤 트리거 공간)
       ├── .intro-title          (position: fixed, z-index: 20 — 히어로 타이틀 이미지)
       ├── .gradient-card-wrapper (position: fixed, z-index: 10 — 카드 비주얼 컨테이너)
       │    ├── .apple-card-wrapper
       │    │    ├── .card-branding      (SVG, z-index: 2)
       │    │    └── .card-gradient-end  (SVG, z-index: 1)
       │    └── .gradient-big           (배경 그래디언트 SVG, 1280×802px)
       ├── .card-title-end       (position: fixed, z-index: 20 — h1 텍스트)
       └── .iphone-wrapper       (position: fixed, z-index: 1 — iPhone 목업)
```

### 스크롤 시퀀스 (추정 순서)

| 단계 | 스크롤 위치 | 화면 상태 |
|------|-------------|-----------|
| 1 — 인트로 | 0% | `.stage` 전체가 `opacity: 0`에서 페이드인, `.intro-title`이 Y+12px → Y0으로 슬라이드업 |
| 2 — 카드 등장 | ~20% | `.gradient-card-wrapper`가 opacity 0→1, 카드가 하단에서 올라오며 자리잡음 |
| 3 — 타이틀 전환 | ~50% | `.card-title-end`의 h1 "A new kind of credit card."가 opacity 0→1로 페이드인 |
| 4 — iPhone 공개 | ~70% | `.iphone-wrapper`가 하단에서 슬라이드업하며 카드를 앱 UI 맥락으로 연결 |
| 5 — 엔딩 | 100% | 전체 컴포지션이 완성된 채 고정 |

> 근거: 각 요소에 `data-w-id` 속성이 존재하며 Webflow IX2 엔진(webflow.f811797a.js)이 scroll offset에 따라 transform/opacity를 interpolation한다. 초기 인라인 스타일에서 `.stage`는 `opacity:0`, `.intro-title`은 `translate3d(0, 12PX, 0) opacity:0`으로 선언되어 있어 JS 기반 애니메이션 시작값임이 확인된다.

---

## 2. 색상 팔레트

### CSS 변수 (`:root`)

```css
:root {
  --black: black;
  --white: white;
}
```

변수 선언은 최소화되어 있으며, 실제 색상은 직접 값으로 사용된다.

### 핵심 색상값

| 역할 | 값 | 비고 |
|------|----|------|
| 페이지 배경 | `#ffffff` (white) | body default |
| 주 텍스트 (h1) | `#070707` | 순수 검정에 가까운 오프블랙 |
| 카드 테두리 (SVG) | `#E5E0DA` | 따뜻한 오프화이트/실버 — 티타늄 질감 |
| 카드 배경 베이스 | 반투명 PNG 텍스처 (embedded base64) | 물리적 카드 질감 시뮬레이션 |
| 그래디언트 오버레이 | `card-gradient-end.svg` — 480×300, rounded 12.874px | 카드 상단-끝단 색상 전환 |
| 대형 배경 그래디언트 | `gradient-big.svg` — 1280×802, rounded 34.33px | 전체 배경 분위기 색조 |

### 추정 색조 방향

`gradient-big.svg`와 `card-gradient-end.svg`는 base64 PNG 데이터를 내장하고 있어 렌더링 전 색상을 확정하기 어렵지만, Apple Card의 디자인 언어(titanium white + warm gradient)를 참조하면 다음 팔레트로 추정된다:

```
배경 그래디언트:
  - 상단: 밝은 아이보리 / 크림 화이트 (#F8F4EF ~ #FFFFFF)
  - 중단: 연한 핑크-베이지 전환
  - 하단: 소프트 그레이 (#E8E3DD)

카드 그래디언트:
  - 좌상: 순백 (#FFFFFF)
  - 우하: 소프트 실버-핑크 (#E5E0DA → 반투명)

텍스트: #070707 (오프블랙, Apple의 -apple-system 계열 색상 관습)
```

---

## 3. 타이포그래피

### 실제 선언된 폰트 스택

`.heading` (h1) 클래스에 명시된 폰트 패밀리:

```css
.heading {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
               Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans",
               "Helvetica Neue", sans-serif;
  font-size: 63px;
  font-weight: 600;
  color: #070707;
}
```

### 타이포그래피 계층

| 요소 | 클래스 | 크기 | 굵기 | 비고 |
|------|--------|------|------|------|
| 메인 헤딩 | `.heading` (h1) | **63px** | 600 (SemiBold) | "A new kind of credit card." |
| 히어로 타이틀 | `.intro-title` 내 `<img>` | 최대 670px 너비 | — | 이미지 자산(hero-title.png)으로 렌더링 |
| body 기본 | `body` | 14px | 400 | Arial, sans-serif |

### 폰트 전략 분석

- **히어로 타이틀(`hero-title.png`)**: 텍스트가 아닌 PNG 이미지로 처리. SF Pro Display 또는 커스텀 서체를 픽셀 퍼펙트하게 고정하기 위한 의도적 선택.
- **h1 `.heading`**: system-ui 계열 — macOS/iOS에서는 SF Pro Display, Windows에서는 Segoe UI로 렌더링. Apple 생태계 사용자에게 브랜드 일관성 자동 확보.
- **라인하이트**: h1 기본값(브라우저 기본 ~1.2) 적용. 63px * 1.2 ≈ 75.6px.

### Webflow 기본 타이포그래피 스케일 (참고)

```
h1: 38px / 44px line-height
h2: 32px / 36px
h3: 24px / 30px
h4: 18px / 24px
h5: 14px / 20px
h6: 12px / 18px
```
(`.heading`의 63px는 Webflow 기본 h1을 override한 커스텀 값)

---

## 4. 핵심 컴포넌트 상세

### 4-1. 네비게이션

**없음.** 페이지에 `.w-nav` 요소가 존재하지 않는다. 전체 페이지는 단일 몰입형 경험으로 설계되어 있으며, 별도 메뉴나 로고 링크가 없다. Apple Card 공식 랜딩의 초기 릴리즈 버전과 동일한 접근.

### 4-2. 히어로 타이틀 (`.intro-title`)

```css
.intro-title {
  position: fixed;
  z-index: 20;
  inset: -124px 0% 0%;       /* 상단 -124px 오프셋 — 수직 중앙보다 약간 위 */
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 670px;
  margin: 0 auto;
}
```

- `hero-title.png`를 중앙 배치. srcset으로 500w/800w/1080w/1226w 제공.
- 모바일(`max-width: 767px`)에서 `80vw`, 데스크톱에서 `536px` 고정 크기.
- 초기 상태: `opacity: 0`, `translateY(12px)` — IX2가 scroll 또는 page load시 0→1, 12px→0 애니메이션.

### 4-3. 카드 비주얼 (`.gradient-card-wrapper`)

```css
.gradient-card-wrapper {
  position: fixed;
  z-index: 10;
  width: 480px;
  height: 300px;
  margin: 0 auto;
  bottom: 47px;
  left: 0%; right: 0%;
}
```

**카드 레이어 구조 (z-index 순서):**

```
gradient-big.svg        (배경 대형 그래디언트, 1280×802px)
  └── apple-card-wrapper (relative 컨테이너, 480×300px)
       ├── card-gradient-end.svg  (z-index: 1 — 하위 색상 레이어, 480×300, rx:12.874px)
       └── card-branding.svg      (z-index: 2 — 상위 카드 디자인/마크 레이어, 484×304, rx:12.874px)
```

- **카드 크기**: 480×300px (표준 신용카드 비율 85.6×53.98mm = 1.585:1, 여기서는 1.6:1 — 근사)
- **모서리 반경**: `rx: 12.874` — 물리적 카드의 라운드 코너 충실 재현
- **카드 테두리**: `stroke: #E5E0DA, stroke-width: 2.759` — 티타늄 실버 테두리
- **카드 배경**: base64 내장 PNG 텍스처 (brushed titanium 또는 frosted glass 계열)
- `card-branding.svg` 내부에는 Apple Pay 마크 등 카드 브랜딩 요소가 SVG+embedded PNG로 구성됨

### 4-4. iPhone 목업 (`.iphone-wrapper`)

```css
.iphone-wrapper {
  position: fixed;
  z-index: 1;
  width: 600px;
  margin: 0 auto;
  inset: auto 0% 0%;          /* 하단 고정 */
}
```

- `iphone.jpg` (1200px 원본) — srcset: 500w/800w/1080w/1200w
- 모바일(`max-width: 479px`)에서 `100vw`, 그 외 `600px`
- z-index: 1 (카드보다 하단 레이어) — 카드가 iPhone 위에 오버레이되는 구성
- 하단 고정 배치로 iPhone이 화면 하단에서 부상하는 효과

### 4-5. 메인 헤딩 (`.card-title-end`)

```css
.card-title-end {
  position: fixed;
  z-index: 20;
  inset: 0%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -145px;         /* 중앙보다 위로 오프셋 */
  text-align: center;
}

.heading {
  color: #070707;
  font-size: 63px;
  font-weight: 600;
  font-family: system-ui, -apple-system, ...;
}
```

- 텍스트: **"A new kind of credit card."**
- 화면 정중앙에서 -145px 위 배치 — 카드 비주얼 위에 타이틀이 자리잡음
- `data-w-id`로 IX2 애니메이션 연결 (fade-in on scroll)

---

## 5. 애니메이션 / 인터랙션

### 5-1. 페이지 진입 애니메이션

**근거**: HTML 인라인 스타일에서 초기값 확인.

| 요소 | 초기값 | 최종값 | 트리거 |
|------|--------|--------|--------|
| `.stage` | `opacity: 0` | `opacity: 1` | page load |
| `.intro-title` | `opacity: 0, translateY(12px)` | `opacity: 1, translateY(0)` | page load (지연) |
| `.gradient-card-wrapper` | IX2 제어 | 가시 상태 | scroll |
| `.card-title-end` | IX2 제어 | 가시 상태 | scroll |
| `.iphone-wrapper` | IX2 제어 | 하단 진입 | scroll |

### 5-2. 스크롤 드리븐 시퀀스

Webflow IX2 (`webflow.f811797a.js`)가 scroll position을 읽어 `data-w-id`로 연결된 요소들의 CSS transform/opacity를 프레임 단위로 보간한다.

예상 시퀀스:
1. **0 → scroll 시작**: `.stage` fade-in + `.intro-title` slide-up
2. **스크롤 중반**: 히어로 타이틀 페이드아웃 → 카드가 화면 중앙으로 이동
3. **스크롤 후반**: 카드 포지션 고정, `.card-title-end` h1 텍스트 fade-in
4. **스크롤 끝**: iPhone 목업 하단에서 등장, 카드+타이틀+iPhone 최종 컴포지션

### 5-3. 카드 인터랙션 (IX2 추정)

`card-branding.svg`와 `card-gradient-end.svg` 각각에 `data-w-id`가 부여되어 있어 개별 IX2 연결이 가능하다. 예상 동작:
- **마우스 호버**: 카드 레이어들의 미세한 parallax 분리 (gradient-end와 branding이 서로 다른 속도로 이동)
- **스크롤 진입 시**: 카드가 아래에서 위로 슬라이드하며 화면 중앙 도달

### 5-4. 부재한 인터랙션

현재 소스 기준으로 확인되지 않는 요소:
- CTA 버튼 (Apply Now 등) 없음
- 네비게이션 없음
- 호버 상태 CSS 없음 (커스텀 클래스 기준)
- 폼 요소 없음

---

## 6. 반응형 고려사항

### Webflow 기본 브레이크포인트

| 브레이크포인트 | 조건 | 대상 기기 |
|---------------|------|----------|
| Main (Desktop) | > 991px | 데스크톱 |
| Medium (Tablet) | ≤ 991px | 태블릿 가로 |
| Small (Mobile Landscape) | ≤ 767px | 태블릿 세로, 모바일 가로 |
| Tiny (Mobile Portrait) | ≤ 479px | 모바일 세로 |

### 요소별 반응형 동작

**`.intro-title` (히어로 타이틀):**
```
> 767px:   width: 536px (고정)
≤ 767px:   width: 80vw (유동)
```

**`.iphone-wrapper` (iPhone 목업):**
```
> 479px:   width: 600px (고정)
≤ 479px:   width: 100vw (전체 너비)
```

**`.gradient-card-wrapper` (카드):**
- 현재 CSS에 반응형 override 없음 → 480px 고정
- 모바일에서 뷰포트보다 클 수 있음 — Webflow 에디터에서 미처리된 가능성

**`.heading` (h1):**
- 63px 고정, 반응형 크기 미선언
- 모바일에서 텍스트 잘림 가능성 있음 (개선 필요)

### 반응형 취약점

1. `.gradient-card-wrapper`의 `width: 480px`이 375px 모바일에서 오버플로우 발생 가능
2. `.heading`의 `font-size: 63px`가 소형 화면에서 레이아웃 파괴 가능
3. `position: fixed` 요소들이 iOS Safari의 뷰포트 처리(`100vh` 버그)에 영향을 받을 수 있음

---

## 7. 에셋 인벤토리

| 파일명 | 형식 | 크기 | 역할 |
|--------|------|------|------|
| `hero-title.png` | PNG (srcset) | 최대 1226px | 히어로 타이틀 텍스트 이미지 |
| `card-branding.svg` | SVG (base64 PNG 내장) | 484×304px | 카드 상단 레이어 (브랜딩/마크) |
| `card-gradient-end.svg` | SVG (base64 PNG 내장) | 480×300px | 카드 하단 색상 그래디언트 레이어 |
| `gradient-big.svg` | SVG (base64 PNG 내장) | 1280×802px | 전체 배경 그래디언트 |
| `iphone.jpg` | JPEG (srcset) | 최대 1200px | iPhone 목업 이미지 |

**CDN 경로:**
`https://cdn.prod.website-files.com/69c1335a68c3820893c3280d/`

---

## 8. 기술 스택 요약

| 항목 | 내용 |
|------|------|
| 빌더 | Webflow |
| 애니메이션 엔진 | Webflow IX2 (Interactions 2.0) |
| JS 의존성 | jQuery 3.5.1, Webflow runtime (2개 청크) |
| CSS 방법론 | Webflow 자동 생성 + 커스텀 클래스 |
| 폰트 로딩 | system-ui 스택 (외부 폰트 없음) |
| 이미지 최적화 | srcset + sizes 반응형 이미지 |
| 호스팅 | Webflow CDN (cdn.prod.website-files.com) |

---

## 9. 디자인 의도 분석

이 페이지는 **Apple Card 2019년 발표 페이지**를 참조한 원-페이지 시네마틱 랜딩이다.

핵심 디자인 원칙:
- **미니멀리즘**: 네비게이션, CTA, 본문 텍스트 모두 제거. 오직 카드 비주얼과 핵심 카피 하나만 남김.
- **물성 표현**: 신용카드의 물리적 질감(티타늄 텍스처, 라운드 코너, 테두리 스트로크)을 SVG+PNG 합성으로 재현.
- **시간적 경험**: 스크롤을 타임라인으로 활용하여 제품을 점진적으로 '공개'하는 연출.
- **시스템 폰트 선택**: `-apple-system` 우선순위 → Apple 기기 사용자에게 SF Pro Display 제공, 브랜드 일관성 무비용 달성.
- **오프블랙 텍스트 (#070707)**: 순수 `#000000`보다 눈의 피로가 낮고, 흰 배경과의 대비를 부드럽게 유지.

---

*이 보고서는 실제 HTML 소스(2026-03-23 퍼블리시 버전)와 CSS 스타일시트를 직접 파싱하여 작성되었습니다.*
