import { v4 } from 'uuid';
import { CareerList, ProjectList, SkillList } from './types';

export const skillList: SkillList = [
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

export const careerList: CareerList = [
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
            text: 'Next.js(Page)',
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
          {
            id: v4(),
            behavior: '시멘틱 HTML 준수, Meta Tag 관리, Sitemap 생성',
            result: 'SEO 최적화',
          },
          {
            id: v4(),
            behavior:
              '마크다운 파일을 S3에 업로드하여 비개발자도 소개 페이지와 공지글을 직접 관리할 수 있는 시스템 구현',
            result: '비개발자도 내용을 수정할 수 있어 업무 효율성 개선',
          },
          {
            id: v4(),
            behavior: '반응형 디자인 및 Framer Motion을 활용한 인터랙티브 애니메이션 적용',
            result: 'UX 개선',
          },
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
            text: 'Next.js(Page)',
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
            behavior: 'PNPM Workspace와 Turborepo를 활용한 Monorepo 구조 적용',
            result: '확장 가능한 프로젝트 아키텍처 구축',
          },
          {
            id: v4(),
            behavior: '디자인 시안과 기능 명세를 바탕으로 백엔드와 협업하여 초기 API 문서 작성',
            result: 'API 문서 작성으로 프론트엔드와 백엔드 간의 명확한 커뮤니케이션 및 개발 효율성 향상',
          },
          {
            id: v4(),
            behavior: 'Node.js 환경에서 PDFKit을 활용하여 다면진단 PDF 보고서 생성 로직 구현',
            result: '서버에서 PDF 파일을 생성하여 다중 다운로드에 유리한 구조로 변경',
          },
          {
            id: v4(),
            behavior: '토큰 만료 시 자동 재발급 및 실패한 요청에 대한 재시도 로직 구현',
            result: 'API 호출 안정성 향상',
          },
          {
            id: v4(),
            behavior: '설문 작성 중 자동 세션 연장 및 수동 세션 연장 기능을 구현하여 응답 중 세션 만료 방지',
            result: '사용자가 응답 중에는 세션이 만료되지 않도록 하여 UX 개선',
          },
          {
            id: v4(),
            behavior: 'pm2의 클러스터 모드를 활용한 무중단 배포 설정',
            result: '기존 빌드 중 발생하던 서버 다운타임을 소폭 감소시켜 UX 개선',
          },
          { id: v4(), behavior: 'Next-Translate를 활용한 다국어 지원 기능 구현', result: '글로벌 서비스 확장성 확보' },
        ],
      },
      {
        id: v4(),
        title: '헌터스 서비스 리뉴얼 • 유지보수',
        contributions: 100,
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
          {
            id: v4(),
            icon: 'cssIcon',
            text: 'Emotion',
          },
        ],
        experienceList: [
          {
            id: v4(),
            behavior: '약 30개 입력 필드를 포함한 복잡한 폼과 유효성 검사 로직 구현',
            result: '카테고리 별로 폼 상태를 나눈 후, Context API를 사용해서 상태를 관리함으로써 DX 개선',
          },
          {
            id: v4(),
            behavior: '사용자 권한 별로 레이아웃을 분리하여, 권한에 따른 페이지 접근 제어 구현',
            result: '기존 페이지 별로 작성된 페이지 접근 제어 로직을 통합하여 코드 중복 제거 및 유지보수성 향상',
          },
          {
            id: v4(),
            behavior: 'useDebounce, useThrottle 커스텀 훅을 작성하여 API 호출 주기 제어',
            result: '이벤트 호출 빈도를 줄여 성능 최적화',
          },
          {
            id: v4(),
            behavior: '빌드 파일과 서빙 파일을 분리하고 빌드 후 파일 교체 방식으로 서비스 중단 시간 최소화',
            result: '기존 빌드 중 발생하던 서버 다운타임을 소폭 감소시켜 UX 개선',
          },
          {
            id: v4(),
            behavior: '아이콘 폰트 로딩 중 발생하는 레이아웃 시프트 문제 해결',
            result: 'FOUT(Flash of Unstyled Text) 현상 제거를 통해 UX 개선',
          },
          { id: v4(), behavior: 'React-Intl을 활용한 다국어 지원 시스템 구축', result: '글로벌 서비스 확장성 확보' },
        ],
      },
      {
        id: v4(),
        title: '체커 블랙 신규 서비스 개발',
        contributions: 70,
        startDate: '2022.05.',
        endDate: '2022.08.',
        description: '인재 DB 서비스',
        skillList: [
          {
            id: v4(),
            icon: 'NextjsIcon',
            text: 'Next.js(Page)',
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
            behavior: '안정적인 코드 작성을 위해 TypeScript 도입',
            result: '타입 안정성 확보 및 런타임 에러 사전 방지',
          },
          {
            id: v4(),
            behavior: '효율적인 비동기 데이터 관리를 위해 React Query 도입',
            result: '기존 Redux-Saga 대비 보일러플레이트 코드 대폭 감소 및 DX 개선',
          },
          {
            id: v4(),
            behavior: '효율적인 폼 데이터 관리를 위해 React Hook Form 도입',
            result: '비제어 컴포넌트 방식을 통한 렌더링 성능 최적화',
          },
        ],
      },
    ],
  },
];

export const projectList: ProjectList = [
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
        text: 'Next.js(App)',
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
      { id: v4(), behavior: 'LLM 프롬프트 구현', result: '' },
      { id: v4(), behavior: 'FOUC 다크모드 적용', result: '' },
      { id: v4(), behavior: 'FSD(Feature-Sliced Design) 패턴 적용', result: '' },
    ],
  },
];
