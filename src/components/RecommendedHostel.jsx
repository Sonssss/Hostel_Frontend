import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { recommendedHostel } from "../features/UserDetailSlice";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

const RecommendedHostel = () => {
 
  return (
    <>
      <main className="container mt-10">
        <div className=" place-items-center grid md:grid-cols-2 lg:grid-cols-3 mt-10 ">
          {Array.isArray(searchItem) && searchItem.length > 0 ? (
            searchItem.map((hostel, index) => {
              return (
                <Card maxW="sm" key={index} className="my-10">
                  <CardBody>
                    <Image
                      src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                      alt="Green double couch with wooden legs"
                      borderRadius="lg"
                    />
                    <Stack mt="6" spacing="3">
                      <Heading size="md" className="capitalize">
                        {hostel.hostelName}
                      </Heading>
                      <Text className="capitalize text-lg ">
                        {hostel.hostelDescription}
                      </Text>
                      <div className="flex gap-16">
                        <Text color="blue.600" fontSize="2xl">
                          {hostel.hostelLocation}
                        </Text>

                        <Text color="blue.600" fontSize="2xl">
                          Rs.{hostel.hostelPrice}
                        </Text>
                      </div>
                    </Stack>
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <ButtonGroup spacing="2">
                      <Button
                        variant="solid"
                        colorScheme="blue"
                        onClick={() => {
                          handleRegister(hostel._id);
                        }}
                      >
                        Book Now
                      </Button>
                      <Button
                        variant="ghost"
                        colorScheme="blue"
                        onClick={() => {
                          handleDetail(hostel._id);
                        }}
                      >
                        View Details
                      </Button>
                    </ButtonGroup>
                  </CardFooter>
                </Card>
              );
            })
          ) : (
            <h1>No Hostel Found</h1>
          )}
        </div>
      </main>
    </>
  );
};

export default RecommendedHostel;
