import React, { ReactElement } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import {
  Grid,
  GridItem,
  Box,
  Skeleton,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import useThemeColor from "common/hooks/useThemeColor";
import { fetcher } from "common/utils";
import Head from "next/head";

interface Props {}

export default function ProjectPage(props: Props) {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(`/api/v1/project/${id}`, fetcher);
  const { boxBackground } = useThemeColor();

  if (!data || error) {
    return (
      <>
        <Head>
          <title>Loading...</title>
        </Head>

        <Skeleton height="100px" />
      </>
    );
  }

  const { project } = data;

  console.log("project", project);

  return (
    <Box>
      <p>{id}</p>

      <Grid gridTemplateColumns="repeat(5, minmax(300px, 1fr))" gridGap="2">
        <GridItem
          my="2"
          rounded="md"
          shadow="2xl"
          height="fit-content"
          colSpan={3}
        >
          {/* Box of charity project information */}
          <Box
            height="min-content"
            padding="2"
            backgroundColor={boxBackground}
            rounded="md"
            shadow="md"
          >
            <ProjectInfo project={project} />

            {/* Charity option */}
          </Box>
        </GridItem>

        <GridItem
          my="2"
          rounded="md"
          shadow="2xl"
          height="fit-content"
        ></GridItem>
      </Grid>
    </Box>
  );
}

function ProjectInfo({ project }): ReactElement | null {
  // List item of Project name, description, goal, etc.
  return (
    <>
      <Tabs>
        <TabList>
          <Tab>Thông tin dự án</Tab>
          <Tab>Sao kê ngân hàng</Tab>
          <Tab>Chủ dự án</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
