module.exports = {
  serie1: {
    name: 'Profit',
    options: {
      backgroundColor: 'rgba(199, 232, 77, 0.4)',
      borderColor: 'rgb(199, 232, 77)',
      borderWidth: 2,
      pointRadius: 0,
    },
    data: [
      { x: '2001', y: 2, label: '2001' },
      { x: '2002', y: 24, label: '2002' },
    ],
  },
  serie2: {
    name: 'Loss',
    options: {
      backgroundColor: 'rgba(229, 132, 56, 0.4)',
      borderColor: 'rgb(229, 132, 56)',
      borderWidth: 2,
      pointRadius: 0,
    },
    data: [
      { x: '1984', y: 231, label: '1984' },
      {
        x: '1985',
        y: 242,
        label: '1985',
      },
    ],
  },
  pieSerie: {
    name: 'pie',
    data: [
      { x: 'Oct', y: 10, options: { color: '#8EC4D5' } },
      { x: 'Nov', y: 12, options: { color: '#8EC4D5' } },
      { x: 'Dec', y: 9, options: { color: '#8EC4D5' } },
      { x: 'Jan', y: 15, options: { color: '#8EC4D5' } },
      { x: 'Feb', y: 21, options: { color: '#8EC4D5' } },
      { x: 'Mar', y: 23, options: { color: '#C7E84D' } },
    ],
  },
};
