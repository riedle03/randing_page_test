# 바이브코딩으로 크레딧카드 랜딩페이지 클론하기

## 수업 목표

이 실습을 마친 후 학습자는 다음을 할 수 있습니다:

- AI 코딩 도구와 자연스럽게 대화하며 웹사이트 구현하기
- 디자인 의도를 명확한 프롬프트로 표현하기
- 반복적 피드백을 통해 디자인 개선하기
- 코드 이해 없이도 완성도 높은 랜딩페이지 만들기

**핵심 철학:** 코드는 도구일 뿐, 디자이너의 시각이 중심입니다.

---

## 준비물 (도구 설명)

### 필수 도구 (3가지 중 1개 선택)

| 도구 | 추천 대상 | 장점 | 단점 |
|------|----------|------|------|
| **Claude + Cursor** | 코드 이해하고 싶은 디자이너 | 가장 명확한 설명, 추가 학습 가능 | 약간 더 많은 입력 필요 |
| **v0.dev** | 빠른 결과 원하는 디자이너 | 즉각적 미리보기, 쉬운 UI | 복잡한 수정 어려울 수 있음 |
| **Bolt.new** | 풀스택 구현 필요한 경우 | 데이터베이스 연동 가능 | 초급자에게는 과할 수 있음 |

### 참고 자료
- 클론 대상 사이트: DH's Fabulous Site (웹플로우 스타일 크레딧카드 랜딩페이지)
- 스크린샷/사진 (참고용): 여러 각도에서 촬영
- 텍스트 에디터: 프롬프트 작성용 (메모장, Notion, Google Docs)

### 설치 확인 (5분)
```bash
# 선택한 도구가 정상 작동하는지 확인
# v0.dev: https://v0.dev 접속 후 '+ New' 클릭
# Cursor: https://cursor.com 에서 설치 또는 VS Code 확장
# Bolt.new: https://bolt.new 접속
```

---

## STEP 1: 사이트 관찰하기 (5분)

### 왜 이 단계가 중요한가?
AI와의 대화가 얼마나 정확한지는 관찰이 얼마나 세밀한지에 따라 결정됩니다. 디자인의 "느낌"뿐 아니라 구조를 이해해야 프롬프트도 정확해집니다.

### 무엇을 봐야 하는지

**1단계: 전체 레이아웃**
- 페이지가 몇 개의 주요 섹션으로 나뉘어 있는가?
- 각 섹션의 순서는 어떻게 되는가?
- 헤더는? 푸터는? 네비게이션은?

**2단계: 각 섹션의 특징**
- 배경색: 단색? 그래디언트? 이미지?
- 텍스트: 제목, 본문, 버튼 텍스트는 무엇인가?
- 이미지: 위치, 크기, 스타일은?
- 여백(스페이싱): 섹션 사이 거리는? 텍스트 주위 여백은?

**3단계: 세부 디자인 요소**
- 버튼: 색상, 모양(둥근가? 각진가?), 텍스트
- 카드/박스: 배경, 그림자, 테두리
- 폰트: 굵기(얇은/일반/굵은), 크기의 계층
- 색상 팔레트: 주색, 강조색, 배경색

### 체크리스트 (인쇄해서 사용)

```
[ ] 전체 섹션 개수 파악 (예: 5개)
[ ] 각 섹션의 이름 정하기 (예: Hero, Features, Pricing, CTA, Footer)
[ ] 주 색상 3가지 식별 (예: 파란색, 흰색, 회색)
[ ] 텍스트 계층 파악 (큰 제목, 작은 제목, 본문)
[ ] 이미지 개수 세기
[ ] 버튼 개수와 종류 세기
[ ] 사진/스크린샷 촬영 또는 저장
```

### 예시: DH's Fabulous Site 관찰
```
섹션 1 (Hero):
  - 큰 제목 + 부제목
  - 배경: 그래디언트 (보라색 → 파란색)
  - 크레딧카드 이미지 (오른쪽)
  - CTA 버튼 (흰색 또는 강조색)

섹션 2 (Features):
  - 3-4개 기능 카드
  - 각 카드: 아이콘 + 텍스트
  - 배경: 흰색 또는 밝은 색

섹션 3 (CTA/Signup):
  - 입력창 (이메일)
  - 제출 버튼
  - 배경: 강조색 또는 어두운 색

섹션 4 (Footer):
  - 링크 그룹
  - 저작권 정보
```

---

## STEP 2: 구조 스케치하기 (10분)

### 목표
프롬프트에 넣을 명확한 구조 정의. 와이어프레임 도구는 필요 없습니다.

### 방법: 텍스트 아웃라인 작성

메모장이나 Notion에 다음 형식으로 작성하세요:

```
📱 페이지 레이아웃 구조

Header/Navigation
├─ 로고
├─ 네비게이션 링크 (Features, Pricing, About)
└─ 로그인/가입 버튼

Hero Section
├─ 제목: "Your Payment Card Reimagined"
├─ 부제목: "Fast, secure, and beautifully designed"
├─ CTA 버튼: "Get Started" (흰색, 동그란 모서리)
└─ 배경: 그래디언트 (보라색 #7C5CE6 → 파란색 #4F46E5)
└─ 우측 이미지: 크레딧카드 모형

Features Section
├─ 섹션 제목: "Why Choose Us"
└─ 3개 카드:
    ├─ 카드 1: 아이콘 + "Fast" + 설명 텍스트
    ├─ 카드 2: 아이콘 + "Secure" + 설명 텍스트
    └─ 카드 3: 아이콘 + "Easy" + 설명 텍스트

Pricing Section (선택사항)
├─ 섹션 제목: "Simple Pricing"
└─ 2-3개 가격 플랜

CTA Section
├─ 제목: "Ready to upgrade?"
├─ 이메일 입력창
└─ "Sign Up" 버튼

Footer
├─ 링크 그룹
└─ 저작권 정보
```

### 와이어프레임 없이도 되는 이유

- **AI는 자연스러운 설명을 이해합니다:** "왼쪽에 텍스트, 오른쪽에 이미지" → AI가 배치를 추론
- **반복 개선으로 완성:** 첫 결과가 100%일 필요 없음. 피드백으로 개선
- **디자이너는 결과 평가에 집중:** 구현이 아닌 디자인 판단에만 몰두

### 체크리스트

```
[ ] 섹션별로 콘텐츠 나열했는가?
[ ] 각 섹션의 배경색/이미지 명시했는가?
[ ] 텍스트 내용 (제목, 설명) 포함했는가?
[ ] 버튼 정보 (텍스트, 색상) 포함했는가?
[ ] 이미지 위치 설명했는가?
```

---

## STEP 3: AI에게 첫 프롬프트 입력 (10분)

### 선택한 도구별 시작하기

#### 방법 1: v0.dev 사용 (가장 초급자 친화적)
1. https://v0.dev 열기
2. "+ New" 버튼 클릭
3. 프롬프트 입력창에 아래 텍스트 복사-붙여넣기
4. Enter 또는 "Generate" 버튼 클릭
5. 결과 미리보기 확인 (실시간)

#### 방법 2: Cursor 사용 (세밀한 제어)
1. Cursor 열기 (또는 VS Code + Cursor 확장)
2. 새 프로젝트 폴더 생성
3. `Ctrl+K` (맥: `Cmd+K`) 눌러 AI 챗 열기
4. 아래 프롬프트 입력

#### 방법 3: Claude 웹사이트 사용
1. https://claude.ai 열기
2. 새 대화 시작
3. 아래 프롬프트 입력 후 "Generate HTML file" 요청

---

### 첫 번째 프롬프트 (복사-붙여넣기 가능)

```
I want you to help me create a credit card landing page
clone inspired by DH's Fabulous Site.

Here's the structure I want:

1. Header
   - Logo text "CardVibe"
   - Navigation links: Features, Pricing, About
   - Button: "Sign In"

2. Hero Section
   - Background: Gradient from purple (#7C5CE6) to blue (#4F46E5)
   - Main title: "Your Payment Card Reimagined"
   - Subtitle: "Experience the future of payments with speed and security"
   - CTA Button: "Get Started Now" (white text, rounded corners)
   - Right side: Credit card mockup image

3. Features Section
   - Background: White
   - Section title: "Why Choose CardVibe"
   - 3 feature cards with icons:
     * Card 1: Icon + "Instant Payments" + description
     * Card 2: Icon + "Bank-Level Security" + description
     * Card 3: Icon + "Global Support" + description

4. CTA Section
   - Background: Dark blue or gradient
   - Title: "Ready to Get Started?"
   - Email input field
   - Submit button: "Sign Up"

5. Footer
   - Links grouped by category
   - Copyright text

Please create a responsive, modern design using HTML, CSS, and minimal JavaScript.
Use a clean, professional style. Make it mobile-friendly.

I'll provide feedback for improvements after seeing the initial version.
```

### 프롬프트 입력 후

1. **결과 미리보기 확인** (1-2분 대기)
2. **스크린샷 촬영** (나중에 비교하기 위해)
3. **첫인상 적기:**
   - 좋은 점 3가지
   - 개선할 점 3가지
4. 다음 단계로

---

## STEP 4: 반복 개선하기 (15분)

### 철칙: 작은 것부터 시작

한 번에 3개 이상 수정 요청하지 마세요. AI도 혼동하고, 결과도 예측 불가능합니다.

### 개선 사이클

```
1. 1-2가지만 수정 요청
   ↓
2. 결과 확인 (스크린샷 촬영)
   ↓
3. 만족하면 다음 항목으로 / 만족 못하면 재수정 요청
   ↓
4. 반복
```

---

### 시나리오별 피드백 프롬프트

#### 시나리오 1: 색상 수정하고 싶을 때

**지금까지의 대화에 추가:**

```
The hero section background looks good, but I want to change
the gradient colors slightly.

Instead of purple to blue, use:
- Start color: #6366F1 (indigo)
- End color: #0EA5E9 (sky blue)

Keep everything else the same.
```

**팁:**
- 색상 코드는 HEX 형식 사용 (#RRGGBB)
- 색상 코드 찾기: https://color-hex.com 또는 브라우저 개발자 도구
- 단순히 "더 밝게" 보다 "밝은 파란색으로" 가 더 명확

#### 시나리오 2: 레이아웃 조정하고 싶을 때

```
In the Features section, instead of 3 cards in a row,
I want them stacked differently:
- On desktop: 3 cards in one row
- On tablet: 2 cards on top, 1 below
- On mobile: 1 card per row (full width)

Also, increase the spacing between cards to 30px.
```

**팁:**
- "위에", "아래", "왼쪽", "오른쪽" 위치 명시
- "큰 화면", "작은 화면" 같은 반응형 설명 추가
- "여백", "거리", "간격" 단위는 px 사용

#### 시나리오 3: 텍스트 내용 수정

```
Please update the following text:

Hero Section:
- Main title: "Payments Made Simple"
- Subtitle: "Secure, fast, and designed for you"

Features Section - Card 1:
- Old: "Instant Payments"
- New: "Lightning Fast Transfers"

Please keep all styling exactly the same.
```

**팁:**
- 정확한 구간 명시 (어느 섹션, 어느 요소)
- "대신" 이전 내용도 언급 (혼동 방지)

#### 시나리오 4: 이미지 추가/변경

```
The credit card mockup on the right of the hero section
looks too small. Please:

1. Make it 30% larger
2. Add a subtle shadow effect (shadow color: rgba(0,0,0,0.1))
3. Adjust its position so it's better aligned with the title

(If you can't use an actual image, use a styled div
that looks like a credit card with a gradient background)
```

**팁:**
- 이미지 없으면 SVG나 CSS로 모양 만들 수 있다고 제안
- 크기는 백분율(%) 또는 px 단위 사용
- 정렬(왼쪽/가운데/오른쪽)도 함께 언급

#### 시나리오 5: 버튼 스타일 변경

```
The "Get Started Now" button needs some changes:

1. Change color to #10B981 (green)
2. Add a subtle hover effect (on hover, brightness +10%)
3. Increase button height to 50px and width to 180px
4. Keep the white text

Can you also show me what the button looks like on hover?
```

**팁:**
- 버튼 상태 명시 (기본/호버/활성)
- 크기, 색상, 텍스트 한 번에 지정
- 인터랙션(hover, click 효과) 요청 가능

---

### 실전: 개선 체크리스트

```
[ ] 색상이 브랜드와 맞는가?
[ ] 모든 텍스트가 읽기 쉬운 크기인가?
[ ] 버튼이 클릭하기 좋은 크기인가? (최소 44x44px 권장)
[ ] 간격이 균형잡혀 있는가? (너무 붐비지 않는가?)
[ ] 모바일에서 보기 좋은가? (미리보기 확인)
[ ] 이미지가 제대로 로드되는가?
[ ] 모든 링크가 작동하는가?
```

---

### 개선 예시: 단계별 진행

**1단계: 색상 확정** (2-3번 반복)
```
결과 → "색상이 너무 밝다" → 조정 → 확인 → OK
```

**2단계: 레이아웃 미세조정** (1-2번)
```
결과 → "여백이 크다" → 조정 → OK
```

**3단계: 콘텐츠 다듬기** (1번)
```
텍스트, 버튼 라벨 수정
```

**4단계: 반응형 검증** (1번)
```
"모바일에서 확인해봤는데 좋다" → 완성
```

---

## STEP 5: 마무리 & 배포 (5분)

### 최종 점검 (배포 전 필수)

```
[ ] 모든 페이지가 로드되는가?
[ ] 텍스트에 오타가 없는가?
[ ] 모든 버튼이 클릭되는가?
[ ] 이미지가 깨져 있지 않은가?
[ ] 색상이 일관성 있는가?
[ ] 모바일/태블릿/데스크톱 모두 확인했는가?
```

### 결과 저장하기

#### v0.dev에서
1. 상단 "Download" 또는 "Export" 버튼 클릭
2. "HTML + CSS" 또는 "ZIP 파일" 선택
3. 로컬 폴더에 저장

#### Cursor에서
```bash
# 프로젝트 폴더에 저장된 HTML/CSS 파일 확인
# index.html, style.css 등이 생성됨
ls -la
```

#### Claude 웹에서
1. 생성된 코드 전체 복사 (Ctrl+A → Ctrl+C)
2. VS Code나 메모장에서 새 파일 생성
3. 파일명: `index.html` 로 저장
4. 브라우저에서 열기 (더블클릭 또는 마우스 우클릭 → "Open with Browser")

---

### 간단 배포 방법 (3가지)

#### 방법 1: GitHub Pages (무료, 권장)

**사전 준비:**
- GitHub 계정 (없으면 https://github.com 에서 가입)

**단계:**
```bash
# 1. GitHub에서 새 Repository 생성
#    이름: username.github.io (예: alice.github.io)
#    Public 선택

# 2. 로컬에서 파일 업로드 (또는 GitHub Desktop 사용)
git clone https://github.com/username/username.github.io.git
cd username.github.io
# 생성한 index.html, style.css 복사
git add .
git commit -m "Initial commit: credit card landing page"
git push
```

**완료:**
- URL: https://username.github.io
- 1-2분 후 접속 가능

#### 방법 2: Netlify (아주 쉬움)

1. https://netlify.com 방문
2. GitHub 계정으로 로그인
3. "New site from Git" 클릭
4. GitHub Repository 선택
5. Deploy 버튼 클릭
6. 자동으로 URL 생성 (예: https://something-random.netlify.app)

#### 방법 3: Vercel (Netlify와 동일 수준)

1. https://vercel.com 방문
2. GitHub 계정 연동
3. Import Project
4. Repository 선택 후 Deploy
5. 완료

---

### 배포 후 확인

```bash
# 배포 URL이 정상 작동하는지 확인
# 1. 브라우저에서 URL 열기
# 2. 로딩 확인 (녹색 체크 또는 "Deployed" 표시)
# 3. 모바일 환경에서도 열기 (사파리, 크롬)
# 4. 모든 버튼 클릭 테스트
```

---

## 자주 하는 실수 & 해결법

### 실수 1: 프롬프트가 너무 길거나 복잡함

**증상:** AI가 이상한 결과를 생성하거나 반만 완성됨

**원인:** 한 번에 20개 항목 전달, 문법 오류, 과도한 세부 사항

**해결법:**
```
❌ 하지 마세요:
"Hero section의 배경이 그래디언트여야 하고
색상은 보라색에서 파란색으로 가야 하고
크레딧카드 이미지는 우측에 있어야 하고
이미지는 회전되어야 하고
제목은 '신용카드의 미래'이고..."

✅ 하세요:
"Hero section의 배경을 그래디언트로 만들어줘.
보라색(#7C5CE6)에서 파란색(#4F46E5)으로."

(기다렸다가 다음 수정) →
"이제 제목을 '신용카드의 미래'로 바꿔줄래?"
```

**핵심:** 한 번에 1-2가지만. 기다렸다가 반복.

---

### 실수 2: 색상 코드를 모르거나 정확하지 않음

**증상:** 원하는 색상이 안 나옴

**원인:** "파란색"처럼 모호함 또는 RGB 값만 줌

**해결법:**
```bash
# HEX 코드 찾기
1. https://color-hex.com 방문
2. 원하는 색상 검색 또는 스크린샷 업로드
3. HEX 코드 복사 (예: #3B82F6)
4. 프롬프트에 입력

예: "Use blue color #3B82F6 for the header"
```

---

### 실수 3: 이미지가 로드 안 됨

**증상:** 이미지 자리만 비어있음

**원인:** 외부 URL 사용, 경로 오류, 파일명 오류

**해결법:**
```bash
# 방법 1: 온라인 이미지 사용
"Use this image for the credit card mockup:
https://example.com/card.png"

# 방법 2: SVG로 만들기 (권장)
"Instead of an image, create an SVG
that looks like a credit card with:
- Gradient background (blue to purple)
- White text for cardholder
- Chip icon in top-left"

# 방법 3: 로컬 파일 사용
프로젝트 폴더에 images/ 폴더 만들기
→ 이미지 넣기
→ 코드에서 "./images/card.png" 참조
```

---

### 실수 4: 모바일에서 안 보임

**증상:** PC에서는 잘 보이는데 폰에서 깨짐

**원인:** Viewport 메타 태그 없음, 반응형 CSS 부족

**해결법:**
```html
<!-- HTML 헤드에 이 코드가 있는지 확인 -->
<meta name="viewport"
      content="width=device-width, initial-scale=1.0">

<!-- 없으면 AI에게 추가 요청 -->
"Add the viewport meta tag to make it mobile-friendly"
```

---

### 실수 5: 버튼이 작동 안 함

**증상:** 버튼을 클릭해도 아무 일도 안 일어남

**원인:** JavaScript 없음 또는 링크 오류

**해결법:**
```javascript
// 간단한 클릭 이벤트 (복사-붙여넣기)
<button onclick="alert('감사합니다!')">
  Sign Up
</button>

// 또는 AI에게:
"Add a click event to the 'Sign Up' button.
When clicked, show a message: 'Thanks for signing up!'"
```

---

### 실수 6: 글꼴이 어색함

**증상:** 텍스트가 기본 글꼴처럼 보임

**원인:** Google Fonts 연동 안 됨

**해결법:**
```html
<!-- HTML 헤드에 추가 (AI에게 요청) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
      rel="stylesheet">

<!-- CSS에서 사용 -->
body { font-family: 'Inter', sans-serif; }
```

---

## 교사용 팁

### 수업 전 준비 (30분)

```
[ ] 클론할 사이트 스크린샷 3-5장 준비
[ ] 샘플 프롬프트 미리 테스트 (어떤 결과가 나오는지 확인)
[ ] 학생 수만큼 AI 도구 계정 확인 (또는 계정 공유 방법)
[ ] 스크린 공유 기술 테스트
[ ] 결과물 저장소 준비 (Google Drive, GitHub Organization 등)
```

### 진행 중 팁

**1. 페이싱 관리**
- 단계별로 5-10분씩 시간 할당
- 모든 학생이 같은 속도일 필요 없음. "빨리 끝낸 학생은 색상 더 조정하거나 섹션 추가하기"

**2. 실패 정정**
- "AI가 틀렸다"는 마음가짐 ❌
- "프롬프트를 다시 작성해야 한다"는 마음가짐 ✅
- 실패도 배움: "어떻게 더 명확히 설명할 수 있을까?"

**3. 상호 작용**
- 한 학생의 화면을 프로젝트하고 함께 개선해보기
- "당신이라면 어떻게 물어볼래?"라고 질문하기

---

### 평가 기준 (선택사항)

```
배점 (100점 기준):

1. 구조 정확성 (20점)
   - 모든 섹션이 있는가?
   - 레이아웃이 원본과 유사한가?

2. 시각 디자인 (30점)
   - 색상이 어울리는가?
   - 타이포그래피가 깔끔한가?
   - 여백이 균형잡혀 있는가?

3. 기능성 (20점)
   - 반응형인가?
   - 버튼이 작동하는가?
   - 이미지가 로드되는가?

4. 창의성 (20점)
   - 원본에서 벗어난 개선이 있는가?
   - 추가 기능/섹션을 만들었는가?
   - 개인 스타일을 반영했는가?

10점 보너스: 배포 완료
```

---

### 확장 활동 (다음 수업)

```
1. 본인만의 제품으로 랜딩페이지 만들기
   (같은 구조, 다른 콘텐츠)

2. 다크 모드 추가하기
   "Add a dark mode toggle to the header"

3. 이메일 수집 기능 추가
   (Formspree, Netlify Forms 등)

4. 애니메이션 추가하기
   "Add a fade-in animation when page loads"

5. 실제 결제 시스템 연동
   (Stripe, PayPal 등 - 심화)
```

---

### 학생 피드백 수집

수업 후 간단한 설문:

```
1. AI 도구 사용이 얼마나 쉬웠나요? (1-5점)
2. 프롬프트 작성할 때 가장 어려웠던 점은?
3. 가장 자랑스러운 부분은?
4. 다음번에 해보고 싶은 것은?
```

---

### 트러블슈팅 빠른 참조

| 문제 | 원인 | 해결법 |
|------|------|--------|
| 페이지가 안 열림 | 파일 경로 오류 | index.html이 올바른 폴더에 있는지 확인 |
| 이미지가 안 보임 | URL 오류 또는 경로 오류 | 절대 경로 또는 온라인 이미지 사용 |
| 색상이 이상함 | HEX 코드 오류 | https://color-hex.com에서 정확한 코드 확인 |
| 모바일에서 깨짐 | Viewport 메타 태그 부재 | AI에게 메타 태그 추가 요청 |
| AI 응답이 이상함 | 프롬프트가 불명확함 | 프롬프트 단순화 (1-2가지만) |
| 배포 실패 | 구문 오류 또는 서버 오류 | 로컬에서 먼저 정상 확인, GitHub 오류 로그 확인 |

---

## 마무리

### 핵심 메시지

> "바이브코딩은 코드를 배우는 것이 아닙니다.
> 자신의 디자인 의도를 명확히 표현하고,
> AI와 협력하며, 반복적으로 개선하는 능력을 기릅니다."

### 학습 후 할 수 있는 것

- AI 도구로 아이디어를 신속하게 프로토타입화
- 디자인 의도를 명확한 언어로 전달
- 완전한 웹사이트를 혼자 만들기
- 다른 디자이너 팀과 협업할 때 기술팀과 소통하는 법

### 계속 배우기

- v0.dev 커뮤니티: 다른 사람의 결과물 보기
- Cursor 튜토리얼: 코드 이해 깊게 하기
- Claude 아카이브: 더 복잡한 프로젝트 참고
- AI 커뮤니티: Discord, Reddit 등에서 팁 나누기

---

**이 가이드가 도움이 되길 바랍니다!**

마지막 질문이나 피드백은 언제든지 연락하세요.

Happy vibecoding! 🚀
