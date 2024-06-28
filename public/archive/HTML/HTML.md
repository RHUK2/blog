---
updatedAt: 2024-04-21
directory: HTML
fileName: HTML
title: HTML 기록하기
description:
---

# HTML

- [HTMLFormElement](#htmlformelement)
- [outerHTML, innerHTML, innerText, textContent](#outerhtml-innerhtml-innertext-textcontent)
- [radio](#radio)

## HTMLFormElement

- submit 이벤트가 발생하는 경우

  - 사용자가 제출 버튼을 클릭
  - 사용자가 양식에서 필드(예: `<input type="text">`)를 편집하는 동안 `Enter` 키를 누름
  - 스크립트에서 `form.requestSubmit()` 메서드를 호출

- `elements` 속성을 통해서 양식 내부에 접근 가능
  - 인덱스나 요소의 이름 또는 ID 속성을 사용하여 반환된 컬렉션의 특정 양식 컨트롤에 액세스할 수 있다.

## outerHTML, innerHTML, innerText, textContent

문자열 또는 null입니다. 이 값은 상황에 따라 다릅니다:

노드가 문서 또는 문서 유형인 경우 textContent는 null을 반환합니다. 참고: 전체 문서의 모든 텍스트 및 CDATA 데이터를 가져오려면 document.documentElement.textContent를 사용합니다.

노드가 CDATA 섹션, 주석, 처리 명령어 또는 텍스트 노드인 경우 textContent는 노드 내부의 텍스트, 즉 Node.nodeValue를 반환하거나 설정합니다. 다른 노드 유형의 경우 textContent는 주석과 처리 명령어를 제외한 모든 하위 노드의 textContent를 연결한 값을 반환합니다. (노드에 자식이 없는 경우 빈 문자열입니다.) 경고: 노드에서 textContent를 설정하면 노드의 모든 자식이 제거되고 지정된 문자열 값을 가진 단일 텍스트 노드로 대체됩니다.

내부 텍스트와의 차이점 Node.textContent와 HTMLElement.innerText의 차이점에 혼동하지 마세요. 이름은 비슷해 보이지만 중요한 차이점이 있습니다:

textContent는 <script> 및 <style> 요소를 포함한 모든 요소의 콘텐츠를 가져옵니다. 반면, innerText는 "사람이 읽을 수 있는" 요소만 표시합니다. textContent는 노드의 모든 요소를 반환합니다. 반면, innerText는 스타일을 인식하므로 "숨겨진" 요소의 텍스트는 반환하지 않습니다. 또한 innerText는 CSS 스타일을 고려하므로 innerText 값을 읽으면 최신 계산된 스타일을 보장하기 위해 리플로우가 트리거됩니다. (리플로는 계산 비용이 많이 들 수 있으므로 가능하면 피해야 합니다.) innerHTML과의 차이점 Element.innerHTML은 이름에서 알 수 있듯이 HTML을 반환합니다. 간혹 innerHTML을 사용하여 요소 내부의 텍스트를 검색하거나 작성하는 경우가 있지만, 그 값이 HTML로 구문 분석되지 않기 때문에 textContent의 성능이 더 우수합니다.

또한 textContent를 사용하면 XSS 공격을 방지할 수 있습니다.

## radio

비제어 radio

name으로 같은 radio 그룹 식별
checked 선택됐는 지 안됐는 지
value 없으면 checked 상관없이 'on', 있으면 그 값

form에서 submit 시 name 값 하나만 나옴

비제어 checkbox

name은 독립적
checked 선택됐는 지 안됐는 지
value 없으면 checked 상관없이 'on', 있으면 그 값

form에서 submit 시 선택된 값만(여러개가능) 출력
