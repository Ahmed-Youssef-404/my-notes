import { Outlet } from 'react-router-dom'

const SingleNoteLayout = () => {
    return (
        <section className='pt-0'>
            <div className="mx-auto">
                {/* <div className="mt-16 text-red-600">{"single note: " + noteId}</div> */}
                <Outlet />
            </div>
        </section>
    )
}

export default SingleNoteLayout
