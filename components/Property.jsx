import Link from "next/link";
import Image from "next/image";
import { Box, Flex, Text, Avatar } from "@chakra-ui/react";
import { FaBath, FaBed } from 'react-icons/fa'
import { BsGridFill } from 'react-icons/bs'
import { GoVerified } from 'react-icons/go'
import millify from "millify";
import defaultImage from '../asset/image/defualtImage.jpeg'
const Property = ({ property: { coverPhoto, price, rentFrequency, rooms, title, baths, area, agency, isVerified, externalID } }) => (
    <Link href={`/property/${externalID}`} passHref>
        <Flex flexWrap='wrap' w='400' p='5' paddingTop='0' justifyContent='flex-start' cursor='pointer' >
            <Box>
                <Image src={coverPhoto ? coverPhoto.url : defaultImage} alt='House' width={385} height={258} />


                <Box w='full'>
                    <Flex paddingTop='1' alignItems='center' justifyContent='space-between'>
                        <Flex alignItems='center'>
                            <Box paddingRight='2' color='green.600' >
                                {
                                    isVerified && <GoVerified />
                                }
                            </Box>
                            <Text fontWeight='bold' fontSize='lg' > AED {millify(price)} {rentFrequency && `/${rentFrequency}`}
                            </Text>
                        </Flex>
                        <Box>
                            <Avatar size='sm' src={agency?.logo?.url} />
                        </Box>
                    </Flex>
                    <Flex alignItems='center' p='1' justifyContent='space-between' w='250px' color='blue.600'>
                            {rooms} <FaBed/> | {baths} <FaBath/> | {millify(area)} sqft <BsGridFill/>
                    </Flex>
                    <Text fontSize='lg'>
                        {
                            title.length > 30 ? `${title.substring(0, 30)}...` : title 
                        }
                    </Text>
                </Box>

            </Box>
        </Flex>
    </Link>
);

export default Property;