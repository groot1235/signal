import { ModeToggle } from '@/components/modeToggle'
import { Button } from '@/components/ui/button'
import React from 'react'

type Props = {}

const navbar = (props: Props) => {
    return (
        <div className='border-b'>
            <div className='flex items-center justify-between mx-10 py-4'>
                <div className="w-1/4">
                    <h1 className='text-2xl font-bold'><span className='text-blue-500'>S</span>ignal</h1>
                </div>
                <div className='flex gap-3'>
                    <ModeToggle />
                    <Button variant="outline" className='rounded-full px-4'>Get Started</Button>
                    <Button className='rounded-full px-4'>Login</Button>
                </div>
            </div>
        </div>
    )
}

export default navbar