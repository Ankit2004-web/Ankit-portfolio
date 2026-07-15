import { cpSync, existsSync, mkdirSync, readdirSync } from 'node:fs'
import { join, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const root = resolve(scriptDir, '..')
const sources = [
  join(root, 'certificates'),
  join(root, 'cirtificates'),
]
const destination = join(root, 'public', 'certificates')

mkdirSync(destination, { recursive: true })

let copied = 0

for (const source of sources) {
  if (!existsSync(source)) continue

  for (const file of readdirSync(source)) {
    if (!/\.(pdf|png|jpe?g|webp)$/i.test(file)) continue
    cpSync(join(source, file), join(destination, file), { force: true })
    copied++
    console.log(`Synced certificate: ${file}`)
  }
}

console.log(copied > 0 ? `Synced ${copied} certificate file(s).` : 'No certificate files found to sync.')
