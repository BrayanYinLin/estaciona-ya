import { DangerZone } from '../components/DangerZone'
import { PhotoUploader } from '../components/PhotoUploader'
import { ProfileForm } from '../components/ProfileForm'
import { ProfileHeader } from '../components/ProfileHeader'

export function UserProfile() {
  return (
    <div className="flex flex-col gap-8 container py-8 px-4 items-center">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <ProfileHeader
          name="Juan Pérez"
          role="Arrendatario / Arrendador"
          profilePic="https://placehold.co/150x150"
        />
        {/* <SettingsButton /> */}
      </div>

      <div className="grid gap-10 xl:grid-cols-[minmax(0,620px)_minmax(0,0.5fr)] lg:grid-cols-[minmax(0,620px)_minmax(0,1fr)] container py-8 px-4 justify-center">
        <ProfileForm />

        <div className="flex flex-col gap-8">
          <PhotoUploader />
          <DangerZone />
        </div>
      </div>
    </div>
  )
}
