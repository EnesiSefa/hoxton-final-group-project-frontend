import { Box, Container, Grid } from "@mui/material";
import React from "react";

export function Footer() {
  return (
    <footer className="footer">
      <Box
        px={{ xs: 3, sm: 5 }}
        py={{ xs: 3, sm: 5 }}
        bgcolor="#1f1f1f"
        color="#a1958a"
      >
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Online Courses</Box>
              <Box>
                An online course is a program of learning that's organized
                according to a syllabus (usually in units) and that takes place
                in a virtual space. Online courses can be informal and focused
                on one skill or as formal as leading to a certification or
                degree.
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Address</Box>

              <Box>
                Sp. z o.o. Mihal Grameno 276 25-116 Tirane, Albania NIP:
                959-198-28-66 Regon 366382357
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Contact</Box>
              office@OnlineCourses.com +355 684 260 564
              <Box></Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </footer>
  );
}
