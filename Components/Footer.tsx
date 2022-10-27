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
                  A1A Car Wash – a company present on automotive branch since year 2001. From the the company has been focused on services sector, especially car detailing, car wrapping and construction of custom cars. We’ve gained a lot of experience over past 18 years. A1A Car Wash brand became recognizable in automotive community.
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box borderBottom={1}>Address</Box>
              
                <Box>
             Sp. z o.o.
Mihal Grameno 276
25-116 Tirane, Albania
NIP: 959-198-28-66
Regon 366382357
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box borderBottom={1}>Contact</Box>
                office@OnlineCourses.com
+355 684 260 564
                <Box>
                  
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </footer>
    );
  }
  