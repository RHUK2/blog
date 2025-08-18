function validateHtmlTags(htmlString: string) {
  const stack: string[] = [];
  const tagRegex = /<(\/?)(\w+)[^>]*>/g;
  let match: RegExpExecArray | null = null;

  while ((match = tagRegex.exec(htmlString)) !== null) {
    const isClosingTag = match[1] === '/';
    const tagName = match[2];

    if (isClosingTag) {
      if (stack.length === 0 || stack.pop() !== tagName) {
        return false;
      }
    } else {
      stack.push(tagName);
    }
  }

  // 모든 태그를 처리한 후 스택이 비어있으면 true, 아니면 false 반환
  return stack.length === 0;
}

// 예시 HTML
const htmlSnippet = `<th colspan="1" class="border-b p-2 text-start" style="opacity: 1; white-space: nowrap; width: 150px;"><div class="cursor-pointer select-none">User ID 🔽</div><button role="button" tabindex="0" aria-disabled="false" aria-roledescription="sortable" aria-describedby="DndDescribedBy-4" style="">👆</button><div></div></th>`;

const isValid = validateHtmlTags(htmlSnippet);

if (isValid) {
  console.log('주어진 HTML의 태그가 올바르게 적용되었습니다.');
} else {
  console.log('주어진 HTML의 태그에 오류가 있습니다.');
}
