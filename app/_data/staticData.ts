import { TNavList, TProjectList } from '@/_type';

export const navList: TNavList = [
  {
    href: '/markdown',
    text: 'NOTE',
  },
  {
    href: '/llm',
    text: 'LLM',
  },
];

export const projectList: TProjectList = [
  {
    title: '체커 피드백 서비스 개발 및 유지보수',
    company: '(주)위크루트',
    startDate: '2023.10.',
    endDate: '2024.08.',
    description: '사내 다면진단 서비스',
    experienceList: [
      'i18n 다국어 적용',
      '기능 정리 및 api 문서 작업',
      '프로젝트 설계 및 컨벤션 작성',
      'pdfkit을 이용한 다면진단 보고서 디자인 작업',
      'npm workspace를 이용한 monorepo 적용',
      '커스텀 에러를 작성해 API 요청에 대한 예외처리를 구조적으로 구현',
      'axios interceptor에서 리액트 훅을 사용가능하도록 변경하고, 세션 연장 버튼 컴포넌트 작성성',
    ],
  },
  {
    title: '랜딩페이지 개발',
    company: '(주)위크루트',
    startDate: '2025.01.',
    endDate: '2025.02.',
    description: '회사 서비스 랜딩페이지',
    experienceList: [
      '반응형 개발',
      'SEO, 웹 접근성 고려',
      'Nextjs Page Router ISR 방식 적용',
      'framermotion을 이용한 애니메이션 적용',
      's3에 업로드된 정적 자산을 활용한 페이지 개발',
    ],
  },

  {
    title: '헌터스 서비스 리뉴얼 및 안정화',
    company: '(주)위크루트',
    startDate: '2022.09.',
    endDate: '2023.09.',
    description: '인사담당자와 헤드헌터 중개 서비스',
    experienceList: ['ui 라이브러리 없이 개발', '기존 jquery로 되어있던 서비스를 React로 리뉴얼'],
  },
  {
    title: '체커 오토 서비스 유지보수',
    company: '(주)위크루트',
    startDate: '2021.10.',
    endDate: '2022.04.',
    description: '레퍼런스체크 서비스',
    experienceList: [
      '구글 reCaptcha 적용',
      '유저 동시접속 시 무한로딩되는 이슈 수정',
      '토큰 만료 시 재갱신 후 이전 실패된 요청에 대해 재요청 하는 로직 구현',
    ],
  },
  {
    title: '체커 블랙 서비스 개발',
    company: '(주)위크루트',
    startDate: '2022.05.',
    endDate: '2022.08.',
    description: '인재 DB 서비스',
    experienceList: [
      'typescript, react-query, react-hook-form 도입',
      '배포 스크립트를 작성하여 배포 중 서버 다운타임 감소',
      'debounce 로직을 커스텀 훅으로 작성하여 컴포넌트 내부에서 리렌더링으로 인해 참조값이 변하지 않게 사용',
    ],
  },
  {
    title: '사내 업무 보조툴 개발',
    company: '(주)위크루트',
    startDate: '2024.09.',
    endDate: '2024.10.',
    description: '음성 파일에서 대화 내용을 추출하고, 사용자가 입력한 프롬프트와 함께 GPT에 전달해 응답을 받는 시스템',
    experienceList: [
      '음성 파일 크기 기반 응답 시간 예측 및 로딩 스피너에 진행도 표시',
      '입력을 동적으로 추가/제거하고 드래그앤드롭으로 순서 변경 가능한 폼 작성',
    ],
  },
];
