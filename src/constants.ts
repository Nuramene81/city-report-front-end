export const issueMockData = [
  {
    id: '1',
    title: 'Pothole',
    description: 'There is a pothole on the road',
    location: 'Bo-kaap',
    imageUrl: 'https://picsum.photos/200/300',
    dateReported: '2024-01-01',
    reportedBy: {
      id: '217fea77-d7db-466e-85df-75cd5642f42a',
      name: 'John Doe'
    },
    status: 'Open'
  },
  {
    id: '2',
    title: 'Graffiti',
    description: 'Unsanctioned graffiti on the wall',
    location: 'Woodstock',
    imageUrl: 'https://picsum.photos/200/300',
    dateReported: '2024-01-02',
    reportedBy: {
      id: '79dd0e4f-4aac-4937-97ec-5f0dd6f16899',
      name: 'Jane Doe'
    },
    status: 'Open'
  }
];

export const GOOGLE_MAPS_API_KEY = 'AIzaSyBgZdhpkrKU58GzW4CTSHdgGsXd34E1tY0';