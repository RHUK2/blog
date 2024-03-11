---
updatedAt: 2024-03-11
directory: Typescript
fileName: Typescript
title: Typescript 알아보기
description: Typescript 정리
---

# Typescript

- [Typescript](#typescript)
  - [Official Cheatsheet](#official-cheatsheet)
  - [Unofficial Cheatsheet](#unofficial-cheatsheet)
  - [any vs unknown](#any-vs-unknown)
  - [is](#is)
  - [js instanceof vs ts instanceof](#js-instanceof-vs-ts-instanceof)
  - [.d.ts](#dts)
  - [tsconfig.json](#tsconfigjson)

## Official Cheatsheet

![TypeScript_Types](https://onedrive.live.com/embed?resid=7DCB8F9953BAAF94%216821&authkey=%21ALRXVkQAdnXe_FU&width=5542&height=3917)
![TypeScript_Interfaces](https://onedrive.live.com/embed?resid=7DCB8F9953BAAF94%216818&authkey=%21ANuXJk_hsU09uRE&width=1330&height=940)
![TypeScript_Control_Flow_Analysis](https://onedrive.live.com/embed?resid=7DCB8F9953BAAF94%216820&authkey=%21ABk3iSoA5iWH_28&width=1330&height=940)
![TypeScript_Classes](https://onedrive.live.com/embed?resid=7DCB8F9953BAAF94%216819&authkey=%21AFO0ZTehKtHAC-I&width=1330&height=940)

## Unofficial Cheatsheet

![Unofficial_Typescript_Cheatsheet_1](https://onedrive.live.com/embed?resid=7DCB8F9953BAAF94%217094&authkey=%21APzTFPUQSBvnjzs&width=3172&height=2530)
![Unofficial_Typescript_Cheatsheet_2](https://onedrive.live.com/embed?resid=7DCB8F9953BAAF94%217096&authkey=%21AJS8nZ5TNfHfknc&width=3535&height=2530)

## any vs unknown

`any`는 모든 타입을 허용한다. 반면 `unknown`은 타입 가드를 통해 무슨 타입인지 정의해야 허용한다.

<!-- todo: 내용 보완 필요 -->

## is

## js instanceof vs ts instanceof

## .d.ts

타입스크립트로 어플리케이션을 작성할 때 기존 자바스크립트만으로 구성된 라이브러리를 사용할 경우 타입이 필요하다고 에러를 뿜을 것이다. 자바스크립트 이후에 타입스크립트가 탄생하면서 자바스크립트만으로 구성된 라이브러리에게는 타입이 없기 때문에 타입을 작성해주어야 했다.

위에 말한 기능을 제공하는 것이 `.d.ts` 파일이다. 해당 파일은 기존 자바스크립트 파일을 굳이 `.ts`로 바꿔서 재작성할 필요가 없이 `.d.ts` 파일에 타입 정의만 작성해서 추가하면 타입스크립트가 타입을 인식하고 오류를 뿜지 않는다.

`.ts` 파일은 표준 타입스크립트 파일로 타입스크립트 컴파일러에 의해 일반 자바스크립트 문법으로 변환되지만 `.d.ts` 파일은 타입스크립트 컴파일러에서 참조만 할 뿐 컴파일 결과물에 포함되지 않는다.

| .ts                          | .d.ts                                 |
| ---------------------------- | ------------------------------------- |
| var a = 1                    | declare var a: number                 |
| let a = 1                    | declare let a: number                 |
| const a = 1                  | declare const : 1                     |
| function a(b) { ... }        | declare function a(b: number): string |
| class A { b() { return 3 } } | declare class A { b() : number }      |
| namespace A { }              | declare namespace A {}                |
| type A = number              | type A = number                       |
| interface A { b?: string }   | interface A { b?: string }            |

## tsconfig.json

```js
{
  "extends": "../tsconfig.base.json",               /* TypeScript 설정 파일을 상속하도록 설정할 때 사용된다. */
  "files": ["index.ts", "main.ts"],                 /* 컴파일할 TypeScript 파일의 목록을 설정한다. */
  "include": ["**/*.tsx", "**/*.ts"],               /* 컴파일 대상으로 포함할 파일 패턴을 설정한다. */
  "exclude": ["node_modules"],                      /* 컴파일 대상에서 제외할 파일 패턴을 설정한다. */
  "compilerOptions": {
    // Projects
    "composite": true,                                /* 컴파일러는 프로젝트의 각 파일을 개별적으로 컴파일하는 대신, 프로젝트를 구성하는 모든 파일을 단일 컴파일 타겟으로 컴파일한다.(컴파일 성능 개선 목적) */
    "incremental": true,                              /* 이전 컴파일 결과를 캐시하고 변경된 파일만 다시 컴파일함으로써 TypeScript 프로젝트의 빌드 시간을 단축하는 데 사용된다. */
    "tsBuildInfoFile": "./.tsbuildinfo",              /* 이전 컴파일 결과의 캐시 정보를 저장할 파일 경로 */
    "disableSourceOfProjectReferenceRedirect": true,  /* Disable preferring source files instead of declaration files when referencing composite projects. */
    "disableSolutionSearching": true,                 /* Opt a project out of multi-project reference checking when editing. */
    "disableReferencedProjectLoad": true,             /* Reduce the number of projects loaded automatically by TypeScript. */
    // Language and Environment
    "target": "es5"                                   /* 타입스크립트 파일을 컴파일해서 나온 자바스크립트 파일의 문법 버전을 설정한다. */,
    "lib": ["dom", "dom.iterable", "esnext"],         /* 프로젝트에서 사용하려는 ECMAScript 버전 및 관련 브라우저 API를 지정하는 데 사용된다. */
    "jsx": "react-jsx",                               /* jsx 코드를 컴파일 시 생성되는 문법을 정한다. */
    "experimentalDecorators": true,                   /* Enable experimental support for TC39 stage 2 draft decorators. */
    "emitDecoratorMetadata": true,                    /* Emit design-type metadata for decorated declarations in source files. */
    "jsxFactory": "",                                 /* Specify the JSX factory function used when targeting React JSX emit, e.g. 'React.createElement' or 'h'. */
    "jsxFragmentFactory": "",                         /* Specify the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'. */
    "jsxImportSource": "",                            /* Specify module specifier used to import the JSX factory functions when using 'jsx: react-jsx*'. */
    "reactNamespace": "",                             /* Specify the object invoked for 'createElement'. This only applies when targeting 'react' JSX emit. */
    "noLib": true,                                    /* Disable including any library files, including the default lib.d.ts. */
    "useDefineForClassFields": true,                  /* Emit ECMAScript-standard-compliant class fields. */
    "moduleDetection": "auto",                        /* Control what method is used to detect module-format JS files. */
    // Modules
    "module": "commonjs"                              /* 타입스크립트 파일을 컴파일해서 나온 자바스크립트 파일의 모듈 시스템을 설정한다. */,
    "rootDir": "./",                                  /* 컴파일러는 rootDir로 지정한 디렉토리부터 시작하여 프로젝트 내의 모든 TypeScript 파일을 찾는다. */
    "moduleResolution": "node",                       /* 컴파일러가 모듈을 해석하는 방법을 지정한다.*/
    "baseUrl": "./",                                  /* 모듈을 상대 경로가 아닌 기준 경로를 기반으로 해석합니다. */
    "paths": { "@alias/*": ["./src/*"] },             /* 모듈을 해석할 때 모듈 이름과 실제 파일 경로 간의 매핑을 제공하는 데 사용된다. */
    "rootDirs": [],                                   /* Allow multiple folders to be treated as one when resolving modules. */
    "typeRoots": [],                                  /* Specify multiple folders that act like './node_modules/@types'. */
    "types": [],                                      /* Specify type package names to be included without being referenced in a source file. */
    "allowUmdGlobalAccess": true,                     /* Allow accessing UMD globals from modules. */
    "moduleSuffixes": [],                             /* List of file name suffixes to search when resolving a module. */
    "resolveJsonModule": true,                        /* JSON 파일을 모듈 방식으로 가져올 수 있게 해준다. */
    "noResolve": true,                                /* Disallow 'import's, 'require's or '<reference>'s from expanding the number of files TypeScript should add to a project. */
    // JavaScript Support
    "allowJs": true,                                  /* 컴파일러가 JavaScript 파일을 포함한 모든 확장자의 파일을 컴파일한다. */
    "checkJs": true,                                  /* 컴파일러가 JavaScript 파일도 엄격하게 타입 검사한다. */
    "maxNodeModuleJsDepth": 1,                        /* Specify the maximum folder depth used for checking JavaScript files from 'node_modules'. Only applicable with 'allowJs'. */
    // Emit
    "declaration": true,                              /* Generate .d.ts files from TypeScript and JavaScript files in your project. */
    "declarationMap": true,                           /* Create sourcemaps for d.ts files. */
    "emitDeclarationOnly": true,                      /* Only output d.ts files and not JavaScript files. */
    "sourceMap": true,                                /* Create source map files for emitted JavaScript files. */
    "outFile": "./",                                  /* Specify a file that bundles all outputs into one JavaScript file. If 'declaration' is true, also designates a file that bundles all .d.ts output. */
    "outDir": "./",                                   /* 컴파일된 JavaScript 파일이 출력될 디렉토리를 설정한다. */
    "removeComments": true,                           /* Disable emitting comments. */
    "noEmit": true,                                   /* 컴파일된 파일을 내보내지 않는다. 단순 정적 타입 검사용으로 사용하고 다른 툴을 이용해 트랜스파일하려는 경우 사용한다. */
    "importHelpers": true,                            /* Allow importing helper functions from tslib once per project, instead of including them per-file. */
    "importsNotUsedAsValues": "remove",               /* Specify emit/checking behavior for imports that are only used for types. */
    "downlevelIteration": true,                       /* Emit more compliant, but verbose and less performant JavaScript for iteration. */
    "sourceRoot": "",                                 /* Specify the root path for debuggers to find the reference source code. */
    "mapRoot": "",                                    /* Specify the location where debugger should locate map files instead of generated locations. */
    "inlineSourceMap": true,                          /* Include sourcemap files inside the emitted JavaScript. */
    "inlineSources": true,                            /* Include source code in the sourcemaps inside the emitted JavaScript. */
    "emitBOM": true,                                  /* Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files. */
    "newLine": "crlf",                                /* Set the newline character for emitting files. */
    "stripInternal": true,                            /* Disable emitting declarations that have '@internal' in their JSDoc comments. */
    "noEmitHelpers": true,                            /* Disable generating custom helper functions like '__extends' in compiled output. */
    "noEmitOnError": true,                            /* Disable emitting files if any type checking errors are reported. */
    "preserveConstEnums": true,                       /* Disable erasing 'const enum' declarations in generated code. */
    "declarationDir": "./",                           /* Specify the output directory for generated declaration files. */
    "preserveValueImports": true,                     /* Preserve unused imported values in the JavaScript output that would otherwise be removed. */
    // Interop Constraints
    "isolatedModules": true                           /* 컴파일러는 각 TypeScript 파일을 개별적으로 컴파일하고 번들링하지 않는다. */,
    "allowSyntheticDefaultImports": true,             /* import x from 'module'와 같은 합성(default) 불러오기 구문을 허용한다. */
    "esModuleInterop": true                           /* CommonJS 모듈도 import 구문을 사용하여 가져올 수 있다. */,
    "preserveSymlinks": true,                         /* Disable resolving symlinks to their realpath. This correlates to the same flag in node. */
    "forceConsistentCasingInFileNames": true          /* 컴파일러가 파일 이름의 대소문자 일치를 강제해서 모듈 해석 문제를 방지한다. */,
    // Type Checking
    "strict": true                                    /* 정적 타입 검사를 엄격하게 수행한다. */,
    "noImplicitAny": true,                            /* Enable error reporting for expressions and declarations with an implied 'any' type. */
    "strictNullChecks": true,                         /* When type checking, take into account 'null' and 'undefined'. */
    "strictFunctionTypes": true,                      /* When assigning functions, check to ensure parameters and the return values are subtype-compatible. */
    "strictBindCallApply": true,                      /* Check that the arguments for 'bind', 'call', and 'apply' methods match the original function. */
    "strictPropertyInitialization": true,             /* Check for class properties that are declared but not set in the constructor. */
    "noImplicitThis": true,                           /* Enable error reporting when 'this' is given the type 'any'. */
    "useUnknownInCatchVariables": true,               /* Default catch clause variables as 'unknown' instead of 'any'. */
    "alwaysStrict": true,                             /* Ensure 'use strict' is always emitted. */
    "noUnusedLocals": true,                           /* Enable error reporting when local variables aren't read. */
    "noUnusedParameters": true,                       /* Raise an error when a function parameter isn't read. */
    "exactOptionalPropertyTypes": true,               /* Interpret optional property types as written, rather than adding 'undefined'. */
    "noImplicitReturns": true,                        /* Enable error reporting for codepaths that do not explicitly return in a function. */
    "noFallthroughCasesInSwitch": true,               /*  switch 문에서 case 블록 사이의 "떨어지는(fallthrough)" 동작을 방지하기 위해 사용된다. */
    "noUncheckedIndexedAccess": true,                 /* Add 'undefined' to a type when accessed using an index. */
    "noImplicitOverride": true,                       /* Ensure overriding members in derived classes are marked with an override modifier. */
    "noPropertyAccessFromIndexSignature": true,       /* Enforces using indexed accessors for keys declared using an indexed type. */
    "allowUnusedLabels": true,                        /* Disable error reporting for unused labels. */
    "allowUnreachableCode": true,                     /* Disable error reporting for unreachable code. */
    // Completeness
    "skipDefaultLibCheck": true,                      /* 컴파일러가 기본적인 표준 라이브러리 (lib.d.ts) 검사를 스킵한다. */
    "skipLibCheck": true                              /* 컴파일러가 모든 타입 정의 파일 (d.ts 파일)을 검사하지 않고 스킵한다. */
  }
}
```
