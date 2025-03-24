import { TCareerList, TNavList, TProjectList, TSkillList } from '@/_type';

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

export const skillList: TSkillList = [
  {
    icon: 'NextjsIcon',
    text: 'Next.js',
  },
  {
    icon: 'TypescriptIcon',
    text: 'Typescript',
  },
  {
    icon: 'ReactqueryIcon',
    text: 'React Query',
  },
  {
    icon: 'ReacthookformIcon',
    text: 'React Hook Form',
  },
  {
    icon: 'MuiIcon',
    text: 'MUI',
  },
  {
    icon: 'TailwindcssIcon',
    text: 'Tailwind CSS',
  },
  {
    icon: 'AwsIcon',
    text: 'AWS',
  },
];

export const careerList: TCareerList = [
  {
    company: '(주)위크루트',
    role: 'FE • 개발팀',
    startDate: '2021.10.',
    endDate: '재직중',
    description: 'B2B HR 평판조회 서비스 회사',
    projectList: [
      {
        title: '랜딩페이지 개발',
        company: '(주)위크루트',
        startDate: '2025.01.',
        endDate: '2025.02.',
        description: '회사 랜딩페이지',
        skillList: [
          {
            icon: 'NextjsIcon',
            text: 'Next.js',
          },
          {
            icon: 'TypescriptIcon',
            text: 'Typescript',
          },

          {
            icon: 'MuiIcon',
            text: 'MUI',
          },
        ],
        experienceList: [
          'ISR 방식으로 SEO 및 성능 최적화',
          'Framer-Motion을 이용한 애니메이션 구현',
          '마크다운 업로드를 이용해 페이지를 구성할 수 있도록 구현',
          'Next.js의 Image 컴포넌트를 이용한 이미지 최적화',
          '반응형 개발',
        ],
      },
      {
        title: '사내 업무 보조툴 개발',
        company: '(주)위크루트',
        startDate: '2024.09.',
        endDate: '2024.10.',
        description:
          '음성 파일에서 대화 내용을 추출하고, 사용자가 입력한 프롬프트와 함께 GPT에 전달해 응답을 받는 시스템',
        skillList: [
          {
            icon: 'ReactIcon',
            text: 'React',
          },
          {
            icon: 'TypescriptIcon',
            text: 'Typescript',
          },
          {
            icon: 'ReacthookformIcon',
            text: 'React Hook Form',
          },
          {
            icon: 'TailwindcssIcon',
            text: 'TailwindCSS',
          },
        ],
        experienceList: [
          '음성 파일에서 추출한 대화 내용을 출력하고 편집할 수 있는 폼 구현',
          '입력을 동적으로 추가/제거하고 드래그앤드롭으로 순서 변경이 가능한 폼 구현',
        ],
      },
      {
        title: '체커 피드백 서비스 개발 • 유지보수',
        company: '(주)위크루트',
        startDate: '2023.10.',
        endDate: '2024.08.',
        description: '다면진단 서비스',
        skillList: [
          {
            icon: 'NextjsIcon',
            text: 'Next.js',
          },
          {
            icon: 'TypescriptIcon',
            text: 'Typescript',
          },
          {
            icon: 'ReactqueryIcon',
            text: 'React Query',
          },
          {
            icon: 'ReacthookformIcon',
            text: 'React Hook Form',
          },
          {
            icon: 'MuiIcon',
            text: 'MUI',
          },
        ],
        experienceList: [
          'Axios Interceptor에서 리액트 훅을 사용가능하도록 변경',
          '커스텀 에러를 이용하여 API 요청에 대한 예외 처리를 구분지어 관리, 처리되지 않은 에러는 Sentry로 전송',
          '세션 연장 버튼을 추가하여 세션 만료 시간을 연장할 수 있도록 구현',
          'Next.js의 Middleware를 이용한 인증 처리',
          'PDFKit을 이용해 다면진단 보고서 구현',
          'NPM Workspace를 이용한 Monorepo 적용',
          'next-translate를 이용한 다국어 적용',
          'Cloudflare Turnstile 적용',
          '기능 정리 및 api 문서 작성',
          '프로젝트 설계 및 컨벤션 작성',
        ],
      },
      {
        title: '헌터스 서비스 리뉴얼 • 유지보수',
        company: '(주)위크루트',
        startDate: '2022.09.',
        endDate: '2023.09.',
        description: '인사담당자와 헤드헌터 중개 서비스',
        skillList: [
          {
            icon: 'ReactIcon',
            text: 'React',
          },
          {
            icon: 'JavascriptIcon',
            text: 'Javascript',
          },
          {
            icon: 'ReactqueryIcon',
            text: 'React Query',
          },
          {
            icon: 'ReacthookformIcon',
            text: 'React Hook Form',
          },
        ],
        experienceList: [
          'react-intl을 이용한 다국어 적용',
          '기존 jQuery로 되어있던 서비스를 React로 리뉴얼',
          '인사담당자, 협업부서, 헤드헌터, 어드민별 권한을 구분하여 접근 제어',
          'useDebounce, useThrottle 훅을 이용한 호출 주기 제어',
        ],
      },
      {
        title: '체커 블랙 서비스 개발',
        company: '(주)위크루트',
        startDate: '2022.05.',
        endDate: '2022.08.',
        description: '인재 DB 서비스',
        skillList: [
          {
            icon: 'NextjsIcon',
            text: 'Next.js',
          },
          {
            icon: 'TypescriptIcon',
            text: 'Typescript',
          },
          {
            icon: 'ReactqueryIcon',
            text: 'React Query',
          },
          {
            icon: 'ReacthookformIcon',
            text: 'React Hook Form',
          },
          {
            icon: 'MuiIcon',
            text: 'MUI',
          },
        ],
        experienceList: [
          'Typescript 도입',
          'React Query를 이용한 비동기 데이터 관리 도입',
          'React Hook Form을 이용한 폼 데이터 관리 도입',
          '배포 스크립트를 작성하여 배포 중 서버 다운타임 감소',
        ],
      },
      {
        title: '체커 오토 서비스 유지보수',
        company: '(주)위크루트',
        startDate: '2021.10.',
        endDate: '2022.04.',
        description: '평판조회 서비스',
        skillList: [
          {
            icon: 'NextjsIcon',
            text: 'Next.js',
          },
          {
            icon: 'JavascriptIcon',
            text: 'Javascript',
          },
          {
            icon: 'MuiIcon',
            text: 'MUI',
          },
        ],
        experienceList: [
          '토큰 만료 시 토큰 재발급 후 이전 실패된 요청에 대해 재요청 하는 로직 적용',
          '유저 동시접속 시 무한로딩되는 이슈 수정',
          'Google reCaptcha 적용',
        ],
      },
    ],
  },
];

export const projectList: TProjectList = [
  {
    title: '개인 블로그 개발',
    company: '개인',
    startDate: '2023.10.',
    endDate: '진행중.',
    description: '개인 아카이브 목적',
    skillList: [
      {
        icon: 'NextjsIcon',
        text: 'Next.js',
      },
      {
        icon: 'TypescriptIcon',
        text: 'Typescript',
      },
      {
        icon: 'ReactqueryIcon',
        text: 'React Query',
      },
      {
        icon: 'ReacthookformIcon',
        text: 'React Hook Form',
      },
      {
        icon: 'TailwindcssIcon',
        text: 'TailwindCSS',
      },
    ],
    experienceList: [
      'LLM 프롬프트 구현',
      'App Router 사용',
      'RequestAnimationFrame을 이용한 성능 최적화',
      'ResizeObserver를 이용한 성능 최적화',
      '다크모드 적용',
    ],
  },
];
