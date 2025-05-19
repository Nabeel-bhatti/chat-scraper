
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Box, Button, Card, CardContent, Paper, styled, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';


export default function pricing() {

  const Sbutton = styled(Button)({
    color: "#09090b",
    fontSize: '16px',
    fontWeight: 500,
    borderRadius: '12px',
    marginTop: "3rem",
    width: "100%",
    border: "1px solid #e4e4e7",
    p: '24px 16px',
    '&:hover': { color: '#2463eb' }

  })

  const Sbox = styled(Box)({
    display: 'flex',
    textAlign: "center",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    backgroundColor: '#dcfce7',
    width: 25,
    height: 25,
  })
  const Sbox2 = styled(Box)({
    display: 'flex',
    textAlign: "center",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    backgroundColor: '#fee2e2',
    width: 25,
    height: 25,
  })
  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", justifyContent: "center" }}>

        <Typography sx={{ fontSize: "3rem", fontWeight: 700, mb: "24px", lineHeight: 1, color: "#2463eb" }}>
          Choose the Right Plan for Your Business
        </Typography>
        <Typography sx={{ fontSize: "1.25rem", mb: "64px", color: "#4b5563" }}>
          Streamline your client communication with ClientNexus. Select the plan that best fits <br /> your team's needs.
        </Typography>
      </Box>
      <Grid container size={12} spacing={"2rem"}>
        <Grid size={{ xs: 12, md: 4, lg: 4 }}>
          <Card variant='outlined' sx={{
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            '&:hover': {
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
              transform: "translateY(-5px)",
            }, border: "1px solid #e5e7eb", borderRadius: "1rem", p: "24px"
          }}>
            <CardContent sx={{ p: "0px" }}>
              <Typography sx={{ fontSize: "1.5rem", fontWeight: 700, lineHeight: "2rem" }}>
                Starter
              </Typography>
              <Typography sx={{ mt: "6px", lineHeight: "2.25rem" }}>
                <span style={{ fontSize: "2.25rem", fontWeight: 700 }}>$29</span><span style={{ color: "#6b7280", ml: "8px", fontSize: "16px" }}>/month</span>
              </Typography>
              <Typography sx={{ mt: "6px", lineHeight: "1.25rem", color: "#4b5563", fontSize: "14px" }}>
                Perfect for freelancers and small teams
              </Typography>
              <Typography sx={{ mt: "24px", lineHeight: 1, display: "flex", alignItems: 'center', gap: "12px" }}>
                <Sbox>
                  <CheckOutlined style={{ color: "#16a34a", fontSize: 12 }} />
                </Sbox>
                <span style={{ color: "#374151", ml: "12px", fontSize: "16px" }}>Up to 5 team members</span>
              </Typography>
              <Typography sx={{ mt: "16px", lineHeight: 1, display: "flex", alignItems: 'center', gap: "12px" }}>
                <Sbox>
                  <CheckOutlined style={{ color: "#16a34a", fontSize: 12 }} />
                </Sbox>
                <span style={{ color: "#374151", ml: "12px", fontSize: "16px" }}>Basic client management</span>
              </Typography>
              <Typography sx={{ mt: "16px", lineHeight: 1, display: "flex", alignItems: 'center', gap: "12px" }}>
                <Sbox>
                  <CheckOutlined style={{ color: "#16a34a", fontSize: 12 }} />
                </Sbox>
                <span style={{ color: "#374151", ml: "12px", fontSize: "16px" }}>5 platforms integration</span>
              </Typography>
              <Typography sx={{ mt: "16px", lineHeight: 1, display: "flex", alignItems: 'center', gap: "12px" }}>
                <Sbox2>
                  <CloseOutlined style={{ color: "#dc2626", fontSize: 12 }} />
                </Sbox2>
                <span style={{ color: "#374151", ml: "12px", fontSize: "16px" }}>Advanced analytics</span>
              </Typography>
              <Typography sx={{ mt: "16px", lineHeight: 1, display: "flex", alignItems: 'center', gap: "12px" }}>
                <Sbox2>
                  <CloseOutlined style={{ color: "#dc2626", fontSize: 12 }} />
                </Sbox2>
                <span style={{ color: "#374151", ml: "12px", fontSize: "16px" }}>AI message suggestions</span>
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', width: "100%" }}>

                <Sbutton >Get Started</Sbutton>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4, lg: 4 }}>
          <Card variant='outlined' sx={{
            overflow: "visible", position: "relative", border: "2px solid #2463eb", borderRadius: "1rem", p: "24px", backgroundColor: 'transparent', backgroundImage: 'linear-gradient(to bottom, #fff, rgba(255, 255, 255, 0))',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover', transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            },
            '@media (min-width:770px)': {
              transform: 'scale(1.1)',
            },
          }}>
            <CardContent sx={{ p: "0px" }}>
              <Typography sx={{ fontSize: "1.5rem", fontWeight: 700, lineHeight: "2rem" }}>
                Professional
              </Typography>
              <Typography sx={{ mt: "6px", lineHeight: "2.25rem" }}>
                <span style={{ fontSize: "3rem", fontWeight: 700, color: "#2463eb" }}>$79</span><span style={{ color: "#6b7280", ml: "8px", fontSize: "16px" }}>/month</span>
              </Typography>
              <Typography sx={{ mt: "6px", lineHeight: "1.25rem", color: "#4b5563", fontSize: "14px" }}>
                Ideal for growing businesses
              </Typography>
              <Typography sx={{ mt: "24px", lineHeight: 1, display: "flex", alignItems: 'center', gap: "12px" }}>
                <Sbox>
                  <CheckOutlined style={{ color: "#16a34a", fontSize: 12 }} />
                </Sbox>
                <span style={{ color: "#374151", ml: "12px", fontSize: "16px" }}>Up to 15 team members</span>
              </Typography>
              <Typography sx={{ mt: "16px", lineHeight: 1, display: "flex", alignItems: 'center', gap: "12px" }}>
                <Sbox>
                  <CheckOutlined style={{ color: "#16a34a", fontSize: 12 }} />
                </Sbox>
                <span style={{ color: "#374151", ml: "12px", fontSize: "16px" }}>Advanced client management</span>
              </Typography>
              <Typography sx={{ mt: "16px", lineHeight: 1, display: "flex", alignItems: 'center', gap: "12px" }}>
                <Sbox>
                  <CheckOutlined style={{ color: "#16a34a", fontSize: 12 }} />
                </Sbox>
                <span style={{ color: "#374151", ml: "12px", fontSize: "16px" }}>All platforms integration</span>
              </Typography>
              <Typography sx={{ mt: "16px", lineHeight: 1, display: "flex", alignItems: 'center', gap: "12px" }}>
                <Sbox>
                  <CheckOutlined style={{ color: "#16a34a", fontSize: 12 }} />
                </Sbox>
                <span style={{ color: "#374151", ml: "12px", fontSize: "16px" }}>Advanced analytics</span>
              </Typography>
              <Typography sx={{ mt: "16px", lineHeight: 1, display: "flex", alignItems: 'center', gap: "12px" }}>
                <Sbox2>
                  <CloseOutlined style={{ color: "#dc2626", fontSize: 12 }} />
                </Sbox2>
                <span style={{ color: "#374151", ml: "12px", fontSize: "16px" }}>AI message suggestions</span>
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', width: "100%" }}>

                <Sbutton sx={{ color: "#fff", backgroundColor: "#2463eb", "&:hover": { color: "#fff", backgroundColor: "#0e3b9a" } }}>Get Started</Sbutton>
              </Box>
            </CardContent>
            <Box sx={{
              fontSize: "14px",
              fontWeight: 700,
              p: '8px 24px',
              borderRadius: "9999px",
              position: "absolute",
              zIndex: 999,
              top: -20,
              left: "50%", // Center horizontally
              transform: "translateX(-50%)",
              color: "#fff",
              backgroundColor: "#2463eb",
              boxShadow: 1,
              "&:hover": {
                color: "#fff",
                backgroundColor: "#2463eb",
              },
            }}>MOST POPULAR</Box>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4, lg: 4 }}>
          <Card variant='outlined' sx={{
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            '&:hover': {
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
              transform: "translateY(-5px)",
            }, border: "1px solid #e5e7eb", borderRadius: "1rem", p: "24px"
          }}>
            <CardContent sx={{ p: "0px" }}>
              <Typography sx={{ fontSize: "1.5rem", fontWeight: 700, lineHeight: "2rem" }}>
                Enterprise
              </Typography>
              <Typography sx={{ mt: "6px", lineHeight: "2.25rem" }}>
                <span style={{ fontSize: "2.25rem", fontWeight: 700 }}>$149</span><span style={{ color: "#6b7280", ml: "8px", fontSize: "16px" }}>/month</span>
              </Typography>
              <Typography sx={{ mt: "6px", lineHeight: "1.25rem", color: "#4b5563", fontSize: "14px" }}>
                For large teams with advanced needs
              </Typography>
              <Typography sx={{ mt: "24px", lineHeight: 1, display: "flex", alignItems: 'center', gap: "12px" }}>
                <Sbox>
                  <CheckOutlined style={{ color: "#16a34a", fontSize: 12 }} />
                </Sbox>
                <span style={{ color: "#374151", ml: "12px", fontSize: "16px" }}>Unlimited team members</span>
              </Typography>
              <Typography sx={{ mt: "16px", lineHeight: 1, display: "flex", alignItems: 'center', gap: "12px" }}>
                <Sbox>
                  <CheckOutlined style={{ color: "#16a34a", fontSize: 12 }} />
                </Sbox>
                <span style={{ color: "#374151", ml: "12px", fontSize: "16px" }}>Complete client management</span>
              </Typography>
              <Typography sx={{ mt: "16px", lineHeight: 1, display: "flex", alignItems: 'center', gap: "12px" }}>
                <Sbox>
                  <CheckOutlined style={{ color: "#16a34a", fontSize: 12 }} />
                </Sbox>
                <span style={{ color: "#374151", ml: "12px", fontSize: "16px" }}>All platforms + custom integrations</span>
              </Typography>

              <Typography sx={{ mt: "16px", lineHeight: 1, display: "flex", alignItems: 'center', gap: "12px" }}>
                <Sbox>
                  <CheckOutlined style={{ color: "#16a34a", fontSize: 12 }} />
                </Sbox>
                <span style={{ color: "#374151", ml: "12px", fontSize: "16px" }}>Advanced analytics and reporting</span>
              </Typography>

              <Typography sx={{ mt: "16px", lineHeight: 1, display: "flex", alignItems: 'center', gap: "12px" }}>
                <Sbox>
                  <CheckOutlined style={{ color: "#16a34a", fontSize: 12 }} />
                </Sbox>
                <span style={{ color: "#374151", ml: "12px", fontSize: "16px" }}>AI message suggestions</span>
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'center', width: "100%" }}>

                <Sbutton >Contact Sales</Sbutton>
              </Box>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
      <Box>

        <Paper  sx={{ boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)", mt: "64px", p: "48px", borderRadius: "16px", display: "flex", flexDirection: "column", gap: "32px", justifyContent: 'center', alignItems: 'center' }}>

          <Box>
            <Typography sx={{ fontSize: "30px", fontWeight: 700, color: "#1f2937" }}>
              Frequently Asked Questions
            </Typography>
          </Box>
          <Box sx={{ width: "80%", bgcolor: "#f9fafb", p: "24px", borderRadius: "12px", "&:hover": { bgcolor: "#f3f4f6" } }}>
            <Typography sx={{ fontSize: "18px", fontWeight: 600, color: "#1f2937", mb: "12px" }}>
              Can I upgrade or downgrade my plan later?
            </Typography>
            <Typography sx={{ fontSize: "16px", color: "#4b5563" }}>
              Yes, you can change your plan at any time. When upgrading, you'll be charged the prorated difference for the remainder of your billing cycle.
            </Typography>
          </Box>
          <Box sx={{ width: "80%", bgcolor: "#f9fafb", p: "24px", borderRadius: "12px", "&:hover": { bgcolor: "#f3f4f6" } }}>
            <Typography sx={{ fontSize: "18px", fontWeight: 600, color: "#1f2937", mb: "12px" }}>
              Is there a free trial available?
            </Typography>
            <Typography sx={{ fontSize: "16px", color: "#4b5563" }}>
              We offer a 14-day free trial on all plans, no credit card required. Experience all features before committing.
            </Typography>
          </Box>
          <Box sx={{ width: "80%", bgcolor: "#f9fafb", p: "24px", borderRadius: "12px", "&:hover": { bgcolor: "#f3f4f6" } }}>
            <Typography sx={{ fontSize: "18px", fontWeight: 600, color: "#1f2937", mb: "12px" }}>
              What payment methods do you accept?
            </Typography>
            <Typography sx={{ fontSize: "16px", color: "#4b5563" }}>
              We accept all major credit cards, PayPal, and offer invoice payment options for annual enterprise plans.
            </Typography>
          </Box>

        </Paper>
      </Box>

    </Box >
  );
}
