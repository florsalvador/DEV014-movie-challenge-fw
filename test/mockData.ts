// MOCK DATA FOR TRANSFORMERS TESTS

export const data = {
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

export const data2 = {
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

export const movieType = {
  id: 1136318,
  title: "Battle Over Britain",
  year: "2023",
  posterPath: "https://image.tmdb.org/t/p/w500/8htJ7keZTwa08aC9OKyiqaq1cNJ.jpg",
  genreIds: [ 10752 ],
  overview: "A young pilot, fresh out of training, is called to join a Flight while they wait for the call to scramble."
}

export const movieType2 = {
  id: 1022789,
  title: "Inside Out 2",
  year: "2024",
  posterPath: "https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
  genreIds: [ 16, 10751, 18, 12, 35 ],
  overview: "Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and Disgust."
}

// id: wrong data type
export const incorrectDataType = {
  "adult": false,
  "backdrop_path": "/11G6N5zW0KykVS0EcNKeXHUmQj8.jpg",
  "genre_ids": [
      10752
  ],
  "id": "1136318" as unknown as number,
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
export const missingPosterPath = {
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

// missing "title" property
export const missingTitle = {
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
  "video": false,
  "vote_average": 7.412,
  "vote_count": 51
}

// missing "video" property
export const missingVideo = {
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
  "vote_average": 7.412,
  "vote_count": 51
}


// MOCK DATA FOR APISERVICE TESTS

export const response = {
  "page": 1,
  "results": [
    {
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
        "overview": "Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and Disgust, who’ve long been running a successful operation by all accounts, aren’t sure how to feel when Anxiety shows up. And it looks like she’s not alone.",
        "popularity": 8445.266,
        "poster_path": "/oxxqiyWrnM0XPnBtVe9TgYWnPxT.jpg",
        "release_date": "2024-06-11",
        "title": "Inside Out 2",
        "video": false,
        "vote_average": 7.907,
        "vote_count": 420
    },
    {
        "adult": false,
        "backdrop_path": "/fqv8v6AycXKsivp1T5yKtLbGXce.jpg",
        "genre_ids": [
            878,
            12,
            28
        ],
        "id": 653346,
        "original_language": "en",
        "original_title": "Kingdom of the Planet of the Apes",
        "overview": "Several generations in the future following Caesar's reign, apes are now the dominant species and live harmoniously while humans have been reduced to living in the shadows. As a new tyrannical ape leader builds his empire, one young ape undertakes a harrowing journey that will cause him to question all that he has known about the past and to make choices that will define a future for apes and humans alike.",
        "popularity": 3069.128,
        "poster_path": "/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
        "release_date": "2024-05-08",
        "title": "Kingdom of the Planet of the Apes",
        "video": false,
        "vote_average": 6.879,
        "vote_count": 1150
    }
  ],
  "total_pages": 44758,
  "total_results": 895141
};

export const transformedData = [
  {
    "id": 1022789,
    "title": "Inside Out 2",
    "year": "2024",
    "posterPath": "https://image.tmdb.org/t/p/w500/oxxqiyWrnM0XPnBtVe9TgYWnPxT.jpg",
    "genreIds": [ 16, 10751, 18, 12, 35 ],
    "overview": "Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and Disgust, who’ve long been running a successful operation by all accounts, aren’t sure how to feel when Anxiety shows up. And it looks like she’s not alone."
  },
  {
    "id": 653346,
    "title": "Kingdom of the Planet of the Apes",
    "year": "2024",
    "posterPath": "https://image.tmdb.org/t/p/w500/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
    "genreIds": [ 878, 12, 28 ],
    "overview": "Several generations in the future following Caesar's reign, apes are now the dominant species and live harmoniously while humans have been reduced to living in the shadows. As a new tyrannical ape leader builds his empire, one young ape undertakes a harrowing journey that will cause him to question all that he has known about the past and to make choices that will define a future for apes and humans alike."
  }
]
