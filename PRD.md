# PRD — Credit Card Landing Page Clone
## Product Requirements Document

**참조 URL:** https://dhs-fabulous-site-09d196.webflow.io/
**분석 기준일:** 2026-03-23 (실제 HTML/CSS 소스 파싱)
**빌드 타겟:** HTML + CSS + Vanilla JS (단일 파일)

---

## 1. 제품 개요

### 1-1. 한 줄 설명
스크롤로 구동되는 시네마틱 원-페이지 크레딧카드 랜딩 페이지.
Apple Card 발표 페이지를 오마주한 미니멀 프리미엄 디자인.

### 1-2. 핵심 사용자 경험
> 사용자가 스크롤할수록 카드가 점진적으로 '공개'된다.
> 네비게이션도 없고, CTA도 없다. 오직 카드 하나와 카피 하나.

### 1-3. 구현 범위
- ✅ 스크롤 드리븐 애니메이션 (5단계 시퀀스)
- ✅ 크레딧카드 컴포넌트 (레이어 구조)
- ✅ iPhone 목업
- ✅ 히어로 타이틀
- ✅ 배경 그래디언트
- ❌ 네비게이션 (원본에 없음)
- ❌ CTA 버튼 (원본에 없음)
- ❌ 폼/인터랙티브 요소 (원본에 없음)

---

## 2. 레이아웃 & 구조

### 2-1. 전체 아키텍처
**스크롤 스테이지 패턴**: 바깥 컨테이너가 스크롤 공간을 만들고,
안의 모든 요소는 `position: fixed`로 뷰포트에 고정.
스크롤 progress에 따라 각 요소의 opacity/transform이 변한다.

```
<body>
  └── .stage                     height: 4000px (스크롤 트리거 공간)
       ├── .intro-title           position: fixed / z-index: 20
       ├── .gradient-card-wrapper position: fixed / z-index: 10
       │    ├── .gradient-big     (배경 그래디언트)
       │    └── .apple-card-wrapper
       │         ├── .card-gradient-end  z-index: 1
       │         └── .card-branding      z-index: 2
       ├── .card-title-end        position: fixed / z-index: 20
       └── .iphone-wrapper        position: fixed / z-index: 1
```

### 2-2. z-index 레이어 순서

| z-index | 요소 | 설명 |
|---------|------|------|
| 20 | `.intro-title`, `.card-title-end` | 텍스트 최상단 |
| 10 | `.gradient-card-wrapper` | 카드 그룹 |
| 2 | `.card-branding` | 카드 상단 레이어 |
| 1 | `.card-gradient-end`, `.iphone-wrapper` | 카드 하단 레이어 / iPhone |

---

## 3. 스크롤 애니메이션 시퀀스

### ⚠️ 핵심 구조 — "그래디언트 → 카드 → 폰 진입" 모핑

이 페이지의 핵심 UX는 **하나의 요소(gradient-big)가 변형되며 카드가 되는 것**이다.
단순히 카드가 나타나는 게 아니라, 화면을 가득 채운 그래디언트 블롭이
스크롤에 따라 **축소 + border-radius 변환 → 카드 형태**로 모핑된다.
이후 iPhone이 등장하고 카드가 폰 안으로 "흡수"되는 느낌을 준다.

### 3-1. 6단계 타임라인 (수정)

| 단계 | scroll % | 요소 | 시작 상태 | 끝 상태 | 설명 |
|------|----------|------|-----------|---------|------|
| 1 — 진입 | 0% | `.stage` | `opacity: 0` | `opacity: 1` | 전체 페이지 fade-in |
| 1 — 진입 | 0% | `.intro-title` | `opacity: 0` + `translateY(12px)` | `opacity: 1` + `translateY(0)` | 히어로 타이틀 slide-up |
| 2 — 블롭 축소 | 0~45% | `.gradient-big` | `scale(3.5)` + `border-radius: 34px` | `scale(1)` + `border-radius: 13px` | **핵심**: 대형 블롭 → 카드 크기로 모핑 |
| 2 — 블롭 축소 | 0~45% | `.intro-title` | `opacity: 1` | `opacity: 0` | 타이틀 fade-out (카드 등장과 교차) |
| 3 — 카드 완성 | 45~55% | `.card-branding` | `opacity: 0` | `opacity: 1` | 카드 브랜딩 레이어 fade-in |
| 4 — 헤딩 등장 | 50~65% | `.card-title-end` | `opacity: 0` + `translateY(10px)` | `opacity: 1` + `translateY(0)` | "A new kind of credit card." |
| 5 — iPhone 등장 | 60~80% | `.iphone-wrapper` | `translateY(100%)` + `opacity: 0` | `translateY(0)` + `opacity: 1` | 폰이 아래서 올라옴 |
| 6 — 카드 진입 | 70~90% | `.gradient-card-wrapper` | `bottom: 47px` | `bottom: [iPhone 화면 위치]` | 카드가 폰 안으로 이동 |
| 7 — 엔딩 | 100% | 전체 | 최종 컴포지션 고정 | — | 카드가 폰 안에 안착 |

### 3-2. gradient-big 모핑 — 핵심 구현

```javascript
// scroll 0~45% 구간: 그래디언트 블롭 → 카드 형태로 모핑
const morphProgress = getProgress(scrollY, 0, 0.45);

// 크기: scale(3.5) → scale(1)
const scale = lerp(3.5, 1, easeOut(morphProgress));
gradientBig.style.transform = `scale(${scale})`;

// border-radius: 34px → 13px (카드 모서리)
const radius = lerp(34, 13, easeOut(morphProgress));
gradientBig.style.borderRadius = `${radius}px`;

// 카드 브랜딩은 모핑 완료 후 fade-in
const brandProgress = getProgress(scrollY, 0.45, 0.55);
cardBranding.style.opacity = brandProgress;
```

### 3-3. 카드 → iPhone 진입 효과

```javascript
// scroll 70~90%: 카드가 iPhone 화면 위치로 translateY
// iPhone 이미지에서 스크린 영역 Y좌표를 계산하여 카드 bottom 값 조정
const enterProgress = getProgress(scrollY, 0.70, 0.90);
const cardBottom = lerp(47, iphoneScreenY, easeInOut(enterProgress));
cardWrapper.style.bottom = `${cardBottom}px`;

// 카드가 폰 안으로 들어가면서 약간 축소
const cardScale = lerp(1, 0.55, enterProgress);
cardWrapper.style.transform = `scale(${cardScale})`;
```

### 3-4. 타이밍 함수

```javascript
const easeOut   = t => 1 - Math.pow(1 - t, 3);
const easeInOut = t => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2;
```

- 페이지 로드 진입: `0.8s ease-out`
- 블롭 모핑: `easeOut` (빠르게 시작, 천천히 안착)
- 카드 → iPhone 진입: `easeInOut` (부드럽게 흡수)

---

## 4. 컴포넌트 스펙

### 4-1. 히어로 타이틀 (`.intro-title`)

| 속성 | 값 |
|------|-----|
| position | fixed |
| z-index | 20 |
| top offset | -124px (center보다 위) |
| 콘텐츠 | 이미지 (`hero-title.png`) |
| 데스크톱 너비 | 536px |
| 모바일 너비 | 80vw (`≤ 767px`) |
| 정렬 | 가로 중앙 (flexbox center) |
| 초기 상태 | `opacity: 0`, `translateY(12px)` |

> **대체 구현:** hero-title.png 없을 경우, 같은 스타일의 텍스트로 대체
> ```css
> font-family: system-ui; font-size: 48px; font-weight: 700; color: #070707;
> ```

---

### 4-2. 배경 그래디언트 → 카드 모핑 요소 (`.gradient-big`)

> ⚠️ 이 요소는 단순 배경이 아니다. **스크롤 애니메이션의 주인공**이다.
> 초기에 화면보다 크게 표시되다가 스크롤에 따라 카드 형태로 축소·변환된다.

| 속성 | 초기값 (scroll 0%) | 최종값 (scroll 45%) |
|------|-------------------|-------------------|
| transform | `scale(3.5)` | `scale(1)` |
| border-radius | `34px` | `12.874px` (카드와 동일) |
| width | 1280px (고정) | 1280px (scale로 제어) |
| height | 802px (고정) | 802px (scale로 제어) |
| position | `.gradient-card-wrapper` 내부 — overflow visible | 동일 |

```css
.gradient-big {
  width: 1280px;
  height: 802px;
  border-radius: 34px;
  /* 실제 파일: gradient-bg.svg 사용 */
  /* 초기 scale(3.5)은 JS로 적용 */
  transform-origin: center center;
  will-change: transform, border-radius;
}
```

**핵심 동작:** `.gradient-card-wrapper`(480×300)가 `overflow: visible`이므로
gradient-big이 scale(3.5)일 때 카드 컨테이너 바깥으로 크게 넘쳐 화면을 채운다.
스크롤하면 scale이 줄어 카드 컨테이너 안으로 수렴한다.

---

### 4-3. 크레딧카드 컴포넌트 (`.apple-card-wrapper`)

#### 컨테이너 (`.gradient-card-wrapper`)

| 속성 | 값 |
|------|-----|
| position | fixed |
| z-index | 10 |
| width | 480px |
| height | 300px |
| bottom | 47px |
| 좌우 | 0% 0% (수평 중앙) |

#### 카드 하단 레이어 (`.card-gradient-end`) — SVG

| 속성 | 값 |
|------|-----|
| z-index | 1 |
| width | 480px |
| height | 300px |
| border-radius (rx) | 12.874px |
| 테두리 | stroke: `#E5E0DA`, stroke-width: 2.759 |
| 배경 | 그래디언트 (흰색 → 소프트 실버-핑크) |

#### 카드 상단 레이어 (`.card-branding`) — SVG

| 속성 | 값 |
|------|-----|
| z-index | 2 |
| width | 484px |
| height | 304px |
| border-radius (rx) | 12.874px |
| 내용 | 카드 브랜딩, 로고, 마크 |

#### CSS 구현 예시
```css
.apple-card-wrapper {
  position: relative;
  width: 480px;
  height: 300px;
}

.card-face {
  position: absolute;
  inset: 0;
  border-radius: 13px;
  border: 2.76px solid #E5E0DA;
  background: linear-gradient(
    135deg,
    #FFFFFF 0%,
    #F5F0EB 50%,
    rgba(229, 224, 218, 0.6) 100%
  );
  box-shadow:
    0 2px 8px rgba(0,0,0,0.06),
    0 0 0 0.5px rgba(229,224,218,0.8) inset;
}
```

---

### 4-4. 메인 헤딩 (`.card-title-end`)

| 속성 | 값 |
|------|-----|
| position | fixed |
| z-index | 20 |
| inset | 0% (전체 뷰포트 채움) |
| margin-top | -145px (중앙에서 위로) |
| text-align | center |
| display | flex + justify-content: center + align-items: center |

#### 헤딩 텍스트 스펙 (`.heading`)

| 속성 | 값 |
|------|-----|
| 텍스트 | `A new kind of credit card.` |
| font-family | `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif` |
| font-size | **63px** |
| font-weight | **600** |
| color | **#070707** |
| line-height | ~1.2 (≈ 75.6px) |
| letter-spacing | 기본값 (별도 선언 없음) |

---

### 4-5. iPhone 목업 (`.iphone-wrapper`)

| 속성 | 값 |
|------|-----|
| position | fixed |
| z-index | 1 (카드보다 아래) |
| width | 600px |
| bottom | 0 |
| 좌우 | 0% 0% (수평 중앙) |
| 모바일 너비 | 100vw (`≤ 479px`) |
| 이미지 | `iphone.jpg` (1200px 원본) |

---

## 5. 색상 팔레트

| 토큰 | 값 | 용도 |
|------|----|------|
| `--bg` | `#FFFFFF` | 페이지 배경 |
| `--bg-warm` | `#FAF8F5` | 워밍업 배경 |
| `--gradient-start` | `#F8F4EF` | 배경 그래디언트 시작 |
| `--gradient-mid` | `#F0EAE3` | 배경 그래디언트 중간 |
| `--gradient-end` | `#E8E3DD` | 배경 그래디언트 끝 |
| `--text-primary` | `#070707` | 메인 헤딩 |
| `--card-border` | `#E5E0DA` | 카드 테두리 (티타늄 실버) |
| `--card-bg-start` | `#FFFFFF` | 카드 그래디언트 시작 |
| `--card-bg-end` | `rgba(229,224,218,0.6)` | 카드 그래디언트 끝 |

---

## 6. 타이포그래피

| 요소 | font-size | font-weight | color | font-family |
|------|-----------|-------------|-------|-------------|
| 메인 헤딩 (h1) | 63px | 600 | #070707 | system-ui stack |
| body 기본 | 14px | 400 | 기본 | Arial, sans-serif |

**system-ui 폰트 스택 (전체):**
```css
font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
             Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans",
             "Helvetica Neue", sans-serif;
```

---

## 7. 반응형 스펙

| 브레이크포인트 | 조건 | 변경 사항 |
|---------------|------|----------|
| Desktop | > 991px | 기본 스펙 적용 |
| Tablet | ≤ 991px | 카드 90% 축소 |
| Mobile L | ≤ 767px | `.intro-title` → `80vw` |
| Mobile S | ≤ 479px | `.iphone-wrapper` → `100vw` |

**원본 미처리 항목 (클론 시 추가 구현 필요):**
```css
/* 카드 반응형 (원본에 없음 — 추가 권장) */
@media (max-width: 767px) {
  .gradient-card-wrapper {
    width: 320px;
    height: 200px;
  }
  .heading {
    font-size: 36px;
  }
}

@media (max-width: 479px) {
  .gradient-card-wrapper {
    width: 280px;
    height: 175px;
  }
  .heading {
    font-size: 28px;
  }
}
```

---

## 8. 에셋 목록

| 파일명 | 크기 | 역할 | 대체 방법 |
|--------|------|------|----------|
| `hero-title.png` | 최대 1226px | 히어로 타이틀 이미지 | CSS 텍스트로 대체 |
| `card-branding.svg` | 484×304px | 카드 브랜딩 레이어 | SVG 직접 작성 |
| `card-gradient-end.svg` | 480×300px | 카드 색상 레이어 | CSS gradient로 대체 |
| `gradient-big.svg` | 1280×802px | 배경 그래디언트 | CSS radial-gradient로 대체 |
| `iphone.jpg` | 최대 1200px | iPhone 목업 | 무료 목업 이미지로 대체 |

**CDN 원본:**
```
https://cdn.prod.website-files.com/69c1335a68c3820893c3280d/
```

---

## 9. 기술 스펙

| 항목 | 원본 | 클론 구현 |
|------|------|----------|
| 빌더 | Webflow | HTML + CSS + Vanilla JS |
| 애니메이션 | Webflow IX2 | IntersectionObserver + scroll 이벤트 |
| JS 의존성 | jQuery 3.5.1 + Webflow runtime | 없음 (순수 JS) |
| 폰트 | system-ui (외부 폰트 없음) | 동일 |
| 이미지 | srcset 반응형 | `<img srcset>` 또는 단일 이미지 |

---

## 10. 구현 우선순위

### Phase 1 — 정적 레이아웃 (필수)
- [ ] `.stage` 컨테이너 (height: 4000px)
- [ ] `.gradient-card-wrapper` — `overflow: visible` 필수
- [ ] `.gradient-big` 초기 배치 (scale 미적용 상태)
- [ ] 카드 레이어 구조 (card-gradient-end + card-branding)
- [ ] 메인 헤딩 ("A new kind of credit card.", 63px, #070707)
- [ ] iPhone 목업 이미지 배치

### Phase 2 — 핵심 애니메이션 (이것이 전부)
- [ ] 페이지 로드: stage fade-in + 히어로 타이틀 slide-up
- [ ] **scroll 0~45%: gradient-big `scale(3.5→1)` + `border-radius(34px→13px)` 모핑**
- [ ] scroll 0~45%: 히어로 타이틀 fade-out (카드와 교차)
- [ ] scroll 45~55%: card-branding fade-in (카드 완성)
- [ ] scroll 50~65%: 헤딩 fade-in
- [ ] scroll 60~80%: iPhone 슬라이드업
- [ ] **scroll 70~90%: 카드가 iPhone 화면 위치로 이동 + scale 축소 (폰 안으로 진입)**

### Phase 3 — 반응형 (권장)
- [ ] 모바일 카드 크기 조정
- [ ] 모바일 헤딩 크기 조정
- [ ] 모바일 초기 scale 값 조정 (화면 크기에 맞게)
- [ ] iOS Safari viewport 버그 대응 (`dvh` 또는 JS 보정)

---

## 11. 검수 체크리스트

```
레이아웃
[ ] 카드가 화면 하단에서 47px 위에 위치하는가
[ ] 헤딩이 화면 중앙보다 145px 위에 위치하는가
[ ] 히어로 타이틀이 중앙보다 124px 위에 위치하는가
[ ] iPhone이 화면 하단에 붙어 있는가
[ ] .gradient-card-wrapper에 overflow: visible이 적용되어 있는가

핵심 애니메이션 (가장 중요)
[ ] 페이지 진입 시 gradient-big이 화면을 크게 채우는가 (scale ~3.5)
[ ] 스크롤하면 gradient-big이 점차 축소되며 카드 모양으로 수렴하는가
[ ] 축소 완료 시점에 card-branding이 fade-in되어 카드가 완성되는가
[ ] iPhone이 등장한 후 카드가 iPhone 화면 안으로 이동하는가
[ ] 카드가 iPhone 진입 시 scale이 축소되어 "흡수"되는 느낌인가
[ ] 블롭 → 카드 전환이 끊김 없이 자연스러운가

색상
[ ] 배경이 흰색 + 따뜻한 크림 그래디언트인가
[ ] 헤딩 색상이 #070707인가 (#000000 아님)
[ ] 카드 테두리가 #E5E0DA (티타늄 실버)인가

타이포그래피
[ ] 헤딩 font-size: 63px인가
[ ] font-weight: 600인가
[ ] system-ui 폰트 스택인가

반응형
[ ] 모바일(375px)에서 가로 스크롤이 없는가
[ ] iPhone 목업이 모바일에서 100vw인가
[ ] 히어로 타이틀이 모바일에서 80vw인가
[ ] 모바일에서 초기 scale 값이 화면에 맞게 조정되는가
```

---

*PRD 기준: 실제 HTML/CSS 소스 직접 파싱 (2026-03-23)*
