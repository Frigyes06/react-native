// https://github.com/electron/electron/issues/7714#issuecomment-549579114
const remote = window.require('electron').remote

export function isDev() {
  return remote.process.argv[2] == '--dev'
}
