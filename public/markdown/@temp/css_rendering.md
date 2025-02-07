브라우저의 렌더링 과정은 웹 페이지를 표시하기 위해 브라우저가 HTML, CSS, JavaScript 등을 처리하고, 사용자 화면에 출력하는 단계들을 포함합니다. 이 과정은 다음과 같은 주요 단계로 이루어져 있습니다.

---

### **1. 브라우저 렌더링 과정 설명**

1. **HTML 파싱 및 DOM 생성**:

   - HTML 파일이 브라우저로 로드되고 이 내용을 파싱해 "DOM(Document Object Model)" 트리로 변환합니다.
   - DOM은 HTML 문서의 계층 구조를 나타냅니다.

2. **CSS 파싱 및 CSSOM 생성**:

   - CSS 파일이 로드되면 이를 파싱하여 "CSSOM(CSS Object Model)" 트리를 생성합니다.
   - CSSOM은 CSS 스타일 규칙과 그 적용 대상을 나타냅니다.

3. **Render Tree 생성**:

   - DOM 트리와 CSSOM 트리를 결합하여 "Render Tree(렌더 트리)"를 생성합니다.
   - Render Tree는 실제로 화면에 표시할 요소와 스타일 정보를 포함합니다.
   - `display: none`과 같이 렌더링되지 않는 요소는 Render Tree에 포함되지 않습니다.

4. **레이아웃(또는 리플로우)**:

   - Render Tree가 생성되면 각 요소의 크기와 위치를 계산합니다.
   - 이는 부모-자식 관계, CSS 스타일, 뷰포트 크기에 따라 계산됩니다.
   - 이 단계에서는 픽셀 단위로 정확한 위치가 결정됩니다.

5. **페인팅(Painting)**:

   - 레이어 단위로 각 요소가 화면에 어떻게 보일지 결정됩니다.
   - 색상, 글꼴, 배경 이미지, 테두리 등 시각적인 스타일이 이 단계에서 처리됩니다.

6. **합성(Compositing)**:
   - 여러 레이어를 합쳐 최종 화면을 완성합니다.
   - GPU 가속이 필요한 경우 GPU에서 렌더링됩니다.

---

### **2. JS 애니메이션 제어와 렌더링 과정**

JavaScript로 애니메이션을 제어할 때 렌더링 과정의 일부가 반복적으로 진행됩니다. 특히, 애니메이션의 변화는 **레이아웃**, **페인팅** 또는 **합성** 단계에서 영향을 미칩니다. 아래는 JS 애니메이션이 렌더링 과정에 미치는 영향을 설명합니다.

1. **JavaScript를 통한 스타일 변경과 레이아웃**:

   - JavaScript로 DOM의 레이아웃 관련 속성(예: `width`, `height`, `top`, `left`, `margin`)을 변경하면 **레이아웃(리플로우)** 이 발생합니다.
   - 레이아웃 단계는 성능이 상대적으로 많이 소모되므로 애니메이션에서 주의가 필요합니다.

2. **페인팅(Paint)**:

   - 레이아웃에 영향을 주지 않지만, 시각적 스타일(예: `background-color`, `border-color`, `box-shadow`)만 변경할 경우 **페인팅** 단계가 다시 발생합니다.
   - 페인팅도 성능에 영향을 미칠 수 있으므로 최소화하는 것이 좋습니다.

3. **합성(Compositing)**:
   - 특정 속성(예: `transform`, `opacity`)을 변경하는 경우에는 레이아웃과 페인팅을 건너뛰고 **합성** 단계에서만 변화가 처리됩니다.
   - "합성"은 GPU에서 처리되므로 매우 빠르며, CSS 속성 기반 애니메이션에서 최적화를 위해 주로 사용하는 전략입니다.

---

### **3. 성능 최적화를 위한 팁**

JavaScript로 애니메이션을 제어할 때 렌더링의 어느 단계가 실행되는지 파악하는 것은 매우 중요합니다. 아래는 성능을 최적화하기 위한 몇 가지 가이드입니다:

1. **CSS 애니메이션과 JS 애니메이션 비교**:

   - 가능하면 CSS 애니메이션(`@keyframes` 및 `transition`)을 사용하세요. CSS 애니메이션은 GPU에서 합성 단계에서만 작동하는 속성(`transform`, `opacity`)을 활용하기 쉽습니다.

2. **애니메이션에 GPU 가속 속성 사용**:

   - `transform`과 `opacity` 속성만 변경하는 애니메이션은 GPU에서 처리되어 빠릅니다.
   - 예: `element.style.transform = 'translateX(100px)';`

3. **레이아웃 트리거 최소화**:

   - 레이아웃 재계산(리플로우)을 유발하는 속성 변경은 피하세요. 예를 들어 `width`, `height`, `margin`, `padding` 같은 속성을 자주 변경하면 성능 문제가 발생할 수 있습니다.
   - 가능하면 `transform: scale()` 또는 `translate()`을 사용해 레이아웃을 변경하지 않고도 시각적인 변화를 주도록 하세요.

4. **requestAnimationFrame 사용**:
   - 애니메이션을 제어할 때 `setInterval`이나 `setTimeout` 대신 `requestAnimationFrame`을 사용하면 브라우저의 렌더링 주기에 동기화되어 성능이 향상됩니다.

---

### **요약**

1. 브라우저의 렌더링 과정은 DOM 생성 → CSSOM 생성 → Render Tree 생성 → 레이아웃 → 페인팅 → 합성 순서로 진행됩니다.
2. JavaScript로 애니메이션을 제어하면 렌더링 과정 중 **레이아웃**, **페인팅**, **합성**에 영향을 미칩니다. 어떤 CSS 속성을 변경하느냐에 따라 영향이 달라집니다.
3. 최적화된 애니메이션 성능을 위해 `transform`과 `opacity`를 사용하고, `requestAnimationFrame`을 활용하세요.

이로써 JS 애니메이션이 브라우저 렌더링에 어떻게 영향을 미치는지 이해할 수 있습니다! 궁금한 점이 있으면 추가로 질문해주세요. 😊

다음은 React의 `onClick` 및 `onResize` 이벤트에서 `requestAnimationFrame`을 활용하는 예제입니다.

---

### 1. onClick에서 애니메이션 적용 예제

```tsx
import { useState, useRef, useEffect } from 'react';

function AnimatedBox() {
  const [width, setWidth] = useState(0);
  const animationRef = useRef<number | null>(null);

  const startAnimation = () => {
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const duration = 2000; // 2초 동안 애니메이션
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1); // 0~1 범위로 정규화

      setWidth(progress * 100); // 너비 0% → 100%

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    // 초기 애니메이션 프레임 요청
    animationRef.current = requestAnimationFrame(animate);
  };

  // 컴포넌트 언마운트 시 애니메이션 정리
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div>
      <button onClick={startAnimation}>Start Animation</button>
      <div
        style={{
          width: `${width}%`,
          height: 50,
          backgroundColor: 'blue',
          transition: 'none', // CSS 트랜지션 무시
        }}
      />
    </div>
  );
}
```

---

### 2. onResize에서 성능 최적화 예제

```tsx
import { useState, useRef, useEffect } from 'react';

function ResizeTracker() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      // 이전 프레임 요청 취소 (성능 최적화)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      // 새 프레임 요청 (초당 60프레임으로 제한)
      animationRef.current = requestAnimationFrame(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div>
      <h2>Window Size</h2>
      <p>Width: {windowSize.width}px</p>
      <p>Height: {windowSize.height}px</p>
    </div>
  );
}
```

---

### 주요 특징 설명

1. **onClick 애니메이션**

   - `requestAnimationFrame`을 사용해 부드러운 너비 변화 구현
   - 2초 동안 선형 애니메이션 진행
   - 컴포넌트 언마운트 시 자동 정리

2. **onResize 최적화**

   - 리사이즈 이벤트를 프레임 단위로 스로틀링
   - 불필요한 렌더링 방지 (초당 최대 60회 업데이트)
   - 이전 프레임 요청 취소를 통한 성능 개선

3. **공통 사항**
   - `useRef`로 애니메이션 ID 추적
   - `useEffect` 클린업 함수로 자원 정리
   - TypeScript 타입 안전성 추가

이 예제들은 복잡한 UI 인터랙션과 반응형 디자인을 구현할 때 유용하며, 특히 고성능이 요구되는 애플리케이션에서 효과적으로 사용될 수 있습니다.
