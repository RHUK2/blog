import AwsIcon from '@/public/aws.svg';
import cssIcon from '@/public/css.svg';
import GithubIcon from '@/public/github.svg';
import JavascriptIcon from '@/public/javascript.svg';
import MuiIcon from '@/public/mui.svg';
import NextjsIcon from '@/public/nextjs.svg';
import ReactIcon from '@/public/react.svg';
import ReacthookformIcon from '@/public/reacthookform.svg';
import ReactqueryIcon from '@/public/reactquery.svg';
import TailwindcssIcon from '@/public/tailwindcss.svg';
import TypescriptIcon from '@/public/typescript.svg';

export const iconMap = {
  AwsIcon: AwsIcon,
  GithubIcon: GithubIcon,
  JavascriptIcon: JavascriptIcon,
  MuiIcon: MuiIcon,
  NextjsIcon: NextjsIcon,
  ReactIcon: ReactIcon,
  ReacthookformIcon: ReacthookformIcon,
  ReactqueryIcon: ReactqueryIcon,
  TailwindcssIcon: TailwindcssIcon,
  TypescriptIcon: TypescriptIcon,
  cssIcon: cssIcon,
};

interface Props {
  icon: keyof typeof iconMap;
}

export function SvgrIcon({ icon }: Props) {
  const Component = iconMap[icon];

  return <Component className='h-4 w-4 fill-black dark:fill-white' />;
}
