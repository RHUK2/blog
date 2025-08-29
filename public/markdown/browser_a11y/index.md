---
folderName: browser_accessibility
updatedAt: 2025-02-11
title: 접근성
tag: browser
isPublished: true
---

# 접근성

- [HTML `role` 속성](#html-role-속성)
- [ARIA(Accessible Rich Internet Applications) 속성](#ariaaccessible-rich-internet-applications-속성)

## HTML `role` 속성

- `role` 속성은 HTML 요소의 목적이나 기능을 명시적으로 정의한다.
- WAI-ARIA에서 정의된 값들을 사용하며, 요소의 기본 시맨틱스를 보완하거나 대체할 수 있다.

▾ 랜드마크 역할

- `banner`
- `complementary`
- `contentinfo`
- `form`
- `main`
- `navigation`
- `region`
- `search`

▾ 문서 구조 역할

- `article`
- `cell`
- `columnheader`
- `definition`
- `directory`
- `document`
- `feed`
- `figure`
- `group`
- `heading`
- `img`
- `list`
- `listitem`
- `math`
- `none`
- `note`
- `presentation`
- `row`
- `rowgroup`
- `rowheader`
- `separator`
- `table`
- `term`
- `toolbar`

▾ 위젯 역할

- `button`
- `checkbox`
- `gridcell`
- `link`
- `menuitem`
- `menuitemcheckbox`
- `menuitemradio`
- `option`
- `progressbar`
- `radio`
- `scrollbar`
- `slider`
- `spinbutton`
- `switch`
- `tab`
- `tabpanel`
- `textbox`
- `treeitem`

▾ 복합 위젯 역할

- `combobox`
- `grid`
- `listbox`
- `menu`
- `menubar`
- `radiogroup`
- `tablist`
- `tree`
- `treegrid`

▾ 라이브 영역 역할

- `alert`
- `log`
- `marquee`
- `status`
- `timer`

▾ 창 관리 역할

- `alertdialog`
- `dialog`

▾ 추가 역할

- `application`
- `blockquote`
- `caption`
- `code`
- `deletion`
- `emphasis`
- `insertion`
- `paragraph`
- `strong`
- `subscript`
- `superscript`
- `time`

## ARIA(Accessible Rich Internet Applications) 속성

- ARIA 속성은 HTML 요소에 추가적인 접근성 정보를 제공한다.

▾ 위젯 속성

- `aria-autocomplete`: 입력 자동 완성 유형 (`none`, `inline`, `list`, `both`)
- `aria-checked`: 체크 상태 (`true`, `false`, `mixed`, `undefined`)
- `aria-current`: 현재 항목 표시 (`page`, `step`, `location`, `date`, `time`, `true`, `false`)
- `aria-disabled`: 비활성화 상태 (`true`, `false`)
- `aria-expanded`: 확장/축소 상태 (`true`, `false`, `undefined`)
- `aria-haspopup`: 팝업 존재 여부 (`menu`, `listbox`, `tree`, `grid`, `dialog`, `true`, `false`)
- `aria-hidden`: 접근성 트리에서 숨김 (`true`, `false`)
- `aria-invalid`: 유효성 오류 (`true`, `false`, `grammar`, `spelling`)
- `aria-label`: 요소의 라벨 (문자열)
- `aria-level`: 계층 구조 레벨 (숫자)
- `aria-modal`: 모달 상태 (`true`, `false`)
- `aria-multiline`: 다중 라인 입력 가능 여부 (`true`, `false`)
- `aria-multiselectable`: 다중 선택 가능 여부 (`true`, `false`)
- `aria-orientation`: 방향 (`horizontal`, `vertical`, `undefined`)
- `aria-placeholder`: 임시 힌트 텍스트 (문자열)
- `aria-pressed`: 토글 버튼 상태 (`true`, `false`, `mixed`)
- `aria-readonly`: 읽기 전용 여부 (`true`, `false`)
- `aria-required`: 필수 입력 여부 (`true`, `false`)
- `aria-selected`: 선택 상태 (`true`, `false`, `undefined`)
- `aria-sort`: 정렬 상태 (`ascending`, `descending`, `none`, `other`)
- `aria-valuemax`: 최대값 (숫자)
- `aria-valuemin`: 최소값 (숫자)
- `aria-valuenow`: 현재값 (숫자)
- `aria-valuetext`: 값의 텍스트 설명 (문자열)

▾ 라이브 영역 속성

- `aria-live`: 동적 콘텐츠 알림 중요도 (`off`, `polite`, `assertive`)
- `aria-atomic`: 변경 시 전체 영역 재알림 여부 (`true`, `false`)
- `aria-busy`: 영역 업데이트 중 상태 (`true`, `false`)
- `aria-relevant`: 변경 알림 범위 (`additions`, `removals`, `text`, `all`, `additions text`)

▾ 관계 속성

- `aria-activedescendant`: 현재 포커스된 자식 요소 (ID 참조)
- `aria-colcount`: 그리드/테이블의 총 열 수 (숫자)
- `aria-colindex`: 열 위치 (숫자)
- `aria-colspan`: 열 병합 범위 (숫자)
- `aria-controls`: 제어하는 요소의 ID 목록 (공백 구분)
- `aria-describedby`: 설명을 제공하는 요소의 ID 목록
- `aria-details`: 추가 설명 요소의 ID
- `aria-errormessage`: 오류 메시지 요소의 ID
- `aria-flowto`: 다음 읽기 순서 요소의 ID 목록
- `aria-labelledby`: 라벨을 제공하는 요소의 ID 목록
- `aria-owns`: 소유 관계의 자식 요소 ID 목록
- `aria-posinset`: 그룹 내 위치 (숫자)
- `aria-rowcount`: 그리드/테이블의 총 행 수 (숫자)
- `aria-rowindex`: 행 위치 (숫자)
- `aria-rowspan`: 행 병합 범위 (숫자)
- `aria-setsize`: 그룹 내 총 항목 수 (숫자)
