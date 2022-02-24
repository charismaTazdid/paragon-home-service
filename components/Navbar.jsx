import Link from 'next/link';
import { Menu, MenuButton, MenuList, MenuItem, IconButton, Flex, Box, Spacer } from '@chakra-ui/react';
import { FcMenu, FcHome, FcAbout } from 'react-icons/fc';
import { BsSearch } from 'react-icons/bs';
import { FiKey } from 'react-icons/fi';
import Image from 'next/image';
import logo from '../asset/image/logo.png'


const Navbar = () => (
    <Flex p='2' marginTop='10px' borderBottom='1px' borderRadius='10px'  borderColor='gray.200'  >
        <Box fontSize='3xl' color='blue.600' fontWeight='bold'  >
            <Flex alignItems='center' cursor='pointer'>
                {/* <Image alt='logo' src={logo} height='78px' width='100px' /> */}
                <Link href='/' passHref  >
                    <Image alt='logo' src={logo} height='70px' width='120px' />
                </Link>
                <Link href='/'  passHref > Paragon Home Service</Link>
            </Flex>

        </Box>
        <Spacer />

        <Box>
            <Menu >
                <MenuButton as={IconButton} icon={<FcMenu />} variant='fill' color='red.400' marginTop='13px'> </MenuButton>
                <MenuList>
                    <Link href='/' passHref>
                        <MenuItem icon={<FcHome />}> Home </MenuItem>  
                    </Link>

                    <Link href='/search' passHref>
                        <MenuItem icon={<BsSearch />}> Search </MenuItem>
                    </Link>

                    <Link href='/search?purpose=for-sale' passHref>
                        <MenuItem icon={<FcAbout />}> Buy Property </MenuItem>
                    </Link>

                    <Link href='/search?purpose=for-rent' passHref>
                        <MenuItem icon={<FiKey />}> Rent Property </MenuItem>
                    </Link>
                </MenuList>

            </Menu>
        </Box>

    </Flex>
);

export default Navbar;