export interface User {
  email: string,
  password: string
}

export interface Review {
  author: string,
  rating: number,
  reviewText: string,
  createdOn: Date
}

export interface OpeningTime{
  days: string,
  opening: string,
  closing: string,
  closed: boolean
}

export interface Location {
  name: string,
  address:  string,
  rating: number,
  facilities: [string],
  // coords: {type: [Number], index: '2dsphere'},
  openingTimes: [OpeningTime],
  reviews: [Review],
  _id: string
}
