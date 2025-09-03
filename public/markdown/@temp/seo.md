<title>{t('head.title')}</title>
        <meta name='description' content={t('head.description')} />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='robots' content='noindex, nofollow'></meta>
        <meta property='og:title' content={t('head.title')} />
        <meta property='og:description' content={t('head.description')} />
        <meta property='og:image' content='/images/og_img.png' />
        <meta property='og:url' content={router.pathname} />
        <meta property='og:site_name' content={t('head.title')} />
        <meta property='og:type' content='website' />
        <link rel='icon' href='/favicon.ico' />
        <link rel='apple-touch-icon' href='/favicon.ico' />

HTML 메타 데이터(예: `<meta name="robots" content="noindex">`)와 `robots.txt` 파일 간의 우선순위는 상황에 따라 다르지만, 일반적으로 다음과 같은 원칙이 적용됩니다:

1. **robots.txt의 역할**:  
   `robots.txt`는 웹사이트의 루트 디렉토리에 위치하며, 크롤러가 특정 페이지나 디렉토리에 접근하지 못하도록 **차단**하는 역할을 합니다. 예를 들어, `Disallow: /private/`는 `/private/` 디렉토리 전체에 대한 접근을 막습니다. 하지만 `robots.txt`는 크롤러가 페이지를 인덱싱(indexing)할지 여부는 직접적으로 제어하지 않습니다.

2. **HTML 메타 데이터의 역할**:  
   HTML 메타 태그(예: `<meta name="robots" content="noindex">`)는 특정 페이지가 검색 엔진에 인덱싱되지 않도록 지시합니다. 이 태그는 페이지 단위로 동작하며, 크롤러가 해당 페이지를 방문했을 때 인덱싱 여부를 결정합니다.

3. **우선순위**:
   - **robots.txt가 우선 적용**: 만약 `robots.txt`에서 특정 페이지나 디렉토리에 대한 접근을 `Disallow`로 차단하면, 크롤러는 해당 페이지에 접근하지 못하므로 HTML 메타 태그를 읽을 기회조차 없습니다. 즉, `robots.txt`의 차단이 먼저 적용됩니다.
   - **HTML 메타 태그는 인덱싱 제어**: `robots.txt`에서 접근을 허용한 경우에만 크롤러가 페이지에 접근하여 메타 태그(예: `noindex`)를 확인하고, 그 지시를 따라 인덱싱을 하지 않습니다.

4. **실제 우선순위 예시**:
   - `robots.txt`에서 `/page.html`을 `Disallow`로 설정하면, 크롤러는 `/page.html`에 접근하지 않으므로 `<meta name="robots" content="noindex">`가 있더라도 무시됩니다.
   - `robots.txt`에서 `/page.html`을 허용(`Allow`)하거나 아무 지시가 없으면, 크롤러는 페이지를 방문하고 메타 태그의 지시(예: `noindex` 또는 `nofollow`)를 따릅니다.

5. **결론**:  
   `robots.txt`가 크롤링 자체를 막는 데 우선순위가 있으며, HTML 메타 태그는 크롤링이 허용된 페이지에서 인덱싱 여부를 제어합니다. 따라서 크롤링을 완전히 차단하려면 `robots.txt`를 사용하고, 특정 페이지가 검색 결과에 나타나지 않도록 하려면 메타 태그를 사용하는 것이 적절합니다.

추가적으로, 검색 엔진마다 `robots.txt`와 메타 태그를 처리하는 방식이 약간 다를 수 있으니, Google의 경우 [Google Search Console 도움말](https://developers.google.com/search/docs/crawling-indexing/robots/intro?hl=ko)을 참고하는 것이 좋습니다.
