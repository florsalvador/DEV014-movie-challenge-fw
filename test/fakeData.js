export const data1 = {
  "adult": false,
  "backdrop_path": "/xg27NrXi7VXCGUr7MG75UqLl6Vg.jpg",
  "genre_ids": [
      16,
      10751,
      18,
      12,
      35
  ],
  "id": 1022789,
  "original_language": "en",
  "original_title": "Inside Out 2",
  "overview": "Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and Disgust.",
  "popularity": 8445.266,
  "poster_path": "/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
  "release_date": "2024-06-11",
  "title": "Inside Out 2",
  "video": false,
  "vote_average": 7.907,
  "vote_count": 420
};

export const data2 = {
  "adult": false,
  "backdrop_path": "/11G6N5zW0KykVS0EcNKeXHUmQj8.jpg",
  "genre_ids": [
      10752
  ],
  "id": 1136318,
  "original_language": "en",
  "original_title": "Battle Over Britain",
  "overview": "A young pilot, fresh out of training, is called to join a Flight while they wait for the call to scramble.",
  "popularity": 646.548,
  "poster_path": "/8htJ7keZTwa08aC9OKyiqaq1cNJ.jpg",
  "release_date": "2023-12-01",
  "title": "Battle Over Britain",
  "video": false,
  "vote_average": 7.412,
  "vote_count": 51
}

// id: wrong data type
export const incorrectDataType = {
  "adult": false,
  "backdrop_path": "/11G6N5zW0KykVS0EcNKeXHUmQj8.jpg",
  "genre_ids": [
      10752
  ],
  "id": "1136318",
  "original_language": "en",
  "original_title": "Battle Over Britain",
  "overview": "A young pilot, fresh out of training, is called to join a Flight while they wait for the call to scramble.",
  "popularity": 646.548,
  "poster_path": "/8htJ7keZTwa08aC9OKyiqaq1cNJ.jpg",
  "release_date": "2023-12-01",
  "title": "Battle Over Britain",
  "video": false,
  "vote_average": 7.412,
  "vote_count": 51
}

// missing "poster_path" property
export const missingRequiredData = {
  "adult": false,
  "backdrop_path": "/11G6N5zW0KykVS0EcNKeXHUmQj8.jpg",
  "genre_ids": [
      10752
  ],
  "id": 1136318,
  "original_language": "en",
  "original_title": "Battle Over Britain",
  "overview": "A young pilot, fresh out of training, is called to join a Flight while they wait for the call to scramble.",
  "popularity": 646.548,
  "release_date": "2023-12-01",
  "title": "Battle Over Britain",
  "video": false,
  "vote_average": 7.412,
  "vote_count": 51
}

// missing "vote_count" property
export const missingData = {
  "adult": false,
  "backdrop_path": "/11G6N5zW0KykVS0EcNKeXHUmQj8.jpg",
  "genre_ids": [
      10752
  ],
  "id": 1136318,
  "original_language": "en",
  "original_title": "Battle Over Britain",
  "overview": "A young pilot, fresh out of training, is called to join a Flight while they wait for the call to scramble.",
  "popularity": 646.548,
  "poster_path": "/8htJ7keZTwa08aC9OKyiqaq1cNJ.jpg",
  "release_date": "2023-12-01",
  "title": "Battle Over Britain",
  "video": false,
  "vote_average": 7.412
}

export const dataMovie1 = {
  id: 1022789,
  title: "Inside Out 2",
  releaseDate: "2024-06-11",
  posterPath: "/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
  genreIds: [ 16, 10751, 18, 12, 35 ],
  overview: "Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and Disgust."
}

export const dataMovie2 = {
  id: 1136318,
  title: "Battle Over Britain",
  releaseDate: "2023-12-01",
  posterPath: "/8htJ7keZTwa08aC9OKyiqaq1cNJ.jpg",
  genreIds: [ 10752 ],
  overview: "A young pilot, fresh out of training, is called to join a Flight while they wait for the call to scramble."
}
