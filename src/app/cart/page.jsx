'use client';
import { Container, Typography, List, ListItem, ListItemText, Button, Divider } from '@mui/material';
import { useCart } from '../../context/CartContext.js';
import { useRouter } from 'next/navigation';

export default function Cart() {
  const { state, dispatch } = useCart();
  const router = useRouter();
  const total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  if (state.items.length === 0) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h5">Your Cart is Empty</Typography>
        <Button onClick={() => router.push('/shop')}>Continue Shopping</Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Your Cart</Typography>
      <List>
        {state.items.map((item) => (
          <ListItem key={item.id} secondaryAction={
            <Button onClick={() => removeItem(item.id)}>Remove</Button>
          }>
            <ListItemText
              primary={item.name}
              secondary={`$${item.price} x ${item.quantity}`}
            />
          </ListItem>
        ))}
      </List>
      <Divider />
      <Typography variant="h6" align="right">Total: ${total.toFixed(2)}</Typography>
      <Button variant="contained" fullWidth onClick={() => router.push('/checkout')}>Checkout</Button>
    </Container>
  );
}