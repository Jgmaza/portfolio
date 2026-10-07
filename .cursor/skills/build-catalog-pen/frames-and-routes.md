# Frames ↔ rutas

## Rutas

| Route | Pencil | Notas |
| --- | --- | --- |
| `/` | `03 HOME — Dual portal` | Sin scroll. Portals Catalog + Player. Sin foto. |
| `/player` | `07 / 07b / 07c` Origin·Clears·Trophies | Sin scroll. Pager 3 actos. Foto CRT solo en Origin. |
| Settings | `08 SETTINGS — CRT` | Overlay SYS · ES/EN |
| `/projects` | `04` | Catalog scrollea |
| `/projects/[slug]` | `06` | Detail |

## i18n

- `src/content/player.ts` → `playerByLocale.es|en`
- `LocaleProvider` + `localStorage` key `bc-locale`
- Header SYS abre Settings overlay

## Foto

Solo en `/player` Origin: `public/player.jpg` + `avatar.photo = "/player.jpg"`.
