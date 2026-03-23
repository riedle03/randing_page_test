# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

Apple Card 스타일의 크레딧카드 랜딩페이지 클론. 단일 HTML 파일 + 로컬 에셋으로 구성된 정적 사이트.
참조 원본: https://dhs-fabulous-site-09d196.webflow.io/

## 파일 구조

```
index.html          — 전체 구현 (HTML + CSS + JS 단일 파일)
gradient-bg.svg     — 배경 그래디언트 (1600×1200, 블루/핑크 블롭)
card-branding.svg   — 카드 SVG (484×304, rx:12.874)
iphone-p-1080.jpeg  — iPhone 목업 이미지
PRD.md              — 스펙 문서 (구현 기준)
```

## 실행

별도 빌드 없음. 브라우저에서 직접 열기:
```
start index.html
```

## 핵심 애니메이션 구조

`index.html`의 JS는 단일 `onScroll()` 함수로 모든 애니메이션을 제어한다.
scroll progress(0~1)를 구간별로 분기해 각 요소를 제어한다.

| scroll % | 동작 |
|----------|------|
| 0% | 페이지 load → `.gradient-morph` fade-in, `.intro-title` slide-up |
| 0~45% | `.gradient-morph`의 `clip-path: inset()` 값 조정 → 화면 전체에서 카드 형태로 축소 |
| 0~20% | `.intro-title` fade-out |
| 45~58% | `.card-branding-overlay` fade-in (카드 완성) |
| 52~65% | `.card-title-end` fade-in |
| 60~78% | `.iphone-wrapper` slide-up |
| 72~90% | `clip-path` 계속 조정 → 카드 60% 축소 + 위로 180px 이동 (iPhone 진입) |

## 레이아웃 패턴

모든 콘텐츠 요소는 `position: fixed`. `.stage`(height: 4000px)만 스크롤 공간 역할을 한다.

z-index 계층:
- 20: `.intro-title`, `.card-title-end`
- 10: `.card-branding-overlay`
- 5: `.gradient-morph` (핵심 모핑 요소)
- 3: `.iphone-wrapper`

## 모핑 기법

`clip-path: inset(top right bottom left round radius)` 단일 기법으로 모든 카드 애니메이션을 처리한다. `transform`은 사용하지 않는다 (full-screen 요소에 transform 적용 시 origin 문제 발생).

```javascript
// computeClipPath(0) = 화면 전체 (inset 0 0 0 0 round 34px)
// computeClipPath(1) = 카드 위치/크기 (inset top lr bottom lr round 12.874px)
```

## 스펙 변경 시

`PRD.md`가 기준 문서다. 애니메이션 타이밍·크기·색상 변경 시 PRD.md도 함께 업데이트한다.
