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
};
