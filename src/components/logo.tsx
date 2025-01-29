import LogoIconImg from '@public/logo-primary.png';
import logoIconLightImg from '@public/saldawich.png'
import { useTheme } from 'next-themes';
import Image from 'next/image';
interface IconProps extends React.SVGProps<SVGSVGElement> {
  iconOnly?: boolean;
}

export default function Logo({ iconOnly = false, ...props }: IconProps) {
  const { theme } = useTheme();
  return (
    <Image src={logoIconLightImg } alt="Saldwich" />
    // <svg
    //   xmlns="http://www.w3.org/2000/svg"
    //   fill="none"
    //   viewBox={`0 0 ${iconOnly ? '48 26' : '155 28'}`}
    //   {...props}
    // >
    //   <rect
    //     width="10.16"
    //     height="19.93"
    //     fill="currentColor"
    //     rx="5.08"
    //     transform="rotate(29.49 -5.18 20.77) skewX(.85)"
    //   />
    //   <rect
    //     width="10.16"
    //     height="25.62"
    //     fill="currentColor"
    //     rx="5.08"
    //     transform="matrix(.87 .492 -.48 .878 27.17 0)"
    //   />
    //   <rect
    //     width="10.16"
    //     height="10.25"
    //     fill="currentColor"
    //     opacity=".5"
    //     rx="5.08"
    //     transform="rotate(29.49 -8.24 75.34) skewX(.85)"
    //   />
    //   {!iconOnly && (
    //     <path
    //       fill="currentColor"
    //       d="M58.94 21.4h-2.66v-9.83h2.66v9.84ZM55.96 8.36c0-.46.16-.84.48-1.16.32-.34.7-.5 1.16-.5.45 0 .84.16 1.16.48.32.32.48.71.48 1.18 0 .44-.16.82-.48 1.14-.32.32-.7.48-1.16.48-.45 0-.84-.16-1.16-.48-.32-.32-.48-.7-.48-1.14Zm4.49 10.32 2.28-.5c.02.42.2.78.5 1.08.32.28.75.42 1.3.42.41 0 .73-.1.96-.28a.87.87 0 0 0 .34-.7c0-.5-.36-.82-1.06-.96l-1.3-.3a3.78 3.78 0 0 1-2.08-1.08 2.96 2.96 0 0 1 .36-4.14c.7-.63 1.58-.94 2.64-.94.66 0 1.25.1 1.76.3.5.18.9.43 1.18.74.28.29.5.59.64.9.14.3.24.6.28.9l-2.22.5a1.63 1.63 0 0 0-.48-.92c-.26-.27-.64-.4-1.14-.4-.35 0-.65.1-.9.28a.85.85 0 0 0-.36.7c0 .48.3.77.9.88l1.4.3c.94.2 1.66.56 2.16 1.1.5.53.76 1.17.76 1.92 0 .88-.34 1.64-1 2.28a3.9 3.9 0 0 1-2.82.96c-.7 0-1.32-.1-1.86-.3a3.51 3.51 0 0 1-1.28-.8c-.3-.34-.52-.66-.68-.98a3.52 3.52 0 0 1-.28-.96Zm12.16-.12c.5.5 1.08.74 1.78.74s1.28-.25 1.76-.74c.5-.5.74-1.18.74-2.06 0-.88-.25-1.57-.74-2.06a2.36 2.36 0 0 0-1.76-.74c-.7 0-1.29.24-1.78.74-.48.5-.72 1.18-.72 2.06 0 .88.24 1.56.72 2.06Zm-1.92-5.8a5.02 5.02 0 0 1 3.7-1.48 5.07 5.07 0 0 1 5.16 5.22 5.07 5.07 0 0 1-5.16 5.22 5.02 5.02 0 0 1-5.16-5.22c0-1.5.48-2.76 1.46-3.74ZM83.8 21.4h-2.66v-9.84h2.54v1.2c.25-.46.65-.82 1.2-1.08a3.8 3.8 0 0 1 1.68-.4c1.42 0 2.4.54 2.92 1.64a3.48 3.48 0 0 1 3.12-1.64c1 0 1.84.31 2.52.94.7.62 1.04 1.56 1.04 2.8v6.38h-2.58v-5.84c0-.56-.15-1.01-.44-1.34-.28-.35-.72-.52-1.3-.52-.55 0-.99.18-1.32.56a2 2 0 0 0-.5 1.38v5.76h-2.64v-5.84c0-.56-.15-1.01-.44-1.34-.3-.35-.73-.52-1.3-.52-.56 0-1.01.18-1.34.56-.34.36-.5.82-.5 1.38v5.76Zm17.2-2.86c.48.5 1.08.74 1.77.74.7 0 1.28-.25 1.76-.74.5-.5.74-1.18.74-2.06 0-.88-.25-1.57-.74-2.06a2.36 2.36 0 0 0-1.76-.74c-.7 0-1.28.24-1.78.74-.48.5-.72 1.18-.72 2.06 0 .88.24 1.56.72 2.06Zm-1.93-5.8a5.02 5.02 0 0 1 3.7-1.48 5.07 5.07 0 0 1 5.16 5.22 5.07 5.07 0 0 1-5.16 5.22 5.02 5.02 0 0 1-5.16-5.22c0-1.5.49-2.76 1.46-3.74Zm16.46-1.22v2.68a4.08 4.08 0 0 0-.8-.08c-.76 0-1.37.22-1.84.66-.47.42-.7 1.13-.7 2.12v4.5h-2.66v-9.84h2.58v1.46c.48-1.03 1.41-1.54 2.8-1.54.15 0 .36.01.62.04Zm4.03 13.68h-2.66V11.57h2.58v1.2c.24-.4.63-.74 1.16-1a3.94 3.94 0 0 1 1.86-.42c1.4 0 2.5.48 3.32 1.44a5.45 5.45 0 0 1 1.22 3.68c0 1.5-.43 2.74-1.3 3.72a4.23 4.23 0 0 1-3.34 1.46c-1.3 0-2.25-.4-2.84-1.2v4.76Zm4.16-6.68c.47-.51.7-1.19.7-2.04 0-.86-.23-1.53-.7-2.02a2.26 2.26 0 0 0-1.74-.74c-.7 0-1.3.25-1.76.76-.46.49-.7 1.16-.7 2 0 .84.24 1.51.7 2.02.47.5 1.06.76 1.76.76s1.29-.25 1.74-.74Zm7.59-2.9v5.78h-2.66V6.93h2.66v5.46c.6-.72 1.49-1.08 2.66-1.08 1.2 0 2.1.36 2.72 1.1.63.72.94 1.65.94 2.8v6.2h-2.66v-5.74c0-.59-.15-1.06-.46-1.42-.3-.36-.75-.54-1.36-.54-.55 0-.99.18-1.32.54-.32.36-.5.82-.52 1.38Zm11.18 5.78h-2.66v-9.84h2.66v9.84Zm-2.98-13.06c0-.46.16-.84.48-1.16.32-.34.7-.5 1.16-.5.45 0 .84.16 1.16.48.32.32.48.71.48 1.18 0 .44-.16.82-.48 1.14-.32.32-.7.48-1.16.48-.45 0-.84-.16-1.16-.48-.32-.32-.48-.7-.48-1.14Zm9.75 5.38c-.71 0-1.3.24-1.78.74-.48.49-.72 1.16-.72 2.02 0 .85.24 1.53.72 2.04.49.49 1.09.74 1.8.74.62 0 1.12-.16 1.5-.48.37-.34.62-.73.76-1.18l2.34.78c-.24.9-.76 1.68-1.56 2.34-.8.65-1.82.98-3.04.98a5.06 5.06 0 0 1-5.18-5.22c0-1.5.48-2.76 1.46-3.74a4.95 4.95 0 0 1 3.64-1.48c1.25 0 2.28.32 3.08.98.8.64 1.31 1.42 1.54 2.34l-2.38.8c-.32-1.11-1.05-1.66-2.18-1.66Z"
    //     />
    //   )}
    // </svg>
  );
}
