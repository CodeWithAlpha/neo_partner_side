import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../sections/Home/Header";
import HeroSection from "../sections/Home/HeroSection";
import AboutSection from "../sections/Home/AboutSection";
import ContactForm from "../sections/Home/ContactForm";
import Footer from "../sections/Home/Footer";
import fetcher from "../api/fetcher";
import { END_POINTS } from "../api/EndPoints";
import { AuthUserType } from "../auth/types";

export const homePageFontStyles = {
  level1: {
    fontSize: "clamp(48px, 10vw, 96px)",
  },
  level2: {
    fontSize: "clamp(36px, 7.5vw, 72px)",
  },
  level3: {
    fontSize: "clamp(24px, 5vw, 36px)",
  },
  level4: {
    fontSize: "clamp(18px, 3vw, 24px)",
  },
  level5: {
    fontSize: "clamp(16px, 2.5vw, 18px)",
  },
};

function Home() {
  return (
    <>
      <Container sx={{ bgcolor: "background.default" }} maxWidth="xl">
        <Header />
        <HeroSection />
        <AboutSection />

        <Typography
          fontSize={homePageFontStyles.level3}
          textAlign={"center"}
          maxWidth={"md"}
          margin={"auto"}
          py={3}
        >
          NeoAPIBox transformed our integration process. We went live 3x faster!
        </Typography>
        <Typography fontSize={homePageFontStyles.level4} textAlign={"center"}>
          Rahul S
        </Typography>
        <Typography
          fontSize={homePageFontStyles.level5}
          color="text.secondary"
          textAlign={"center"}
        >
          Fintech Startup Developer
        </Typography>

        <ContactForm />
      </Container>
      <Box sx={{ bgcolor: "grey.200", p: { md: 2 } }}>
        <Container maxWidth="xl">
          <Footer />
        </Container>
      </Box>
    </>
  );
}

export default Home;
