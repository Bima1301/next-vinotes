import Leftside from './components/Leftside'
import Rightside from './components/Rightside'

export default function Home() {
  return (
    <section className='min-w-full min-h-screen flex flex-row justify-between'>
      <Leftside />
      <Rightside />
    </section>
  )
}
