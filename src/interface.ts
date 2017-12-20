export type BuildOptions = {
  dirName?: string,
  registry?: string,
  branch?: string,
  ssh?: boolean,
  list?: boolean,
}

export type ConfigType = {
  build?: object,
}

export type RepoType = {
  ssh?: string,
  https?: string,
}

export type ScanResult = {
  files: string[],
  folders: string[],
}