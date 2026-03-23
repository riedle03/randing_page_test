# 리버스 프롬프팅 가이드: UI/UX 교사용
## AI로 웹사이트 클론 배우기

---

## 1. 리버스 프롬프팅이란?

### 개념 설명

**리버스 프롬프팅**은 완성된 디자인을 보고 역으로 AI에게 줄 프롬프트를 도출하는 기법입니다.

```
완성된 웹사이트 디자인 → 시각적 요소 분석 → 텍스트 프롬프트로 변환 → AI 생성 → 비교 및 개선
```

### 예시 흐름

| 단계 | 활동 | 결과 |
|------|------|------|
| 1. 관찰 | "DH's Fabulous Site"의 히어로 섹션 분석 | 시각적 특징 목록 |
| 2. 분석 | 색상, 레이아웃, 타이포그래피 정리 | 구조화된 요소 |
| 3. 변환 | 시각적 요소를 문장으로 표현 | 프롬프트 초안 |
| 4. 생성 | AI에 프롬프트 전달 | AI 생성 결과 |
| 5. 비교 | 원본과 생성물 비교 | 개선점 파악 |

---

### 왜 UI/UX 교육에 효과적인가?

#### 1. **디자인 인식(Design Literacy) 강화**
- 학생들이 "무엇이 좋은 디자인인가?"를 분석하게 됩니다
- 의도적인 디자인 선택을 이해하게 됩니다
- 추상적인 디자인 개념을 구체적인 프롬프트로 표현

#### 2. **AI 활용 능력 개발**
- AI에 요청할 때 "뭘 원하는지 정확히 표현"하는 능력 학습
- 프롬프트 엔지니어링 실전 경험
- 반복 개선(iteration) 문화 체득

#### 3. **실전 프로토타이핑**
- Vibe Coding으로 빠른 프로토타입 제작
- AI 도구 활용으로 생산성 향상
- 디자인-개발 간극 축소

#### 4. **비판적 사고력 배양**
- "왜 이렇게 만들었는가?" 질문
- 원본 vs AI 생성물 비교 분석
- 부족한 부분 인식 및 개선

---

## 2. 사이트 분석 → 프롬프트 변환 방법

### Step 1: 시각적 요소를 언어로 변환

#### 색상 분석 예시

**관찰:**
```
히어로 섹션의 배경색: 짙은 파란색 또는 검은색
카드의 배경: 밝은 흰색 또는 라이트 그레이
강조색: 네온 파란색 또는 밝은 시안색
```

**프롬프트로 변환:**
```
"Dark blue to black gradient background for the hero section,
with neon cyan accents for interactive elements"
```

#### 레이아웃 분석 예시

**관찰:**
```
- 제목: 화면 왼쪽 상단
- 부제목: 제목 아래
- 이미지: 오른쪽 약 40% 차지
- 버튼: 제목 아래, 텍스트 영역에 위치
```

**프롬프트로 변환:**
```
"Hero section with 60-40 layout:
left side contains large headline, subtitle, and CTA button;
right side showcases a credit card image"
```

#### 타이포그래피 분석 예시

**관찰:**
```
- 헤드라인: 굵고 큼 (약 48px+)
- 서브헤드: 중간 크기 (약 24px)
- 본문: 작고 가독성 좋음 (약 16px)
- 글꼴: 모던 산세리프 (예: Inter, Poppins)
```

**프롬프트로 변환:**
```
"Use modern sans-serif font (Poppins or Inter).
Headlines are bold and large (48px+),
subheadings are medium (24px),
body text is readable at 16px"
```

---

### Step 2: 레이아웃 패턴을 프롬프트로 표현

#### 구조 패턴 분류

##### 패턴 1: 섹션 기반 레이아웃
```
"Page consists of distinct sections:
1. Header with navigation
2. Hero section with headline and CTA
3. Features section with 3 columns
4. Testimonials section
5. Footer with links"
```

##### 패턴 2: 카드 그리드
```
"Feature cards in 3-column grid layout,
each card contains icon, title, and description,
cards have subtle shadow and hover effects"
```

##### 패턴 3: 스크롤 우선(Scroll-first)
```
"Mobile-first responsive design,
hero section takes full viewport,
sections stack vertically on mobile,
2-column layout on tablet,
3-column layout on desktop"
```

#### 화이트스페이스 표현

**관찰:**
```
섹션 간 여백: 넉넉함
카드 내부 패딩: 24px 상하좌우
요소 간 간격: 일정함
```

**프롬프트로 변환:**
```
"Generous spacing between sections (80px+),
consistent 24px padding within cards,
balanced whitespace throughout design"
```

---

## 3. 실제 프롬프트 예시 (단계별)

### 1단계: 전체 페이지 구조 프롬프트

```
"Create a modern credit card landing page with:

OVERALL STRUCTURE:
- Header section with logo and minimal navigation
- Full-screen hero section as main focal point
- 3-4 feature sections below hero
- Footer with company info and social links

DESIGN LANGUAGE:
- Dark sophisticated background (navy or black)
- Neon cyan/blue accent colors
- Modern minimalist aesthetic
- High contrast between background and text

RESPONSIVE:
- Mobile-first approach
- Hero section full width and height
- Sections stack vertically on mobile
- Grid layouts reflow for tablet/desktop"
```

**언제 사용할까?**
- 첫 번째 AI 생성 시 전체 구조 파악
- 학생들이 페이지의 "큰 그림" 이해하게 함

---

### 2단계: 히어로 섹션 프롬프트

```
"Design a hero section for a premium credit card landing page:

LAYOUT:
- 60-40 split: left side for content, right side for image
- Left: headline, subheadline, description, CTA button
- Right: premium credit card product image

VISUAL STYLE:
- Dark blue to black gradient background
- Neon cyan glow effect around card image
- Dramatic lighting effect on product

CONTENT:
- Headline: 'A new kind of credit card' (bold, large, white text)
- Subheadline: Value proposition in 1-2 lines (smaller, gray text)
- Body: 2-3 sentence description (light gray, 16px)
- Button: 'Get Started' with neon cyan background and dark text

EFFECTS:
- Subtle parallax on scroll
- Hover animations on button
- Card has 3D perspective effect"
```

**교육 포인트:**
- 레이아웃 비율을 구체적으로 지정
- 색상의 심리적 효과 이해
- 상호작용(호버, 스크롤) 명시

---

### 3단계: 카드 컴포넌트 프롬프트

```
"Create reusable credit card feature cards:

CARD STRUCTURE:
- Rectangle shape, 300px width (responsive)
- 24px padding on all sides
- Subtle box shadow (rgba 0,0,0,0.1)

CONTENT LAYOUT:
- Top: Icon (48x48px) or colored badge
- Middle: Title (20px bold), description (16px regular)
- Bottom: CTA link or '→' arrow indicator

STYLING:
- Background: White or light gray (#F5F5F5)
- Border: 1px light gray or no border
- Corner radius: 12px
- Text color: Dark gray/black

INTERACTIONS:
- Hover effect: Slight lift (translate Y -4px)
- Hover shadow: More pronounced shadow
- Transition: 300ms ease
- Icon or accent color changes slightly"
```

**교육 포인트:**
- 컴포넌트 재사용성 이해
- 일관된 디자인 시스템 구축
- 마이크로 인터랙션의 중요성

---

### 4단계: 색상/스타일 프롬프트

```
"Define color scheme and visual style:

PRIMARY COLORS:
- Dark base: #1a1a2e (hero background)
- Accent: #00d9ff (neon cyan for interactive elements)
- Text: #ffffff (primary), #a0a0a0 (secondary)

SECONDARY COLORS:
- Light background: #f8f9fa
- Border: #e0e0e0
- Success/Positive: #00ff88

TYPOGRAPHY:
- Font family: Poppins or Inter (modern sans-serif)
- Headlines: 700 weight, 48-56px
- Subheadlines: 600 weight, 24-28px
- Body: 400 weight, 14-16px
- Small text: 400 weight, 12-14px

VISUAL EFFECTS:
- Use gradients for depth (dark blue → darker blue)
- Glow effects for accent elements
- Rounded corners: 8-12px for cards, 6-8px for buttons
- Shadows: subtle (0 4px 12px rgba(0,0,0,0.1))

ANIMATION:
- Default timing: 300-500ms
- Easing: ease-out or cubic-bezier"
```

**교육 포인트:**
- 일관된 디자인 시스템의 중요성
- 색상 심리학과 대조
- 타이포그래피 계층구조

---

### 5단계: 반응형 프롬프트

```
"Ensure responsive design across all devices:

MOBILE (< 768px):
- Hero section: Full width, text-centered or single column
- Cards: Single column stack
- Font sizes: Reduced 15-20% for readability on small screens
- Navigation: Hamburger menu
- Spacing: Reduced margins/padding (16px between sections)

TABLET (768px - 1024px):
- Hero section: 50-50 layout or stacked
- Cards: 2-column grid
- Spacing: Standard margins (40-60px)
- Navigation: Simplified, more items visible

DESKTOP (> 1024px):
- Hero section: 60-40 layout with full effects
- Cards: 3-column grid or more
- Spacing: Generous margins (80px+ between sections)
- All animations and effects enabled
- Hover states fully interactive

TOUCH INTERACTIONS:
- Remove hover effects on mobile
- Use tap/click instead
- Larger touch targets (44x44px minimum)
- Simplified animations for performance"
```

**교육 포인트:**
- 모바일-우선 설계 원칙
- 디바이스별 최적화
- 성능과 사용성 고려

---

## 4. 프롬프트 개선 팁

### 팁 1: 구체적으로 만드는 방법

#### 🔴 Bad (추상적, 모호함)
```
"Make a nice credit card landing page with good colors and layout"
```
**문제:**
- "nice"의 정의가 불명확
- "good colors"가 무엇인지 모름
- AI가 추측만 함

#### 🟢 Good (구체적, 명확함)
```
"Create a credit card landing page with:
- Dark navy (#1a1a2e) hero section background
- Neon cyan (#00d9ff) for buttons and accents
- 60-40 split layout (left: text, right: card image)
- Poppins font, 56px for headline, 16px for body text
- 12px corner radius for cards, 8px for buttons
- 300ms smooth transitions on hover effects"
```

**개선된 이유:**
- 색상 코드로 명확성 확보
- 레이아웃 비율 수치화
- 글꼴 크기 명시
- 애니메이션 타이밍 정의

---

#### 구체성 체크리스트

프롬프트 작성 후 다음을 확인하세요:

- [ ] 색상을 HEX 코드로 지정했는가? (또는 명확한 색상명)
- [ ] 레이아웃을 비율(%)이나 픽셀로 표현했는가?
- [ ] 글꼴과 크기를 명시했는가?
- [ ] 간격과 패딩을 숫자로 정의했는가?
- [ ] 애니메이션 시간을 밀리초로 표기했는가?
- [ ] 어떤 디바이스를 위한 것인지 명시했는가?

---

### 팁 2: 반복 개선(Iteration) 전략

#### 프롬프트 개선 사이클

```
초기 프롬프트 생성
        ↓
AI로 생성
        ↓
원본과 비교 (뭐가 다른가?)
        ↓
부족한 부분 파악 (왜 다른가?)
        ↓
프롬프트 수정 (더 구체적으로)
        ↓
다시 생성 및 비교
        ↓
반복 (만족할 때까지)
```

#### 실제 개선 예시

**1차 프롬프트:**
```
"Create a modern credit card landing page with hero section"
```

**1차 결과 분석:**
- ❌ 레이아웃이 중앙 정렬이 아님
- ❌ 색상이 너무 밝음
- ❌ 카드 이미지 위치가 틀림
- ✓ 전체 구조는 올바름

**2차 프롬프트 (개선):**
```
"Create a modern credit card landing page:

HERO SECTION SPECIFICALLY:
- Dark navy background (#1a1a2e)
- LEFT side (60%): 'A new kind of credit card' headline in white
- RIGHT side (40%): Premium credit card image on dark background
- Neon cyan (#00d9ff) button below headline
- Card image should be larger and more prominent"
```

**2차 결과 분석:**
- ✓ 레이아웃 비율 개선
- ✓ 색상 정확성 향상
- ❌ 카드의 3D 원근감 부족
- ❌ 글로우 효과 없음

**3차 프롬프트 (추가 개선):**
```
"[2차 프롬프트 유지] +

CARD VISUAL EFFECTS:
- 3D perspective transform (15deg rotateY)
- Neon glow around card edges (cyan shadow)
- Subtle gradient overlay on card (dark blue → transparent)
- Light reflection effect on card surface
- Shadow beneath card: 0 20px 60px rgba(0, 217, 255, 0.3)"
```

**3차 결과:** ✓ 거의 완벽함!

---

#### 반복 개선 팁

| 상황 | 해결책 |
|------|--------|
| 색상이 정확하지 않음 | HEX 코드 명시, RGB 값 추가, 또는 참조 이미지 제공 |
| 레이아웃이 틀림 | 비율(%)과 픽셀 크기 구체화, CSS Grid/Flexbox 용어 사용 |
| 타이포그래피 부족 | 글꼴명, 크기, 웨이트, 라인 높이 모두 명시 |
| 애니메이션 없음 | 동작 설명, 시간(ms), easing 함수 명시 |
| 간격이 이상함 | 마진, 패딩을 px로 명시, "generous spacing" 대신 숫자 사용 |
| 반응형 미흡 | 브레이크포인트(768px, 1024px) 명시, 각 뷰포트별 지시 |

---

### 팁 3: 참조 이미지 활용

프롬프트에 시각적 참조를 추가하면 AI 생성 정확도 향상:

```
"Create a credit card landing page matching the style of [원본 이미지 또는 URL]:

SPECIFIC ELEMENTS TO MATCH:
- Color scheme: Analyze the provided image
- Layout proportions: Match the left-right balance
- Typography style: Use similar font weights and sizes
- Shadow and depth: Recreate the 3D effects shown
- Spacing: Maintain similar padding and margins"
```

**학생들에게 알려줄 점:**
- AI는 이미지를 언어로 해석함
- 프롬프트 + 이미지 = 더 정확한 결과
- 여러 참조 이미지 제공 가능

---

## 5. 교실 실습: 단계별 활동

### 활동 1: 관찰과 분석 (20분)

**목표:** 디자인 요소 인식

**학생 과제:**
1. "DH's Fabulous Site" 스크린샷 제공
2. 다음을 관찰하게 하기:
   - 사용된 색상 (주요 3-4개)
   - 레이아웃 구조 (섹션 수, 비율)
   - 타이포그래피 (글꼴, 크기 추정)
   - 특수 효과 (그림자, 그래디언트 등)
3. 분석 결과를 표로 정리

**확인 질문:**
- "가장 눈에 띄는 색은 무엇인가?"
- "이 레이아웃이 왜 효과적일까?"
- "모바일에서는 어떻게 보일까?"

---

### 활동 2: 프롬프트 작성 (30분)

**목표:** 관찰을 프롬프트로 변환

**학생 과제:**
1. 개별 또는 그룹으로 프롬프트 작성
2. 3단계로 진행:
   - **드래프트:** 자유롭게 작성
   - **구체화:** 색상/크기/간격 숫자화
   - **최종:** 체크리스트 확인 후 제출

**제시할 템플릿:**
```
"Create a credit card landing page with:

OVERALL DESIGN:
[색상, 스타일, 분위기]

HERO SECTION:
[레이아웃, 콘텐츠, 효과]

COMPONENTS:
[카드, 버튼, 기타 요소]

RESPONSIVE:
[모바일, 태블릿, 데스크톱]"
```

---

### 활동 3: AI 생성 및 비교 (30분)

**목표:** AI 이해 및 결과 평가

**학생 과제:**
1. 작성한 프롬프트를 Canva, ChatGPT, Claude 등에 입력
2. 생성된 결과 스크린샷 저장
3. 원본과 생성물을 나란히 비교:
   - 맞은 부분: ✓
   - 틀린 부분: ✗
   - 부족한 부분: ?

**비교 템플릿:**
| 요소 | 원본 | 생성물 | 일치도 |
|------|------|--------|--------|
| 색상 | 진한 파란색 | 밝은 파란색 | 70% |
| 레이아웃 | 60-40 분할 | 50-50 분할 | 60% |
| 타이포 | 산세리프 굵은체 | 산세리프 일반 | 80% |

---

### 활동 4: 프롬프트 개선 (30분)

**목표:** 반복 개선 실습

**학생 과제:**
1. 비교 결과에서 "틀린 부분" 및 "부족한 부분" 선별
2. 각각에 대한 개선 프롬프트 작성:
   ```
   원래: "Dark blue background"
   개선: "Dark navy blue (#1a1a2e) gradient to darker shade"
   ```
3. 개선된 프롬프트로 재생성
4. 개선 전/후 비교

**질문 유도:**
- "구체적으로 무엇이 더 정확해졌는가?"
- "왜 숫자를 명시하면 결과가 좋아질까?"
- "다음에 어떻게 더 개선할 수 있을까?"

---

### 활동 5: 최종 프로토타입 및 발표 (30분)

**목표:** 결과물 완성 및 공유

**학생 과제:**
1. 최종 프롬프트와 생성 결과 정리
2. Figma/Canva에서 간단히 조정 (선택사항)
3. 프로세스 정리:
   - 초기 프롬프트
   - 개선 과정 (스크린샷)
   - 최종 결과
4. 5분 발표: "어떻게 개선했는가?"

**발표 가이드:**
- 초기 프롬프트의 문제점
- 개선을 위해 추가한 구체적 정보
- 결과물의 정확도 (%)
- 배운 점

---

## 6. 교사용 평가 루브릭

### 프롬프트 품질 평가

| 평가항목 | 미흡 (1점) | 보통 (2점) | 우수 (3점) |
|---------|----------|-----------|----------|
| **구체성** | 추상적 단어만 사용 | 일부 구체적 정보 | 색상코드, 크기 등 명시 |
| **완성도** | 레이아웃만 묘사 | 몇 요소 누락 | 모든 요소 포함 |
| **정확성** | 원본과 다름 | 70% 정도 일치 | 90% 이상 일치 |
| **반응형** | 고려 없음 | 부분적 포함 | 모든 브레이크포인트 명시 |
| **개선 노력** | 반복 없음 | 1회 개선 | 2회 이상 개선 |

---

### 학습 성과 평가

**학생이 달성해야 할 목표:**
- [ ] 디자인 요소를 정확히 관찰하고 분석할 수 있다
- [ ] 시각적 정보를 텍스트로 명확히 표현할 수 있다
- [ ] AI에 원하는 결과를 정확히 요청할 수 있다
- [ ] 결과를 원본과 비교하고 개선점을 파악할 수 있다
- [ ] 반복 개선을 통해 최종 결과를 개선할 수 있다

---

## 7. 자주 묻는 질문 (FAQ)

### Q1: 학생이 프롬프트를 어떻게 시작해야 할까요?

**A:** 간단하게 시작하세요:
```
"Create a [디자인 타입] with [주요 특징]"
```
그 다음 세부사항을 추가합니다. 완벽을 목표로 하지 말고 반복 개선을 강조하세요.

---

### Q2: AI가 원본과 다르게 생성되면 어떻게 해야 하나요?

**A:** 이것이 **학습의 기회**입니다:
1. "어떤 부분이 다른가?" 질문
2. "왜 다를까?" 분석
3. "프롬프트를 어떻게 바꾸면 더 정확할까?" 개선

실패는 성공의 연료입니다!

---

### Q3: 모든 학생이 같은 결과를 얻을까요?

**A:** 아니오. AI 모델, 버전, 업데이트에 따라 결과가 다릅니다:
- 이것을 "변수 이해"의 기회로 사용하세요
- "왜 다른 결과가 나왔을까?" 논의
- 같은 프롬프트, 다른 결과 = 좋은 학습

---

### Q4: 저작권 문제는 없을까요?

**A:**
- **교육용:** 자유로운 사용 가능
- **상업용:** 원본 디자이너의 동의 필요
- 학생들에게 명확히 설명하세요:
  "이것은 학습을 위한 것이며, 상업 용도로는 사용할 수 없습니다"

---

### Q5: 어떤 AI 도구를 추천하나요?

**프롬프트 기반 UI 생성:**
- **Canva**: 드래그-드롭으로 쉬움
- **Claude/ChatGPT**: 정밀한 지시 가능
- **Adobe Firefly**: 이미지 기반 생성
- **Figma AI**: 디자인 툴 내 생성

**추천:** Canva (학생 친화적) + Claude (정밀성)

---

### Q6: 학생이 "AI를 속이려고" 하면 어떻게 하나요?

**A:** 다시 리프레이밍하세요:
- "AI를 속이는" 것이 아니라 "AI를 올바르게 이용"하는 것
- 프롬프트 엔지니어링은 **기술**입니다
- "정확하게 요청할 수 있는 능력"이 미래 기술입니다

---

## 8. 강의안 예시 (120분)

### 전체 흐름

| 시간 | 활동 | 방식 |
|------|------|------|
| 0-10분 | 오리엔테이션 | 강의: "리버스 프롬프팅이란?" |
| 10-30분 | 사이트 분석 | 그룹 활동: 스크린샷 관찰 |
| 30-45분 | 프롬프트 작성 | 개별/그룹: 초안 작성 |
| 45-60분 | AI 생성 | 개별: 프롬프트 입력 및 생성 |
| 60-80분 | 비교 및 개선 | 그룹 논의: 개선 방안 |
| 80-105분 | 재생성 및 정리 | 개별: 최종 프로토타입 완성 |
| 105-120분 | 발표 및 피드백 | 전체: 발표 및 토론 |

---

### 교사 체크리스트

**수업 준비:**
- [ ] "DH's Fabulous Site" 스크린샷 준비
- [ ] AI 도구 계정 테스트 (Canva, Claude 등)
- [ ] 예시 프롬프트 및 결과물 준비
- [ ] 비교 템플릿 작성
- [ ] 루브릭 출력

**수업 중:**
- [ ] 학생들이 명확하게 이해하는지 확인
- [ ] 질문을 격려하기
- [ ] 실패를 학습 기회로 재프레이밍
- [ ] 개선 과정 강조

**피드백:**
- [ ] 각 학생의 프롬프트 리뷰
- [ ] 개선 전/후 비교
- [ ] 구체적인 칭찬 및 제안

---

## 9. 심화 주제 (선택사항)

### A. 프롬프트 엔지니어링 고급 기법

#### 1. 역할 지정 (Role-based)
```
"You are an expert UI/UX designer for fintech products.
Create a credit card landing page that..."
```

#### 2. 예시 기반 (Few-shot)
```
"Here's an example of the style I want:
[예시 이미지나 설명]

Now create a credit card landing page with similar style but..."
```

#### 3. 제약 조건 기반 (Constraint-based)
```
"Create a credit card landing page WITH:
- [필수 요소 3가지]

WITHOUT:
- [제외할 요소 3가지]"
```

---

### B. 협업 워크플로우

#### 팀 프롬프팅
```
1. PM: 제품 요구사항 정의
2. 디자이너: UI/UX 요구사항 명확화
3. 엔지니어: 기술 제약 사항 추가
4. 함께: 최종 프롬프트 작성
5. AI: 생성
6. 함께: 평가 및 반복
```

---

### C. 성능 최적화

프롬프트에 성능 고려사항 추가:
```
"Create responsive design with:
- Initial load: <2 seconds
- Images: WebP format, optimized
- Animations: GPU-accelerated, smooth 60fps
- Mobile performance: Priority"
```

---

## 10. 결론: 교사로서의 역할

### 리버스 프롬프팅 교육의 의미

당신은 학생들에게 단순히 "웹사이트를 복제하는 방법"을 가르치는 것이 아니라:

1. **비판적 사고**: 좋은 디자인이 무엇인가?
2. **명확한 커뮤니케이션**: 추상적 아이디어를 어떻게 전달하는가?
3. **반복 개선**: 완벽함보다 진행이 중요함
4. **AI 협업**: 인간과 AI의 관계
5. **직업 기술**: 미래의 필수 역량

---

### 마지막 조언

> "완벽한 첫 프롬프트를 기대하지 마세요.
> 대신 '어떻게 더 잘 요청할 수 있을까?'를 계속 묻는 문화를 만드세요."

---

## 부록: 프롬프트 템플릿 모음

### 템플릿 1: 전체 페이지
```
"Create a [product type] landing page:

STRUCTURE:
- Header: [description]
- Hero: [description]
- Features: [description]
- CTA: [description]
- Footer: [description]

DESIGN SYSTEM:
- Colors: [colors with hex codes]
- Typography: [fonts and sizes]
- Spacing: [margins and padding]
- Shadows: [shadow descriptions]

RESPONSIVE:
- Mobile (<768px): [layout]
- Tablet (768-1024px): [layout]
- Desktop (>1024px): [layout]"
```

---

### 템플릿 2: 컴포넌트
```
"Create a [component name] with:

STRUCTURE:
- [element 1]: [description]
- [element 2]: [description]
- [element 3]: [description]

STYLING:
- Background: [color]
- Border: [size and color]
- Corner radius: [value]
- Shadow: [shadow values]

INTERACTIONS:
- Hover: [effect]
- Active: [effect]
- Disabled: [effect]
- Duration: [milliseconds]"
```

---

### 템플릿 3: 색상 시스템
```
"Define a color palette for [product]:

PRIMARY:
- [Color name]: [Hex code] - [usage]
- [Color name]: [Hex code] - [usage]

SECONDARY:
- [Color name]: [Hex code] - [usage]
- [Color name]: [Hex code] - [usage]

NEUTRAL:
- [Color name]: [Hex code] - [usage]
- [Color name]: [Hex code] - [usage]"
```

---

**작성일:** 2026년 3월 23일
**대상:** UI/UX 교사, 디자인 교육자
**버전:** 1.0
