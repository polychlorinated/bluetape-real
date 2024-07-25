const images = [
  '0',
  '1',
  '10',
  '100',
  '1000',
  '1001',
  '1002',
  '1003',
  '1004',
  '1005',
  '1006',
  '1008',
  '1009',
  '101',
  '1010',
  '1011',
  '1012',
  '1013',
  '1014',
  '1015',
  '1016',
  '1018',
  '1019',
  '102',
  '1020',
  '1021',
  '1022',
  '1023',
  '1024',
  '1025',
];

const getRandomAvatarUrl = () => {
  return `https://picsum.photos/id/${images[Math.floor(Math.random() * 31)]}/50/50`;
};

module.exports = getRandomAvatarUrl;
