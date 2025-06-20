import { Box, Grid, Grid2, Stack, Typography } from "@mui/material";
import { homePageFontStyles } from "../../pages/Home";
import { Ai, Intigration, Secure, Unified } from "../../assets/icons/homepage";
import { useState } from "react";
import { rowVariants } from "../../utils/cssStyles";
import { motion } from "framer-motion";

function AboutSection() {
  const [active, setIsActive] = useState("");

  const data = [
    {
      icon: "unified",
      title: "Unified API Access",
      desc: "One platform, endless possibilities.",
    },
    {
      icon: "Integration",
      title: "Fast Integration",
      desc: "Developer-friendly documentation and tools.",
    },
    {
      icon: "Secure",
      title: "Secure & Compliant",
      desc: "Adheres to industry standards like PCI-DSS and DPDP Act.",
    },
    {
      icon: "Ai",
      title: "AI Assistance",
      desc: "Get real-time, intelligent support for your integration journey.",
    },
  ];
  return (
    <>
      <Typography
        fontSize={homePageFontStyles.level2}
        textAlign={"center"}
        variants={rowVariants}
        component={motion.p}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        About NeoAPIBox
      </Typography>
      <Typography
        fontSize={homePageFontStyles.level3}
        textAlign={"center"}
        maxWidth="md"
        margin={"auto"}
        my={5}
        variants={rowVariants}
        component={motion.p}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        NeoAPIBox is Neosprint’s flagship product, designed to simplify and
        streamline how businesses access and integrate APIs across industries.
      </Typography>
      <Typography
        fontSize={homePageFontStyles.level4}
        textAlign={"center"}
        maxWidth="sm"
        margin={"auto"}
        variants={rowVariants}
        component={motion.p}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        Our platform aggregates multiple APIs into a single, user-friendly
        interface, saving you time, reducing development overhead, and ensuring
        reliability.
      </Typography>

      <Grid
        container
        maxWidth={"lg"}
        my={7}
        mx={"auto"}
        justifyContent={"center"}
      >
        {data.map((item, index) => (
          <Grid
            key={index}
            variants={rowVariants}
            component={motion.div}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            item
            md={3}
            display={"flex"}
            flexDirection={"column"}
          >
            <Stack
              alignItems={"center"}
              justifyContent={"center"}
              gap={2}
              width={300}
              height={"100%"}
              p={[1, 3]}
              onMouseOver={() => setIsActive(item.icon)}
              onMouseOut={() => setIsActive("")}
              sx={{
                borderRadius: 2,
                transition: "300ms ease all",
                "&:hover": {
                  color: "#fff",
                  bgcolor: (theme) => theme.palette.primary.main,
                  transition: "300ms ease all",
                },
              }}
            >
              {item.icon == "unified" ? (
                <Unified isHover={active == "unified"} />
              ) : item.icon == "Integration" ? (
                <Intigration isHover={active == "Integration"} />
              ) : item.icon == "Secure" ? (
                <Secure isHover={active == "Secure"} />
              ) : (
                <Ai isHover={active == "Ai"} />
              )}
              <Typography fontSize={homePageFontStyles.level4}>
                {item.title}
              </Typography>
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: homePageFontStyles.level5,
                }}
              >
                {item.desc}
              </Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default AboutSection;
