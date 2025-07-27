import { Outlet } from 'react-router-dom'

const SingleTagLyout = () => {
    return (
        <section className='pt-0'>
            <div className="mx-auto">
                <Outlet />
            </div>
        </section>
    )
}

export default SingleTagLyout
