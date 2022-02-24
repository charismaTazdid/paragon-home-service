import { useState } from "react";
import { Flex, Select, Box,  } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { filterData, getFilterValues } from "../utilites/FilterData";




const SearchFilters = () => {
    const [filters, setFilters] = useState(filterData);
    const router = useRouter();

    const searchProperties = (filterValue) => {
        const path = router.pathname;
        const {query} = router;
        const values = getFilterValues(filterValue);

        values.forEach((item) => {
            if(item.value && filterValue?.[item.name]){
                query[item.name]  = item.value;
            }
        } );

        router.push({pathname: path, query})
    };


    return (
        <Flex bg='gray.100' p='4' justifyContent='center' flexWrap='wrap' >

            {
                filters.map((filter) => (
                    <Box key={filter.queryName}>
                        <Select
                            onChange={(e) => searchProperties({ [filter.queryName]: e.target.value })}
                            placeholder={filter.placeholder}
                            w='fit-content'
                            padding='2'
                        >
                            {
                                filter?.items?.map((item) => (
                                    <option value={item.value} key={item.value}> {item.name}  </option>
                                ))
                            }

                        </Select>
                    </Box>
                ))
            }
        </Flex>
    );
};

export default SearchFilters;