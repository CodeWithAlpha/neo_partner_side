import { Box, keyframes, Stack, styled, Typography } from "@mui/material";
import { homePageFontStyles } from "../../pages/Home";
import { motion } from "framer-motion";
import { rowVariants } from "../../utils/cssStyles";
import image from "../../assets/icons/homepage/neo.svg";

function HeroSection() {
  const moveUpDown1 = keyframes`
  from {
    top: 10%;
  }
  to {
    top: 12%;
  }
`;
  const moveUpDown2 = keyframes`
  from {
    top: 30%;
  }
  to {
    top: 35%;
  }
`;
  const moveUpDown3 = keyframes`
  from {
    bottom: 20%;
  }
  to {
    bottom: 25%;
  }
`;

  return (
    <Box my={{ xs: 3, md: 10 }} sx={{ position: "relative" }}>
      <Box
        component="img"
        src={image} // Your imported SVG
        alt="Animated SVG"
        sx={{
          position: "absolute",
          left: "5%",
          top: "10%",
          transform: "translateX(-50%)",
          width: "50px",
          height: "50px",
          animation: `${moveUpDown1} 1.6s infinite alternate`,
          opacity: 0.4,
          zIndex: -1,
        }}
      />
      <Box
        component="img"
        src={image} // Your imported SVG
        alt="Animated SVG"
        sx={{
          position: "absolute",
          right: "5%",
          top: "30%",
          transform: "translateX(-50%)",
          width: "50px",
          height: "50px",
          animation: `${moveUpDown2} 2s infinite alternate`,
          opacity: 0.4,
          zIndex: -1,
        }}
      />
      <Box
        component="img"
        src={image} // Your imported SVG
        alt="Animated SVG"
        sx={{
          position: "absolute",
          right: "55%",
          bottom: "20%",
          transform: "translateX(-50%)",
          width: "50px",
          height: "50px",
          animation: `${moveUpDown3} 3s infinite alternate`,
          opacity: 0.4,
          zIndex: -1,
        }}
      />
      <Typography
        fontSize={homePageFontStyles.level1}
        textAlign={"center"}
        component={motion.p}
        variants={rowVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        The Unified API Hub for
      </Typography>
      <Typography
        color="primary.main"
        fontSize={homePageFontStyles.level1}
        textAlign={"center"}
        mb={0}
        component={motion.p}
        variants={rowVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        {" "}
        Fintech & Beyond
      </Typography>
      <Typography
        fontSize={homePageFontStyles.level3}
        textAlign={"center"}
        my={3}
        component={motion.p}
        variants={rowVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        NeoAPIBox – Powering Innovation with Seamless APIs
      </Typography>
      <Typography
        maxWidth="md"
        fontSize={homePageFontStyles.level4}
        margin={"auto"}
        textAlign={"center"}
        component={motion.p}
        variants={rowVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        Empower your business with a robust suite of fintech and non-fintech
        APIs – from KYC verification to payments processing. NeoAPIBox by
        Neosprint is your one-stop platform for secure, scalable, and efficient
        API integration.
      </Typography>
      <Stack flexDirection={"row"} justifyContent={"space-evenly"} my={10}>
        {[
          "Get Started in Minutes",
          "Banking-Grade Security",
          "AI-Powered Support 24/7",
        ].map((item, index) => {
          return (
            <Stack
              alignItems={"center"}
              gap={2}
              key={index}
              variants={rowVariants}
              component={motion.div}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
            >
              <Stack
                sx={{
                  border: "2px solid green",
                  borderRadius: 4,
                  height: "100px",
                  width: "100px",
                }}
              />
              <Typography
                fontSize={homePageFontStyles.level5}
                textAlign={"center"}
              >
                {item}{" "}
              </Typography>
            </Stack>
          );
        })}
      </Stack>
    </Box>
  );
}

export default HeroSection;
