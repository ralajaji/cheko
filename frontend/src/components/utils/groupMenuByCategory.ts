import type { GetMenuResponseType } from '../../features/home/Home.api'

export type MenuCategoryGroup = {
  category: string
  items: GetMenuResponseType[]
}

export function groupMenuByCategory(items?: GetMenuResponseType[]): MenuCategoryGroup[] {
  const groups = new Map<string, GetMenuResponseType[]>()
  items?.forEach((item) => {
    const category = item.category.trim()
    const group = groups.get(category) ?? []
    group.push(item)
    groups.set(category, group)
  })

  return Array.from(groups.entries())
    .map(([category, groupItems]) => ({
      category,
      items: [...groupItems].sort((a, b) => a.id - b.id),
    }))
    .sort((a, b) => a.items[0].id - b.items[0].id)
}
