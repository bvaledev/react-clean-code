/* hack para as classes do scss serem reconhecidas */
declare module '*.scss' {
  const content: { [className: string]: string}
  export = content
}
