//https://stackoverflow.com/questions/40382842/cant-import-css-scss-modules-typescript-says-cannot-find-module
declare module '*.css' {
    const content: Record<string, string>
    export default content
}
declare module '*.scss' {
    const content: Record<string, string>
    export default content
}
declare module '*.svg' {
    const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
    const content: string

    export { ReactComponent }
    // export default content;
    export default ReactComponent
}
declare module '*.wasm' { const val: any; export default val }

declare module '*.ico' { const val: string; export default val }
declare module '*.jpg' { const val: string; export default val }
declare module '*.jpeg' { const val: string; export default val }
declare module '*.png' { const val: string; export default val }
declare module '*.gif' { const val: string; export default val }
declare module '*.glb' { const val: string; export default val }
declare module '*.gltf' { const val: string; export default val }
declare module '*.eot' { const val: string; export default val }
declare module '*.otf' { const val: string; export default val }
declare module '*.webp' { const val: string; export default val }
declare module '*.ttf' { const val: string; export default val }
declare module '*.woff' { const val: string; export default val }
declare module '*.woff2' { const val: string; export default val }
declare module '*.mp4' { const val: string; export default val }
declare module '*.webm' { const val: string; export default val }
declare module '*.wav' { const val: string; export default val }
declare module '*.mp3' { const val: string; export default val }
declare module '*.m4a' { const val: string; export default val }
declare module '*.aac' { const val: string; export default val }
declare module '*.oga' { const val: string; export default val }
declare module '*.txt' { const val: string; export default val }
declare module '*.glsl' { const val: string; export default val }
declare module '*.vert' { const val: string; export default val }
declare module '*.frag' { const val: string; export default val }
declare module '*.md' { const val: string; export default val }