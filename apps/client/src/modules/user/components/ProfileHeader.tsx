export function ProfileHeader({
  name,
  role,
  profilePic
}: {
  name: string
  role: string
  profilePic: string | null
}) {
  return (
    <div className="flex items-center gap-4">
      <img
        src={profilePic ?? 'https://placehold.co/150x150'}
        alt=""
        className="rounded-full h-16 w-16 object-cover"
      />
      <h1 className="text-2xl font-semibold">{name}</h1>
      <div className="badge badge-neutral">{role}</div>
    </div>
  )
}
