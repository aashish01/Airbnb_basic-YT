import React, { useState } from 'react'
import Image from 'next/image'
import { MagnifyingGlassIcon, GlobeAltIcon, UserCircleIcon, UserIcon, Bars3Icon } from '@heroicons/react/24/solid'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useRouter } from 'next/router';



function Header({ placeholder }) {
    const [searchInput, SetSearchInput] = useState('');
    const [startDate, SetStartDate] = useState(new Date())
    const [endDate, SetEndDate] = useState(new Date())
    const [noOfGuests, SetNoOfGuests] = useState(1)
    const router = useRouter()


    const selectionRage = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection'
    }

    const handleSelect = (ranges) => {
        SetStartDate(ranges.selection.startDate)
        SetEndDate(ranges.selection.endDate)
    }

    const resetInput = () => {
        SetSearchInput('')
    }

    const search = () => {
        router.push({
            pathname: '/search',
            query: {
                location: searchInput,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                noOfGuests,
            }
        })
    }

    return (
        <header className='sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10'>

            {/* LEFT LOGO */}
            <div onClick={() => router.push("/")} className='relative flex items-center h-10 cursor-pointer my-auto '>
                <Image
                    src='https://links.papareact.com/qd3'
                    layout='fill'
                    objectFit='contain'
                    objectPosition='left'
                />
            </div>

            {/* MIDDLE SEARCH*/}
            <div
                className='flex items-center md:border-2 rounded-full py-2 md:shadow-sm'>
                <input
                    value={searchInput}
                    onChange={(e) => SetSearchInput(e.target.value)}
                    className='flex-grow pl-5 bg-transparent outline-none text-sm text-grey-600placeholder-gray-400'
                    type="text"
                    placeholder={placeholder || 'Start your search'} />
                <MagnifyingGlassIcon
                    onClick={search}
                    className='hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2' />

            </div>

            {/* RIGHT BECOME A HOST*/}
            <div className='flex items-center space-x-4 justify-end'>
                <p className='hidden md:inline cursor-pointer'>Become a Host</p>
                <GlobeAltIcon className='h-6' />
                <div className='flex items-center space-x-2 border-2 p-2 rounded-full'>
                    <Bars3Icon className='h-6' />
                    <UserCircleIcon className='h-6' />
                </div>
            </div>

            {searchInput && (
                <div className='flex flex-col col-span-3 mx-auto mt-1'>
                    <DateRangePicker
                        ranges={[selectionRage]}
                        minDate={new Date()}
                        rangeColors={['#FD5B61']}
                        onChange={handleSelect}
                    />
                    <div className='flex items-center border-b mb-4'>
                        <h2 className='text-2xl flex-grow font-semibold'>Number of Guests</h2>
                        <UserIcon className='h-5' />
                        <input
                            value={noOfGuests}
                            onChange={e => SetNoOfGuests(e.target.value)}
                            min={1}
                            type="number"
                            className='w-12 pl-2 text-lg outline-none text-red-400'
                        />
                    </div>
                    <div className='flex '>
                        <button onClick={resetInput} className='flex-grow text-gray-500 font-semibold'>Cancle</button>
                        <button onClick={search} className='flex-grow text-green-500 font-semibold'>Search</button>
                    </div>
                </div>


            )
            }

        </header>
    )
}

export default Header