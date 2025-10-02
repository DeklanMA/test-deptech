import { redirect } from 'next/navigation'

export const metadata = {
    title: 'test deptech',
}

const Home = () => {
    return redirect('/login')
}

export default Home
