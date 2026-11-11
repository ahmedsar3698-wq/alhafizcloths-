export const formatPKR = (amount: number): string => {
  return `Rs. ${amount.toLocaleString('en-PK')}`;
};

export interface WhatsAppOrderDetails {
  customerName?: string;
  whatsappNumber?: string;
  productName: string;
  colorName?: string;
  quantity: number;
  unitPrice: number;
  city?: string;
  address?: string;
  totalAmount: number;
  deliveryFee?: number;
  notes?: string;
}

export const generateWhatsAppOrderUrl = (
  details: WhatsAppOrderDetails,
  sellerWhatsApp = '923262444991'
): string => {
  // Normalize phone number (strip + and dashes)
  const cleanNumber = sellerWhatsApp.replace(/[^0-9]/g, '');

  const deliveryNote = details.city?.toLowerCase().includes('karachi')
    ? 'Karachi (FREE DELIVERY)'
    : `${details.city || 'Pakistan'} (Delivery: ${details.deliveryFee ? `Rs. ${details.deliveryFee}` : 'As calculated'})`;

  let message = `*Salam AL HAFIZ CLOTHS,*\n`;
  message += `I would like to place an order for:\n\n`;
  message += `• *Product:* ${details.productName}\n`;
  if (details.colorName) {
    message += `• *Color:* ${details.colorName}\n`;
  }
  message += `• *Quantity:* ${details.quantity} Suit(s)\n`;
  message += `• *Price per Suit:* ${formatPKR(details.unitPrice)}\n`;
  message += `• *Delivery Location:* ${deliveryNote}\n`;

  if (details.customerName) {
    message += `• *Customer Name:* ${details.customerName}\n`;
  }
  if (details.whatsappNumber) {
    message += `• *Customer Phone:* ${details.whatsappNumber}\n`;
  }
  if (details.address) {
    message += `• *Delivery Address:* ${details.address}\n`;
  }

  message += `\n*Total Payable:* ${formatPKR(details.totalAmount)}\n`;
  message += `*Feature:* Capry Guaranteed Fabric\n\n`;
  if (details.notes) {
    message += `*Notes:* ${details.notes}\n\n`;
  }
  message += `Please confirm my order and dispatch timeline. Thank you!`;

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
};

export const generateDirectWhatsAppInquiry = (
  productName?: string,
  sellerWhatsApp = '923262444991'
): string => {
  const cleanNumber = sellerWhatsApp.replace(/[^0-9]/g, '');
  const message = productName
    ? `*Salam AL HAFIZ CLOTHS,*\nI am interested in *${productName}*. Could you please share available colors and delivery details for Karachi?`
    : `*Salam AL HAFIZ CLOTHS,*\nI would like to inquire about your men's unstitched fabric collection and Karachi free delivery.`;

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
};
