import type { HTMLAttributes, HTMLElementType } from 'react'
import { Link } from 'react-router'

export type AvatarProps = {
  photo: string | null
  className: HTMLAttributes<HTMLElementType>['className']
}

export function LinkAvatar({ photo, className }: AvatarProps) {
  const placeholder = 'https://placehold.co/150x150'

  return (
    <Link to={'/profile'} className="avatar">
      <div
        className={`${className} hover:ring-primary ring-offset-base-100 hover:ring-2 ring-offset-2 transition-all duration-200 rounded-full`}
      >
        <img src={photo ?? placeholder} />
      </div>
    </Link>
  )
}
