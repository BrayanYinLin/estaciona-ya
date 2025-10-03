import { DangerZone } from '../components/DangerZone'
import { PhotoUploader } from '../components/PhotoUploader'
import { ProfileForm } from '../components/ProfileForm'
import { ProfileHeader } from '../components/ProfileHeader'

export function UserProfile() {
  return (
    <div className="flex flex-col gap-8 container py-8 px-4 items-center mx-auto">
      <div className="flex flex-wrap px-4 justify-start w-full lg:w-[1000px]">
        <ProfileHeader
          name="Juan Pérez"
          role="Arrendatario / Arrendador"
          profilePic="https://placehold.co/150x150"
        />
        {/* <SettingsButton /> */}
      </div>

      <div className="py-8 px-4 justify-start w-full lg:grid lg:grid-cols-2 gap-16 lg:w-[1000px]">
        <ProfileForm />

        <div className="flex flex-col gap-8 mt-5 lg:mt-0">
          <PhotoUploader />
          <DangerZone />
        </div>
      </div>
    </div>
  )
}
