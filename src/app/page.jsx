import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import Image from "next/image";
import connectDB from "../lib/mongoose.js";
import Product from "../models/Product.js";
import Link from "next/link";

export default async function Home() {
  await connectDB();
  const products = await Product.find({}).limit(4).lean();

  console.log("Products:", products); // برای تست

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" align="center" gutterBottom color="primary">
        All Your Digital Products Is One Click Away.
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Start Exploring State of the Art Assets Now
      </Typography>
      <Grid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
        <Grid item>
          <Button
            component={Link}
            href="/shop"
            variant="contained"
            size="large"
          >
            Get Started
          </Button>
        </Grid>
        <Grid item>
          <Button
            component={Link}
            href="/contact"
            variant="outlined"
            size="large"
          >
            Learn More
          </Button>
        </Grid>
      </Grid>

      <Typography variant="h4" gutterBottom>
        Brand New
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product._id.toString()}>
            <Card>
              <CardMedia>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={200}
                  height={150}
                  unoptimized
                />
              </CardMedia>
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.category}
                </Typography>
                <Typography variant="h6" color="primary">
                  ${product.price}
                </Typography>
                <Button
                  component={Link}
                  href={`/product/${product._id}`}
                  variant="contained"
                  fullWidth
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
