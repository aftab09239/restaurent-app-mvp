import React, {useMemo} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import {useCart} from '../context/CartContext';
import {useTheme} from '../context/ThemeContext';

const SERVICE_RATE = 0.05;
const TAX_RATE = 0.15;

export default function OrderSummaryScreen({orderOptions = {}, onPlaceOrder, onBack}) {
  const {cart} = useCart();
  const {colors} = useTheme();
  const subtotal = useMemo(() => cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart.items]);
  const discount = useMemo(() => subtotal * (cart.discountPercent / 100), [subtotal, cart.discountPercent]);
  const service = useMemo(() => (subtotal - discount) * SERVICE_RATE, [subtotal, discount]);
  const tax = useMemo(() => (subtotal - discount) * TAX_RATE, [subtotal, discount]);
  const total = useMemo(() => subtotal - discount + service + tax, [subtotal, discount, service, tax]);

  return (
    <ScrollView contentContainerStyle={{padding: 16}}>
      <Text style={{fontSize: 28, fontWeight: '900', color: colors.text}}>Order Summary</Text>
      <Text style={{color: colors.muted, marginVertical: 8}}>
        {orderOptions.type === 'Dine-in' ? `Dine-in · Table ${orderOptions.table}` : `Takeaway · Pickup ${orderOptions.pickupTime}`}
      </Text>
      {cart.items.map(item => (
        <View key={item.id} style={{paddingVertical: 8}}>
          <Text style={{color: colors.text, fontWeight: '700'}}>{item.name} × {item.quantity}</Text>
          <Text style={{color: colors.muted}}>Rs. {item.price * item.quantity}</Text>
        </View>
      ))}
      <Text style={{color: colors.text, marginTop: 12}}>Subtotal: Rs. {Math.round(subtotal)}</Text>
      <Text style={{color: colors.text}}>Service (5%): Rs. {Math.round(service)}</Text>
      <Text style={{color: colors.text}}>Tax (15%): Rs. {Math.round(tax)}</Text>
      <Text style={{color: colors.text}}>Discount: -Rs. {Math.round(discount)}</Text>
      <Text style={{color: colors.text, fontSize: 20, fontWeight: '900', marginTop: 8}}>Grand Total: Rs. {Math.round(total)}</Text>
      <Pressable onPress={onPlaceOrder} style={{padding: 14, marginTop: 18, borderRadius: 10, backgroundColor: colors.success}}>
        <Text style={{color:'#fff', textAlign:'center', fontWeight:'800'}}>Place Order</Text>
      </Pressable>
      <Pressable onPress={onBack} style={{padding: 14, marginTop: 8}}>
        <Text style={{color: colors.accent, textAlign:'center', fontWeight:'800'}}>Back to Cart</Text>
      </Pressable>
    </ScrollView>
  );
}
