import { Container, Typography, Grid, Card, CardMedia, CardContent, Button } from '@mui/material';
import Image from 'next/image';
import connectDB from '../../lib/mongoose.js';
import Product from '../../models/Product.js';
import Link from 'next/link';

export default async function Shop() {
  await connectDB();
  const products = await Product.find({}).lean();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Shop All Products</Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product._id.toString()}>
            <Card>
              <CardMedia>
                <Image src={product.image} alt={product.name} width={300} height={200} unoptimized style={{ objectFit: 'cover' }} />
              </CardMedia>
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="text.secondary">{product.category}</Typography>
                <Typography variant="h6" color="primary">${product.price}</Typography>
                <Button component={Link} href={`/product/${product._id}`} variant="contained" fullWidth>
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