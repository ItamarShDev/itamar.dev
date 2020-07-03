{
  "compilerOptions": {
    "baseUrl": ".",
    "allowJs": true,
    "jsx": "preserve",
    "target": "esnext",
    "module": "esnext",
    "lib": ["dom", "es2019"],
    "noEmit": true,
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "paths": {
      "@components/*": ["components/*"],
      "@lib/*": ["lib/*"],
      "@styles/*": ["styles/*"],
      "@data/*": ["data/*"]
    }
  },
  "exclude": ["./api/**"],
  "include": ["**/*.ts", "**/*.tsx", "**/*.js"]
}
