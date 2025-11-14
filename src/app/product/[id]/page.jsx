import { Container, Typography, Button, Card, CardMedia, CardContent, Grid } from '@mui/material';
import Image from 'next/image';
import connectDB from '../../../lib/mongoose.js';
import Product from '../../../models/Product.js';

export default async function ProductPage({ params }) {
  await connectDB();
  const product = await Product.findById(params.id).lean();
  if (!product) return <Typography>Not Found</Typography>;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia>
              <Image src={product.image} alt={product.name} width={400} height={300} unoptimized />
            </CardMedia>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h3">{product.name}</Typography>
          <Typography variant="body1" color="text.secondary">{product.description}</Typography>
          <Typography variant="h4" color="primary">${product.price}</Typography>
          <AddToCartButton product={product} />
        </Grid>
      </Grid>
    </Container>
  );
}

'use client';
import { useCart } from '@/context/CartContext.js';
import { useState } from 'react';

function AddToCartButton({ product }) {
  const { dispatch } = useCart();
  const [added, setAdded] = useState(false);

  const addToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: { ...product, id: product._id.toString(), quantity: 1 } });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Button variant="contained" onClick={addToCart} disabled={added}>
      {added ? 'Added!' : 'Add to Cart'}
    </Button>
  );
}