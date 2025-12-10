import { RequestGarageCard } from '@lessor/components/RequestGarageCard'
import { useRequestStore } from '@lessor/contexts/request.store'
import { UserNavBar } from '@shared/components/UserNavBar'
import { useSocket } from '@shared/hooks/useSocket'
import { useUserStore } from '@user/context/user.context'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

export function RequestsLessor() {
  const { user, loading, error, recoverUser } = useUserStore()
  const { requests, getRequests } = useRequestStore()
  const navigate = useNavigate()
  const socket = useSocket()

  console.log(requests)

  useEffect(() => {
    recoverUser()
    getRequests()

    socket?.on('notify:user', getRequests)

    return () => {
      socket.off('notify:user', getRequests)
    }
  }, [])

  useEffect(() => {
    if (loading == false && error) {
      navigate('/sign-in')
    }
  }, [loading, error])

  if (user === null) {
    return <main>Ha ocurrido algo</main>
  }

  return (
    <main>
      <UserNavBar
        profilePic={user?.photo ?? null}
        role={user?.role}
        initial={user.name![0]}
      />
      <section className="flex flex-col gap-5 mx-4 my-6 lg:mx-6">
        {requests.map(
          ({ id, user, startDate, endDate, status, garage, cost }) => (
            <RequestGarageCard
              id={id}
              name={user.name}
              rentalType={garage.rentMode.mode_name}
              startDate={new Date(startDate)}
              endDate={new Date(endDate)}
              totalPrice={cost}
              status={status}
              description={garage.description}
              image={garage.photos.length > 0 ? garage.photos[0].url : ''}
              photo={user.photo ?? ''}
              key={id}
            />
          )
        )}
      </section>
    </main>
  )
}
