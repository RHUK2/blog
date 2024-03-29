---
updatedAt: 2024-03-20
directory: Graphic
fileName: Graphic
title: Graphic 기록하기
description:
---

# chartjs

캔버스 렌더링
Chart.js는 SVG로 렌더링하는 다른 여러 차트 라이브러리(대부분 D3.js 기반)와 달리 HTML5 캔버스에서 차트 요소를 렌더링합니다. 캔버스 렌더링은 특히 대규모 데이터 세트와 DOM 트리에 수천 개의 SVG 노드가 필요한 복잡한 시각화에서 Chart.js의 성능을 매우 향상시킵니다. 동시에 캔버스 렌더링은 CSS 스타일링을 허용하지 않으므로 기본 제공 옵션을 사용하거나 사용자 정의 플러그인 또는 차트 유형을 만들어 모든 것을 원하는 대로 렌더링해야 합니다.

#성능
Chart.js는 대규모 데이터 세트에 매우 적합합니다. 이러한 데이터 세트는 내부 형식을 사용하여 효율적으로 수집할 수 있으므로 데이터 구문 분석 및 정규화를 생략할 수 있습니다. 또는 데이터 데시메이션을 구성하여 데이터 집합을 샘플링하고 렌더링하기 전에 크기를 줄일 수 있습니다.

결국, Chart.js가 사용하는 캔버스 렌더링은 SVG 렌더링에 비해 DOM 트리에 대한 부담을 줄여줍니다. 또한 트리 흔들기를 지원하므로 번들에 Chart.js 코드의 최소 부분을 포함할 수 있으므로 번들 크기와 페이지 로드 시간이 줄어듭니다.

# d3.js

D3는 유연합니다.
D3에는 중요한 '차트' 추상화가 없기 때문에 기본 차트에도 수십 줄의 코드가 필요할 수 있습니다. 장점은 모든 요소가 눈앞에 펼쳐져 있고 사용자가 모든 것을 완벽하게 제어할 수 있다는 점입니다. 원하는 것을 정확히 달성하도록 비주얼리제이션을 조정할 수 있습니다. D3에는 데이터에 대한 기본 프레젠테이션이 없으며 사용자가 직접 작성하는 코드만 있습니다. (또는 예제에서 복사할 수도 있습니다.)

D3는 고급 차트 라이브러리의 대안이 아니라 '모든 것을 직접 하는 것'의 대안이라고 생각하세요. 다른 도구에 만족하지 않고 SVG나 캔버스(또는 WebGL)를 사용하여 자신만의 차트를 만들 생각이라면 D3의 도구 상자를 살펴보는 것도 좋습니다! 창의력을 제한하지 않으면서도 원하는 차트를 만드는 데 도움이 되는 도구가 분명히 있을 것입니다.

웹에서 작동하는 D3
D3는 새로운 그래픽 표현을 도입하는 것이 아니라 SVG 및 Canvas와 같은 웹 표준에서 직접 D3를 사용합니다.

'D3'라는 이름은 데이터 기반 문서의 약자로, 여기서 문서는 웹페이지의 콘텐츠를 나타내는 DOM(문서 객체 모델) 표준을 의미합니다. D3의 일부 모듈(예: 선택 및 전환)은 DOM에 영향을 주지만, 다른 모듈(스케일 및 도형 포함)은 데이터에 대해서만 작동합니다. D3는 React, Vue, Svelte와 같은 웹 프레임워크와도 함께 사용할 수 있으며, 권장 사항은 시작 가이드를 참조하세요.

D3가 웹 표준을 수용하면 많은 이점이 있습니다. 예를 들어, 외부 스타일시트를 사용하여 차트의 모양을 변경할 수 있고(반응형 차트나 다크 모드와 같은 미디어 쿼리에 대한 응답에서도), 디버거와 요소 검사기를 사용하여 코드가 수행하는 작업을 검토할 수 있으며, D3의 동기식 필수 평가 모델(selection.attr을 호출하면 즉시 DOM을 변경)을 사용하면 복잡한 비동기 런타임을 가진 프레임워크보다 디버깅이 더 쉬워집니다.

맞춤형 비주얼라이제이션을 위한 D3
D3는 모든 것을 가능케 하지만 반드시 쉬운 것은 아닙니다. 쉬워야 할 간단한 작업도 그렇지 않은 경우가 많습니다. 아만다 콕스의 말을 빌리자면, "막대형 차트에 100줄의 코드를 작성하는 것이 지극히 정상적이라고 생각한다면 D3를 사용하세요."

맞춤형 비주얼리제이션에 최대한의 표현력이 필요하다면 D3를 고려해야 합니다. D3는 하나의 그래픽을 백만 명의 독자가 볼 수 있고 편집자 팀이 협력하여 시각적 커뮤니케이션의 최신 기술을 발전시킬 수 있는 The New York Times 또는 The Pudding과 같은 미디어 조직에 적합합니다.

반면에 D3는 개인 대시보드나 일회성 분석에 사용하기에는 과분합니다. 위즈뱅 예시에 현혹되지 마세요. 많은 예시들이 구현하는 데 엄청난 노력이 필요했습니다! 시간에 제약이 있다면(그렇지 않은 사람이 어디 있겠습니까?) 관찰 가능한 플롯으로 더 나은 시각화 또는 분석을 만들 수 있을 것입니다.

동적 시각화를 위한 D3
D3의 가장 새로운 개념은 데이터 조인입니다. 데이터 집합과 DOM 요소 집합이 주어지면 데이터 조인을 통해 요소를 입력, 업데이트 및 종료하기 위한 별도의 작업을 적용할 수 있습니다. 정적 차트(애니메이션이 적용되거나 사용자 입력에 반응하지 않는 차트)만 만드는 경우 이 개념이 직관적이지 않거나 심지어는 필요하지 않다고 느낄 수도 있습니다.

데이터 조인은 데이터가 변경될 때 발생하는 상황을 정확히 제어하고 그에 따라 디스플레이를 업데이트할 수 있도록 존재합니다. 이러한 직접 제어를 통해 DOM을 변경하지 않고도 변경이 필요한 요소와 속성만 터치하면 매우 뛰어난 성능의 업데이트와 상태 간 부드러운 애니메이션 전환이 가능합니다. D3는 동적인 대화형 시각화에서 빛을 발합니다. (2012년에 출시된 '512개의 경로로 백악관으로 가는 길'에서 상태 토글을 옵션으로 클릭해 보세요. 정말 멋집니다.)

# svg vs canvas

아래 표는 Canvas와 SVG의 주요 특성들을 한 곳에 모아 정리한 것입니다.

| 특성             | Canvas                                                                         | SVG                                                        |
| ---------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------- |
| 렌더링 방식      | 비트맵 (픽셀)                                                                  | 벡터 (XML 기반)                                            |
| 그리기 방식      | JavaScript 코드를 사용하여 프로그래밍적 그리기                                 | 마크업 언어 (HTML과 유사한 방식)                           |
| 확장성           | 화면 크기에 따라 그래픽이 자동으로 조정되지 않음                               | 확대/축소시 해상도 손상 없음                               |
| 인터랙티브 기능  | 주로 정적 그래픽에 사용되며, JavaScript 이벤트 처리를 사용하여 인터랙션을 추가 | 마크업 언어로 인터랙티브 요소를 직접 포함                  |
| 복잡성           | 프로그래밍적으로 그림을 그리므로 복잡한 그래픽 또는 애니메이션에 적합          | XML 기반의 마크업 언어로 간단한 그래픽을 표현할 때 적합    |
| 이미지 지원      | 이미지를 그리기 위한 내장 메서드가 제공되지 않음                               | `<image>` 요소를 통해 외부 이미지를 삽입 가능              |
| 텍스트 처리      | 텍스트를 그리는 데 제한적이며, 복잡한 텍스트 렌더링에 적합하지 않음            | 텍스트를 마크업 언어로 처리하므로 텍스트 렌더링에 적합     |
| 애니메이션 지원  | 주로 JavaScript를 사용하여 애니메이션을 구현                                   | `<animate>` 요소를 사용하여 애니메이션을 구현              |
| 성능             | 복잡한 그래픽이 많을 때 더 빠른 렌더링 속도를 제공할 수 있음                   | 복잡한 그래픽의 경우 렌더링 속도가 상대적으로 느릴 수 있음 |
| 스타일링 및 효과 | CSS를 사용할 수 없으며, 스타일링과 효과를 JavaScript로 직접 처리해야 함        | CSS를 사용하여 스타일링 및 효과를 적용할 수 있음           |
| 브라우저 호환성  | 대부분의 모던 브라우저에서 지원됨                                              | 일부 구형 브라우저에서는 지원되지 않을 수 있음             |
| 파일 크기        | 이미지 파일로 저장할 때 상대적으로 작은 파일 크기를 가짐                       | XML 기반의 마크업으로 인해 파일 크기가 증가할 수 있음      |
| 접근성           | 그래픽 요소에 대한 접근성이 상대적으로 낮을 수 있음                            | 마크업 언어를 사용하여 접근성을 개선할 수 있음             |

이 표를 참고하여 Canvas와 SVG의 주요 특성을 비교 분석할 수 있습니다.
