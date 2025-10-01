export function ProfileHeader({
  name,
  role,
  profilePic
}: {
  name: string
  role: string
  profilePic: string
}) {
  return (
    <div className="flex items-center gap-4">
      <img
        src={profilePic}
        alt=""
        className="rounded-full h-16 w-16 object-cover"
      />
      <h1 className="text-2xl font-semibold">{name}</h1>
      <span className="text-sm text-base-content/60">{role}</span>
    </div>
  )
}
