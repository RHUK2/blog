---
updatedAt: 2024-04-21
directory: HTML
fileName: HTML
title: HTML 기록하기
description:
---

# HTML

- [HTMLFormElement](#htmlformelement)
- [radio](#radio)

## HTMLFormElement

- submit 이벤트가 발생하는 경우

  - 사용자가 제출 버튼을 클릭
  - 사용자가 양식에서 필드(예: `<input type="text">`)를 편집하는 동안 `Enter` 키를 누름
  - 스크립트에서 `form.requestSubmit()` 메서드를 호출

- `elements` 속성을 통해서 양식 내부에 접근 가능
  - 인덱스나 요소의 이름 또는 ID 속성을 사용하여 반환된 컬렉션의 특정 양식 컨트롤에 액세스할 수 있다.

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
