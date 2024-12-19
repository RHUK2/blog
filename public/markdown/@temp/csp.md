CSP(Content Security Policy)는 웹 개발에서 사이트의 보안 강화 목적으로 사용되는 보안 표준입니다. 이를 통해 외부 스크립트, 스타일시트, 이미지 및 기타 리소스가 불필요하거나 악의적으로 로드되는 것을 방지하고, XSS(Cross-Site Scripting)와 같은 보안 취약점을 완화할 수 있습니다. CSP의 리소스 제어와 실행 제어 방법에 대해 구체적으로 설명하겠습니다.

---

### 1. **리소스 제어**

CSP는 웹 페이지에서 허용된 리소스의 소스 및 유형을 명시적으로 규정합니다. 이를 통해 보호 대상 웹 페이지에 어떤 출처의 리소스가 로드될 수 있는지 제한할 수 있습니다.

#### 주요 리소스 제어 정책 디렉티브

- **`default-src`**: 모든 기본 리소스의 허용 소스를 정의합니다. (예: 스크립트, 이미지, 스타일 등)
- **`script-src`**: 실행할 JavaScript 소스의 허용 목록을 정의합니다.
- **`style-src`**: CSS 스타일 및 스타일시트의 소스를 정의합니다.
- **`img-src`**: 이미지를 로드할 때 허용된 소스를 정의합니다.
- **`font-src`**: 폰트 파일의 허용된 소스를 명시합니다.
- **`connect-src`**: XHR, Fetch, WebSocket 등 네트워크 연결 관련 리소스를 제어합니다.
- **`media-src`**: 비디오와 오디오 리소스의 허용 소스를 정의합니다.
- **`frame-src`**: iframe 및 결합된 콘텐츠의 소스를 명시합니다.
- **`object-src`**: `<object>`, `<embed>` 태그에서 허용된 소스를 정의합니다.

#### 예제:

```http
Content-Security-Policy: default-src 'self'; script-src 'self' https://apis.google.com; style-src 'self' 'unsafe-inline'
```

위의 설정은 다음과 같은 동작을 하게 만듭니다:

- 모든 리소스는 기본적으로 현재 도메인(`'self'`)에서만 로드됩니다.
- JavaScript 파일은 `'self'` 또는 `https://apis.google.com`에서만 로드 가능합니다.
- 스타일시트는 현재 도메인(`'self'`)에서 로드할 수 있으며, 인라인 스타일도 허용됩니다(`'unsafe-inline'`).

---

### 2. **실행 제어**

실행 제어는 주로 JavaScript 실행 방식을 관리하는 데 초점을 맞춥니다. CSP는 스크립트 실행과 관련된 몇 가지 중요한 메커니즘을 제공합니다.

#### 실행 제어 관련 주요 디렉티브

- **`script-src`**: JavaScript 출처의 허용 여부를 정의하며, 악성 스크립트의 실행을 방지합니다.
- **`'unsafe-inline'`**: 인라인 JavaScript(`onclick`, `<script>` 태그 내의 코드) 실행을 허용합니다.
  - 권장 X: 인라인 스크립트는 XSS 공격의 주요 진입점이 되기 때문에 가능하면 비활성화해야 합니다.
- **`'unsafe-eval'`**: JavaScript의 `eval()` 함수 및 동적으로 생성된 코드를 허용합니다. (보안 취약점을 유발할 수 있으므로 가급적 사용하지 않는 것이 좋습니다.)
- **Nonce 및 Hash 기반 제어**: CSP는 코드를 더 세밀히 제어하기 위해 `nonce` 값과 고유한 해시를 제공합니다.
  - **Nonce**: CSP가 허용한 스크립트에만 실행 권한을 부여하기 위해 무작위 값(난스)을 사용합니다.
  - **Hash**: 특정 스크립트 내용물의 해시값을 명시해 주어진 코드를 명시적으로만 허용합니다.

#### 실행 제어의 예제

**1. Nonce 사용:**

```html
<meta http-equiv="Content-Security-Policy" content="script-src 'self' 'nonce-abc123'" />
<script nonce="abc123">
  console.log('이 스크립트만 허용됩니다.');
</script>
```

위의 설정에서는 `nonce-abc123` 속성이 포함된 스크립트만 실행될 수 있습니다.

**2. Hash 사용:**

```html
<meta http-equiv="Content-Security-Policy" content="script-src 'self' 'sha256-AbCdEf123456...'" />
<script>
  console.log('이 내용과 해시가 일치할 경우에만 실행됩니다.');
</script>
```

위 경우 CSP는 해시 검사를 통해 스크립트가 예상된 코드인지 확인한 뒤 실행을 허용합니다.

---

### 3. **CSP 적용 방법**

CSP 적용은 주로 다음 두 가지 방식으로 이루어집니다:

1. **HTTP 헤더로 설정**

   ```http
   Content-Security-Policy: script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;
   ```

   웹 서버에서 응답 헤더에 위와 같이 CSP 정책을 설정하여 클라이언트에 전달합니다.

2. **HTML `<meta>` 태그 사용**
   ```html
   <meta
     http-equiv="Content-Security-Policy"
     content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'"
   />
   ```
   HTML 문서에 직접 삽입하여 CSP 정책을 정의할 수 있습니다.

---

### 4. **추가로 알면 좋을 내용**

- **CSP 레벨**:
  CSP는 발전하면서 Level 1, 2, 3 등으로 구분됩니다. 최신 브라우저는 CSP Level 3을 지원하며, 이를 통해 더 많은 정책과 기능을 사용할 수 있습니다.

- **리포팅(Reporting)**:
  CSP는 위반 사항을 확인하기 위한 리포트(end-point) 기능을 제공합니다. 리포트 URL을 지정하면 정책 위반이 발생했을 때 이를 수집할 수 있습니다.

  ```http
  Content-Security-Policy: default-src 'self'; report-uri /csp-violation-report-endpoint
  ```

- **CSP 테스트 및 디버깅**:
  CSP 정책을 테스트할 때는 F12 개발자 도구의 **콘솔** 창에서 위반되는 요소들을 확인하면 됩니다. 잘못된 설정은 즉시 경고를 출력합니다.

---

CSP는 올바르게 설정하면 XSS, Clickjacking, Data Injection 등 다양한 웹 기반 공격을 엄밀히 줄이는 데 매우 효율적입니다. 정확한 설정과 지속적인 점검이 필요하며, 권장 사항을 따라 사용하는 것이 중요합니다.

---
