export const getTotalCost = (cost, gst, delivery) => {
  return Number(cost) + (Number(cost) * Number(gst)) / 100 + Number(delivery);
};
