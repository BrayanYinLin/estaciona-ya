import type { PropsWithChildren, ReactNode } from 'react'

type DrawerLayoutProps = PropsWithChildren<{
  sidebar: ReactNode
  drawerId?: string
}>

export function DrawerLayout({
  children,
  sidebar,
  drawerId = 'app-drawer'
}: DrawerLayoutProps) {
  return (
    <div className="drawer lg:drawer-open">
      <input id={drawerId} type="checkbox" className="drawer-toggle" />

      <div className="drawer-content">
        <div className="p-4 lg:hidden">
          <label htmlFor={drawerId} className="btn btn-outline btn-sm">
            Filtros
          </label>
        </div>
        {children}
      </div>

      <div className="drawer-side [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
        <label
          htmlFor={drawerId}
          className="drawer-overlay"
          aria-label="close sidebar"
        />
        <div className="menu bg-base-200 min-h-full w-[24rem] p-4">
          {sidebar}
        </div>
      </div>
    </div>
  )
}
