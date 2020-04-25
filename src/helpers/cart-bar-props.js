export const CartBarProps = {
  chart: {
    toolbar: { show: false },
    type: 'bar',
    height: 250,
  },
  plotOptions: {
    bar: { horizontal: true },
  },
  dataLabels: { enabled: false },
  yaxis: {
    labels: {
      style: { cssClass: 'pokemon-stats-label', }
    },
  },
};

export default CartBarProps;
