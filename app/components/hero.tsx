import React from 'react'

type Props = {}

const hero = (props: Props) => {
    return (
        <div>
            <div className='flex flex-col items-center justify-center my-16'>
                <h1 className='text-6xl font-'>Get Your Resume Build <span className=' block'>In One Click With <span className='text-blue-500'>S</span>ignal</span></h1>
                <p className='text-lg text-muted-foreground mt-4 w-1/2 text-center'>Turn your LinkedIn profile into a polished, professional resume—ready to impress recruiters in seconds.</p>
            </div>
        </div>
    )
}

export default hero