```ts
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // 요소가 뷰포트에 보이는 경우
        if (entry.isIntersecting) {
          console.log('in');
          console.log(entry);
        } else {
          console.log('out');
          console.log(entry);
        }
      });
    },
    {
      root: null, // 뷰포트를 사용
      rootMargin: '0px',
      threshold: 0.1, // 요소가 10% 보일 때 콜백 실행});
    },
  );
  const elements = document.querySelectorAll('video');
  elements.forEach((element) => {
    observer.observe(element);
  });
}, []);
```

```ts
// worker.js
self.onmessage = function (event) {
  console.log('🚀 ~ event:', event);
  const numbers = event.data;
  //   const doubledNumbers = numbers.map((num) => num * 2); // 값들을 두 배로 만듦
  self.postMessage(event.data * 2); // 결과 반환
};

// ts
const [numbers, setNumbers] = useState([1, 2, 3, 4, 5, 6]);
const [result, setResult] = useState(null);

useEffect(() => {
  // Worker 생성
  const worker = new Worker(new URL('./worker.js', import.meta.url));

  worker.onmessage = (event) => {
    console.log('🚀 ~ useEffect ~ event:', event);
    setResult(event.data); // Worker로부터 결과를 받아옴
  };

  // Worker로 데이터 전달
  worker.postMessage(numbers);

  // 컴포넌트 unmount 시 Worker 정리(종료)
  return () => worker.terminate();
}, [numbers]);
```
