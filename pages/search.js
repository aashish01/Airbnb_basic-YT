import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useRouter } from 'next/router'
import { format } from 'date-fns'
import InfoCard from '../components/InfoCard'


function Search({ searchResults }) {
    const router = useRouter()
    const { location, startDate, endDate, noOfGuests } = router.query
    const formattedStartDate = format(new Date(startDate), "dd MMMM yy")
    const formattedEtartDate = format(new Date(endDate), "dd MMMM yy")

    const range = `${formattedStartDate} -${formattedEtartDate}`
    return (
        <div>
            <Header placeholder={`${location} | ${range} | ${noOfGuests} Guests`} />
            <main className='flex'>
                <section className='flex-grow pt-10 px-6'>
                    <p className='text-xs'>300+ -{range}- {noOfGuests} guests</p>
                    <h1 className='text-3xl font-semibold mt-2 mb-6'>Stays in {location}</h1>

                    <div className='hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap'>
                        <p className='button'>Cancellation Felexibality</p>
                        <p className='button'>Type of Place</p>
                        <p className='button'>Price</p>
                        <p className='button'>Rooms & Beds</p>
                    </div>

                    <div className='flex flex-col'>
                        {searchResults.map(({ img, location, title, description, star, price, total }) => (
                            <InfoCard
                                key={img}
                                img={img}
                                location={location}
                                title={title}
                                description={description}
                                star={star}
                                price={price}
                                total={total}
                            />
                        ))}
                    </div>

                </section>

            </main>
            <Footer />
        </div>
    )
}

export default Search


export async function getServerSideProps() {
    const search_url = 'https://www.jsonkeeper.com/b/5NPS'
    const searchResults = await fetch(search_url).then((res) => res.json())

    return {
        props: {
            searchResults
        }
    }
}
