import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import  { useState } from 'react';
import {BsFilter} from 'react-icons/bs';
import Property from '../components/Property';
import SearchFilters from '../components/SearchFilters';
import noResultFound from '../asset/image/noResultFound.png';
import { baseUrl, fetchApi } from '../utilites/fetchApi';




const Search = ({properties}) => {

    const [searchFilters, setSearchFilters] = useState(false);
    const router = useRouter()




    return (
        <Box>
            <Flex
                cursor='pointer'
                bg='gray.100'
                borderBottom='1px'
                borderColor='gray.100'
                p='5'
                fontWeight='bold'
                fontSize='lg'
                justifyContent='center'
                alignItems='center'
                marginTop='10px'

                onClick={() => setSearchFilters((prevFilters) => !prevFilters)}

            >
                <Text>
                    Search Your Property by Filter
                </Text>
                <Icon paddingLeft='1' w='7' as={BsFilter} /> 

            </Flex>


            {
                searchFilters && <SearchFilters/>
            }

            <Text fontSize='3xl' p='5' fontWeight='bold' >
                Properties {router.query.purpose}
            </Text>

            <Flex flexWrap='wrap'>
                {
                    properties.map( (prope) => <Property property={prope} key={prope.id}> </Property> )
                }
            </Flex>
            {
                properties.length === 0 && (
                    <Flex justifyContent='center' alignItems='center' flexDirection='column' marginTop='5' marginBottom='5'>
                        <Image alt='no result' src={noResultFound}/>
                        <Text fontSize='2xl' marginTop='2px'> No Result Found</Text>
                    </Flex>
                )
            }

        </Box>
    );
};




export default Search;


export async function getServerSideProps({ query }) {
    const purpose = query.purpose || 'for-rent';
    const rentFrequency = query.rentFrequency || 'yearly';
    const minPrice = query.minPrice || '0';
    const maxPrice = query.maxPrice || '1000000';
    const roomsMin = query.roomsMin || '0';
    const bathsMin = query.bathsMin || '0';
    const sort = query.sort || 'price-desc';
    const areaMax = query.areaMax || '35000';
    const locationExternalIDs = query.locationExternalIDs || '5002';
    const categoryExternalID = query.categoryExternalID || '4';
  
    const data = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`);
  
    return {
      props: {
        properties: data?.hits,
      },
    };
  }
  