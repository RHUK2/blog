import { TCareerList, TNavList, TProjectList, TSkillList } from '@/_type';
import { v4 } from 'uuid';

export const navList: TNavList = [
  {
    id: v4(),
    href: '/markdown',
    text: 'NOTE',
  },
  {
    id: v4(),
    href: '/llm',
    text: 'LLM',
  },
];

export const skillList: TSkillList = [
  {
    id: v4(),
    icon: 'NextjsIcon',
    text: 'Next.js',
  },
  {
    id: v4(),
    icon: 'TypescriptIcon',
    text: 'Typescript',
  },
  {
    id: v4(),
    icon: 'ReactqueryIcon',
    text: 'React Query',
  },
  {
    id: v4(),
    icon: 'ReacthookformIcon',
    text: 'React Hook Form',
  },
  {
    id: v4(),
    icon: 'MuiIcon',
    text: 'MUI',
  },
  {
    id: v4(),
    icon: 'TailwindcssIcon',
    text: 'Tailwind CSS',
  },
  {
    id: v4(),
    icon: 'AwsIcon',
    text: 'AWS',
  },
];

export const careerList: TCareerList = [
  {
    id: v4(),
    company: '(주)위크루트',
    role: 'FE • 개발팀',
    startDate: '2021.10.',
    endDate: '재직중',
    description: 'B2B HR 평판조회 서비스 회사',
    projectList: [
      {
        id: v4(),
        title: '신규 랜딩페이지 개발',
        contributions: 100,
        startDate: '2025.01.',
        endDate: '2025.02.',
        description: '회사 랜딩페이지',
        skillList: [
          {
            id: v4(),
            icon: 'NextjsIcon',
            text: 'Next.js',
          },
          {
            id: v4(),
            icon: 'TypescriptIcon',
            text: 'Typescript',
          },

          {
            id: v4(),
            icon: 'MuiIcon',
            text: 'MUI',
          },
        ],
        experienceList: [
          { id: v4(), behavior: '시멘틱 HTML 준수, Meta Tag 관리, Sitemap 생성', result: 'SEO 최적화' },
          {
            id: v4(),
            behavior: '마크다운을 s3에 업로드하여 소개 페이지를 구성하고 공지글을 올릴 수 있도록 구현',
            result: '비개발자도 내용을 수정할 수 있어 업무 효율 개선',
          },
          { id: v4(), behavior: '카카오 공유하기 적용', result: '사용자가 손쉽게 콘텐츠를 공유할 수 있도록 지원' },
          {
            id: v4(),
            behavior: 'Framer-Motion을 이용한 애니메이션 구현',
            result: '부드러운 페이지 이동을 통한 사용자 경험 향상',
          },
          { id: v4(), behavior: '반응형 개발', result: '모바일 화면 대응을 통한 사용자 경험 향상' },
        ],
      },
      {
        id: v4(),
        title: '사내 업무 보조툴 개발',
        contributions: 100,
        startDate: '2024.09.',
        endDate: '2024.10.',
        description:
          '음성 파일에서 대화 내용을 추출하고, 사용자가 입력한 프롬프트와 함께 GPT에 전달해 응답을 받는 시스템',
        skillList: [
          {
            id: v4(),
            icon: 'ReactIcon',
            text: 'React',
          },
          {
            id: v4(),
            icon: 'TypescriptIcon',
            text: 'Typescript',
          },
          {
            id: v4(),
            icon: 'ReacthookformIcon',
            text: 'React Hook Form',
          },
          {
            id: v4(),
            icon: 'TailwindcssIcon',
            text: 'TailwindCSS',
          },
        ],
        experienceList: [
          {
            id: v4(),
            behavior: '대화 내용을 타임 라인과 함께 출력하고 문장 단위로 수정 가능한 폼 구현',
            result: '음성 파일에서 추출된 내용 중 오탈자를 수정 가능하도록 지원',
          },
          {
            id: v4(),
            behavior: '다중 프롬프트 입력 폼 구현 ',
            result:
              '음성 파일 스크립트와 다중 프롬프트를 통해 요청 한 번으로 다중 응답을 받을 수 있도록 업무 효율 개선',
          },
          { id: v4(), behavior: '라이브러리 없이 Droppable, DraggableBox 구현', result: '' },
        ],
      },
      {
        id: v4(),
        title: '체커 피드백 신규 서비스 개발 • 유지보수',
        contributions: 70,
        startDate: '2023.10.',
        endDate: '2024.08.',
        description: '다면진단 서비스',
        skillList: [
          {
            id: v4(),
            icon: 'NextjsIcon',
            text: 'Next.js',
          },
          {
            id: v4(),
            icon: 'TypescriptIcon',
            text: 'Typescript',
          },
          {
            id: v4(),
            icon: 'ReactqueryIcon',
            text: 'React Query',
          },
          {
            id: v4(),
            icon: 'ReacthookformIcon',
            text: 'React Hook Form',
          },
          {
            id: v4(),
            icon: 'MuiIcon',
            text: 'MUI',
          },
        ],
        experienceList: [
          {
            id: v4(),
            behavior:
              '다면진단을 응답 중인 경우 주기적으로 세션 연장, 추가로 세션 연장 버튼을 만들어 세션 만료 시간을 수동으로 연장할 수 있도록 구현',
            result: '사용자가 응답 중에는 세션이 만료되지 않도록 구현하여 사용자 경험 향상',
          },
          {
            id: v4(),
            behavior: '배포 스크립트를 작성하여 배포 중 서버 다운타임 감소',
            result:
              '빌드가 완료된 후 결과물을 교체하는 방식으로 기존에 빌드 중에는 접근할 수 없던 이슈를 해결하여 사용자 경험 향상',
          },
          { id: v4(), behavior: '반응형 개발', result: '모바일 화면 대응을 통한 사용자 경험 향상' },
          { id: v4(), behavior: 'Axios Instance를 Context API로 공유', result: '' },
          {
            id: v4(),
            behavior:
              '커스텀 에러를 이용하여 API 요청에 대한 예외 처리를 구분지어 관리, 처리되지 않은 에러는 Sentry로 전송',
            result: '',
          },
          {
            id: v4(),
            behavior: '프로젝트 초기 환경 설정, NPM Workspace를 이용한 Monorepo 적용, 라우터 구조 설계',
            result: '',
          },
          { id: v4(), behavior: '디자인 화면과 기능을 바탕으로 백엔드와 협업하여 초기 API 문서 작성', result: '' },
          { id: v4(), behavior: 'Next.js의 Middleware를 이용한 인증 • 권한 처리', result: '' },
          {
            id: v4(),
            behavior: 'Node.js 환경에서 PDFKit을 이용해 다면진단 보고서 구현',
            result: '',
          },
          { id: v4(), behavior: 'Next-Translate를 이용한 다국어 적용', result: '' },
          { id: v4(), behavior: 'Cloudflare Turnstile 적용', result: '' },
        ],
      },
      {
        id: v4(),
        title: '헌터스 서비스 리뉴얼 • 유지보수',
        contributions: 80,
        startDate: '2022.09.',
        endDate: '2023.09.',
        description: '인사담당자와 헤드헌터 중개 서비스',
        skillList: [
          {
            id: v4(),
            icon: 'ReactIcon',
            text: 'React',
          },
          {
            id: v4(),
            icon: 'JavascriptIcon',
            text: 'Javascript',
          },
          {
            id: v4(),
            icon: 'ReactqueryIcon',
            text: 'React Query',
          },
          {
            id: v4(),
            icon: 'ReacthookformIcon',
            text: 'React Hook Form',
          },
        ],
        experienceList: [
          {
            id: v4(),
            behavior: 'JQuery로 되어있던 서비스를 React로 리뉴얼',
            result: '유지보수와 추가 기능 개발이 용이해짐',
          },
          {
            id: v4(),
            behavior: '약 20개의 입력이 들어가는 폼과 유효성 검사 구현',
            result: 'React-Hook-Form을 이용한 비제어 컴포넌트 방식으로 렌더링 최적화',
          },
          {
            id: v4(),
            behavior: 'useDebounce, useThrottle 훅을 이용한 호출 주기 제어',
            result: '데이터가 두 번 생성되는 이슈를 방지하여 사용자 경험 향상',
          },
          {
            id: v4(),
            behavior: '배포 스크립트를 작성하여 배포 중 서버 다운타임 감소',
            result:
              '빌드가 완료된 후 결과물을 교체하는 방식으로 기존에 빌드 중에는 접근할 수 없던 이슈를 해결하여 사용자 경험 향상',
          },
          {
            id: v4(),
            behavior: '아이콘 폰트 사용 시 초기 자원 로딩 중에 아이콘 대신 텍스트가 보이는 이슈 해결',
            result: 'Layout Shift를 제거함으로써 사용자 경험 향상',
          },
          { id: v4(), behavior: '반응형 개발', result: '모바일 화면 대응을 통한 사용자 경험 향상' },
          { id: v4(), behavior: '인사담당자, 협업부서, 헤드헌터, 어드민별 권한을 구분하여 접근 제어', result: '' },
          { id: v4(), behavior: 'React-Intl을 이용한 다국어 적용', result: '' },
        ],
      },
      {
        id: v4(),
        title: '체커 블랙 신규 서비스 개발',
        contributions: 40,
        startDate: '2022.05.',
        endDate: '2022.08.',
        description: '인재 DB 서비스',
        skillList: [
          {
            id: v4(),
            icon: 'NextjsIcon',
            text: 'Next.js',
          },
          {
            id: v4(),
            icon: 'TypescriptIcon',
            text: 'Typescript',
          },
          {
            id: v4(),
            icon: 'ReactqueryIcon',
            text: 'React Query',
          },
          {
            id: v4(),
            icon: 'ReacthookformIcon',
            text: 'React Hook Form',
          },
          {
            id: v4(),
            icon: 'MuiIcon',
            text: 'MUI',
          },
        ],
        experienceList: [
          { id: v4(), behavior: 'Typescript 도입', result: '타입 안정성을 통한 예상치 못한 버그 발생 방지' },
          {
            id: v4(),
            behavior: 'React-Query를 이용한 비동기 데이터 관리 도입',
            result: '기존 Redux-Saga의 많은 보일러 플레이트를 줄이기 위해 도입',
          },
          {
            id: v4(),
            behavior: 'React-Hook-Form을 이용한 폼 데이터 관리 도입',
            result: '비제어 컴포넌트 방식으로 렌더링 최적화',
          },
          { id: v4(), behavior: '반응형 개발', result: '모바일 화면 대응을 통한 사용자 경험 향상' },
        ],
      },
      {
        id: v4(),
        title: '체커 오토 서비스 유지보수',
        contributions: 0,
        startDate: '2021.10.',
        endDate: '2022.04.',
        description: '평판조회 서비스',
        skillList: [
          {
            id: v4(),
            icon: 'NextjsIcon',
            text: 'Next.js',
          },
          {
            id: v4(),
            icon: 'JavascriptIcon',
            text: 'Javascript',
          },
          {
            id: v4(),
            icon: 'MuiIcon',
            text: 'MUI',
          },
        ],
        experienceList: [
          {
            id: v4(),
            behavior: '토큰 만료 시 토큰 재발급 후 이전 실패된 요청에 대해 재요청 하는 로직 적용',
            result: '',
          },
          { id: v4(), behavior: 'CORS 에러 해결', result: '' },
          { id: v4(), behavior: 'Google reCaptcha 적용', result: '' },
        ],
      },
    ],
  },
];

export const projectList: TProjectList = [
  {
    id: v4(),
    title: '개인 블로그 개발',
    contributions: 100,
    startDate: '2023.10.',
    endDate: '진행중.',
    description: '개인 지식 기록 목적',
    skillList: [
      {
        id: v4(),
        icon: 'NextjsIcon',
        text: 'Next.js',
      },
      {
        id: v4(),
        icon: 'TypescriptIcon',
        text: 'Typescript',
      },
      {
        id: v4(),
        icon: 'ReactqueryIcon',
        text: 'React Query',
      },
      {
        id: v4(),
        icon: 'ReacthookformIcon',
        text: 'React Hook Form',
      },
      {
        id: v4(),
        icon: 'TailwindcssIcon',
        text: 'TailwindCSS',
      },
    ],
    experienceList: [
      {
        id: v4(),
        behavior: 'resize 시 스타일 변경이 일어나는 컴포넌트에 resizeObserver, requestAnimationFrame 적용',
        result: '렌더링 최적화',
      },
      { id: v4(), behavior: 'LLM 프롬프트 구현', result: '' },
      { id: v4(), behavior: 'App Router 사용', result: '' },
      { id: v4(), behavior: '다크모드 적용', result: '' },
    ],
  },
];
