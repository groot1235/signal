import Navbar from "./components/navbar"
import Hero from "./components/hero"
import Cardie from "./components/cardie"

export default function Home() {
  return (
    <div className="max-w-screen ">
      <div>
        <Navbar />
        <Hero />
        <Cardie />
      </div>
    </div>
  )
}
