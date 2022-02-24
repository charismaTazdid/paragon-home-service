import Link from 'next/link';
import Image from 'next/image';
import { Flex, Box, Text, Button } from '@chakra-ui/react';
import { baseUrl, fetchApi } from '../utilites/fetchApi';
import Property from '../components/Property';
import rentHome from '../asset/image/rentHome.jpeg';
import buyHome from '../asset/image/buyHome.jpeg';


 export const Banner = ({ imageUrl, purpose, title1, title2, description1, description2, linkName, buttonText }) => (
  <Flex flexWrap='wrap' justifyContent="center" alignItems='center' m='10'>
    <Image src={imageUrl} width={500} height={300} alt="bannerImage"></Image>

    <Box p='5'>
      <Text color="blue.600" fontSize="sm" fontWeight='medium'  > {purpose} </Text>
      <Text fontSize="3xl" fontWeight='bold' > {title1} <br /> {title2} </Text>
      <Text color="gray.700" fontSize="lg" paddingTop="3" paddingBottom="3"> {description1} <br /> {description2} </Text>

      <Button fontSize='xl'>
        <Link href={linkName} passHref >
         {buttonText} 
           </Link>
       
      </Button>

    </Box>
  </Flex>
);


export default function Home({ propertiesForSale, propertiesForRent }) {

  return (
    <Box>
      <Banner
        purpose="RENT A HOME"
        title1="Rental Homes for"
        title2="Everyone"
        description1="Explore Apartments, Villas,"
        description2=" Homes with surprising price..."
        buttonText="Explore Renting..."
        linkName="/search?purpose=for-rent"
        imageUrl= {rentHome}
      >

      </Banner>

      <Flex flexWrap='wrap'>
        {
          propertiesForRent.map((property) => <Property property={property} key={property.id} />)
        }
      </Flex>




      <Banner
        purpose="BUY A HOME"
        title1="Find, Buy & Won your"
        title2="Dream Home"
        description1="Explore Apartments, Villas,"
        description2=" Homes with surprising price..."
        buttonText="Explore Buying..."
        linkName="/search?purpose=for-sale"
        imageUrl={buyHome}
      >

      </Banner>
      <Flex flexWrap='wrap'>
      {
        propertiesForSale.map((property) => <Property property={property} key={property.id} />)
      }
      </Flex>
    </Box>
  )
}





export async function getStaticProps() {
  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=9`)
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=9`)

  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    }
  }
}
