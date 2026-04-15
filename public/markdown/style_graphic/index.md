---
folderName: style_graphic
title: Graphic
tag: style
isPublished: true
---

# Graphic

- [벡터와 래스터(Vector vs Raster)](#벡터와-래스터vector-vs-raster)
- [SVG와 Canvas의 차이](#svg와-canvas의-차이)
  - [SVG (Scalable Vector Graphics)](#svg-scalable-vector-graphics)
  - [Canvas (HTML5 Canvas)](#canvas-html5-canvas)
  - [기술 비교 및 선택 기준](#기술-비교-및-선택-기준)
- [SVG 모핑과 보간(Morphing • Interpolation)](#svg-모핑과-보간morphing--interpolation)
- [`viewbox` 좌표 계산](#viewbox-좌표-계산)

## 벡터와 래스터(Vector vs Raster)

디지털 그래픽은 크게 수학적 계산 기반의 벡터(Vector)와 픽셀 격자 기반의 래스터(Raster, 또는 Pixel) 방식으로 나뉜다.

| 항목      | 벡터(Vector)                              | 래스터(Raster)                      |
| :-------- | :---------------------------------------- | :---------------------------------- |
| 기본 개념 | 수학적 좌표와 수식을 이용한 도형 표현임   | 픽셀 단위의 점들이 모인 격자 구조임 |
| 확대 품질 | 해상도와 무관하여 확대해도 깨지지 않음    | 확대 시 픽셀이 계단 현상처럼 보임   |
| 파일 크기 | 도형의 복잡도에 따라 결정되며 대체로 작음 | 이미지 해상도와 색상 수에 따라 커짐 |
| 대표 형식 | SVG, AI, EPS                              | JPG, PNG, WebP, GIF                 |

## SVG와 Canvas의 차이

웹에서 그래픽을 구현할 때 가장 많이 사용되는 두 기술은 설계 철학과 성능 특성이 다르다.

### SVG (Scalable Vector Graphics)

- XML 기반의 마크다운 언어로 정의되는 벡터 그래픽임.
- 모든 도형이 DOM의 일부가 되어 CSS와 JavaScript로 직접 제어가 가능함.
- 접근성(Accessibility) 확보가 용이하며 텍스트 검색이 가능함.
- 요소가 너무 많아지면(수천 개 이상) DOM 조작 비용으로 인해 성능이 저하될 수 있음.

### Canvas (HTML5 Canvas)

- JavaScript API를 통해 픽셀을 직접 그리는 래스터 방식임.
- 그려진 개별 객체의 장면 그래프(Scene Graph)를 유지하지 않는 '즉시 모드(Immediate Mode)' 그래픽임. `fillStyle`, `strokeStyle` 등의 드로잉 상태는 컨텍스트에 유지되지만, 한 번 픽셀로 그려진 결과는 개별 객체로 추적되지 않음.
- 픽셀 단위의 세밀한 조작이 가능하여 복잡한 애니메이션이나 게임 구현에 적합함.
- DOM 요소가 아니므로 브라우저가 개별 개체를 추적하지 않아 대량의 개체를 렌더링할 때 성능이 우수함.

### 기술 비교 및 선택 기준

| 항목        | SVG                               | Canvas                              |
| :---------- | :-------------------------------- | :---------------------------------- |
| 기반 기술   | XML (DOM 요소)                    | 스크립트 기반 (픽셀)                |
| 이벤트 처리 | 개별 요소 단위로 가능함           | 캔버스 전체에 대해서만 가능함       |
| 성능        | 적은 수의 큰 영역 렌더링에 유리함 | 많은 수의 작은 객체 렌더링에 유리함 |
| 용도        | 로고, 아이콘, 단순한 차트 등      | 고성능 게임, 실시간 비디오 처리 등  |

## SVG 모핑과 보간(Morphing • Interpolation)

SVG의 경로(Path) 데이터를 변경하여 하나의 도형이 다른 도형으로 부드럽게 변하는 효과를 구현할 수 있다.

- 두 경로의 포인트 개수가 일치해야 자연스러운 보간이 이루어짐.
- 라이브러리(예: GSAP, Framer Motion)를 활용하여 복잡한 수치 계산을 자동화함.

## `viewbox` 좌표 계산

```text
viewBox: 0 0 24 24
position: (0, 0), (0 + 24, 0 + 24)

viewBox: 50 50 100 100
position: (50, 50), (50 + 100, 50 + 100)
```
